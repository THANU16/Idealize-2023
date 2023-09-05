import React, { useState } from "react";
import "./AmbulanceForm.css"; // Import your CSS file
import { NavLink } from "react-router-dom";
import uploadSvg from "../upload.svg"; // Import the SVG file

function HospitalDetailsPage({ onPrevious, onNext }) {
  const [hospitalName, setAmbulanceNo] = useState("");
  const [ownership, setOwnership] = useState(""); // 'Government' or 'Private'
  const [registrationNo, setAmbulanceCompany] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [address, setModelNo] = useState("");
  const [webPage, setWebPage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and handle form submission logic here
    // You can also store the entered data in a state or context for later use

    // Navigate to the next page
    onNext();
  };

  return (
    <div className="HospitalDetailsPage">
      <h2>Ambulance Details</h2>
      <div className="hospital-details-container">
        {/* Center the form content */}
        <div className="centered-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="hospitalName">Ambulance No:</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={hospitalName}
                  onChange={(e) => setAmbulanceNo(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ownership">Ownership:</label>
                <select
                  id="ownership"
                  name="ownership"
                  value={ownership}
                  onChange={(e) => setOwnership(e.target.value)}
                  required
                >
                  <option value="">Select Ownership</option>
                  <option value="Government">Government</option>
                  <option value="Private">Private</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="registrationNo">Ambulance Company</label>
                <input
                  type="text"
                  id="registrationNo"
                  name="registrationNo"
                  value={registrationNo}
                  onChange={(e) => setAmbulanceCompany(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="registeredDate">Registered Date:</label>
                <input
                  type="date"
                  id="registeredDate"
                  name="registeredDate"
                  value={registeredDate}
                  onChange={(e) => setRegisteredDate(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Center the upload input */}
            <div className="form-row text-center">
              <div className="form-group upload-container">
                <img
                  src={uploadSvg}
                  alt="Upload Icon"
                  className="upload-icon"
                />
                <div></div>
                <p>OR</p>
                <input
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif, .pdf"
                  style={{ display: "none" }}
                  id="file-input"
                  multiple
                />
                <label htmlFor="file-input" className="file-input-label">
                  Select Files
                </label>
              </div>
            </div>

            <div className="button-group" style={{ color: "white" }}>
              <button type="next">
                <NavLink to="/OwnerDetails">Next</NavLink>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HospitalDetailsPage;
