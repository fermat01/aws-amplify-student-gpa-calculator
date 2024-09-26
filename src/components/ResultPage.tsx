import React from "react";
import { useLocation, Link } from "react-router-dom";

interface LocationState {
  fullName: string;
  gpa: number;
}

const ResultPage: React.FC = () => {
  // Use useLocation to get the current location
  const location = useLocation();
    console.log(location)  // help debug the code 
   const { fullName = "", gpa = 0 } = (location.state as LocationState) || {};
  const getLetterGrade = (gpa: number): string => {
    if (gpa >= 3.9) return "A+";
    if (gpa >= 3.7) return "A";
    if (gpa >= 3.5) return "A-";
    if (gpa >= 3.3) return "B+";
    if (gpa >= 3.0) return "B";
    if (gpa >= 2.7) return "B-";
    if (gpa >= 2.3) return "C+";
    if (gpa >= 2.0) return "C";
    if (gpa >= 1.7) return "C-";
    if (gpa >= 1.3) return "D+";
    if (gpa >= 1.0) return "D";
    return "F";
  };

  const getCongratulationMessage = (gpa: number): string => {
    const letterGrade = getLetterGrade(gpa);
    switch (letterGrade) {
      
case "A+":
        return "Excellent! Your performance is outstanding. Keep up the fantastic work!";
      case "A":
        return "Great job! You've demonstrated excellent understanding and skills.";
      case "A-":
        return "Very good! You're performing at a high level. Keep pushing yourself!";
      case "B+":
        return "Good work! You're showing strong performance. There's room to reach even higher!";
      case "B":
        return "Well done! You're performing above average. Keep striving for excellence!";
      case "B-":
        return "Good effort! You're on the right track. Try to push a bit harder for even better results.";
      case "C+":
        return "You're doing okay. With some extra effort, you can improve your performance significantly.";
      case "C":
        return "You've met the basic requirements. Consider seeking additional support to enhance your understanding.";
      case "C-":
        return "You're just meeting the minimum standards. It's important to put in more effort to improve your grades.";
      case "D+":
        return "You're close to passing, but need to work harder. Don't hesitate to ask for help to improve your performance.";
      case "D":
        return "You've barely passed. It's crucial to seek additional support and put in more effort to improve.";
      case "F":
        return "Unfortunately, you didn't pass this time. Don't be discouraged - with hard work and support, you can improve. Reach out to your instructors for guidance.";
      default:
        return "Your results have been recorded. Keep working on your studies!";
    }
  };

  if (!fullName || gpa === undefined) {
    console.log(fullName,gpa); // help debug the code 
    return <div>No result found for this student.</div>;
  }

  // Render the result page
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Academic Year Result</h2>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Student Name:</span> {fullName}
          </p>
          <p className="text-gray-600 mb-4">
            <span className="font-semibold">GPA:</span> {gpa.toFixed(2)} ({getLetterGrade(gpa)})
          </p>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Congratulations on completing a year! 🎉🎉
          </h3>
          <p className="text-green-600 mb-6 font-italic">{getCongratulationMessage(gpa)}</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Form
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;