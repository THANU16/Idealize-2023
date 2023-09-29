import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emgbtn from "../../usericons/emergency.png";
import "../user.css";
import { NavLink, Navigate } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import pending from "../../usericons/pending.png";
import cancel from "../../usericons/cancel.png";
import axios from "axios";

const useWebSockets = (sessionToken, typeID, updateAcceptData) => {
  useEffect(() => {
    const websocketUrl = `${process.env.REACT_APP_WEBSOCKET_URL}/?sessionToken=${sessionToken}&typeID=${typeID}`;

    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log("connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
     
      updateAcceptData(data.requestData);
      
    };

    return () => {
      console.log("web socket close");
      websocket.close();
    };
  }, [sessionToken, typeID, updateAcceptData]); // Include updateRequestData in the dependencies
};

const Home = (props) => {
  const [request, setRequest] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const [acceptData, setAcceptData] = useState([]);
  const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
  const typeID = JSON.parse(sessionStorage.getItem("typeID"));

  // Create a function to update requestData
  const updateAcceptData = (newData) => {
    setAcceptData(newData); // Assuming newData is an object you want to add to requestData
    sessionStorage.setItem("acceptData" , JSON.stringify(newData))
  };

  // Pass updateRequestData to useWebSockets
  useWebSockets(sessionToken, typeID, updateAcceptData);

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
        .post(
          `${process.env.REACT_APP_API_URL}/emergency/addEmergencyRequest`,
          data,
          {
            headers: { Authorization: "key " + sessionToken },
          }
        )
        .then((res) => {
          console.log('user post')
          console.log(res.data);
          if (res.data.success) {
            sessionStorage.setItem(
              "requestData",
              JSON.stringify(res.data.result)
            );
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
          <h2 style={{ color: "red", marginTop: "100px" }}>
            Are you in an emergency?
          </h2>
          <h1 style={{ color: "red", textAlign: "center" }}>
            Tap the button below to request for help.
          </h1>
        </div>
        <div className="emergency">
          {/* <NavLink to="/requested"> */}
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
