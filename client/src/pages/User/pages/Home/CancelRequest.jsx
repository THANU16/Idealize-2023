import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emgbtn from "../../usericons/emergency.png";
import "../user.css";
import { NavLink, Navigate } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import pending from "../../usericons/pending.png";
import cancel from "../../usericons/cancel.png";
import axios from "axios";
import "../Home/CancelRequest.css";

const CancelRequest = (props) => {
  const navigate = useNavigate();

  // Use useEffect to log currentLocation when it change

  const onYes = () => {
    navigate("/home");
  };

  const onNo = () => {
    navigate("/requested");
  };

  return (
    <div
      className="emergency-request-modal"
      style={{ padding: "10px", maxWidth: "80vh  ", height: "50vh" }}
    >
      <div className="emergency-request-content">
        <div className="emergency-header">
          <h2 style={{ textAlign: "center" }}>Are you sure?</h2>{" "}
          {/* Add the ambulance emoji */}
        </div>
        <p>
          <h1>The requests are sent to the hospitals and ambulances</h1>
        </p>
        <div className="emergency-button-container">
          <button className="reject-button" onClick={onYes}>
            Yes
          </button>
          <button className="accept-button" onClick={onNo}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelRequest;
