import React, { useState, useEffect } from "react";

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [subjectAttendanceDetails, setSubjectAttendanceDetails] = useState([]);
  const [overallAttendancePercentage, setOverallAttendancePercentage] = useState(0);
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  const [totalDaysPresent, setTotalDaysPresent] = useState(0);

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/students/me`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch student data");

      const data = await response.json();
      setStudent(data);
    } catch (error) {
      console.error("❌ Error fetching student:", error);
    }
  };

  const fetchAttendance = async () => {
    if (!year || !semester) {
      alert("Please select Year and Semester");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/attendance/student?year=${year}&semester=${semester}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error("Failed to fetch attendance data");

      const data = await response.json();
      setSubjectAttendanceDetails(data.subjects);
      setOverallAttendancePercentage(data.overallAttendancePercentage);
      setTotalWorkingDays(data.totalWorkingDays);
      setTotalDaysPresent(data.totalDaysPresent);
    } catch (error) {
      console.error("❌ Error fetching attendance:", error);
    }
  };

  return (
    <div className="container bg-gray-200 min-h-screen">
      {/* ✅ Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="flex justify-between items-center p-6">
          <div className="flex items-center">
            <img src="https://images-sretattendance.netlify.app/logo/logo.jpg" alt="Logo" className="w-20 h-20 rounded-full" />
            <h1 className="text-teal-300 text-2xl font-bold ml-4">College Attendance Management System</h1>
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="bg-gray-200 p-3 rounded-full focus:outline-none">
              👤
            </button>
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border shadow-lg rounded-lg z-10">
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{student?.name.toUpperCase()}</h3>
                  <p className="text-gray-600">{student?.email.toUpperCase()}</p>
                </div>
                <hr />
                <button onClick={() => setActiveTab("dashboard")} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Dashboard
                </button>
                <button onClick={() => setActiveTab("attendance")} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Attendance
                </button>
                <button onClick={() => localStorage.clear() || (window.location.href = "/")} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ Year & Semester Selection */}
      <div className="p-6">
        <h2 className="text-2xl font-bold">Select Year & Semester</h2>
        <div className="flex gap-4 mt-4">
          <select className="p-2 border rounded" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
          <select className="p-2 border rounded" value={semester} onChange={(e) => setSemester(e.target.value)}>
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </select>
          <button onClick={fetchAttendance} className="bg-blue-500 text-white p-2 rounded">
            Fetch Attendance
          </button>
        </div>
      </div>

      {/* ✅ Dashboard Content */}
      {activeTab === "dashboard" && (
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold">Welcome, <span className="uppercase">{student?.name}</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Academic Performance */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Academic Performance</h3>
              <div className="space-y-4">
                {subjectAttendanceDetails.map(subject => (
                  <div key={subject.subject} className="flex items-center">
                    <span className="w-1/3 mr-2 truncate">{subject.subject}</span>
                    <div className="flex-grow mr-2">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${subject.percentage >= 75 ? 'bg-green-600' : 'bg-red-600'}`} style={{ width: `${subject.percentage}%` }}></div>
                      </div>
                    </div>
                    <span className="w-12 text-right">{subject.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Overall Performance */}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Overall Performance</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-1/3 mr-2">Total Attendance</span>
                  <div className="flex-grow mr-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className={`h-2.5 rounded-full ${overallAttendancePercentage >= 75 ? 'bg-green-600' : 'bg-red-600'}`} style={{ width: `${overallAttendancePercentage}%` }}></div>
                    </div>
                  </div>
                  <span className="w-12 text-right">{overallAttendancePercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
