const express = require('express');
const router = express.Router();

// Debug: Check what's being imported
console.log('🔍 Loading authRoutes...');

// Import controllers with debug
let authController;
try {
  authController = require('../controllers/authController');
  console.log('✅ authController imported successfully');
  console.log('📦 Available functions:', Object.keys(authController));
} catch (error) {
  console.error('❌ Failed to import authController:', error.message);
  process.exit(1);
}

// Destructure with error checking
const { 
  register, 
  verifyOTP, 
  resendOTP, 
  login, 
  getMe, 
  updateProfile, 
  forgotPassword, 
  resetPassword 
} = authController;

// Check each function
console.log('📋 Function check:');
console.log('  - register:', register ? '✅' : '❌');
console.log('  - verifyOTP:', verifyOTP ? '✅' : '❌');
console.log('  - resendOTP:', resendOTP ? '✅' : '❌');
console.log('  - login:', login ? '✅' : '❌');
console.log('  - getMe:', getMe ? '✅' : '❌');
console.log('  - updateProfile:', updateProfile ? '✅' : '❌');
console.log('  - forgotPassword:', forgotPassword ? '✅' : '❌');
console.log('  - resetPassword:', resetPassword ? '✅' : '❌');

// Import middleware
let protect;
try {
  protect = require('../middleware/auth').protect;
  console.log('✅ auth middleware loaded:', protect ? '✅' : '❌');
} catch (error) {
  console.error('❌ Failed to load auth middleware:', error.message);
  process.exit(1);
}

// Define routes with checks
console.log('🛣️  Setting up routes...');

// Public routes
if (register) {
  router.post('/register', register);
  console.log('  ✅ POST /register');
} else {
  console.error('  ❌ POST /register - missing register function');
}

if (verifyOTP) {
  router.post('/verify-otp', verifyOTP);
  console.log('  ✅ POST /verify-otp');
} else {
  console.error('  ❌ POST /verify-otp - missing verifyOTP function');
}

if (resendOTP) {
  router.post('/resend-otp', resendOTP);
  console.log('  ✅ POST /resend-otp');
} else {
  console.error('  ❌ POST /resend-otp - missing resendOTP function');
}

if (login) {
  router.post('/login', login);
  console.log('  ✅ POST /login');
} else {
  console.error('  ❌ POST /login - missing login function');
}

if (forgotPassword) {
  router.post('/forgot-password', forgotPassword);
  console.log('  ✅ POST /forgot-password');
} else {
  console.error('  ❌ POST /forgot-password - missing forgotPassword function');
}

if (resetPassword) {
  router.post('/reset-password', resetPassword);
  console.log('  ✅ POST /reset-password');
} else {
  console.error('  ❌ POST /reset-password - missing resetPassword function');
}

// Protected routes
if (protect) {
  if (getMe) {
    router.get('/me', protect, getMe);
    console.log('  ✅ GET /me (protected)');
  } else {
    console.error('  ❌ GET /me - missing getMe function');
  }

  if (updateProfile) {
    router.put('/profile', protect, updateProfile);
    console.log('  ✅ PUT /profile (protected)');
  } else {
    console.error('  ❌ PUT /profile - missing updateProfile function');
  }
} else {
  console.error('❌ Cannot set protected routes - missing protect middleware');
}

console.log('✅ Route setup complete!');

module.exports = router;