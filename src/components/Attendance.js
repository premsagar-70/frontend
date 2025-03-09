import React, { useState, useEffect } from "react";

const Attendance = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subjects/teacher`, {
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

  useEffect(() => {
    if (selectedSubject) {
      const fetchStudents = async () => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/students/by-subject/${selectedSubject}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          const data = await response.json();
          setStudents(data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };

      fetchStudents();
    }
  }, [selectedSubject]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/attendance/mark`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject: selectedSubject, records: attendance }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Attendance marked successfully!");
      } else {
        alert(data.message || "Failed to mark attendance");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Mark Attendance</h2>
      <select className="w-full p-2 border rounded" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)} required>
        <option value="">Select Subject</option>
        {subjects.map((subject) => (
          <option key={subject._id} value={subject._id}>
            {subject.name}
          </option>
        ))}
      </select>

      <div className="mt-4">
        {students.map((student) => (
          <div key={student._id} className="flex items-center justify-between p-2 border-b">
            <span>{student.name}</span>
            <select className="p-1 border rounded" onChange={(e) => handleAttendanceChange(student._id, e.target.value)}>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </div>
        ))}
      </div>

      <button onClick={handleSubmit} className="bg-blue-500 text-white p-2 rounded mt-4">
        ✅ Submit Attendance
      </button>
    </div>
  );
};

export default Attendance;
