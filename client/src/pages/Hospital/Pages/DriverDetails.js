import React, { useState } from "react";
import "./DriverDetails.css"; // Import your CSS file
import { NavLink } from "react-router-dom";
import uploadSvg from "../upload.svg"; // Import the SVG file

function HospitalDetailsPage({ onPrevious, onNext }) {
  const [firstName, setFirstName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [ambulanceNo, setAmbulanceNo] = useState("");
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
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="hospitalName">First Name</label>
                <input
                  type="text"
                  id="hospitalName"
                  name="hospitalName"
                  value={hospitalName}
                  onChange={(e) => setAmbulanceNo(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="registrationNo">Phone Number</label>
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
                <label htmlFor="registrationNo">Email</label>
                <input
                  type="email"
                  id="registrationNo"
                  name="registrationNo"
                  value={registrationNo}
                  onChange={(e) => setAmbulanceCompany(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="registrationNo">NIC</label>
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
                <label htmlFor="registrationNo">Address</label>
                <input
                  type="text"
                  id="registrationNo"
                  name="registrationNo"
                  value={registrationNo}
                  onChange={(e) => setAmbulanceCompany(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Center the upload input */}
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="registrationNo">Password</label>
                <input
                  type="password"
                  id="registrationNo"
                  name="registrationNo"
                  value={registrationNo}
                  onChange={(e) => setAmbulanceCompany(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="registrationNo">Confirm Password</label>
                <input
                  type="text"
                  id="registrationNo"
                  name="registrationNo"
                  value={registrationNo}
                  onChange={(e) => setAmbulanceCompany(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="button-group">
              <button style={{ color: "white" }}>
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
