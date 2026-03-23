// src/components/PhoneOTP.jsx
import React, { useState } from 'react';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../firebase';
import toast from 'react-hot-toast';

const PhoneOTP = ({ onVerified }) => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1); // 1: phone, 2: otp

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved
        }
      });
    }
  };

  const sendOTP = async () => {
    try {
      setupRecaptcha();
      const confirmation = await signInWithPhoneNumber(
        auth, 
        phone, 
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setStep(2);
      toast.success('OTP sent to your phone!');
    } catch (error) {
      toast.error('Failed to send OTP: ' + error.message);
    }
  };

  const verifyOTP = async () => {
    try {
      const result = await confirmationResult.confirm(otp);
      toast.success('Phone verified successfully!');
      if (onVerified) onVerified(result.user);
    } catch (error) {
      toast.error('Invalid OTP');
    }
  };

  return (
    <div className="space-y-4">
      <div id="recaptcha-container"></div>
      
      {step === 1 ? (
        <div>
          <input
            type="tel"
            placeholder="Enter phone number (e.g., +919876543210)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={sendOTP}
            className="mt-2 w-full btn-primary"
          >
            Send OTP
          </button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={verifyOTP}
            className="mt-2 w-full btn-primary"
          >
            Verify OTP
          </button>
        </div>
      )}
    </div>
  );
};

export default PhoneOTP;