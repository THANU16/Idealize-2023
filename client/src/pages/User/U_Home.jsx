import React, { useState } from "react";
import emgbtn from "../User/usericons/emergency.png";
import "./user.css";
import { NavLink } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import pending from "./usericons/pending.png";
import cancel from "./usericons/cancel.png";

const Home = (props) => {
  const [request, setRequest] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [req_sent_hospitals, setReq_sent_hospitals] = useState([]);
  const [req_sent_ambulances, setReq_sent_ambulances] = useState([]);

  const handleEmergencyButtonClick = () => {
    setRequest(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ lat: latitude, lng: longitude });
        console.log("Hi", currentLocation);
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  const [showNotifications, setShowNotifications] = useState(false);

  const handleCancelRequest = () => {
    return "Hello";
  };

  if (request)
    return (
      <div className="container">
        <div className="map">
          {/* Render the Google Map */}
          <Map
            google={props.google}
            zoom={14}
            initialCenter={{ lat: 9.7486, lng: 80.0164 }}
            mapContainerClassName="map-container"
          >
            {/* Map each location to a Marker */}
            {/* {locations.map((location, index) => (
              
            ))} */}
            <Marker
              // key={index}
              position={{ lat: 9.7486, lng: 80.0164 }}
              icon={{
                // url: ambulanceMarkerIcon,
                scaledSize: new window.google.maps.Size(100, 100),
              }}
            />
          </Map>
        </div>
        {/*Active ambulance details */}
        <div className="controls">
          <div className="tables">
            <h3>
              Request Status
              <div>
                <span>
                  <img src={pending} />
                </span>
              </div>
            </h3>
            <table className="table table-bordered table-striped table-hover ">
              <thead>
                <tr>
                  <th width="20px">Req.rec.By</th>
                  <th width="20px">Count</th>
                </tr>
              </thead>
              <tbody>
                {/* {transactionData.map((data) => ( */}
                <tr>
                  <td>Ambulances</td>
                  <td>5</td>
                </tr>
                <tr>
                  <td>Hospitals</td>
                  <td>4</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="notifications">
            <div clasName="cancelRequest">
              <img
                src={cancel}
                style={{ width: "25vh" }}
                onClick={handleCancelRequest}
              />
            </div>

            {/* Render notifications based on the state */}

            {/* Render other components as needed */}
          </div>
        </div>
      </div>
    );
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
