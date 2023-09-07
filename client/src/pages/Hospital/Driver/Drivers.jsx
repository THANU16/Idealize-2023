import React, { useEffect, useState } from "react";

import "../Ambulance/ambulance.css";
import Add from "../../../assets/icons/add.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Analytics = () => {
  const [driverData, setDriverData] = useState({});

  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    axios
      .post(
        "http://localhost:8000/hospital/getAllHospitalDrivers",
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

  return (
    <div>
      <div>
        <div>
          <div style={{ textAlign: "center" }}>
            <h1>Driver Details</h1>
          </div>
        </div>
        <table className="table table-bordered table-striped table-hover ">
          <thead>
            <tr>
              <th width="80">Driver Name</th>
              <th width="80">Ambulance No</th>
              <th width="80">Phone No</th>
              <th width="40">Working Time</th>
              <th width="40">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* {transactionData.map((data) => ( */}
            <tr>
              <td>L0142</td>
              <td>Sangaran</td>
              <td>Jancy</td>
              <td>2</td>
              <td>Active</td>
            </tr>
            <tr>
              <td>L0142</td>
              <td>Sangaran</td>
              <td>Jancy</td>
              <td>2</td>
              <td>Active</td>
            </tr>
          </tbody>
        </table>
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

export default Analytics;
