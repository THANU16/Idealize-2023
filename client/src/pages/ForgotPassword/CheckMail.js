import React, { useState } from "react";
import "./CheckMail.css";

function CheckMail() {
  return (
    <div className="upload">
      <div className="file-upload-container">
        <h3>Please Check Your Email</h3>
        <p className="message1">We've sent you an email with instructions to reset your password.</p>
        <p className="message2">If there is no email received, Please chech your spam folder as well.</p>
        <button type='button'>Go to Login Page</button>
      </div>
    </div>
  );
}

export default CheckMail;
