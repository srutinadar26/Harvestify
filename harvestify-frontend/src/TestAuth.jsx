import React, { useEffect, useState } from 'react';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyCdF0ogHBHGL2wNmUTIAMiED172v-89Roc",
  authDomain: "harvestify-1ccbd.firebaseapp.com",
  projectId: "harvestify-1ccbd",
  storageBucket: "harvestify-1ccbd.firebasestorage.app",
  messagingSenderId: "28397173418",
  appId: "1:28397173418:web:213eaa2d5ed390168b2ed3"
};

const TestAuth = () => {
  const [status, setStatus] = useState('Testing...');

  useEffect(() => {
    try {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      
      signInAnonymously(auth)
        .then(() => setStatus('✅ Firebase Auth WORKING!'))
        .catch((error) => setStatus(`❌ Error: ${error.message}`));
    } catch (error) {
      setStatus(`❌ Init Error: ${error.message}`);
    }
  }, []);

  return <div>{status}</div>;
};

export default TestAuth;