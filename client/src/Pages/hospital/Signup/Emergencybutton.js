import React from "react";
import "./EmergencyRequest.css";

function EmergencyRequest({ onRequest, onCancel }) {
  return (
    <div className="emergency-request-modal">
      <div className="emergency-request-content">
        <div className="emergency-header">
          <h1>
            There is an emergency{" "}
            <div className="emergency-center">
              <img
                src="https://media.istockphoto.com/photos/emergency-symbol-picture-id453100595?k=6&m=453100595&s=170667a&w=0&h=Bi6sk8KHGJLcqZ5awSX7_i0esgjsWTMIdVn_EOaS2xo="
                alt="Emergency"
                width="100"
                height="100"
              />
            </div>
          </h1>{" "}
          {/* Add the ambulance emoji */}
        </div>
        <p>
          <h2>Please accept request and send the ambulance</h2>
        </p>
        <div className="emergency-button-container">
          <button className="reject-button" onClick={onCancel}>
            Reject
          </button>
          <button className="accept-button" onClick={onRequest}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmergencyRequest;
