import React, { useEffect, useState } from "react";

const StudentDashboard = () => {
  const [student, setStudent] = useState({});
  const [attendance, setAttendance] = useState([]);
  
  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/students/me`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await response.json();
      setStudent(data);
    };

    const fetchAttendanceData = async () => {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/attendance/student`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      });

      const data = await response.json();
      setAttendance(data);
    };

    fetchStudentData();
    fetchAttendanceData();
  }, []);

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
        <h1 className="text-3xl font-bold mb-4">📚 Student Dashboard</h1>
        <h2 className="text-xl font-bold">Welcome, {student.name}</h2>
        <p className="text-gray-600">📧 {student.email}</p>

        <h3 className="text-xl font-bold mt-6">📅 Attendance Summary</h3>
        {attendance.length > 0 ? (
          <ul className="list-disc ml-5">
            {attendance.map((record, index) => (
              <li key={index} className="text-gray-700">
                {record.date} - {record.status}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No attendance records found.</p>
        )}

        <h3 className="text-xl font-bold mt-6">📊 View Attendance Reports</h3>
        <button className="mt-4 bg-blue-500 text-white p-3 rounded" onClick={() => window.location.href = "/view-reports"}>
          📊 View Reports
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
 