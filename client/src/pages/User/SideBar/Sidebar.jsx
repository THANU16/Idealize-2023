import React, { useState } from "react";

import home from "../usericons/home.svg";
import drivers from "../usericons/drivers.svg";
import help from "../usericons/help.svg";
import logout from "../usericons/logout.svg";
import logo from "../usericons/logo.svg";
import firstaid from "../usericons/firstaid.svg";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/home",
      name: "Home",
      icon: <img src={home} alt="" />,
    },
    {
      path: "/firstaid",
      name: "First Aid Instructions",
      icon: <img src={firstaid} alt="" />,
    },
    {
      path: "/hospital",
      name: "Hospital",
      className: "hospital",
      icon: <img src={drivers} alt="" />,
    },
    {
      path: "/help",
      name: "Help",
      icon: <img src={help} alt="" />,
    },
    {
      path: "logout",
      name: "Logout",
      icon: <img src={logout} alt="" />,
    },
  ];
  return (
    <div className="container">
      <div
        style={{ width: isOpen ? "283.179px" : "87.418px" }}
        className="sidebar"
      >
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            LifeSaver
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <img src={logo} alt="" onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
