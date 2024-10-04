// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import SignOut from './components/SignOut';
import ForgotPassword from './components/ForgotPassword';
import StudentForm from './components/StudentForm';
import ResultPage from './components/ResultPage';
import UnauthorizedAccess from './components/UnauthorizedAccess';
import './App.css';

// Retrieve environment variables using import.meta.env
const userPoolClientId = import.meta.env.VITE_USER_POOL_CLIENT_ID;
const userPoolId = import.meta.env.VITE_USER_POOL_ID;

// Check if required environment variables are set
if (!userPoolClientId || !userPoolId) {
  throw new Error('Environment variables for AWS Cognito are not set.');
}

// Configure Amplify
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolClientId,
      userPoolId,
    },
  },
});


const App: React.FC = () => {
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'signIn' | 'signUp' | 'forgotPassword'>('signIn');

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignUp = () => {
    setAuthMode('signIn');
    // You might want to show a success message here before redirecting to sign in
  };
  const handleSignOut = () => setIsAuthenticated(false);
  const handleForgotPasswordSuccess = () => {
    setAuthMode('signIn');
    // You might want to show a success message here
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">
            {authMode === 'signIn' ? 'Sign In' : authMode === 'signUp' ? 'Sign Up' : 'Forgot Password'}
          </h2>
          {authMode === 'signIn' && (
            <>
              <SignIn onSignIn={handleSignIn} />
              <button
                onClick={() => setAuthMode('forgotPassword')}
                className="mt-2 text-sm text-blue-500 hover:underline mb-3 p-4"
              >
                Forgot Password?
              </button>
            </>
          )}
          {authMode === 'signUp' && <SignUp onSignUp={handleSignUp} />}
          {authMode === 'forgotPassword' && (
            <ForgotPassword
              onCancel={() => setAuthMode('signIn')}
              onSuccess={handleForgotPasswordSuccess}
            />
          )}
          <button
            onClick={() => setAuthMode(authMode === 'signIn' ? 'signUp' : 'signIn')}
            className="mt-4 text-blue-500 hover:underline"
          >
            {authMode === 'signIn' ? 'Need an account? Sign Up' : 'Already have an account? Sign In'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8 relative">
          <div className="absolute top-4 right-4">
            <SignOut onSignOut={handleSignOut} />
          </div>
          <main className="flex flex-col items-center justify-center">
            <Routes>
              <Route path="/" element={<StudentForm />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/unauthorized" element={<UnauthorizedAccess />} />
              <Route path="*" element={<Navigate to="/unauthorized" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;