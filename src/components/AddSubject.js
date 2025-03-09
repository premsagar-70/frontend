import React, { useEffect, useState } from "react";

const AddSubject = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [teacher, setTeacher] = useState("");
  const [departments, setDepartments] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/staff/all`)
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((err) => console.error("Error fetching teachers:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const token = localStorage.getItem("token");  // ✅ Get token
    if (!token) {
      setError("Unauthorized: Please log in again.");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // ✅ Include token in headers
        },
        body: JSON.stringify({
          name,
          department,
          year,
          semester,
          teacher
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Subject added successfully");
        setName("");
        setDepartment("");
        setYear("");
        setSemester("");
        setTeacher("");
      } else {
        setError(data.message || "Failed to add subject");
      }
    } catch (error) {
      setError("Server error");
      console.error("Error adding subject:", error);
    }
  };
  

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Subject</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2">Subject Name</label>
          <input
            type="text"
            placeholder="Enter Subject Name"
            className="w-full p-2 border border-gray-300 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Department</label>
          <select className="w-full p-2 border border-gray-300 rounded" value={department} onChange={(e) => setDepartment(e.target.value)} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Year</label>
          <select className="w-full p-2 border border-gray-300 rounded" value={year} onChange={(e) => setYear(e.target.value)} required>
            <option value="">Select Year</option>
            <option value="1">1st Year</option>
            <option value="2">2nd Year</option>
            <option value="3">3rd Year</option>
            <option value="4">4th Year</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Semester</label>
          <select className="w-full p-2 border border-gray-300 rounded" value={semester} onChange={(e) => setSemester(e.target.value)} required>
            <option value="">Select Semester</option>
            <option value="1">Semester 1</option>
            <option value="2">Semester 2</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Assign Teacher</label>
          <select className="w-full p-2 border border-gray-300 rounded" value={teacher} onChange={(e) => setTeacher(e.target.value)} required>
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Assign Subject</button>
      </form>
    </div>
  );
};

export default AddSubject;
