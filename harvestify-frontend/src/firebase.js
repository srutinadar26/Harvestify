// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider
} from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs, orderBy, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdF0ogHBHGL2wNmUTIAMiED172v-89Roc",
  authDomain: "harvestify-1ccbd.firebaseapp.com",
  projectId: "harvestify-1ccbd",
  storageBucket: "harvestify-1ccbd.firebasestorage.app",
  messagingSenderId: "28397173418",
  appId: "1:28397173418:web:213eaa2d5ed390168b2ed3",
  measurementId: "G-W45BJG0YFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { 
  app,
  auth, 
  db,
  storage,
  analytics,
  // Auth functions
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  // Firestore functions
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  doc,
  updateDoc,
  deleteDoc
};