import React, { useState } from 'react';
import './OwnerDetailsPage.css'; // Import your CSS file

function OwnerDetailsPage({ onNext }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [occupation, setOccupation] = useState('');
  const [dob, setDob] = useState('');
  const [nicNumber, setNicNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and handle form submission logic here
    // You can also store the entered data in a state or context for later use

    // Navigate to the next page
    onNext();
  };

  return (
    <div className="owner-details-container">
      <h2>Owner Details</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
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
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
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
        <div className="form-row">
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
        <button type="submit">Next</button>
      </form>
    </div>
  );
}

export default OwnerDetailsPage;
