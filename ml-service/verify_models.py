import os
import joblib
import tensorflow as tf
import json
import numpy as np
import pandas as pd

print("=" * 70)
print("🔍 HARVESTIFY MODELS VERIFICATION")
print("=" * 70)

# Check if model files exist
print("\n📁 CHECKING MODEL FILES:")
print("-" * 50)

crop_files = [
    "models/crop/harvestify_crop_model.pkl",
    "models/crop/crop_scaler.pkl",
    "models/crop/crop_label_encoder.pkl"
]

disease_files = [
    "models/disease/harvestify_disease_model.h5",
    "models/disease/disease_class_labels.json"
]

yield_files = [
    "models/yield/harvestify_yield_model.h5",
    "models/yield/yield_feature_scaler.pkl",
    "models/yield/yield_target_scaler.pkl",
    "models/yield/yield_feature_columns.json"
]

all_files_exist = True

for f in crop_files:
    exists = os.path.exists(f)
    size = os.path.getsize(f) if exists else 0
    print(f"{'✅' if exists else '❌'} Crop: {f} ({size:,} bytes)")
    if not exists:
        all_files_exist = False

for f in disease_files:
    exists = os.path.exists(f)
    size = os.path.getsize(f) if exists else 0
    print(f"{'✅' if exists else '❌'} Disease: {f} ({size:,} bytes)")
    if not exists:
        all_files_exist = False

for f in yield_files:
    exists = os.path.exists(f)
    size = os.path.getsize(f) if exists else 0
    print(f"{'✅' if exists else '❌'} Yield: {f} ({size:,} bytes)")
    if not exists:
        all_files_exist = False

if not all_files_exist:
    print("\n❌ Some model files are missing!")
    exit(1)

print("\n✅ All model files exist!")

# ========== LOAD AND TEST EACH MODEL ==========
print("\n" + "=" * 70)
print("🌾 LOADING CROP MODEL")
print("=" * 70)

try:
    crop_model = joblib.load("models/crop/harvestify_crop_model.pkl")
    crop_scaler = joblib.load("models/crop/crop_scaler.pkl")
    crop_label_encoder = joblib.load("models/crop/crop_label_encoder.pkl")
    
    print("✅ CROP MODEL LOADED SUCCESSFULLY!")
    print(f"   Type: {type(crop_model).__name__}")
    print(f"   Features expected: {crop_model.n_features_in_}")
    print(f"   Number of crops: {len(crop_label_encoder.classes_)}")
    print(f"   Sample crops: {list(crop_label_encoder.classes_)[:5]}...")
    
    # Test prediction
    test_data = np.array([[90, 42, 43, 25.5, 82, 6.5, 202]])
    test_scaled = crop_scaler.transform(test_data)
    proba = crop_model.predict_proba(test_scaled)[0]
    top_idx = np.argmax(proba)  # CORRECT
    crop_name = crop_label_encoder.inverse_transform([top_idx])[0]
    confidence = proba[top_idx] * 100
    print(f"\n   ✅ TEST PREDICTION: {crop_name} ({confidence:.1f}%)")
    
except Exception as e:
    print(f"❌ ERROR loading crop model: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
print("🔬 LOADING DISEASE MODEL")
print("=" * 70)

try:
    disease_model = tf.keras.models.load_model("models/disease/harvestify_disease_model.h5")
    with open("models/disease/disease_class_labels.json", 'r') as f:
        disease_labels = json.load(f)
    
    print("✅ DISEASE MODEL LOADED SUCCESSFULLY!")
    print(f"   Type: {type(disease_model).__name__}")
    print(f"   Input shape: {disease_model.input_shape}")
    print(f"   Output shape: {disease_model.output_shape}")
    print(f"   Number of diseases: {len(disease_labels)}")
    print(f"   Sample diseases: {list(disease_labels.values())[:5]}")
    
    # Test with random image
    test_image = np.random.rand(1, 128, 128, 3).astype(np.float32)
    pred = disease_model.predict(test_image, verbose=0)
    print(f"\n   ✅ MODEL CAN PREDICT (output shape: {pred.shape})")
    
except Exception as e:
    print(f"❌ ERROR loading disease model: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
print("📈 LOADING YIELD MODEL")
print("=" * 70)

try:
    yield_model = tf.keras.models.load_model("models/yield/harvestify_yield_model.h5", compile=False)
    yield_feature_scaler = joblib.load("models/yield/yield_feature_scaler.pkl")
    yield_target_scaler = joblib.load("models/yield/yield_target_scaler.pkl")
    
    with open("models/yield/yield_feature_columns.json", 'r') as f:
        yield_feature_columns = json.load(f)
    
    print("✅ YIELD MODEL LOADED SUCCESSFULLY!")
    print(f"   Type: {type(yield_model).__name__}")
    print(f"   Input shape: {yield_model.input_shape}")
    print(f"   Feature columns: {yield_feature_columns}")
    
    # Test prediction
    test_df = pd.DataFrame([{'year': 2023}])
    test_df = test_df[yield_feature_columns]
    test_scaled = yield_feature_scaler.transform(test_df)
    test_reshaped = test_scaled.reshape(1, 1, 1)
    pred_scaled = yield_model.predict(test_reshaped, verbose=0)[0][0]
    pred = yield_target_scaler.inverse_transform([[pred_scaled]])[0][0]
    print(f"\n   ✅ TEST PREDICTION: {pred:.2f} tons/hectare")
    
except Exception as e:
    print(f"❌ ERROR loading yield model: {e}")
    import traceback
    traceback.print_exc()

print("\n" + "=" * 70)
print("✅ VERIFICATION COMPLETE")
print("=" * 70)