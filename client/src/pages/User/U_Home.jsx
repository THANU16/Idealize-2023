import React from "react";
import emgbtn from "../User/usericons/emergency.png";
import "./user.css";
import { NavLink } from "react-router-dom";

const Product = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70vh",
      }}
    >
      <div>
        <h2>Are you in an emergency?</h2>
        <h1>Tap the button below to request for help.</h1>
      </div>
      <div className="emergency">
        <NavLink to="/user/firstaid">
          <img src={emgbtn} alt="emergency" />
        </NavLink>
      </div>
    </div>
  );
};

export default Product;
