import joblib
import tensorflow as tf
import numpy as np
import pandas as pd
import json

print("=" * 70)
print("📈 YIELD MODEL DETAILED TEST")
print("=" * 70)

# Load models
print("\n📁 Loading models...")
yield_model = tf.keras.models.load_model("models/yield/harvestify_yield_model.h5", compile=False)
yield_feature_scaler = joblib.load("models/yield/yield_feature_scaler.pkl")
yield_target_scaler = joblib.load("models/yield/yield_target_scaler.pkl")

with open("models/yield/yield_feature_columns.json", 'r') as f:
    yield_feature_columns = json.load(f)

print(f"✅ Models loaded")
print(f"   Feature columns: {yield_feature_columns}")
print(f"   Model input shape: {yield_model.input_shape}")
print(f"   Model output shape: {yield_model.output_shape}")

# Test with different years
print("\n" + "=" * 70)
print("📊 TEST 1: Different Years (Rainfall=850, Pesticides=120, Temp=28.5)")
print("=" * 70)

years = [2000, 2010, 2015, 2020, 2023, 2025, 2030]
for year in years:
    input_df = pd.DataFrame([{'year': year}])
    input_df = input_df[yield_feature_columns]
    input_scaled = yield_feature_scaler.transform(input_df)
    input_reshaped = input_scaled.reshape(1, 1, 1)
    
    pred_scaled = yield_model.predict(input_reshaped, verbose=0)[0][0]
    pred = yield_target_scaler.inverse_transform([[pred_scaled]])[0][0]
    
    print(f"   Year {year}: {pred:.2f} tons/hectare")

# Test with all parameters (though model only uses year)
print("\n" + "=" * 70)
print("📊 TEST 2: Different Rainfall (Year=2023, Pesticides=120, Temp=28.5)")
print("=" * 70)

rainfalls = [300, 500, 800, 1000, 1200, 1500]
for rain in rainfalls:
    input_df = pd.DataFrame([{'year': 2023}])  # Model only uses year
    input_df = input_df[yield_feature_columns]
    input_scaled = yield_feature_scaler.transform(input_df)
    input_reshaped = input_scaled.reshape(1, 1, 1)
    
    pred_scaled = yield_model.predict(input_reshaped, verbose=0)[0][0]
    pred = yield_target_scaler.inverse_transform([[pred_scaled]])[0][0]
    
    print(f"   Rainfall {rain}mm: {pred:.2f} tons/hectare")

# Test with different temperatures
print("\n" + "=" * 70)
print("📊 TEST 3: Different Temperatures (Year=2023, Rainfall=850, Pesticides=120)")
print("=" * 70)

temps = [15, 20, 25, 30, 35, 40]
for temp in temps:
    input_df = pd.DataFrame([{'year': 2023}])  # Model only uses year
    input_df = input_df[yield_feature_columns]
    input_scaled = yield_feature_scaler.transform(input_df)
    input_reshaped = input_scaled.reshape(1, 1, 1)
    
    pred_scaled = yield_model.predict(input_reshaped, verbose=0)[0][0]
    pred = yield_target_scaler.inverse_transform([[pred_scaled]])[0][0]
    
    print(f"   Temperature {temp}°C: {pred:.2f} tons/hectare")

# Check if yield changes with different inputs
print("\n" + "=" * 70)
print("📊 TEST 4: Does yield change with different inputs?")
print("=" * 70)

test_cases = [
    {"name": "Case 1 (2023)", "year": 2023},
    {"name": "Case 2 (2024)", "year": 2024},
    {"name": "Case 3 (2025)", "year": 2025},
    {"name": "Case 4 (2020)", "year": 2020},
]

results = []
for case in test_cases:
    input_df = pd.DataFrame([{'year': case["year"]}])
    input_df = input_df[yield_feature_columns]
    input_scaled = yield_feature_scaler.transform(input_df)
    input_reshaped = input_scaled.reshape(1, 1, 1)
    
    pred_scaled = yield_model.predict(input_reshaped, verbose=0)[0][0]
    pred = yield_target_scaler.inverse_transform([[pred_scaled]])[0][0]
    
    results.append({"year": case["year"], "yield": pred})
    print(f"   {case['name']}: {pred:.2f} tons/hectare")

# Check if the model is actually using the year input
print("\n" + "=" * 70)
print("📊 ANALYSIS")
print("=" * 70)

years_list = [y for y in results]
yields_list = [r["yield"] for r in results]

if len(set(yields_list)) == 1:
    print("⚠️ WARNING: Yield is the SAME for all years!")
    print("   This suggests the model might not be using the year input correctly.")
    print("   The model might be predicting a constant value regardless of input.")
else:
    print("✅ Yield varies with different years!")
    print(f"   Year range: {min([r['year'] for r in results])} - {max([r['year'] for r in results])}")
    print(f"   Yield range: {min(yields_list):.2f} - {max(yields_list):.2f} tons/hectare")

# Check the scaler ranges
print("\n" + "=" * 70)
print("📊 SCALER INFORMATION")
print("=" * 70)

print(f"Feature Scaler:")
print(f"   Scale: {yield_feature_scaler.scale_}")
print(f"   Min: {yield_feature_scaler.min_}")
print(f"   Data min: {yield_feature_scaler.data_min_}")
print(f"   Data max: {yield_feature_scaler.data_max_}")

print(f"\nTarget Scaler:")
print(f"   Scale: {yield_target_scaler.scale_}")
print(f"   Min: {yield_target_scaler.min_}")
print(f"   Data min: {yield_target_scaler.data_min_}")
print(f"   Data max: {yield_target_scaler.data_max_}")

# Manual calculation to verify
print("\n" + "=" * 70)
print("📊 MANUAL VERIFICATION")
print("=" * 70)

test_year = 2023
print(f"Testing year: {test_year}")

# Scale the input
input_df = pd.DataFrame([{'year': test_year}])
input_df = input_df[yield_feature_columns]
input_scaled = yield_feature_scaler.transform(input_df)
print(f"Scaled input: {input_scaled[0][0]:.4f}")

# Predict
pred_scaled = yield_model.predict(input_reshaped, verbose=0)[0][0]
print(f"Scaled prediction: {pred_scaled:.4f}")

# Inverse transform
pred = yield_target_scaler.inverse_transform([[pred_scaled]])[0][0]
print(f"Final prediction: {pred:.2f} tons/hectare")

print("\n" + "=" * 70)
print("✅ TEST COMPLETE")
print("=" * 70)