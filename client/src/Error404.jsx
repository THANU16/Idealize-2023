import React from "react";
import "./Error404.css"; 

function Error404() {
  return (
    <div className="error_container">
      <div className="error_content">
        <h2>404</h2>
        <h3>Oops, nothing here...</h3>
        <p>Please Check the URL</p>
        <p>
          Otherwise, <a href="/login">Click here</a> to redirect to LoginPage.
        </p>
      </div>
    </div>
  );
}

export default Error404;
