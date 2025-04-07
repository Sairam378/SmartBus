import React, { useState, useContext } from "react";
import axios from "axios";
import "./LoginPage.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import the context

const LoginPage = () => {
  const { setUserEmail } = useContext(UserContext); // Access the context to update the user's email
  const [role, setRole] = useState("applicant"); // Default to applicant
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the backend with role, email, and password
      const response = await axios.post("http://localhost:5000/login", {
        role,
        email,
        password,
      });

      const { message } = response.data;

      setSuccess(message);
      setError("");
      setUserEmail(email); // Save the user's email in context

      // Navigate based on the selected role
      if (role === "applicant") {
        navigate("/applicant-Page");
      } else if (role === "recruiter") {
        navigate("/recruiter-page");
      }
    } catch (err) {
      // Handle errors
      setError(err.response?.data?.error || "Login failed");
      setSuccess("");
    }
  };

  return (
    <>
      <div className="lc-container">
        <div className="lc-card">
          <h2 className="lc-form-title">Login</h2>
          <form className="lc-form" onSubmit={handleLogin}>
            {/* Email Input */}
            <div className="lc-input-container">
              <label htmlFor="email" className="lc-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="lc-input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="lc-input-container">
              <label htmlFor="password" className="lc-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="lc-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Role Selection */}
            <div className="lc-input-container">
              <label className="lc-label">Login as:</label>
              <div className="lc-radio-group">
                <label className="lc-radio-label">
                  <input
                    type="radio"
                    name="role"
                    value="applicant"
                    checked={role === "applicant"}
                    onChange={(e) => setRole(e.target.value)}
                    className="lc-radio"
                  />
                  Commuter/Passenger
                </label>
                <label className="lc-radio-label">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={role === "recruiter"}
                    onChange={(e) => setRole(e.target.value)}
                    className="lc-radio"
                  />
                  Driver
                </label>
              </div>
            </div>

            {error && <p className="lc-error">{error}</p>}
            {success && <p className="lc-success">{success}</p>}

            <button type="submit" className="lc-button">
              Log In
            </button>
          </form>
          <div className="lc-footer">
            <Link to="/profile-selection" className="lc-link">
              Create an Account
            </Link>
            <Link className="lc-go-back-btn" to="/">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;