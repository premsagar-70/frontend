import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddTeacher from "./components/AddTeacher"; // ✅ Import the component
import AddStudent from "./components/AddStudent";
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
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-teacher" element={<AddTeacher />} />
        <Route path="/add-student" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
