import React, { useEffect, useState } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import moment from "moment";
import driverIcon from "../../../assets/icons/download.png";
import notification from "../../../assets/icons/images.png";
import { Link } from "react-router-dom";
import "../Ambulance_Home.css";
import { useNavigate } from "react-router-dom";

function ShowPath() {
  const [origin, setOrigin] = useState({
    lat: 12.9802347063322,
    lng: 77.5907760360903,
  }); // Replace with your origin latitude and longitude

  const [destination, setDestination] = useState({
    lat: 13.9793774204024,
    lng: 78.5910979011596,
  }); // Replace with your destination latitude and longitude

  // const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    // Call the API to fetch origin and destination data
    // const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    // axios
    //   .get(`${process.env.REACT_APP_API_URL}/xxxxxxxxxxxxxxx`, {
    //     headers: { Authorization: "key " + sessionToken },
    //   })
    //   .then((res) => {
    //     if (res.data.success) {
    //       setOrigin({
    //         lat: res.data.originLat,
    //         lng: res.data.originLng,
    //       });
    //       setDestination({
    //         lat: res.data.destinationLat,
    //         lng: res.data.destinationLng,
    //       });
    //       // Initialize the map once data is fetched
    //       initMap();
    //     }
    //   })
    //   .catch((err) => console.log(err));
    initMap();
  }, []);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      // Update the time every 1 second
      setTime(new Date());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString();
  // useEffect(() => {
  //   setCurrentTime(moment().format("HH:mm:ss"));
  // }, );

  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: origin,
    });

    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
    directionsService
      .route({
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((error) => {
        window.alert("Directions request failed due to " + error.status);
      });
  };
  const navigate = useNavigate();
  const handleNotificationClick = () => {
    navigate("/notification");
  };
  return (
    <div className="driverContainer">
      <div>
        <div className="profile-and-ambulance-container">
          <Link to="/driverProfile">
            <div className="profile_link">
              <img src={driverIcon} alt="Driver Icon" className="driver-icon" />
            </div>
          </Link>
          <div className="amno">
            <p>
              <h4>
                <b> {formattedTime} </b>
              </h4>
            </p>
          </div>
          <div>
          
            <img
            src={notification}
            alt="notification"
            className="notification-icon"
            onClick={handleNotificationClick} // Add the onClick event handler
          />
            {/* Render notifications based on the state */}
            {/* {showNotifications && (
              <div className="notification-container">
                {requestData.map((notification, index) => (
                  <div className="notification" key={index}>
                    <>
                      <p>{notification.requestID}</p>
                      <p>{formatTime(notification.requestedTime)}</p>
                      <span>
                        <button
                          style={{ backgroundColor: "green", margin: "10px" }}
                          onClick={() =>
                            toggleNotificationDropdown(notification.requestID)
                          }
                        >
                          Accept
                        </button>
                      </span>
                      <span>
                        <button
                          style={{ backgroundColor: "red" }}
                          onClick={handleReject}
                        >
                          Reject
                        </button>
                      </span>
                    </>
                  </div>
                ))}
              </div>
            )} */}
            {/* Render other components as needed */}
          </div>
        </div>
      </div>
      <div className="driverMap">
        <div id="map" style={{ height: "670px" }}></div>
      </div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(ShowPath);