import React, { useState, useContext } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../UserContext";

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("sessionToken");
    sessionStorage.removeItem("typeID");
    navigate("/login");
  };

  const cancel = () => {
    navigate("/Home");
  };

  return (
    <div className="d-flex justify-content-between px-5 py-5">
      <div>
        <p>are you sure you want to log out?</p>
      </div>
      <div>
        <button onClickCapture={cancel} className="btn btn-light mx-2">
          Cancel
        </button>
        <button onClickCapture={logout} className="btn btn-light mx-2">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
