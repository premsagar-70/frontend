import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            console.log("📡 Sending login request...");
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log("🔍 Response from server:", data);

            if (!response.ok) {
                setError(data.message || "Login failed");
                return;
            }

            console.log("✅ Login successful! Storing token...");
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);
            navigate("/dashboard"); // Redirect to dashboard
        } catch (error) {
            console.error("🔥 Login Error:", error);
            setError("An error occurred during login");
        }
    };

    return (
      <div className="flex items-center justify-center h-screen bg-gray-200">
        <div className="bg-white p-6 rounded shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded mb-2"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
    );
};

export default Login;
