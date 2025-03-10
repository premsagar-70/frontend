import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/";
  };

  return (
    <div className="container bg-gray-200">
      <nav>
        <div className="text-white p-8 rounded-lg flex justify-between items-center bg-white">
          <div className="flex items-center">
            <img
              src="https://images-sretattendance.netlify.app/logo/logo.jpg"
              alt="Logo"
              className="w-20 h-20 rounded-full object-fit"
            />
            &nbsp;&nbsp;
            <h1 className="text-teal-300 text-2xl font-bold">
              College Attendance Management System
            </h1>
          </div>
          <button className="bg-teal-100 text-red-600 p-2 rounded" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </nav>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/add-department" className="bg-blue-500 text-white p-4 rounded text-center">
            ➕ Create Department
          </Link>
          <Link to="/add-subject" className="bg-green-500 text-white p-4 rounded text-center">
            📚 Assign Subjects to Years
          </Link>
          <Link to="/add-student" className="bg-yellow-500 text-white p-4 rounded text-center">
            🎓 Add Student
          </Link>
          <Link to="/add-teacher" className="bg-purple-500 text-white p-4 rounded text-center">
            👨‍🏫 Assign Teacher to Subjects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
