import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import emgbtn from "../../usericons/emergency.png";
import "../user.css";
import { NavLink } from "react-router-dom";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import pending from "../../usericons/pending.png";
import cancel from "../../usericons/cancel.png";
import axios from "axios";

const RequestCancel = (props) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigate = useNavigate();

  const handleCancelRequest = () => {
    navigate("/request/cancel");
    // setCancelRequest(true);
  };

  // Use useEffect to log currentLocation when it changes
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
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(RequestCancel);
