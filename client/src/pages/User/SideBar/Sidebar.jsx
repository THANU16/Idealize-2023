import "./User_Sidebar.css";
import React, { useState } from "react";

import home from "../usericons/home.svg";
import drivers from "../usericons/drivers.svg";
import help from "../usericons/help.svg";
import logout from "../usericons/logout.svg";
import logo from "../usericons/logo.svg";
import firstaid from "../usericons/firstaid.svg";
import { NavLink } from "react-router-dom";
function activate_the_icon(event) {
  // Your activate_the_icon function code goes here
}

const Sidebar = ({ children }) => {
  const [activeButton, setActiveButton] = useState(null);

  const activateTheIcon = (index) => {
    setActiveButton(index);
  };
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
            {/* <NavLink to="/home">Home</NavLink> */}
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
            <a href="#">Help</a>
          </li>
          <li
            className={`user_chat_nav_button user_nav_buttons ${
              activeButton === 3 ? "active" : ""
            }`}
            onClick={() => activateTheIcon(3)}
          >
            <img src={logout} alt="Logout" />
            <a href="#">Logout</a>
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
