import React, { useState, useEffect } from "react";
import { FaBusAlt } from "react-icons/fa";

const BusTracking = () => {
  const [busLocation, setBusLocation] = useState(0); // Current stop
  const stops = ["Stop 1", "Stop 2", "Stop 3", "Stop 4", "Stop 5"];

  useEffect(() => {
    const interval = setInterval(() => {
      setBusLocation((prev) => (prev < stops.length - 1 ? prev + 1 : 0)); // Move bus every 3s
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="route-container">
      <h1>Smart Bus Tracker</h1>

      <div className="route-line"></div> {/* Vertical Line */}

      {stops.map((stop, index) => (
        <div key={index} className="stop-marker" style={{ position: "relative" }}>
          {index === busLocation ? (
            <FaBusAlt className="bus-icon" />
          ) : (
            <div className="stop-circle"></div>
          )}
          <span style={{ marginLeft: "10px" }}>{stop}</span>
        </div>
      ))}
    </div>
  );
};

export default BusTracking;
