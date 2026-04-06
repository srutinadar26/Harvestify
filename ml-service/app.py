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
crop_model         = None
crop_scaler        = None
crop_label_encoder = None

try:
    crop_model         = joblib.load("models/crop/harvestify_crop_model_v3.pkl")
    crop_scaler        = joblib.load("models/crop/crop_scaler_v3.pkl")
    crop_label_encoder = joblib.load("models/crop/crop_label_encoder_v3.pkl")
    print(f"✅ Crop Model: Random Forest, {len(crop_label_encoder.classes_)} crops")
except Exception as e:
    print(f"❌ Error loading Crop Model: {e}")

# ========== LOAD DISEASE MODEL ==========
print("\n🔬 Loading Disease Detection Model...")
disease_model  = None
disease_labels = None

try:
    disease_model = tf.keras.models.load_model(
        "models/disease/harvestify_disease_model_v3.h5",
        compile=False
    )
    disease_model.compile(
        optimizer='adam',
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    with open("models/disease/disease_labels_v3.json", 'r') as f:
        disease_labels = json.load(f)
    print(f"✅ Disease Model: MobileNetV2, {len(disease_labels)} classes")
    print(f"   Input shape: {disease_model.input_shape}")
except Exception as e:
    print(f"❌ Error loading Disease Model: {e}")

# ========== LOAD YIELD MODEL ==========
print("\n📈 Loading Yield Prediction Model...")
yield_model          = None
yield_feature_scaler = None
yield_target_scaler  = None
yield_feature_columns = None

try:
    yield_model = tf.keras.models.load_model(
        "models/yield/harvestify_yield_model_v3.keras",
        compile=False
    )
    yield_model.compile(optimizer='adam', loss='mse', metrics=['mae'])
    yield_feature_scaler  = joblib.load("models/yield/yield_feature_scaler_v3.pkl")
    yield_target_scaler   = joblib.load("models/yield/yield_target_scaler_v3.pkl")
    with open("models/yield/yield_feature_columns_v3.json", 'r') as f:
        yield_feature_columns = json.load(f)
    print(f"✅ Yield Model: LSTM")
    print(f"   Feature columns: {yield_feature_columns}")
except Exception as e:
    print(f"❌ Error loading Yield Model: {e}")

# ========== REQUEST MODELS ==========

class CropRequest(BaseModel):
    nitrogen:    float
    phosphorus:  float
    potassium:   float
    temperature: float
    humidity:    float
    ph:          float
    rainfall:    float

class YieldRequest(BaseModel):
    year:        int
    rainfall:    float
    pesticides:  float
    temperature: float
    crop:        str   = "wheat"
    area_acres:  float = 1.0

# ========== CROP YIELD FACTOR ==========
CROP_FACTOR = {
    'rice': 1.0, 'wheat': 0.95, 'maize': 1.1, 'sugarcane': 3.5,
    'cotton': 0.4, 'potato': 2.2, 'tomato': 2.8, 'onion': 1.8,
    'soybean': 0.7, 'groundnut': 0.6, 'default': 1.0
}

# ========== API ENDPOINTS ==========

@app.get("/")
async def root():
    return {
        "message": "🌾 Harvestify ML API - REAL MODELS",
        "status": "running",
        "models": {
            "crop_recommendation": crop_model is not None,
            "disease_detection":   disease_model is not None,
            "yield_prediction":    yield_model is not None
        }
    }

# ========== CROP RECOMMENDATION ==========
@app.post("/predict/crop")
async def predict_crop(request: CropRequest):
    try:
        if crop_model is None:
            raise HTTPException(status_code=503, detail="Crop model not loaded")

        print(f"\n🌾 Crop Prediction: N={request.nitrogen}, P={request.phosphorus}, K={request.potassium}")

        input_data = np.array([[
            request.nitrogen,
            request.phosphorus,
            request.potassium,
            request.temperature,
            request.humidity,
            request.ph,
            request.rainfall
        ]])

        input_scaled  = crop_scaler.transform(input_data)
        probabilities = crop_model.predict_proba(input_scaled)[0]
        top_indices   = np.argsort(probabilities)[-3:][::-1]

        predictions = []
        for idx in top_indices:
            crop_name  = crop_label_encoder.inverse_transform([idx])[0]
            confidence = probabilities[idx] * 100
            predictions.append({
                "crop":       crop_name,
                "confidence": round(confidence, 2)
            })

        best = predictions[0]
        print(f"   ✅ Prediction: {best['crop']} ({best['confidence']}%)")

        return {
            "success":         True,
            "prediction":      best['crop'],
            "confidence":      best['confidence'],
            "top_predictions": predictions,
            "mode":            "real"
        }

    except Exception as e:
        print(f"❌ Crop prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ========== DISEASE DETECTION ==========
@app.post("/predict/disease")
async def predict_disease(file: UploadFile = File(...)):
    try:
        if disease_model is None:
            raise HTTPException(status_code=503, detail="Disease model not loaded")

        # Read and preprocess image
        contents    = await file.read()
        image       = Image.open(io.BytesIO(contents)).convert('RGB')
        image       = image.resize((128, 128))
        image_array = np.array(image, dtype=np.float32) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        print(f"\n🔬 Disease Detection: image shape {image_array.shape}")

        # Predict
        predictions     = disease_model.predict(image_array, verbose=0)[0]
        predicted_class = int(np.argmax(predictions))
        confidence      = float(predictions[predicted_class] * 100)

        # ✅ FIXED: Handle dict labels from disease_labels_v3.json
        label_entry = disease_labels.get(str(predicted_class), None)

        if label_entry is None:
            crop    = "Unknown"
            disease = f"Class_{predicted_class}"
        elif isinstance(label_entry, dict):
            crop    = label_entry.get('crop', 'Unknown')
            disease = label_entry.get('disease', 'Unknown')
        else:
            # Fallback for plain string labels
            if '___' in label_entry:
                parts   = label_entry.split('___')
                crop    = parts[0].replace('_', ' ').strip()
                disease = parts[1].replace('_', ' ').strip()
            else:
                crop    = 'Unknown'
                disease = label_entry.replace('_', ' ').strip()

        # Clean up healthy label
        if disease.lower() == 'healthy':
            disease = 'Healthy ✅'

        print(f"   ✅ Detected: {crop} — {disease} ({confidence:.1f}%)")

        # Severity
        if confidence > 90:
            severity = "High"
        elif confidence > 70:
            severity = "Medium"
        else:
            severity = "Low"

        treatment_info = get_disease_treatment(disease)

        return {
            "success":    True,
            "crop":       crop,
            "disease":    disease,
            "confidence": round(confidence, 2),
            "severity":   severity,
            "treatment":  treatment_info["treatment"],
            "prevention": treatment_info["prevention"],
            "mode":       "real"
        }

    except Exception as e:
        print(f"❌ Disease detection error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ========== YIELD PREDICTION ==========
@app.post("/predict/yield")
async def predict_yield(request: YieldRequest):
    try:
        if yield_model is None or yield_feature_scaler is None:
            raise HTTPException(status_code=503, detail="Yield model not loaded")

        print(f"\n📈 Yield Prediction: crop={request.crop}, area={request.area_acres} acres")
        print(f"   Inputs: year={request.year}, rainfall={request.rainfall}, temp={request.temperature}")

        # Build input matching feature columns
        val_map = {
            'Year':                          request.year,
            'year':                          request.year,
            'average_rain_fall_mm_per_year': request.rainfall,
            'pesticides_tonnes':             request.pesticides,
            'avg_temp':                      request.temperature,
        }
        input_data   = np.array([[val_map.get(col, 0) for col in yield_feature_columns]])
        input_scaled = yield_feature_scaler.transform(input_data)
        input_lstm   = input_scaled.reshape(1, 1, len(yield_feature_columns))

        pred_scaled = yield_model.predict(input_lstm, verbose=0)[0][0]
        pred_hg_ha  = float(yield_target_scaler.inverse_transform([[pred_scaled]])[0][0])

        # Apply crop-specific factor
        factor     = CROP_FACTOR.get(request.crop.lower(), CROP_FACTOR['default'])
        pred_hg_ha = pred_hg_ha * factor

        # Convert to farmer-friendly units
        yield_kg_ha     = pred_hg_ha / 100
        yield_kg_acre   = yield_kg_ha / 2.471
        total_kg        = yield_kg_acre * request.area_acres
        total_bags      = total_kg / 50

        # Rating
        if yield_kg_ha > 8000:
            rating = "🟢 Excellent"
            advice = "Excellent yield expected!"
        elif yield_kg_ha > 4000:
            rating = "🟡 Good"
            advice = "Good yield expected."
        elif yield_kg_ha > 1500:
            rating = "🟠 Moderate"
            advice = "Moderate yield. Consider soil improvement."
        else:
            rating = "🔴 Low"
            advice = "Low yield. Check soil and water conditions."

        # Insights
        insights = []
        if request.rainfall < 500:
            insights.append("⚠️ Low rainfall — consider irrigation")
        elif request.rainfall > 1200:
            insights.append("⚠️ High rainfall — ensure proper drainage")
        if request.temperature > 35:
            insights.append("⚠️ High temperature — protect crops from heat stress")
        elif request.temperature < 15:
            insights.append("⚠️ Low temperature — protect crops from frost")

        print(f"   ✅ Yield: {yield_kg_acre:.0f} kg/acre | Total: {total_kg:.0f} kg | {rating}")

        return {
            "success":            True,
            "crop":               request.crop,
            "area_acres":         request.area_acres,
            "kg_per_acre":        round(yield_kg_acre, 0),
            "kg_per_hectare":     round(yield_kg_ha, 0),
            "tonnes_per_hectare": round(yield_kg_ha / 1000, 2),
            "total_kg":           round(total_kg, 0),
            "total_bags_50kg":    round(total_bags, 0),
            "rating":             rating,
            "advice":             advice,
            "insights":           insights,
            "mode":               "real"
        }

    except Exception as e:
        print(f"❌ Yield prediction error: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# ========== HELPER: DISEASE TREATMENT ==========
def get_disease_treatment(disease):
    disease_lower = disease.lower() if isinstance(disease, str) else ""

    treatments = {
        "bacterial_spot": {
            "treatment":  ["Apply copper-based bactericides", "Remove infected leaves", "Avoid overhead irrigation", "Use disease-free seeds"],
            "prevention": ["Plant resistant varieties", "Practice crop rotation", "Maintain proper spacing", "Sanitize tools"]
        },
        "early_blight": {
            "treatment":  ["Apply chlorothalonil fungicides", "Remove infected lower leaves", "Mulch to prevent soil splash", "Avoid overhead watering"],
            "prevention": ["Use disease-free seeds", "Crop rotation", "Adequate plant spacing", "Remove plant debris after harvest"]
        },
        "late_blight": {
            "treatment":  ["Apply mancozeb or chlorothalonil fungicides", "Remove and destroy infected plants", "Improve air circulation", "Avoid overhead irrigation"],
            "prevention": ["Plant resistant varieties", "Use certified disease-free seeds", "Monitor fields regularly", "Apply preventive fungicides in wet conditions"]
        },
        "leaf_mold": {
            "treatment":  ["Improve air circulation", "Reduce humidity", "Remove infected leaves", "Apply chlorothalonil fungicides"],
            "prevention": ["Use resistant varieties", "Maintain proper spacing", "Water at base of plants", "Keep area well-ventilated"]
        },
        "septoria": {
            "treatment":  ["Apply copper or chlorothalonil fungicides", "Remove infected leaves", "Mulch to prevent soil splash", "Avoid overhead watering"],
            "prevention": ["Practice crop rotation", "Use disease-free seeds", "Adequate spacing", "Remove plant debris"]
        },
        "healthy": {
            "treatment":  ["Continue good farming practices", "Monitor regularly for early signs"],
            "prevention": ["Maintain field hygiene", "Use balanced fertilizers", "Proper irrigation", "Regular crop monitoring"]
        }
    }

    for key in treatments:
        if key in disease_lower:
            return treatments[key]

    return {
        "treatment":  ["Consult local agriculture officer", "Remove and destroy infected parts", "Apply recommended fungicides", "Improve field sanitation"],
        "prevention": ["Use disease-resistant varieties", "Practice crop rotation", "Maintain proper field hygiene", "Regular crop monitoring"]
    }


# ========== HEALTH CHECK ==========
@app.get("/health")
async def health_check():
    return {
        "status":  "healthy",
        "service": "Harvestify ML API",
        "models": {
            "crop":    crop_model is not None,
            "disease": disease_model is not None,
            "yield":   yield_model is not None
        }
    }


if __name__ == "__main__":
    print("\n" + "=" * 60)
    print("🚀 Starting Harvestify ML Service")
    print("📍 Server  : http://localhost:8000")
    print("📍 API Docs: http://localhost:8000/docs")
    print("=" * 60 + "\n")
    uvicorn.run(app, host="0.0.0.0", port=8000)