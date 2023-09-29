import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emgbtn from "../../usericons/emergency.png";
import "../user.css";
import { NavLink } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import pending from "../../usericons/pending.png";
import cancel from "../../usericons/cancel.png";
import axios from "axios";
import "./Requested.css";
import Button from "react-bootstrap/Button";
import MydModalWithGrid from "../../../../components/MydModalWithGrid";
import SmallModal from "../../../../components/SmallModal";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";

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

const RequestCancel = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const [acceptData, setAcceptData] = useState([]);
  const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
  const typeID = JSON.parse(sessionStorage.getItem("typeID"));

  // Create a function to update requestData
  const updateAcceptData = (newData) => {
    setAcceptData(newData); // Assuming newData is an object you want to add to requestData
    sessionStorage.setItem("acceptData", JSON.stringify(newData));
    navigate("show");
  };

  // Pass updateRequestData to useWebSockets
  useWebSockets(sessionToken, typeID, updateAcceptData);

  const handleCancelRequest = () => {
    navigate("/request/cancel");
    // setCancelRequest(true);
  };

  // Use useEffect to log currentLocation when it changes
  return (
    <div>
      <div className="req-container">
        <div className="req_modal">
          <SmallModal />
        </div>

        <div className="map">{/* Render the Google Map */}</div>
        <Map
          google={props.google}
          zoom={14}
          initialCenter={{ lat: 9.7486, lng: 80.0164 }}
          mapContainerClassName="map-container"
        >
          {currentLocation && ( // Conditionally render the Marker when currentLocation is not null
            <Marker
              position={{
                lat: currentLocation.lat,
                lng: currentLocation.lng,
              }}
              icon={{
                // url: ambulanceMarkerIcon,
                scaledSize: new window.google.maps.Size(100, 100),
              }}
            />
          )}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(RequestCancel);
