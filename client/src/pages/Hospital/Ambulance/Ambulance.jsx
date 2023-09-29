import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "../HospitalAmbulanceDriver.css";
import Add from "../../../assets/icons/add.png";
import axios from "axios";
import CommonTable from "../Table";

const Ambulance = () => {
  const [ambulanceData, setAmbulanceData] = useState({});

  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/hospital/getAllHospitalAmbulance`,
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.sucess) {
          const originalArray = res.data.result;
          const filteredArray = originalArray.map((item) => ({
            "Ambulance Number": item.ambulanceNumber,
            "Driver Assigned": item.driverAssigned ? "Yes" : "No",
            "Driver Name": "set",
            "Driver Phone No.": "set",
            Available: item.available ? "Yes" : "No",
          }));
          setAmbulanceData(filteredArray);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const ambulanceColumns = [
    "Ambulance Number",
    "Driver Assigned",
    "Driver Name",
    "Driver Phone No.",
    "Available",
  ];

  return (
    <div className="hospital-ambulance">
      <div>
        <div>
          <div style={{ textAlign: "center" }}>
            <h1>Ambulance Details</h1>
          </div>
        </div>
        <CommonTable data={ambulanceData} columns={ambulanceColumns} />
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
        <span style={{ marginRight: "10px" }}>Add Ambulance</span>
        <NavLink to="/ambulanceForm">
          <img src={Add} alt="Add" />
        </NavLink>
      </div>
    </div>
  );
};

export default Ambulance;
