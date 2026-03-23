import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/FirebaseAuthContext';

const ProtectedRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // If logged in but email not verified, redirect to verify email
  if (!currentUser.emailVerified && currentUser.providerData[0]?.providerId === 'password') {
    return <Navigate to="/verify-email" replace />;
  }

  // If logged in and verified, show the protected content
  return children;
};

export default ProtectedRoute;