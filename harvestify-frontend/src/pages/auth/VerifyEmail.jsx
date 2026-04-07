import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/FirebaseAuthContext';
import { FaLeaf, FaEnvelope, FaCheckCircle } from 'react-icons/fa';

const VerifyEmail = () => {
  const { currentUser, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check if email is already verified
    if (currentUser?.emailVerified) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleResend = async () => {
    try {
      await resendVerificationEmail();
      setMessage('✅ Verification email sent! Check your inbox.');
      setResendDisabled(true);
      
      // Start countdown
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      setMessage('❌ Error sending email. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center py-8 sm:py-12 px-3 sm:px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex justify-center mb-3 sm:mb-4">
            <FaLeaf className="text-primary text-4xl sm:text-5xl" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Verify Your Email
          </h2>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg sm:rounded-2xl shadow-lg sm:shadow-xl p-5 sm:p-8">
          <div className="text-center mb-5 sm:mb-6">
            <FaEnvelope className="text-5xl sm:text-6xl text-primary mx-auto mb-2 sm:mb-4" />
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-2">
              We've sent a verification email to:
            </p>
            <p className="font-semibold text-sm sm:text-base text-primary break-all">
              {currentUser?.email}
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 border border-yellow-200 dark:border-yellow-800">
            <p className="text-xs sm:text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Please check your spam folder if you don't see the email in your inbox.
            </p>
          </div>

          {message && (
            <div className={`p-3 rounded-lg mb-4 text-xs sm:text-sm ${
              message.includes('✅') 
                ? 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300' 
                : 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
            }`}>
              {message}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className="w-full btn-primary py-2.5 sm:py-3 text-sm sm:text-base font-medium mb-3 sm:mb-4 disabled:opacity-50 touch-manipulation active:scale-95"
          >
            {resendDisabled ? `Resend in ${countdown}s` : 'Resend Verification Email'}
          </button>

          <p className="text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Already verified?{' '}
            <Link to="/login" className="text-primary hover:text-green-700 font-medium touch-manipulation">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;