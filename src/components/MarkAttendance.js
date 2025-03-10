import React, { useState, useEffect } from "react";

const MarkAttendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

  // Fetch subjects assigned to the logged-in teacher
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/api/subjects/teacher`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }

        const data = await response.json();
        setSubjects(data);
        if (data.length > 0) {
          setSelectedSubject(data[0]._id); // Auto-select first subject
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchSubjects();
  }, []);

  // Fetch students based on subject, year, and semester
  useEffect(() => {
    if (selectedSubject && year && semester) {
      const fetchStudents = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/api/students/by-subject/${selectedSubject}?year=${year}&semester=${semester}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!response.ok) {
            throw new Error("Failed to fetch students");
          }

          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };

      fetchStudents();
    }
  }, [selectedSubject, year, semester]);

  // Handle attendance change
  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  // Submit attendance
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/attendance/mark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ subject: selectedSubject, date, records: attendance }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("✅ Attendance marked successfully!");
        setAttendance({});
      } else {
        alert(data.message || "⚠️ Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">📌 Mark Attendance</h2>

      {/* Subject Selection (Auto-selected based on teacher) */}
      <label className="block mb-2">Subject:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
      >
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>

      {/* Year Selection */}
      <label className="block mb-2">Year:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      >
        <option value="">Select Year</option>
        <option value="1">1st Year</option>
        <option value="2">2nd Year</option>
        <option value="3">3rd Year</option>
        <option value="4">4th Year</option>
      </select>

      {/* Semester Selection */}
      <label className="block mb-2">Semester:</label>
      <select
        className="w-full p-2 border rounded mb-4"
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="">Select Semester</option>
        <option value="1">Semester 1</option>
        <option value="2">Semester 2</option>
      </select>

      {/* Date Selection */}
      <label className="block mb-2">Date:</label>
      <input
        type="date"
        className="w-full p-2 border rounded mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* Student List */}
      <h3 className="text-lg font-semibold mt-6">📋 Student List:</h3>
      <div className="mt-4 max-h-60 overflow-auto border rounded-lg p-2">
        {students.length === 0 ? (
          <p className="text-gray-500 text-center">No students found for this subject.</p>
        ) : (
          students.map((student) => (
            <div key={student._id} className="flex items-center justify-between p-2 border-b">
              <span>{student.name}</span>
              <select
                className="p-1 border rounded"
                onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
              >
                <option value="present">✅ Present</option>
                <option value="absent">❌ Absent</option>
              </select>
            </div>
          ))
        )}
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 rounded mt-4 w-full"
      >
        ✅ Submit Attendance
      </button>
    </div>
  );
};

export default MarkAttendance;
