import React, { useState, useEffect } from "react";

const AddTeacher = () => {
  const [name, setName] = useState("");
  const [empNumber, setEmpNumber] = useState("");
  const [password, setPassword] = useState("");
  const [department, setDepartment] = useState("");
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error fetching departments:", err));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const email = `${empNumber}@sreerama.com`;

    const teacherData = { name, empNumber, email, password, department };
    const token = localStorage.getItem("token"); // ✅ Get token

    if (!token) {
      alert("Unauthorized! Please log in again.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/staff/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`  // ✅ Include the token
        },
        body: JSON.stringify(teacherData),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Teacher added successfully!");
        setName("");
        setEmpNumber("");
        setPassword("");
        setDepartment("");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding teacher:", error);
    }
  };


  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>
      <form onSubmit={onSubmit}>
        <label className="block mb-2">Full Name</label>
        <input type="text" className="w-full p-2 border rounded mb-4" value={name} onChange={(e) => setName(e.target.value)} required />

        <label className="block mb-2">Employee Number</label>
        <input type="text" className="w-full p-2 border rounded mb-4" value={empNumber} onChange={(e) => setEmpNumber(e.target.value)} required />

        <label className="block mb-2">Create Password</label>
        <input type="password" className="w-full p-2 border rounded mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label className="block mb-2">Department</label>
        <select className="w-full p-2 border rounded mb-4" value={department} onChange={(e) => setDepartment(e.target.value)} required>
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Add Teacher</button>
      </form>
    </div>
  );
};

export default AddTeacher;
