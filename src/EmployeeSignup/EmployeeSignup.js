import React, { useState } from "react";
import "./EmployeeSignup.css"; // Assuming the CSS is stored in RecruiterSignupForm.css
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EmployeeSignup() {
  const [formData, setFormData] = useState({
    recruiterName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    companyName: "",
    position: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:5000/submit-recruiter-form", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);

      // Navigate to RecruiterPage on success
      navigate("/recruiter-page");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <>
      <div className="recruiter-details-form-wrapper">
        <div className="recruiter-details-form-main">
          <div className="recruiter-details-form-header">
            <h2>Driver Signup Form</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Recruiter Name */}
            <div className="recruiter-details-form-input-group">
              <label htmlFor="recruiterName" className="recruiter-details-form-label">
                Driver Name
              </label>
              <input
                type="text"
                name="recruiterName"
                id="recruiterName"
                placeholder="Enter recruiter name"
                className="recruiter-details-form-input"
                value={formData.recruiterName}
                onChange={handleInputChange}
              />
            </div>

            {/* Email */}
            <div className="recruiter-details-form-input-group">
              <label htmlFor="email" className="recruiter-details-form-label">
                Email Address (Used for Login)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="recruiter-details-form-input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone Number */}
            <div className="recruiter-details-form-input-group">
              <label htmlFor="phoneNumber" className="recruiter-details-form-label">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="recruiter-details-form-input"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="recruiter-details-form-input-group">
              <label htmlFor="password" className="recruiter-details-form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="recruiter-details-form-input"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="recruiter-details-form-input-group">
              <label htmlFor="confirmPassword" className="recruiter-details-form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your password"
                className="recruiter-details-form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>

            

            

            {/* Submit Button */}
            <button type="submit" className="recruiter-details-form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EmployeeSignup;