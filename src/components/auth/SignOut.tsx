import React from 'react';
import { signOut } from 'aws-amplify/auth';

interface SignOutProps {
  onSignOut: () => void;
}

const SignOut: React.FC<SignOutProps> = ({ onSignOut }) => {
  const handleSignOut = async () => {
    try {
      await signOut();
      onSignOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
    >
      Sign Out
    </button>
  );
};

export default SignOut;