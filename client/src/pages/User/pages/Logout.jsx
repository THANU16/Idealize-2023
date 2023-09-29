import React, { useState, useContext } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";
import "./logout.css";
import LifeSaverLogo from "../../../assets/icons/Logo_LS.svg";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("typeID");
    sessionStorage.removeItem("requestData");
    navigate("/login");
  };

  const cancel = () => {
    navigate("/Home");
  };

  return (
    <div className="user-logout">
      <div className="user-logout-container">
        <h2>are you sure you want to log out?</h2>
        <div className="user-logout-btn">
          <button onClickCapture={cancel} className="user-logout-cancel">
            Cancel
          </button>
          <button onClickCapture={logout} className="user-logout-logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
