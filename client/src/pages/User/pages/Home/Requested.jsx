// import React, { useEffect, useState } from "react";
// import "./Requested.css";
// import MydModalWithGrid from "../../../../components/MydModalWithGrid";
// import Button from "react-bootstrap/Button";

// function App() {
//   const [isToggleBarOpen, setToggleBarOpen] = useState(false);

//   const activateToggleBar = () => {
//     setToggleBarOpen(!isToggleBarOpen);
//     console.log(isToggleBarOpen);
//   };

//   // useEffect(() => {
//   //   console.log(isToggleBarOpen);
//   // }, [isToggleBarOpen]);
// const [modalShow, setModalShow] = useState(false);

//   return (
//     <div>
// <div
//   style={{
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   }}
// >
//   <Button
//     style={{ backgroundColor: "purple" }}
//     onClick={() => setModalShow(true)}
//   >
//     Launch modal with grid
//   </Button>
// </div>

// <MydModalWithGrid show={modalShow} onHide={() => setModalShow(false)} />
//     </div>
//   );
// }

// export default App;

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
const RequestCancel = (props) => {
  const [modalShow, setModalShow] = useState(false);

  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const handleCancelRequest = () => {
    navigate("/request/cancel");
    // setCancelRequest(true);
  };

  // Use useEffect to log currentLocation when it changes
  return (
    <div>
      <div className="container">
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
