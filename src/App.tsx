import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import SignOut from './components/auth/SignOut';
import ForgotPassword from './components/auth/ForgotPassword';
import StudentForm from './components/StudentForm';
import ResultPage from './components/ResultPage';
import UnauthorizedAccess from './components/UnauthorizedAccess';
//import './App.css';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSignIn = () => setIsAuthenticated(true);
  const handleSignUp = () => {
    setAuthMode('signIn');
    // You might want to show a success message here before redirecting to sign in
  };
  const handleSignOut = () => {
    setIsAuthenticated(false);
    setIsSidebarOpen(false);
  };
  const handleForgotPasswordSuccess = () => {
    setAuthMode('signIn');
    // You might want to show a success message here
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-[480px]">
          <div className="mb-8">
            <div className="flex bg-gray-200 p-1 rounded-lg">
              <button
                onClick={() => setAuthMode('signIn')}
                className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  authMode === 'signIn'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setAuthMode('signUp')}
                className={`w-1/2 py-2 text-sm font-medium rounded-md transition-all duration-300 ${
                  authMode === 'signUp'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>

          {authMode !== 'forgotPassword' && (
            <h2 className="text-2xl font-bold text-center mb-6">
              {authMode === 'signIn' ? 'Sign In' : 'Create Account'}
            </h2>
          )}

          <div className="relative">
            <div className={`transition-all duration-300 ${
              authMode === 'signIn' ? 'opacity-100 visible' : 'opacity-0 invisible absolute top-0 left-0 w-full'
            }`}>
              <SignIn onSignIn={handleSignIn} />
              <button
                onClick={() => setAuthMode('forgotPassword')}
                className="mt-4 text-sm  text-blue-500 hover:underline w-full flex items-center justify-center h-10"
              >
                Forgot Password?
              </button>
            </div>
            <div className={`transition-all duration-300 ${
              authMode === 'signUp' ? 'opacity-100 visible' : 'opacity-0 invisible absolute top-0 left-0 w-full'
            }`}>
              <SignUp onSignUp={handleSignUp} />
            </div>
          </div>

          {authMode === 'forgotPassword' && (
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-4">Forgot Password</h3>
              <ForgotPassword
                onCancel={() => setAuthMode('signIn')}
                onSuccess={handleForgotPasswordSuccess}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen relative">
        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <main className="flex flex-col items-center justify-center">
            <Routes>
              <Route path="/form" element={<StudentForm />} />
              <Route path="/result" element={<ResultPage />} />
              <Route path="/unauthorized" element={<UnauthorizedAccess />} />
              <Route path="*" element={<Navigate to="/unauthorized" replace />} />
            </Routes>
          </main>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 right-0 w-64 bg-gray-800 text-white transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <button onClick={toggleSidebar} className="absolute top-4 left-4 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="flex flex-col items-center justify-center h-full">
            <SignOut onSignOut={handleSignOut} />
          </div>
        </div>

        {/* Toggle button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </Router>
  );
};

export default App;