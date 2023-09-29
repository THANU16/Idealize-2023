import React, { useState, useContext } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import './Logout.css';

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleLogout = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirmQuit = () => {
    // User wants to quit, perform full logout
    
    console.log("job quit logic");
  };

  const handleCancelQuit = () => {
    // User chose not to quit, close the confirmation dialog
    setUser(null);
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("ambulance");
    sessionStorage.removeItem("typeID");
    navigate("/login");
    
  };

  const handlecancel = () => {
    navigate("/Home");
  };

  return (
    <div className="driver-logout">
    <div className="driver-logout-container">
      <div>
        {showConfirmationDialog ? (
          <p>Have you completed your work hours for the day?</p>
        ) : (
          <p>Are you sure you want to log out?</p>
        )}
      </div>
      <div className="driver-logout-btn">
        {showConfirmationDialog ? (
          <div>
            <button onClick={handleConfirmQuit} className="driver-logout-logout">
              Yes
            </button>
            <button onClick={handleCancelQuit} className="driver-logout-logout">
              No Just Break
            </button>
          </div>
        ) : (
          <>
            <button onClick={handlecancel} className="driver-logout-cancel">
              Cancel
            </button>
            <button onClick={handleLogout} className="driver-logout-logout">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  </div>
  );
}

export default Logout;
