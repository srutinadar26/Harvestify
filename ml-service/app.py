# ml-service/app.py
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from PIL import Image
import io
import json
import uvicorn
import os

app = FastAPI(title="Harvestify ML API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

print("=" * 60)
print("🌾 HARVESTIFY ML SERVICE - REAL MODELS")
print("=" * 60)

# ========== LOAD CROP MODEL ==========
print("\n📊 Loading Crop Recommendation Model...")
crop_model = None
crop_scaler = None
crop_label_encoder = None

try:
    crop_model = joblib.load("models/crop/harvestify_crop_model.pkl")
    crop_scaler = joblib.load("models/crop/crop_scaler.pkl")
    crop_label_encoder = joblib.load("models/crop/crop_label_encoder.pkl")
    print(f"✅ Crop Model: Random Forest, {len(crop_label_encoder.classes_)} crops")
except Exception as e:
    print(f"❌ Error loading Crop Model: {e}")

# ========== LOAD DISEASE MODEL ==========
print("\n🔬 Loading Disease Detection Model...")
disease_model = None
disease_labels = None

try:
    disease_model = tf.keras.models.load_model("models/disease/harvestify_disease_model.h5")
    with open("models/disease/disease_class_labels.json", 'r') as f:
        disease_labels = json.load(f)
    print(f"✅ Disease Model: MobileNetV2, {len(disease_labels)} diseases")
    print(f"   Input shape: {disease_model.input_shape}")
    print(f"   Diseases: {list(disease_labels.values())}")
except Exception as e:
    print(f"❌ Error loading Disease Model: {e}")

# ========== LOAD YIELD MODEL ==========
print("\n📈 Loading Yield Prediction Model...")
yield_model = None
yield_feature_scaler = None
yield_target_scaler = None
yield_feature_columns = None

try:
    yield_model = tf.keras.models.load_model("models/yield/harvestify_yield_model.h5", compile=False)
    yield_feature_scaler = joblib.load("models/yield/yield_feature_scaler.pkl")
    yield_target_scaler = joblib.load("models/yield/yield_target_scaler.pkl")
    
    with open("models/yield/yield_feature_columns.json", 'r') as f:
        yield_feature_columns = json.load(f)
    
    print(f"✅ Yield Model: LSTM")
    print(f"   Feature columns: {yield_feature_columns}")
except Exception as e:
    print(f"❌ Error loading Yield Model: {e}")

# ========== REQUEST MODELS ==========

class CropRequest(BaseModel):
    nitrogen: float
    phosphorus: float
    potassium: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

class YieldRequest(BaseModel):
    year: int
    rainfall: float
    pesticides: float
    temperature: float

# ========== API ENDPOINTS ==========

@app.get("/")
async def root():
    return {
        "message": "🌾 Harvestify ML API - REAL MODELS",
        "status": "running",
        "models": {
            "crop_recommendation": crop_model is not None,
            "disease_detection": disease_model is not None,
            "yield_prediction": yield_model is not None
        }
    }

@app.post("/predict/crop")
async def predict_crop(request: CropRequest):
    """Predict best crop using trained Random Forest model"""
    try:
        if crop_model is None:
            raise HTTPException(status_code=503, detail="Crop model not loaded")
        
        print(f"\n🌾 Crop Prediction:")
        print(f"   Input: N={request.nitrogen}, P={request.phosphorus}, K={request.potassium}")
        
        # Prepare input data (7 features)
        input_data = np.array([[
            request.nitrogen,
            request.phosphorus,
            request.potassium,
            request.temperature,
            request.humidity,
            request.ph,
            request.rainfall
        ]])
        
        # Scale the input
        input_scaled = crop_scaler.transform(input_data)
        
        # Get prediction probabilities
        probabilities = crop_model.predict_proba(input_scaled)[0]
        
        # Get top 3 predictions
        top_indices = np.argsort(probabilities)[-3:][::-1]
        
        predictions = []
        for idx in top_indices:
            crop_name = crop_label_encoder.inverse_transform([idx])[0]
            confidence = probabilities[idx] * 100
            predictions.append({
                "crop": crop_name,
                "confidence": round(confidence, 2)
            })
        
        best = predictions[0]
        print(f"   ✅ Prediction: {best['crop']} ({best['confidence']}%)")
        
        return {
            "success": True,
            "prediction": best['crop'],
            "confidence": best['confidence'],
            "top_predictions": predictions,
            "mode": "real"
        }
        
    except Exception as e:
        print(f"❌ Crop prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ========== DISEASE DETECTION - COMPLETE ==========
@app.post("/predict/disease")
async def predict_disease(file: UploadFile = File(...)):
    """Detect plant disease from leaf image using CNN"""
    try:
        if disease_model is None:
            raise HTTPException(status_code=503, detail="Disease model not loaded")
        
        # Read image
        contents = await file.read()
        image = Image.open(io.BytesIO(contents))
        
        print(f"\n🔬 Disease Detection:")
        print(f"   Original image size: {image.size}, Mode: {image.mode}")
        
        # IMPORTANT: Model expects 128x128 images (from test output)
        image = image.resize((128, 128))
        image_array = np.array(image)
        
        # Convert to RGB if needed
        if len(image_array.shape) == 2:
            image_array = np.stack([image_array] * 3, axis=-1)
        elif image_array.shape[2] == 4:
            image_array = image_array[:, :, :3]
        
        # Normalize to [0,1]
        image_array = image_array / 255.0
        image_array = np.expand_dims(image_array, axis=0)
        
        # Predict
        predictions = disease_model.predict(image_array, verbose=0)[0]
        predicted_class = np.argmax(predictions)
        confidence = float(predictions[predicted_class] * 100)
        
        # Get disease name from labels
        disease_name = disease_labels.get(str(predicted_class), f"Unknown_{predicted_class}")
        
        # Parse crop and disease (format: "Crop___Disease" or just "Disease")
        if '___' in disease_name:
            parts = disease_name.split('___')
            crop = parts[0]
            disease = parts[1]
        else:
            crop = "Unknown"
            disease = disease_name
        
        print(f"   ✅ Detected: {crop} - {disease} ({confidence:.1f}% confidence)")
        
        # Determine severity based on confidence
        if confidence > 90:
            severity = "High"
        elif confidence > 70:
            severity = "Medium"
        else:
            severity = "Low"
        
        # Get treatment recommendations based on disease
        treatment_info = get_disease_treatment(disease)
        
        return {
            "success": True,
            "crop": crop,
            "disease": disease,
            "confidence": round(confidence, 2),
            "severity": severity,
            "treatment": treatment_info["treatment"],
            "prevention": treatment_info["prevention"],
            "mode": "real"
        }
        
    except Exception as e:
        print(f"❌ Disease detection error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ========== YIELD PREDICTION - COMPLETE ==========
@app.post("/predict/yield")
async def predict_yield(request: YieldRequest):
    """Predict crop yield using LSTM model"""
    try:
        if yield_model is None or yield_feature_scaler is None:
            raise HTTPException(status_code=503, detail="Yield model not loaded")
        
        print(f"\n📈 Yield Prediction:")
        print(f"   Year: {request.year}")
        print(f"   Additional data: Rainfall={request.rainfall}mm, Pesticides={request.pesticides}kg/ha, Temp={request.temperature}°C")
        print(f"   Model expects: {yield_feature_columns}")
        
        # Model only expects 'year' as feature
        input_df = pd.DataFrame([{'year': request.year}])
        input_df = input_df[yield_feature_columns]
        
        # Scale features
        input_scaled = yield_feature_scaler.transform(input_df)
        
        # Reshape for LSTM: (batch, timesteps, features)
        input_reshaped = input_scaled.reshape(1, 1, 1)
        
        # Predict
        prediction_scaled = yield_model.predict(input_reshaped, verbose=0)[0][0]
        
        # Inverse transform to get actual yield
        prediction = yield_target_scaler.inverse_transform([[prediction_scaled]])[0][0]
        
        print(f"   ✅ Predicted yield: {prediction:.2f} tons/hectare")
        
        # Generate insights based on additional inputs
        insights = []
        if request.rainfall < 500:
            insights.append("⚠️ Low rainfall detected - consider irrigation")
        elif request.rainfall > 1200:
            insights.append("⚠️ High rainfall - ensure proper drainage")
        if request.temperature > 35:
            insights.append("⚠️ High temperature - protect crops from heat stress")
        elif request.temperature < 15:
            insights.append("⚠️ Low temperature - protect crops from frost")
        if request.pesticides > 200:
            insights.append("⚠️ High pesticide use - consider integrated pest management")
        
        return {
            "success": True,
            "yield": round(prediction, 2),
            "unit": "tons/hectare",
            "insights": insights,
            "mode": "real"
        }
        
    except Exception as e:
        print(f"❌ Yield prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# ========== HELPER FUNCTIONS ==========

def get_disease_treatment(disease):
    """Get treatment recommendations for common plant diseases"""
    disease_lower = disease.lower()
    
    treatments = {
        "bacterial_spot": {
            "treatment": [
                "Apply copper-based bactericides",
                "Remove infected leaves and plants",
                "Avoid overhead irrigation",
                "Use disease-free seeds"
            ],
            "prevention": [
                "Plant resistant varieties",
                "Practice crop rotation",
                "Maintain proper spacing for air circulation",
                "Sanitize tools and equipment"
            ]
        },
        "early_blight": {
            "treatment": [
                "Apply chlorothalonil or copper-based fungicides",
                "Remove infected lower leaves",
                "Mulch to prevent soil splash",
                "Avoid overhead watering"
            ],
            "prevention": [
                "Use disease-free seeds",
                "Crop rotation with non-host crops",
                "Provide adequate plant spacing",
                "Remove plant debris after harvest"
            ]
        },
        "late_blight": {
            "treatment": [
                "Apply fungicides containing mancozeb or chlorothalonil",
                "Remove and destroy infected plants",
                "Improve air circulation",
                "Avoid overhead irrigation"
            ],
            "prevention": [
                "Plant resistant varieties",
                "Use certified disease-free seed potatoes",
                "Monitor fields regularly",
                "Apply preventive fungicides in wet conditions"
            ]
        },
        "leaf_mold": {
            "treatment": [
                "Improve air circulation",
                "Reduce humidity in greenhouse",
                "Remove infected leaves",
                "Apply fungicides containing chlorothalonil"
            ],
            "prevention": [
                "Use resistant varieties",
                "Maintain proper spacing",
                "Water at base of plants",
                "Keep greenhouse well-ventilated"
            ]
        },
        "septoria_leaf_spot": {
            "treatment": [
                "Apply fungicides containing chlorothalonil or copper",
                "Remove infected leaves",
                "Mulch to prevent soil splash",
                "Avoid overhead watering"
            ],
            "prevention": [
                "Practice crop rotation",
                "Use disease-free seeds",
                "Provide adequate spacing",
                "Remove plant debris"
            ]
        },
        "healthy": {
            "treatment": [
                "Continue good farming practices",
                "Monitor regularly for early signs of disease"
            ],
            "prevention": [
                "Maintain field hygiene",
                "Use balanced fertilizers",
                "Proper irrigation management",
                "Regular crop monitoring"
            ]
        }
    }
    
    # Find matching treatment
    for key in treatments:
        if key in disease_lower:
            return treatments[key]
    
    # Default treatment
    return {
        "treatment": [
            "Consult local agriculture officer",
            "Remove and destroy infected plant parts",
            "Apply recommended fungicides",
            "Improve field sanitation"
        ],
        "prevention": [
            "Use disease-resistant varieties",
            "Practice crop rotation",
            "Maintain proper field hygiene",
            "Regular crop monitoring"
        ]
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "Harvestify ML API",
        "models": {
            "crop": crop_model is not None,
            "disease": disease_model is not None,
            "yield": yield_model is not None
        }
    }

if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🚀 Starting Harvestify ML Service (REAL MODELS)")
    print("📍 Server: http://localhost:8000")
    print("📍 API Docs: http://localhost:8000/docs")
    print("=" * 60 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)