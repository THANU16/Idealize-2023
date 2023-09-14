import React, { useEffect, useState } from "react";

import "../Ambulance/ambulance.css";
import Add from "../../../assets/icons/add.png";
import { NavLink } from "react-router-dom";
import axios from "axios";
import CommonTable from "../Table";

const Drivers = () => {
  const [driverData, setDriverData] = useState({});

  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    axios
      .post(
        "${process.env.REACT_APP_API_URL}/hospital/getAllHospitalDrivers",
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.sucess) {
          setDriverData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const driverColumns = [
    "firstName",
    "lastName",
    "phoneNumber",
    "email",
    "password",
    "NIC",
    "address",
    "createdAt",
    "updatedAt",
  ];

  return (
    <div>
      <div>
        <div>
          <div style={{ textAlign: "center" }}>
            <h1>Driver Details</h1>
          </div>
        </div>
        <CommonTable data={driverData} columns={driverColumns} />
      </div>

      <div
        style={{
          position: "fixed",
          right: "20px",
          zIndex: "999", // Ensure it's above other elements
          color: "black",
          padding: "10px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
        }}
      >
        <span style={{ marginRight: "10px" }}>Add Driver</span>
        <NavLink to="/driverForm">
          <img src={Add} alt="Add" />
        </NavLink>
      </div>
    </div>
  );
};

export default Drivers;
