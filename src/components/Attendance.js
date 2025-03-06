import React, { useState } from "react";

function Attendance() {
  const [students, setStudents] = useState([
    { id: 1, name: "Student 1", present: false },
    { id: 2, name: "Student 2", present: false },
    { id: 3, name: "Student 3", present: false },
  ]);

  const toggleAttendance = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mark Attendance</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="flex justify-between p-2 border-b">
            <span>{student.name}</span>
            <button
              onClick={() => toggleAttendance(student.id)}
              className={`px-3 py-1 rounded ${student.present ? "bg-green-500" : "bg-red-500"} text-white`}
            >
              {student.present ? "Present" : "Absent"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Attendance;
