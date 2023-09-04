import React, { useState } from "react";
import "./FindAccount.css";

function FindAccount() {
  const [email, setEmail] = useState("");

  const handleEmailSubmit = () => {
    // Handle email submission logic here
  };
  return (
    <div className="upload">
      <div className="file-upload-container">
        <h2>Find Your Account</h2>
        <p>Please enter your email address to find your account.</p>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className="button-container">
          <button className="cancel-button">Cancel</button>
          <button className="submit-button" onClick={handleEmailSubmit}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default FindAccount;
