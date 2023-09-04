import React, { useState } from "react";
import "./SignupFinished.css";

function SignupFinished() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  return (
    <div className="upload">
      <div className="file-upload-container">
        <h3>Documents have been submitted successfully!</h3>
        <p>We will send the username and password to your email after verification.</p>
        <p>Thank you.</p>
        <button type='button'>Go to Login Page</button>
      </div>
    </div>
  );
}

export default SignupFinished;
