import React, { useState } from "react";

const AddTeacher = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:5000/api/staff/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ name, email, password, role: "teacher" })
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Teacher added successfully!");
                setName("");
                setEmail("");
                setPassword("");
            } else {
                setMessage(data.message || "Error adding teacher");
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Add Teacher</h2>

            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                className="w-full p-2 border rounded mb-2"
                />

                <input 
                type="email" 
                placeholder="Email" 
                value={email} onChange={(e) => setEmail(e.target.value)} 
                className="w-full p-2 border rounded mb-2"
                required 
                />

                <input 
                type="password" 
                placeholder="Password"
                value={password} onChange={(e) => setPassword(e.target.value)} 
                className="w-full p-2 border rounded mb-2"
                required 
                />

                <button 
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded"
                >
                    Add Teacher
                </button>
            </form>
        </div>
        </div>
    );
};

export default AddTeacher;
