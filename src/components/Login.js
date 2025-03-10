import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");  // Clear previous errors

    console.log("📡 Sending login request...");

    // ✅ Determine correct API endpoint based on email
    const loginEndpoint = email.includes("@sreerama.ac.in")
        ? `${process.env.REACT_APP_BACKEND_URL}/api/students/login`
        : `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`;

    try {
        const response = await fetch(loginEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        console.log("🔍 Login Response:", data);

        if (response.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.user.role);

            // ✅ Redirect users to their specific dashboards
            if (data.user.role === "admin") {
                window.location.href = "/admin-dashboard";
            } else if (data.user.role === "teacher") {
                window.location.href = "/teacher-dashboard";
            } else if (data.user.role === "student") {
                window.location.href = "/student-dashboard";
            } else {
                window.location.href = "/dashboard"; // Default fallback
            }
        } else {
            setError("❌ Invalid email or password");
        }
    } catch (error) {
        console.error("🔥 Login Error:", error);
        setError("⚠️ Unable to connect to server");
    }
};



  return (
    <div className="min-h-screen flex flex-col justify-between">
      <nav>
        <div className="text-white p-4 rounded-bl rounded-br flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://images-sretattendance.netlify.app/logo/logo.jpg"
              alt="Logo"
              className="w-20 h-20 rounded-full object-fit"
            />
            &nbsp;&nbsp;
            <h1 className="text-teal-300 text-2xl font-bold">College Attendance Management System</h1>
          </div>
        </div>
      </nav>
      <br></br>
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[30rem]">
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block mb-2">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 relative">
              <label className="block mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
                >
                  {
                    showPassword ? "🙉" : "🙈"
                  }
                </button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="mt-4 flex justify-center">
              <ReCAPTCHA
                sitekey="6Ldlw-0qAAAAALh621vQzBrmUZzWHP7JP4YzprFd"
                onChange={() => setCaptchaVerified(true)}
              />
            </div>

            <br></br>

            <button type="submit" className="w-full px-6 py-2 bg-blue-500 text-white p-2 rounded">
              Login
            </button>
          </form>
        </div>
      </div>
      <footer className="bottom-0 left-0 w-full text-center py-2 rounded-tl rounded-tr text-black mt-8" id="footer">
        <h1>&copy; This Site was developed by M.Prem Sagar</h1>
        <div className="footer-col mt-4 text-teal-500">
          <h4 className="text-lg font-semibold">Follow Us</h4>
          <div className="social-links flex justify-center space-x-4 mt-2">

            <a href="https://www.instagram.com/_prem_sagar_m_/" className="text-black hover:text-red-600" target="_blank">
              <i className="fab fa-instagram fa-lg"></i>
            </a>

            <a href="https://www.facebook.com/profile.php?id=61556089902775" className="text-black hover:text-blue-600" target="_blank">
              <i className="fab fa-facebook fa-lg"></i>
            </a>

            <a href="https://wa.me/7207105206?" className="text-black hover:text-green-600" target="_blank">
              <i className="fab fa-whatsapp fa-lg"></i>
            </a>

            <a href="https://x.com/_premsagar_07" className="text-black hover:text-blue-600" target="_blank">
              <i className="fab fa-twitter fa-lg"></i>
            </a>

            <a href="https://www.youtube.com/@PremSagar-n1u" className="text-black hover:text-red-600" target="_blank">
              <i className="fab fa-youtube fa-lg"></i>
            </a>

          </div>
        </div>
      </footer>
    </div >
  );
};

export default Login;
