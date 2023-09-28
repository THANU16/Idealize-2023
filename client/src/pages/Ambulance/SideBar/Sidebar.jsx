import React, { useState } from "react";
import home from "../../../assets/icons/home.svg";
import ambulance from "../../../assets/icons/ambulance.svg";
import drivers from "../../../assets/icons/drivers.svg";
import help from "../../../assets/icons/help.svg";
import logout from "../../../assets/icons/logout.svg";
import logo from "../../../assets/icons/logo.svg";
import { NavLink } from "react-router-dom";
import "./Ambulance_Sidebar.css";
import Logout from "../Pages/Logout";


const Sidebar = ({ children }) => {
  const [activeButton, setActiveButton] = useState(null);

  const activateTheIcon = (index) => {
    setActiveButton(index);
  };
  return (
    <div>
      <div>
        <ul className="driver_container_nav_bar">

          <li
            className={`driver_home_nav_button driver_nav_buttons ${
              activeButton === 0 ? "active" : ""
            }`}
            onClick={() => activateTheIcon(0)}
          >
            <a href="/home">
              <img src={home} alt="Home" />
            </a>

            <a href="/home">Home</a>
            {/* <NavLink to="/home">Home</NavLink> */}
          </li>
          

          <li
            className={`driver_printer_nav_button driver_nav_buttons ${
              activeButton === 2 ? "active" : ""
            }`}
            onClick={() => activateTheIcon(2)}
          >
            <img src={help} alt="Help" />
            <a href="/help">Help</a>
          </li>


          <li
            className={`driver_chat_nav_button driver_nav_buttons ${
              activeButton === 3 ? "active" : ""
            }`}
            onClick={() => activateTheIcon(3)}
          >
            <img src={logout} alt="Logout" />
            <a href="/logout">Logout</a>
          </li>
        </ul>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
