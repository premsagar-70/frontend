import React, { useState, useEffect } from "react";

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subjects`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  const fetchReports = async () => {
    if (!selectedSubject) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/attendance/reports/${selectedSubject}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Attendance Reports</h2>

      <select className="w-full p-2 border rounded mt-2" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>

      <button onClick={fetchReports} className="bg-green-500 text-white p-2 rounded mt-4">
        📊 View Report
      </button>

      <div className="mt-4">
        {reports.map((report, index) => (
          <div key={index} className="p-2 border-b">
            <p>
              <strong>{report.studentName}:</strong> {report.attendancePercentage}% Attendance
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
