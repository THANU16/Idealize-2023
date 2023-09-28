import React, { useState, useContext } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

  const handleLogout = () => {
    setShowConfirmationDialog(true);
  };

  const handleConfirmQuit = () => {
    // User wants to quit, perform full logout
    setShowConfirmationDialog(false);
    console.log("hancan")
  
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
        <p>Are you sure you want to log out?</p>
      </div>
      <div>
        <button onClick={handlecancel} className="btn btn-light mx-2">
          Cancel
        </button>
        <button onClick={handleLogout} className="btn btn-light mx-2">
          Logout
        </button>
      </div>

      {/* Custom Confirmation Dialog */}
      {showConfirmationDialog && (
        <div className="custom-dialog">
          <p>Are you sure you want to quit the job today?</p>
          <button onClick={handleConfirmQuit} className="btn btn-light mx-2">
            Yes
          </button>
          <button onClick={handleCancelQuit} className="btn btn-light mx-2">
            No Just Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Logout;
