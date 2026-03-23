// src/services/historyService.js
import { db, collection, addDoc, query, where, getDocs, orderBy, limit, doc, updateDoc, deleteDoc } from '../firebase';

const HISTORY_COLLECTION = 'predictions';

// Save a prediction to Firestore
export const savePrediction = async (userId, predictionData) => {
  try {
    const prediction = {
      userId,
      type: predictionData.type, // 'crop', 'disease', 'yield'
      input: predictionData.input,
      result: predictionData.result,
      confidence: predictionData.confidence,
      createdAt: new Date().toISOString(),
      createdAtTimestamp: Date.now()
    };
    
    const docRef = await addDoc(collection(db, HISTORY_COLLECTION), prediction);
    return { success: true, id: docRef.id, prediction };
  } catch (error) {
    console.error('Error saving prediction:', error);
    return { success: false, error: error.message };
  }
};

// Get all predictions for a user
export const getUserPredictions = async (userId, limitCount = 50) => {
  try {
    const q = query(
      collection(db, HISTORY_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAtTimestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const predictions = [];
    querySnapshot.forEach((doc) => {
      predictions.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, predictions };
  } catch (error) {
    console.error('Error fetching predictions:', error);
    return { success: false, error: error.message, predictions: [] };
  }
};

// Get predictions by type
export const getPredictionsByType = async (userId, type, limitCount = 20) => {
  try {
    const q = query(
      collection(db, HISTORY_COLLECTION),
      where('userId', '==', userId),
      where('type', '==', type),
      orderBy('createdAtTimestamp', 'desc'),
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const predictions = [];
    querySnapshot.forEach((doc) => {
      predictions.push({ id: doc.id, ...doc.data() });
    });
    
    return { success: true, predictions };
  } catch (error) {
    console.error('Error fetching predictions by type:', error);
    return { success: false, error: error.message, predictions: [] };
  }
};

// Delete a prediction
export const deletePrediction = async (predictionId) => {
  try {
    await deleteDoc(doc(db, HISTORY_COLLECTION, predictionId));
    return { success: true };
  } catch (error) {
    console.error('Error deleting prediction:', error);
    return { success: false, error: error.message };
  }
};

// Update prediction (e.g., add notes)
export const updatePrediction = async (predictionId, updates) => {
  try {
    const predictionRef = doc(db, HISTORY_COLLECTION, predictionId);
    await updateDoc(predictionRef, updates);
    return { success: true };
  } catch (error) {
    console.error('Error updating prediction:', error);
    return { success: false, error: error.message };
  }
};