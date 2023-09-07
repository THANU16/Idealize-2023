import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emgbtn from "../../usericons/emergency.png";
import "../user.css";
import { NavLink, Navigate } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import pending from "../../usericons/pending.png";
import cancel from "../../usericons/cancel.png";
import axios from "axios";

const Home = (props) => {
  const [request, setRequest] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  // Use useEffect to log currentLocation when it changes
  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    if (currentLocation) {
      

      // Get the current date and time
      const currentDateTime = new Date();

      // Extract date components
      const year = currentDateTime.getFullYear();
      const month = String(currentDateTime.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's zero-based
      const day = String(currentDateTime.getDate()).padStart(2, "0");

      // Extract time components
      const hours = String(currentDateTime.getHours()).padStart(2, "0");
      const minutes = String(currentDateTime.getMinutes()).padStart(2, "0");
      const seconds = String(currentDateTime.getSeconds()).padStart(2, "0");

      // Create the formatted date-time string
      const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      const data = {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        dateTime: formattedDateTime,
      };
      axios
        .post("http://localhost:8000/emergency", data, {
          headers: { Authorization: "key " + sessionToken },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.sucess) {
            sessionStorage.setItem("requestData", JSON.stringify(res.data.result));
            navigate("/requested");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [currentLocation]);

  const handleEmergencyButtonClick = () => {
    setRequest(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ lat: latitude, lng: longitude });
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  const [showNotifications, setShowNotifications] = useState(false);

  // const handleCancelRequest = () => {
  //   setCancelRequest(true);
  // };

  // const onYes = () => {
  //   setRequest(false);
  //   setCancelRequest(false);
  // };

  // const onNo = () => {
  //   setCancelRequest(false);
  // };

  // if (cancelRequest)
  //   return (
  //     <div
  //       className="emergency-request-modal"
  //       style={{ padding: "10px", maxWidth: "80vh  ", height: "50vh" }}
  //     >
  //       <div className="emergency-request-content">
  //         <div className="emergency-header">
  //           <h2 style={{ textAlign: "center" }}>Are you sure?</h2>{" "}
  //           {/* Add the ambulance emoji */}
  //         </div>
  //         <p>
  //           <h1>The requests are sent to the hospitals and ambulances</h1>
  //         </p>
  //         <div className="emergency-button-container">
  //           <button className="reject-button" onClick={onYes}>
  //             Yes
  //           </button>
  //           <button className="accept-button" onClick={onNo}>
  //             No
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );

  return (
    <div>
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
          <h2 style={{ color: "red" }}>Are you in an emergency?</h2>
          <h1 style={{ color: "red" }}>
            Tap the button below to request for help.
          </h1>
        </div>
        <div className="emergency">
          {/* <NavLink to="/user/firstaid"> */}
          <img
            src={emgbtn}
            alt="emergency"
            onClick={handleEmergencyButtonClick}
          />
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(Home);
