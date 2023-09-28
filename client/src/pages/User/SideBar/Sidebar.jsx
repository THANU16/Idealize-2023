import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom"; // Import useLocation
import home from "../usericons/home.svg";
import firstaid from "../usericons/firstaid.svg";
import help from "../usericons/help.svg";
import logout from "../usericons/logout.svg";
import "./User_Sidebar.css";

const Sidebar = ({ children }) => {
  const location = useLocation(); // Use useLocation hook to get the current URL

  // Extract the pathname from the location
  const currentPath = location.pathname;

  // Determine which button should be active based on the current path
  const getActiveButton = () => {
    if (currentPath == "/home") {
      return 0;
    } else if (currentPath == "/firstaid") {
      return 1;
    } else if (currentPath == "/help") {
      return 2;
    } else if (currentPath == "/logout") {
      return 3;
    }
    // Default to no active button
    return null;
  };

  const activateTheIcon = (index) => {
    setActiveButton(index);
  };

  const [activeButton, setActiveButton] = useState(null);

  return (
    <div>
      <div>
        <ul className="user_container_nav_bar">
          <li
            className={`user_home_nav_button user_nav_buttons ${
              activeButton === 0 ? "active" : ""
            }`}
            onClick={() => activateTheIcon(0)}
          >
            <a href="/home">
              <img src={home} alt="Home" />
            </a>

            <a href="/home">Home</a>
          </li>
          <li
            className={`user_search_nav_button user_nav_buttons ${
              activeButton === 1 ? "active" : ""
            }`}
            onClick={() => activateTheIcon(1)}
          >
            <img src={firstaid} alt="First Aid" />
            <a href="/firstaid">First Aid</a>
          </li>
          <li
            className={`user_printer_nav_button user_nav_buttons ${
              activeButton === 2 ? "active" : ""
            }`}
            onClick={() => activateTheIcon(2)}
          >
            <img src={help} alt="Help" />
            <a href="/help">Help</a>
          </li>
          <li
            className={`user_chat_nav_button user_nav_buttons ${
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

// import React, { useState } from "react";

// import home from "../usericons/home.svg";
// import drivers from "../usericons/drivers.svg";
// import help from "../usericons/help.svg";
// import logout from "../usericons/logout.svg";
// import logo from "../usericons/logo.svg";
// import firstaid from "../usericons/firstaid.svg";
// import { NavLink } from "react-router-dom";
// import "./Sidebar.css";
// const Sidebar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const menuItem = [
//     {
//       path: "/home",
//       name: "Home",
//       icon: <img src={home} alt="" />,
//     },
//     {
//       path: "/firstaid",
//       name: "First Aid Instructions",
//       icon: <img src={firstaid} alt="" />,
//     },
//     {
//       path: "/hospital",
//       name: "Hospital",
//       className: "hospital",
//       icon: <img src={drivers} alt="" />,
//     },
//     {
//       path: "/help",
//       name: "Help",
//       icon: <img src={help} alt="" />,
//     },
//     {
//       path: "logout",
//       name: "Logout",
//       icon: <img src={logout} alt="" />,
//     },
//   ];
//   return (
// <div className="container">
//   <div
//     style={{ width: isOpen ? "283.179px" : "87.418px" }}
//     className="sidebar"
//   >
//     <div className="top_section">
//       <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
//         LifeSaver
//       </h1>
//       <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
//         <img src={logo} alt="" onClick={toggle} />
//       </div>
//     </div>
//     {menuItem.map((item, index) => (
//       <NavLink
//         to={item.path}
//         key={index}
//         className="link"
//         activeclassName="active"
//       >
//         <div className="icon">{item.icon}</div>
//         <div
//           style={{ display: isOpen ? "block" : "none" }}
//           className="link_text"
//         >
//           {item.name}
//         </div>
//       </NavLink>
//     ))}
//   </div>
//   <main>{children}</main>
// </div>
//   );
// };

// export default Sidebar;
