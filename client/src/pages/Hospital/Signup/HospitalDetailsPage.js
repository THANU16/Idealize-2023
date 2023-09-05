import React, { useState } from "react";
import "./HospitalDetailsPage.css"; // Import your CSS file
import { NavLink, Navigate } from "react-router-dom";

function HospitalDetailsPage({ onPrevious, onNext }) {
  const [hospitalName, setHospitalName] = useState("");
  const [ownership, setOwnership] = useState(""); // 'Government' or 'Private'
  const [registrationNo, setRegistrationNo] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [hotline1, setHotline1] = useState("");
  const [hotline2, setHotline2] = useState("");
  const [email, setEmail] = useState("");
  const [webPage, setWebPage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and handle form submission logic here
    // You can also store the entered data in a state or context for later use

    // Navigate to the next page
    Navigate("/OwnerDetails");
  };

  return (
    <div className="HospitalDetailsPage">
      <h2>Hospital Details</h2>
      <div className="hospital-details-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hospitalName">Hospital Name:</label>
              <input
                type="text"
                id="hospitalName"
                name="hospitalName"
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
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
              <label htmlFor="registrationNo">Registration No:</label>
              <input
                type="text"
                id="registrationNo"
                name="registrationNo"
                value={registrationNo}
                onChange={(e) => setRegistrationNo(e.target.value)}
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
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="province">Province:</label>
              <input
                type="text"
                id="province"
                name="province"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="district">District:</label>
              <input
                type="text"
                id="district"
                name="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="hotline1">Hotline 1:</label>
              <input
                type="tel"
                id="hotline1"
                name="hotline1"
                value={hotline1}
                onChange={(e) => setHotline1(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="hotline2">Hotline 2:</label>
              <input
                type="tel"
                id="hotline2"
                name="hotline2"
                value={hotline2}
                onChange={(e) => setHotline2(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="webPage">Web Page Address:</label>
              <input
                type="url"
                id="webPage"
                name="webPage"
                value={webPage}
                onChange={(e) => setWebPage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button-group">
            <button type="next">
              <NavLink to="/OwnerDetails">Next</NavLink>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HospitalDetailsPage;
