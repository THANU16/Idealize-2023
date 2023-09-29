import React, { useState } from "react";
import "./AmbulanceForm.css"; // Import your CSS file
import { NavLink, useNavigate } from "react-router-dom";
import uploadSvg from "../upload.svg"; // Import the SVG file
import axios from "axios";

function HospitalDetailsPage({ onPrevious, onNext }) {
  const [ambulanceNo, setAmbulanceNo] = useState("");
  const [ownership, setOwnership] = useState(""); // 'Government' or 'Private'
  const [registrationNo, setAmbulanceCompany] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const navigate = useNavigate();
  const hospitalLocation = JSON.parse(
    sessionStorage.getItem("hospitalLocation")
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ambulanceNo: ambulanceNo,
      latitude: hospitalLocation.latitude,
      longitude: hospitalLocation.longitude,
    };
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));

    axios
      .post(`${process.env.REACT_APP_API_URL}/ambulance/add`, data, {
        headers: { Authorization: "key " + sessionToken },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.isExist) {
          alert("Please check your ambulance number");
          navigate("/ambulanceForm");
        } else if (res.data.sucess) {
          navigate("/ambulance");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="ambulance-details">
      <h2>Ambulance Details</h2>
      <div className="ambulance-details-container">
        {/* Center the form content */}
        <div className="centered-form">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="ambulanceNo">Ambulance No:</label>
                <input
                  type="text"
                  id="ambulanceNo"
                  name="ambulanceNo"
                  className="ambulance-details-input"
                  value={ambulanceNo}
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
                  className="ambulance-details-input"
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
                  className="ambulance-details-input"
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
                  className="ambulance-details-input"
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

            <div className="ambulance-details-next" style={{ color: "white" }}>
              <button type="submit" onClick={handleSubmit}>
                Submit
              </button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HospitalDetailsPage;