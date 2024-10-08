import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import StudentIdAlreadyExists from "./StudentIdAlreadyExists";

// Define a mapping for field names to user-friendly labels
const fieldLabels: { [key: string]: string } = {
  assignment1: "First Assignment",
  assignment2: "Second Assignment",
  assignment3: "Third Assignment",
  midterm1: "First Midterm",
  midterm2: "Second Midterm",
  final: "Final Exam",
};

type FormData = {
  studentId: string;  // Add this line
  firstName: string;
  lastName: string;
  bornDate: string;
  assignment1: string;
  assignment2: string;
  assignment3: string;
  midterm1: string;
  midterm2: string;
  final: string;
};

const initialFormData: FormData = {
  studentId: "",  // Add this line
  firstName: "",
  lastName: "",
  bornDate: "",
  assignment1: "",
  assignment2: "",
  assignment3: "",
  midterm1: "",
  midterm2: "",
  final: "",
};

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [showAlerts, setShowAlerts] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showIdExistsError, setShowIdExistsError] = useState(false);
  const [studentIdError, setStudentIdError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'studentId') {
      // Allow only digits, uppercase letters, and limit to 10 characters
      const formattedValue = value.replace(/[^0-9A-Z]/g, '').slice(0, 10);
      setFormData((prevState) => ({
        ...prevState,
        [name]: formattedValue,
      }));
      validateStudentId(formattedValue);
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const validateStudentId = (value: string) => {
    const regex = /^(\d{4})([A-Z]{2})(\d{4})$/;
    if (!regex.test(value)) {
      setStudentIdError('Student ID must be in the format: YYYYAB1234');
    } else {
      const year = parseInt(value.slice(0, 4));
      const currentYear = new Date().getFullYear();
      if (year < currentYear-2 || year > currentYear ) {
       setStudentIdError(`Year must be between ${currentYear - 2} and ${currentYear}`);
      } else {
        setStudentIdError('');
      }
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setShowAlerts(false);
    setErrorMessage('');
    setShowIdExistsError(false);
    setStudentIdError('');
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAlerts(true);
    setErrorMessage('');
    setShowIdExistsError(false);

    if (studentIdError) {
      return; // Stop form submission if student ID is invalid
    }

    // Check if any field is empty
    const isAnyFieldEmpty = Object.values(formData).some(value => value === '');

    if (isAnyFieldEmpty) {
      setErrorMessage('Please fill in all fields before submitting.');
      return; // Stop form submission
    }

    const apiUrl = import.meta.env.VITE_API_URL; // For Vite

    try {
      // Send data to your API Gateway using Axios
      const response = await axios.post(apiUrl, formData);

      if (response.status === 200) {
        const responseBody = JSON.parse(response.data.body);
        console.log('Parsed Body:', responseBody);

        // Check if there's an error message in the response
        if (responseBody.message && responseBody.message.includes("has already submitted their scores")) {
          setShowIdExistsError(true);
          return;
        }

        // Extract the GPA value
        const gpa = parseFloat(responseBody.gpa);
        console.log('Extracted GPA:', gpa);

        // Navigate to ResultPage with calculated GPA and full name
        navigate("/result", {
          state: { fullName: `${formData.firstName} ${formData.lastName}`, gpa },
        });
      }
    } catch (error) {
      console.error(`Error submitting form:`, error);
      if (axios.isAxiosError(error) && error.response) {
        const responseBody = error.response.data;
        if (typeof responseBody === 'string') {
          try {
            const parsedBody = JSON.parse(responseBody);
            setErrorMessage(parsedBody.message || 'An error occurred while submitting the form.');
          } catch {
            setErrorMessage(responseBody || 'An error occurred while submitting the form.');
          }
        } else if (responseBody && responseBody.message) {
          setErrorMessage(responseBody.message);
        } else {
          setErrorMessage('An error occurred while submitting the form.');
        }
      } else {
        setErrorMessage('An unexpected error occurred.');
      }
      setShowAlerts(true);
    }
  };

  if (showIdExistsError) {
    return <StudentIdAlreadyExists studentId={formData.studentId} onGoBack={resetForm} />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg bg-white p-8 rounded-lg shadow-md ">
          <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl mb-6">
            Student Information
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Please fill out the form below with the student's information and scores.
          </p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="studentId" className="text-left block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                id="studentId"
                className={`w-full rounded-lg p-3 text-sm border ${
                  studentIdError ? 'border-red-500' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                placeholder="YYYYAA1234"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
              />
                  {showAlerts && !formData.studentId && (
                <span className="text-left block text-red-500 text-xs mt-1"> Your student ID is required</span>
              )}
              {studentIdError && (
                <span className="text-left block text-red-500 text-xs mt-1">{studentIdError}</span>
              )}
            </div>

               <div className="mb-4">
              <label htmlFor="bornDate" className="text-left block text-sm font-medium text-gray-700 mb-1">
                Year of Birth
              </label>
              <input
                type="string"
                id="bornDate"
                className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="bornDate"
                placeholder="YYYY"
                value={formData.bornDate}
                onChange={ handleInputChange }
                min="1900" 
                max="2100" 
                step="1" 
              />
               {showAlerts && !formData.bornDate && (
                <span className="text-left block text-red-500 text-xs mt-1"> Year of birth is required</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="firstName" className="text-left block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                id="firstName"
                className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              {showAlerts && !formData.firstName && (
                <span className="text-left block text-red-500 text-xs mt-1">First name is required</span>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="lastName" className="text-left block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                id="lastName"
                className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              {showAlerts && !formData.lastName && (
                <span className="text-left block text-red-500 text-xs mt-1">Last name is required</span>
              )}
            </div>

         

            {/* Repeat similar input fields for assignments and exams */}
         {Object.keys(fieldLabels).map((field, index) => (
      <div key={index} className="mb-4">
        <label htmlFor={field} className="text-left block text-sm font-medium text-gray-700 mb-1">
          {fieldLabels[field]} {/* Use the mapping for labels */}
        </label>
        <input
          type="number"
          id={field}
          className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Score (0-100)"
          name={field}
          value={formData[field as keyof FormData]}
          onChange={handleInputChange}
          min={0} // Example validation for numeric inputs
          max={ 100 } // Example validation for numeric inputs
          
             />
         {showAlerts && !formData.lastName && (
            <span className="text-left block text-red-500 text-xs mt-1">{`${fieldLabels[field]} score`} is required</span>
          )}
      </div>
        ) )}

          {/* Error Message */}
{errorMessage && (
  <div className="col-span-full mb-4">
    <p className="text-red-500 text-sm text-center">{errorMessage}</p>
  </div>
)}

{/* Submit Button */}
<div className='col-span-full flex justify-center mt-1'>
  <button
    type="submit"
    className="w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Submit Student Information
  </button>
</div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StudentForm;