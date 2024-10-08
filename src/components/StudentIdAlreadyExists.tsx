import React from 'react';

interface StudentIdAlreadyExistsProps {
  studentId: string;
  onGoBack: () => void;
}

const StudentIdAlreadyExists: React.FC<StudentIdAlreadyExistsProps> = ({ studentId, onGoBack }) => (
  <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gray-100 p-8 rounded-lg shadow-md mx-auto my-20 max-w-md">
    <h1 className="text-3xl font-bold text-blue-600 mb-4 py-7">Contact student services</h1>
    <p className="text-xl text-black-700 mb-12">
  Student with ID <span className="font-mono bg-red-100 px-1 py-0.5 rounded select-none">{studentId}</span> has already submitted their scores. Please contact student services for more information.
</p>
    <button 
      onClick={onGoBack}
      className="bg-blue-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
    >
      Go Back to Form
    </button>
  </div>
);

export default StudentIdAlreadyExists;