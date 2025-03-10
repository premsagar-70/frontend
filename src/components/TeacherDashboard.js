import React from "react";

const TeacherDashboard = () => {
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
        <h1 className="text-3xl font-bold mb-4">Teacher Dashboard</h1>
        <button onClick={() => window.location.href = "/mark-attendance"} className="ml-4 mt-6 bg-blue-500 text-white p-4 rounded text-center">
          ✅ Mark Attendance
        </button>
        <button onClick={() => window.location.href = "/view-reports"} className="ml-4 mt-6 bg-gray-700  text-white p-4 rounded text-center">
          📊 View Reports
        </button>
      </div>
    </div>
  );
};

export default TeacherDashboard;
