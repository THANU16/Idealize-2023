import React, { useState } from "react";
import "./U_FirstAidInstruction";
import { NavLink } from "react-router-dom";

function SignupFinished() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  return (
    <div className="upload">
      <div className="file-upload-container">
        <h3>Successfully Registred</h3>
        <p>Use our app and save your life</p>
        <p>Thank you.</p>
        <button type="button">
          <NavLink to="/login"> Go to Login Page</NavLink>
        </button>
      </div>
    </div>
  );
}

export default SignupFinished;
