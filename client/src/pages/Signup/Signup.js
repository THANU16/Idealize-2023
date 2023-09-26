import React from "react";
import { Link } from "react-router-dom";
import HospitalIcon from "../../images/Hospital.svg";
import PeopleIcon from "../../images/People.svg";
import PharmacyIcon from "../../images/Pharmacy.svg";
import LifeSaverIcon from "../../assets/icons/Lifesaver.svg";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signupimage">
      <div className="signupimage-container">
        <h1 className="lifesaver">
          <img src={LifeSaverIcon}></img>
          LifeSaver
        </h1>

        <div className="triangle">
          <Link to="/HospitalDetails">
            <img src={HospitalIcon} alt="Image 1" className="category" />
          </Link>
          <Link to="/user/signup">
            <img src={PeopleIcon} alt="Image 2" className="category" />
          </Link>
          <Link to="/">
            <img src={PharmacyIcon} alt="Image 3" className="category" />
          </Link>
        </div>
        <div className="toregister">
          <p>
            {" "}
            Do you have account?
            <span></span>
            <Link to="/login" style={{ color: "blue" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
