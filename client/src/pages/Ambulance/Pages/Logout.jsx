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
    <div className="d-flex justify-content-between px-5 py-5">
      <div>
        {showConfirmationDialog ? (
          <p>Are you sure you want to quit the job today?</p>
        ) : (
          <p>Are you sure you want to log out?</p>
        )}
      </div>
      <div>
        {showConfirmationDialog ? (
          <div className="LogoutButtons">
            <button onClick={handleConfirmQuit} className="logoutLogoutButton btn btn-light mx-2 ">
              Yes
            </button>
            <button onClick={handleCancelQuit} className="logoutLogoutButton btn btn-light mx-2 ">
              No Just Logout
            </button>
          </div>
        ) : (
          <>
            <button onClick={handlecancel} className="btn btn-light mx-2 LogoutCancelButton ">
              Cancel
            </button>
            <button onClick={handleLogout} className="btn btn-light mx-2 logoutLogoutButton">
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Logout;
