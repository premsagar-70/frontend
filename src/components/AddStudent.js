import React, { useEffect, useState } from "react";

const AddStudent = () => {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [email, setEmail] = useState(""); // Auto-generated email
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState([]); // ✅ Now defined properly
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState("");

  // ✅ Fetch departments on component load
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("❌ Error fetching departments:", err));
  }, []);

  // ✅ Fetch subjects when department, year, or semester changes
  const fetchSubjects = async () => {
    try {
        console.log(`📡 Fetching Subjects: ${process.env.REACT_APP_BACKEND_URL}/api/subjects?department=${selectedDepartment}&year=${year}&semester=${semester}`);

        const token = localStorage.getItem("token"); // ✅ Get token
        if (!token) {
            console.error("🚨 No token found! User is not authenticated.");
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/subjects?department=${selectedDepartment}&year=${year}&semester=${semester}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` // ✅ Send token in request header
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch subjects. Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("📜 Subjects Fetched:", data);
        setSubjects(data);
    } catch (error) {
        console.error("❌ Error fetching subjects:", error);
    }
};

// Call function inside useEffect
useEffect(() => {
    if (selectedDepartment && year && semester) {
        fetchSubjects();
    }
}, [selectedDepartment, year, semester]);


  // Call function inside useEffect
  useEffect(() => {
    if (selectedDepartment && year && semester) {
      fetchSubjects();
    }
  }, [selectedDepartment, year, semester]);


  // Call this function inside `useEffect` when department, year, or semester changes
  useEffect(() => {
    if (selectedDepartment && year && semester) {
      fetchSubjects();
    }
  }, [selectedDepartment, year, semester]);


  // ✅ Auto-generate email based on roll number
  const handleRollNumberChange = (e) => {
    const roll = e.target.value;
    setRollNumber(roll);
    setEmail(`${roll}@sreerama.ac.in`); // Auto-generate email
  };

  // ✅ Handle Subject Selection
  const handleSubjectSelection = (e) => {
    const selectedValues = [...e.target.selectedOptions].map((option) => option.value);
    setSelectedSubjects(selectedValues); // ✅ Ensure selectedSubjects is updated properly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studentData = {
      name,
      rollNumber,
      email,
      password,
      department: selectedDepartment,
      year,
      semester,
      subjects: subjects.map(subj => subj._id),
    };

    console.log("📡 Sending Student Data:", studentData);  // ✅ Log before sending

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/students/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is included
        },
        body: JSON.stringify(studentData),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("🎉 Student added successfully:", data);
        alert("Student added successfully");
      } else {
        console.error("❌ Error adding student:", data.message);
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("🔥 Server error:", error);
    }
  };


  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">➕ Add Student</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Student Name"
          className="w-full p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Roll Number"
          className="w-full p-2 border rounded"
          value={rollNumber}
          onChange={handleRollNumberChange}
          required
        />

        <input
          type="email"
          placeholder="Email (Auto-generated)"
          className="w-full p-2 border rounded bg-gray-100"
          value={email}
          readOnly
        />

        <input
          type="password"
          placeholder="Create Password"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full p-2 border rounded"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {departments.map((dept) => (
            <option key={dept._id} value={dept._id}>
              {dept.name}
            </option>
          ))}
        </select>

        <select
          className="w-full p-2 border rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        >
          <option value="">Select Year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          <option value="3">3rd Year</option>
          <option value="4">4th Year</option>
        </select>

        <select
          className="w-full p-2 border rounded"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          required
        >
          <option value="">Select Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>

        <label className="block font-semibold">Assign Subjects</label>
        <select
          multiple
          className="w-full p-2 border rounded"
          value={selectedSubjects}
          onChange={handleSubjectSelection} // ✅ This is now correctly handled
        >
          {subjects.map(subject => (
            <option key={subject._id} value={subject._id}>
              {subject.name}
            </option>
          ))}
        </select>

        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          ➕ Add Student
        </button>
      </form>
    </div>
  );
};

export default AddStudent;
