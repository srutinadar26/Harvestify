import React, { useState } from 'react';
import { useAuth } from '../context/FirebaseAuthContext';

const TestFirebase = () => {
  const { currentUser, signup, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    setMessage('Trying to sign up...');
    const result = await signup(email, password, name);
    if (result.success) {
      setMessage('✅ Success! Check your email for verification.');
    } else {
      setMessage('❌ Error: ' + result.error);
    }
  };

  const handleLogin = async () => {
    setMessage('Trying to login...');
    const result = await login(email, password);
    if (result.success) {
      setMessage('✅ Logged in successfully!');
    } else {
      setMessage('❌ Error: ' + result.error);
    }
  };

  const handleLogout = async () => {
    await logout();
    setMessage('Logged out');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-dark-card rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Firebase Auth Test</h2>
        
        {currentUser ? (
          <div className="space-y-4">
            <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
              <p className="font-medium">Logged in as:</p>
              <p>{currentUser.email}</p>
              <p className="text-sm mt-2">
                Verified: {currentUser.emailVerified ? '✅ Yes' : '❌ No'}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded dark:bg-dark-bg dark:text-white"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded dark:bg-dark-bg dark:text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded dark:bg-dark-bg dark:text-white"
            />
            <div className="flex gap-4">
              <button
                onClick={handleSignup}
                className="flex-1 bg-primary text-white py-2 rounded-lg hover:bg-green-700"
              >
                Test Signup
              </button>
              <button
                onClick={handleLogin}
                className="flex-1 bg-accent text-gray-800 py-2 rounded-lg hover:bg-yellow-500"
              >
                Test Login
              </button>
            </div>
          </div>
        )}
        
        {message && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestFirebase;