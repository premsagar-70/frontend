import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddTeacher from "./components/AddTeacher";
import AddStudent from "./components/AddStudent";
import AddDepartment from "./components/AddDepartment";  
import AddSubject from "./components/AddSubject";       
import Attendance from "./components/Attendance";
import Reports from "./components/Reports";
import StudentDashboard from "./components/StudentDashboard";
import TeacherDashboard from "./components/TeacherDashboard";
import AdminDashboard from "./components/AdminDashboard";
import MarkAttendance from "./components/MarkAttendance"; 

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
        <Route path="/add-department" element={<AddDepartment />} />
        <Route path="/add-subject" element={<AddSubject />} />  
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />

      </Routes>
    </Router>
  );
}

export default App;
