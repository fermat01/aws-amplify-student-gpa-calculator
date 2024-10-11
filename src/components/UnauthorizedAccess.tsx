// src/components/UnauthorizedAccess.tsx
import React from 'react';

const UnauthorizedAccess: React.FC = () => (
<div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 p-8 rounded-lg shadow-md mx-auto my-20 max-w-md">
  <h1 className="text-3xl font-bold text-red-600 mb-4 py-8">Unauthorized Access</h1>
  <p className="text-xl text-gray-700 mb-12 py-6">You don't have the right to do that.</p>
  <button 
    onClick={() => window.location.href = '/form'}
    className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
  >
    Go Back to Form
  </button>
</div>
);

export default UnauthorizedAccess;

