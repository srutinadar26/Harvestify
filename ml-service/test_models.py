import joblib
import tensorflow as tf
import json
import numpy as np
import pandas as pd

print("=" * 60)
print("🔍 TESTING HARVESTIFY MODELS")
print("=" * 60)

# ========== TEST CROP MODEL ==========
print("\n📊 CROP RECOMMENDATION MODEL")
print("-" * 40)
try:
    crop_model = joblib.load("models/crop/harvestify_crop_model.pkl")
    crop_scaler = joblib.load("models/crop/crop_scaler.pkl")
    crop_label_encoder = joblib.load("models/crop/crop_label_encoder.pkl")
    
    print(f"✅ Model Type: {type(crop_model)}")
    print(f"✅ Number of features: {crop_model.n_features_in_}")
    print(f"✅ Number of crops: {len(crop_label_encoder.classes_)}")
    print(f"✅ Crops: {list(crop_label_encoder.classes_)[:10]}...")
    
    # Test with sample data
    sample_input = np.array([[90, 42, 43, 25.5, 82, 6.5, 202]])
    sample_scaled = crop_scaler.transform(sample_input)
    proba = crop_model.predict_proba(sample_scaled)[0]
    top_idx = np.argsort(proba)[-3:][::-1]
    
    print(f"\n✅ Sample Prediction:")
    for idx in top_idx:
        crop = crop_label_encoder.inverse_transform([idx])[0]
        print(f"   - {crop}: {proba[idx]*100:.2f}%")
        
except Exception as e:
    print(f"❌ Error: {e}")

# ========== TEST DISEASE MODEL ==========
print("\n\n🔬 DISEASE DETECTION MODEL")
print("-" * 40)
try:
    disease_model = tf.keras.models.load_model("models/disease/harvestify_disease_model.h5", compile=False)
    with open("models/disease/disease_class_labels.json", 'r') as f:
        disease_labels = json.load(f)
    
    print(f"✅ Model Type: {type(disease_model)}")
    print(f"✅ Input shape: {disease_model.input_shape}")
    print(f"✅ Output shape: {disease_model.output_shape}")
    print(f"✅ Number of diseases: {len(disease_labels)}")
    print(f"✅ First 10 diseases: {list(disease_labels.values())[:10]}")
    
    # Test with random image
    test_input = np.random.rand(1, 224, 224, 3).astype(np.float32)
    pred = disease_model.predict(test_input, verbose=0)
    print(f"✅ Model prediction shape: {pred.shape}")
    
except Exception as e:
    print(f"❌ Error: {e}")

# ========== TEST YIELD MODEL ==========
print("\n\n📈 YIELD PREDICTION MODEL")
print("-" * 40)
try:
    yield_model = tf.keras.models.load_model("models/yield/harvestify_yield_model.h5", compile=False)
    yield_feature_scaler = joblib.load("models/yield/yield_feature_scaler.pkl")
    yield_target_scaler = joblib.load("models/yield/yield_target_scaler.pkl")
    
    with open("models/yield/yield_feature_columns.json", 'r') as f:
        yield_feature_columns = json.load(f)
    
    print(f"✅ Model Type: {type(yield_model)}")
    print(f"✅ Input shape: {yield_model.input_shape}")
    print(f"✅ Output shape: {yield_model.output_shape}")
    print(f"✅ Feature columns: {yield_feature_columns}")
    
    # Test with sample data
    test_data = pd.DataFrame([{
        'Year': 2023,
        'rainfall': 850,
        'pesticides': 120,
        'avg_temp': 28.5
    }])
    
    # Ensure columns match
    for col in yield_feature_columns:
        if col not in test_data.columns:
            test_data[col] = 0
    
    test_data = test_data[yield_feature_columns]
    scaled = yield_feature_scaler.transform(test_data)
    reshaped = scaled.reshape(1, 1, -1)
    pred = yield_model.predict(reshaped, verbose=0)
    
    print(f"✅ Scaled prediction: {pred[0][0]}")
    
    # Inverse transform
    actual = yield_target_scaler.inverse_transform(pred)[0][0]
    print(f"✅ Actual yield prediction: {actual:.2f} tons/hectare")
    
except Exception as e:
    print(f"❌ Error: {e}")

print("\n" + "=" * 60)
print("✅ TEST COMPLETE")
print("=" * 60)