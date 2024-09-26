import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

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
  studentId: string;
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

const StudentForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    studentId: "",
    firstName: "",
    lastName: "",
    bornDate: "",
    assignment1: "",
    assignment2: "",
    assignment3: "",
    midterm1: "",
    midterm2: "",
    final: "",
  });
  

  const [ showAlerts, setShowAlerts ] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowAlerts(true);

    try {
      // Send data to your API Gateway using Axios
      const response = await axios.post("https://wgtwz7uew2.execute-api.us-east-1.amazonaws.com/Dev", formData);

      if (response.status === 200) {
        // Assuming your Lambda function returns the calculated GPA in response.data.gpa
        const gpa = response.data.gpa;
       

        // Navigate to ResultPage with calculated GPA and full name
        navigate("/result", {
          state: { fullName: `${formData.firstName} ${formData.lastName}`, gpa },
     
          
        });
      }
    } catch (error) {
      console.error(`Error submitting form: ${error}`);
      // Optionally handle error state here
      setShowAlerts(true);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-center text-2xl font-bold text-blue-600 sm:text-3xl mb-6">
            Student Information
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Please fill out the form below with the student's information and grades.
          </p>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="mb-4">
              <label htmlFor="studentId" className="text-left block text-sm font-medium text-gray-700 mb-1">
                Student ID
              </label>
              <input
                id="studentId"
                className="w-full rounded-lg p-3 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Student ID"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
              />
              {showAlerts && !formData.studentId && (
                <span className="text-left block text-red-500 text-xs mt-1">Student id is required</span>
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
               {showAlerts && !formData.studentId && (
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
          max={100} // Example validation for numeric inputs
             />
         {showAlerts && !formData.lastName && (
            <span className="text-left block text-red-500 text-xs mt-1">{`${fieldLabels[field]} score`} is required</span>
          )}
      </div>
        ) )}

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