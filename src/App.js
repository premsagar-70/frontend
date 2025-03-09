import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddTeacher from "./components/AddTeacher";
import AddStudent from "./components/AddStudent";
import AddDepartment from "./components/AddDepartment";  // ✅ Import
import AddSubject from "./components/AddSubject";        // ✅ Import
import Attendance from "./components/Attendance";
import Reports from "./components/Reports";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/add-department" element={<AddDepartment />} />  {/* ✅ Fixed */}
        <Route path="/add-subject" element={<AddSubject />} />  {/* ✅ Fixed */}
      </Routes>
    </Router>
  );
}

export default App;
