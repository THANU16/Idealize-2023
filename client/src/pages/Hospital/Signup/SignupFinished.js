import React, { useState } from "react";
import "./SignupFinished.css";
import { NavLink } from "react-router-dom";

function SignupFinished() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  return (
    <div className="upload">
      <div className="file-upload-container">
        <h3>Documents have been submitted successfully!</h3>
        <p>
          We will send the username and password to your email after
          verification.
        </p>
        <p>Thank you.</p>
        <button type="button" className="signup_finished_btn">
          <NavLink to="/login"> Go to Login Page</NavLink>
        </button>
      </div>
    </div>
  );
}

export default SignupFinished;
