import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaLeaf, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../services/api';

const VerifyEmail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || '';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value !== '' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post('/auth/verify-email', {
        email,
        otp: otpString
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('Email verified successfully!');
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(60);
    
    try {
      await api.post('/auth/resend-otp', { email });
      toast.success('New OTP sent to your email');
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error('Failed to resend OTP');
      setResendDisabled(false);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <FaLeaf className="text-primary text-5xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mt-2">
            Verify Your Email
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            We've sent a 6-digit OTP to
          </p>
          <p className="text-primary font-semibold flex items-center justify-center gap-2 mt-1">
            <FaEnvelope /> {email}
          </p>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-xl p-8">
          <div className="flex justify-between gap-2 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl font-bold border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-dark-bg dark:text-white"
                disabled={loading}
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full btn-primary py-3 text-lg mb-4 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>

          <div className="text-center">
            <button
              onClick={handleResend}
              disabled={resendDisabled}
              className="text-primary hover:text-green-700 disabled:opacity-50"
            >
              {resendDisabled ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;