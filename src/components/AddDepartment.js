import React, { useState } from "react";

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/departments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: departmentName }),
      });

      if (response.ok) {
        alert("Department added successfully!");
        setDepartmentName("");
      } else {
        alert("Failed to add department");
      }
    } catch (error) {
      console.error("Error adding department:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Create Department</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Department Name"
          className="border p-2 rounded w-full mb-4"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Create</button>
      </form>
    </div>
  );
};

export default AddDepartment;
