import React, { useState } from "react";
import "./ApplicantSignupForm.css"; // Assuming the CSS is stored in JobDetailsForm.css
import axios from "axios";
import { useNavigate } from "react-router-dom";


function ApplicantSignupForm() {
  const [formData, setFormData] = useState({
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => {
      if (prevState.skills.includes(value)) {
        return {
          ...prevState,
          skills: prevState.skills.filter((skill) => skill !== value),
        };
      } else {
        return { ...prevState, skills: [...prevState.skills, value] };
      }
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (key === "resume") {
        formDataToSend.append(key, formData[key]);
      } else if (key === "skills") {
        formDataToSend.append(key, JSON.stringify(formData[key]));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post("http://localhost:5000/submit-form", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert(response.data.message);
      navigate("/login "); // Navigate to ApplicantPage after successful submission
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  return (
    <>
      <div className="job-details-form-wrapper">
        <div className="job-details-form-main">
          <div className="job-details-form-header">
            <h2>Commuter signup Form</h2>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Full Name */}
           

            {/* Email */}
            <div className="job-details-form-input-group">
              <label htmlFor="email" className="job-details-form-label">
                Email Address (Used for Login)
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="job-details-form-input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Phone Number */}
            <div className="job-details-form-input-group">
              <label htmlFor="phoneNumber" className="job-details-form-label">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                placeholder="Enter your phone number"
                className="job-details-form-input"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            {/* Password */}
            <div className="job-details-form-input-group">
              <label htmlFor="password" className="job-details-form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="job-details-form-input"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {/* Confirm Password */}
            <div className="job-details-form-input-group">
              <label htmlFor="confirmPassword" className="job-details-form-label">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your password"
                className="job-details-form-input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
            </div>


            {/* Submit Button */}
            <button type="submit" className="job-details-form-btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ApplicantSignupForm;