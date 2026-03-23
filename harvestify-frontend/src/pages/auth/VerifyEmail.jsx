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
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <FaLeaf className="text-primary text-5xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">
            Verify Your Email
          </h2>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <FaEnvelope className="text-6xl text-primary mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              We've sent a verification email to:
            </p>
            <p className="font-semibold text-lg text-primary">
              {currentUser?.email}
            </p>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-6">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ Please check your spam folder if you don't see the email in your inbox.
            </p>
          </div>

          {message && (
            <div className={`p-3 rounded-lg mb-4 ${
              message.includes('✅') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message}
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resendDisabled}
            className="w-full btn-primary py-3 mb-4 disabled:opacity-50"
          >
            {resendDisabled ? `Resend in ${countdown}s` : 'Resend Verification Email'}
          </button>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Already verified?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;