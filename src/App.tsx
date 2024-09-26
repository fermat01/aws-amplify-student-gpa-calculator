import './App.css';
import StudentForm from './components/StudentForm';
import ResultPage from "./components/ResultPage";
import UnauthorizedAccess from './components/UnauthorizedAccess';
import { BrowserRouter as Router, Route, Routes,Navigate  } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<StudentForm />} />
          <Route path="/result" element={ <ResultPage /> } />
           <Route path="/unauthorized" element={<UnauthorizedAccess />} />
        <Route path="*" element={<Navigate to="/unauthorized" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;