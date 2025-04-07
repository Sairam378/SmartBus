import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./ProfileSelection.css";

function ProfileSelection() {
  const [showCards, setShowCards] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isWelcomeShown = localStorage.getItem("welcomeMessageShown");

    if (!isWelcomeShown) {
      const timer = setTimeout(() => {
        setShowCards(true);
        localStorage.setItem("welcomeMessageShown", "true");
      }, 4000);

      return () => clearTimeout(timer);
    } else {
      setShowCards(true);
    }
  }, []);

  const handleLogin = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div className="pco-container">
      {!showCards ? (
        <div className="pco-welcome-message">
          <h1 className="pco-welcome-text">
            Welcome to the <span className="pco-highlight">Job Board Application</span>
          </h1>
          <p className="pco-welcome-subtext">Your one stop to find jobs and career</p>
        </div>
      ) : (
        <div className="pco-card-row">
          {/* Applicant Card */}
          <div className="pco-card">
            <div className="pco-card-wrapper">
              <div className="pco-banner-image pco-banner-image1"></div>
              <h1 className="pco-card-heading">Commuter</h1>
              <p className="pco-card-para">
              Login to find the best bus routes and schedules instantly.Plan your journey effortlessly—log in to get started!
              </p>
            </div>
            <div className="pco-button-wrapper">
              <Link to="/applicant-signup" className="pco-btn pco-outline">Sign-up</Link>
              <Link to="/login" className="pco-btn pco-fill">
                Login
              </Link>
            </div>
          </div>

          {/* Recruiter Card */}
          <div className="pco-card">
            <div className="pco-card-wrapper">
              <div className="pco-banner-image pco-banner-image2"></div>
              <h1 className="pco-card-heading">Driver</h1>
              <p className="pco-card-para">
              Log in to manage your bus routes and track your shifts. Stay on top of your assigned routes—driver login here.
              </p>
            </div>
            <div className="pco-button-wrapper">
              <Link to="/employee-signup" className="pco-btn pco-outline">Sign-up</Link>
              <Link to="/login" className="pco-btn pco-fill">
                Login
              </Link>
            </div>
          </div>

          {/* Admin Card */}
          <div className="pco-card">
            <div className="pco-card-wrapper">
              <div className="pco-banner-image pco-banner-image3"></div>
              <h1 className="pco-card-heading">Admin</h1>
              <p className="pco-card-para">
                Know your users, manage users, update details, and ensure the platform runs smoothly.
              </p>
            </div>
            <div className="pco-button-wrapper">
              <Link to="/admin" className="pco-btn pco-fill">
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSelection;