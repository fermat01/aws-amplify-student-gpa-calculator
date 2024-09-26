// src/components/UnauthorizedAccess.tsx
import React from 'react';

const UnauthorizedAccess: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
    <h1 className="text-3xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
    <p className="text-xl text-gray-700">You don't have the right to do that.</p>
  </div>
);

export default UnauthorizedAccess;