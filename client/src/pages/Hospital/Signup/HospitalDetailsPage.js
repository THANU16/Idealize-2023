import React, { useEffect, useState } from "react";
import "./HospitalDetailsPage.css"; // Import your CSS file

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function HospitalDetailsPage({ onPrevious, onNext }) {
  const Navigate = useNavigate(); // Use the navigate function for navigation

  const [hospitalName, setHospitalName] = useState("");
  const [ownership, setOwnership] = useState(""); // 'Government' or 'Private'
  const [registrationNo, setRegistrationNo] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [hotline, setHotline] = useState(""); // Changed from hotline1 to hotline
  const [webPage, setWebPage] = useState(""); // Changed from webPageAddress to password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // New password field
  const [Latitude, setLatitude] = useState(null);
  const [Longitude, setLongitude] = useState(null);

  useEffect(() => {
    var savedData = JSON.parse(sessionStorage.getItem("formData"));
    if (savedData) {
      setHospitalName(savedData.hospitalName);
      setOwnership(savedData.ownership);
      setRegistrationNo(savedData.registrationNo);
      setRegisteredDate(savedData.registeredDate);
      setProvince(savedData.province);
      setDistrict(savedData.district);
      setPostalCode(savedData.postalCode);
      setHotline(savedData.hotline);
      setWebPage(savedData.webPage);
      setEmail(savedData.email);
      setPassword(savedData.password);

      savedData = null;
      sessionStorage.removeItem("formData");
    }

    const savedCoordinates = JSON.parse(sessionStorage.getItem("coordinates"));
    if (savedCoordinates) {
      setLatitude(savedCoordinates.latitude);
      setLongitude(savedCoordinates.longitude);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and handle form submission logic here
    // You can also store the entered data in a state or context for later use

    const formData = {
      hospitalName: hospitalName,
      ownership: ownership,
      registrationNo: registrationNo,
      registeredDate: registeredDate,
      province: province,
      district: district,
      postalCode: postalCode,
      hotline: hotline,
      webPage: webPage,
      email: email,
      password: password,
      Latitude: Latitude,
      Longitude: Longitude,
    };
    // Navigate to the next page

    sessionStorage.removeItem("coordinates");

    axios
      .post("${process.env.REACT_APP_API_URL}/hospital/add", formData)
      .then((res) => {
        // console.log(res.data);
        if (res.data.isExist) {
          alert("email already exist. Please check your email!!!");
        } else if (res.data.sucess) {
          Navigate("/OwnerDetails");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSetLocation = () => {
    const formData = {
      hospitalName: hospitalName,
      ownership: ownership,
      registrationNo: registrationNo,
      registeredDate: registeredDate,
      province: province,
      district: district,
      postalCode: postalCode,
      hotline: hotline,
      webPage: webPage,
      email: email,
      password: password,
      Latitude: Latitude,
      Longitude: Longitude,
    };

    // console.log(formData)

    sessionStorage.setItem("formData", JSON.stringify(formData));
    Navigate("/HospitalSearch");
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
              <label>Location:</label>
              <button type="button" onClick={handleSetLocation}>
                Select Location
              </button>
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
              <label htmlFor="hotline">Hotline:</label>{" "}
              {/* Changed from hotline1 */}
              <input
                type="tel"
                id="hotline"
                name="hotline"
                value={hotline}
                onChange={(e) => setHotline(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="webPage">Webpage:</label>{" "}
              {/* Added for the webpage URL */}
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
          {/* Add a line to separate email and password */}
          <hr />
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
              <label htmlFor="webPage">Password:</label>{" "}
              {/* Changed from webPageAddress */}
              <input
                type="password"
                id="webPage"
                name="webPage"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="button-group">
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default HospitalDetailsPage;
