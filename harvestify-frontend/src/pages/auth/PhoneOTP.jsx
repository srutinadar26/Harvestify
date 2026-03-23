import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from '../../firebase';
import { FaLeaf, FaPhone } from 'react-icons/fa';
import toast from 'react-hot-toast';

const PhoneOTP = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const recaptchaContainerRef = useRef(null);

  // Initialize reCAPTCHA
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {
          console.log('reCAPTCHA solved');
        },
        'expired-callback': () => {
          console.log('reCAPTCHA expired');
          window.recaptchaVerifier = null;
        }
      });
    }
  };

  // Format phone number for India
  const formatPhoneNumber = (number) => {
    // Remove all non-digits
    const cleaned = number.replace(/\D/g, '');
    
    // If it's a 10-digit number, add +91
    if (cleaned.length === 10) {
      return `+91${cleaned}`;
    }
    // If it already has country code, ensure it starts with +
    if (cleaned.length > 10) {
      return `+${cleaned}`;
    }
    return number;
  };

  const handleSendOTP = async () => {
    // Validate phone number
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);

    try {
      // Setup reCAPTCHA
      setupRecaptcha();

      // Format phone number
      const formattedPhone = formatPhoneNumber(phone);
      console.log('Sending OTP to:', formattedPhone);

      // TEST NUMBERS (for development)
      const testNumbers = ['+919876543210', '+919876543211'];
      if (testNumbers.includes(formattedPhone)) {
        // Mock verification for test numbers
        toast.success('Test mode: Use 123456 as OTP');
        setConfirmationResult({
          confirm: async (code) => {
            if (code === '123456') {
              return { user: { phoneNumber: formattedPhone } };
            }
            throw new Error('Invalid OTP');
          }
        });
        setStep(2);
        setLoading(false);
        return;
      }

      // REAL NUMBER FLOW
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhone,
        window.recaptchaVerifier
      );

      setConfirmationResult(confirmation);
      setStep(2);
      toast.success('OTP sent successfully!');
      
    } catch (error) {
      console.error('Error sending OTP:', error);
      
      // Handle specific errors
      if (error.code === 'auth/invalid-phone-number') {
        toast.error('Invalid phone number format. Use 10-digit Indian number');
      } else if (error.code === 'auth/quota-exceeded') {
        toast.error('SMS quota exceeded. Try again tomorrow or use email signup');
      } else if (error.code === 'auth/too-many-requests') {
        toast.error('Too many attempts. Please try again later');
      } else if (error.code === 'auth/network-request-failed') {
        toast.error('Network error. Check your internet connection');
      } else {
        toast.error(`Failed to send OTP: ${error.message}`);
      }
      
      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const result = await confirmationResult.confirm(otp);
      toast.success('Phone verified successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error verifying OTP:', error);
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetPhoneNumber = () => {
    setStep(1);
    setOtp('');
    if (window.recaptchaVerifier) {
      window.recaptchaVerifier.clear();
      window.recaptchaVerifier = null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center py-12 px-4">
      {/* reCAPTCHA container - this must be present */}
      <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
      
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <FaLeaf className="text-primary text-5xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            {step === 1 ? 'Phone Verification' : 'Enter OTP'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {step === 1 
              ? 'Enter your phone number to receive OTP' 
              : `OTP sent to ${formatPhoneNumber(phone)}`}
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
          {step === 1 ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Phone Number
                </label>
                <div className="flex">
                  <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 rounded-l-lg dark:bg-gray-700">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="9876543210"
                    maxLength={10}
                    className="flex-1 p-3 border rounded-r-lg dark:bg-dark-bg dark:text-white"
                    disabled={loading}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Enter 10-digit mobile number
                </p>
                <p className="text-xs text-yellow-600 mt-1">
                  Test with +919876543210 (use 123456)
                </p>
              </div>
              
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  placeholder="123456"
                  className="w-full p-3 border rounded-lg dark:bg-dark-bg dark:text-white text-center text-2xl tracking-widest"
                  disabled={loading}
                />
              </div>
              
              <button
                onClick={handleVerifyOTP}
                disabled={loading}
                className="w-full btn-primary py-3 disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={resetPhoneNumber}
                  className="text-primary hover:underline text-sm"
                  disabled={loading}
                >
                  ← Change number
                </button>
                
                <button
                  onClick={handleSendOTP}
                  disabled={loading}
                  className="text-primary hover:underline text-sm"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneOTP;