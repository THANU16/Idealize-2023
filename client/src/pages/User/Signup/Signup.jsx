import React, { useState } from "react";
import "./UserSignup.css"; // Import your CSS file
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function OwnerDetailsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dob, setDob] = useState("");
  const [nicNumber, setNicNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [preferredType, setPreferredType] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and handle form submission logic here
    // You can also store the entered data in a state or context for later use

    // Navigate to the next page
    const data = {
      firstName: firstName,
      lastName: lastName,
      occupation: occupation,
      dob: dob,
      nic: nicNumber,
      phoneNo: phoneNumber,
      email: email,
      address: address,
      province: province,
      password: password,
      district: district,
      postalCode: postalCode,
    };

    axios
      .post(`${process.env.REACT_APP_API_URL}/user/add`, data)
      .then((res) => {
        if (res.data.isExist) {
          alert("Please check your details");
        } else if (res.data.sucess) {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="OwnerDetailsPage">
      <h2>User Details</h2>
      <div className="owner-details-container">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="user_signup_text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="user_signup_text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="occupation">Occupation:</label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                className="user_signup_text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth (DOB):</label>
              <input
                type="date"
                id="dob"
                name="dob"
                className="user_signup_text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="nicNumber">NIC Number:</label>
              <input
                type="text"
                id="nicNumber"
                name="nicNumber"
                className="user_signup_text"
                value={nicNumber}
                onChange={(e) => setNicNumber(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number:</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="user_signup_text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
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
                className="user_signup_text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password  "
                id="password"
                name="password"
                className="user_signup_text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                className="user_signup_text"
                type="text"
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="user_signup_text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="province">Province:</label>
              <input
                type="text"
                id="province"
                name="province"
                className="user_signup_text"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="district">District:</label>
              <input
                type="text"
                id="district"
                name="district"
                className="user_signup_text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="postalCode">Postal Code:</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                className="user_signup_text"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="preferredType">Preferred Type:</label>
              <input
                type="int"
                id="preferredType"
                name="preferredType"
                className="user_signup_text"
                value={preferredType}
                onChange={(e) => setPreferredType(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default OwnerDetailsPage;
