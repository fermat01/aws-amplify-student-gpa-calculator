import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import PasswordInput from './PasswordInput';

interface SignInProps {
  onSignIn: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error messages

    try {
      await signIn({ username: email, password });
      onSignIn();
    } catch (error) {
      console.error('Error signing in:', error);

      // Check if the error is an instance of Error
      if (error instanceof Error) {
        setErrorMessage(error.message); // Display the error message from the caught error
      } else {
        setErrorMessage('An unknown error occurred. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      {errorMessage && (
        <div className="text-red-500">{errorMessage}</div> // Display error message
      )}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full px-3 py-2 border rounded"
        required
      />
      <PasswordInput
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        id="password"
      />
      <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Sign In
      </button>
    </form>
  );
};

export default SignIn;