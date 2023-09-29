import React, { useEffect, useState } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";
import moment from "moment";
import driverIcon from "../../../assets/icons/download.png";
import notification from "../../../assets/icons/images.png";
import { Link } from "react-router-dom";
import "../Ambulance_Home.css";
import { useNavigate } from "react-router-dom";


function ShowPath(props) {
  // const [origin, setOrigin] = useState(null);
  const origin = { lat: 6.912901, lng: 79.877633 };
  const [time, setTime] = useState(new Date());
  const [currentTime, setCurrentTime] = useState([]);
  const destination = { lat: 6.793697, lng: 79.901385 };
  const [requeste, setRequest] = useState([]);
  // const [destination, setDestination] = useState(null);


  // useEffect(() => {
    


  // }, []);



  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // const latitude = position.coords.latitude;
          // const longitude = position.coords.longitude;
          const latitude = 6.912901;
          const longitude = 79.877633;

          // setOrigin({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Handle the error, e.g., by providing a user-friendly message
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    // Retrieve data from sessionStorage and parse it
    const hospitalReqData = JSON.parse(
      sessionStorage.getItem("hospitalReqData")
    );
    console.log(hospitalReqData);

    if (hospitalReqData) {
      // setDestination({
      //   lat: hospitalReqData.userlat,
      //   lng: hospitalReqData.userlng,
      // });
    }

    console.log("origin", origin);
    console.log(destination);
  }, []); // Empty dependency array means this effect runs only once when the component mounts
  const formattedTime = time.toLocaleTimeString();
  useEffect(() => {
    setCurrentTime(moment().format("HH:mm:ss"));
  },);
  useEffect(() => {

    if (origin && destination) {
      initMap();
    }
  }, [origin, destination]);
 

  function initMap() {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: origin,
    });

    directionsRenderer.setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
  }

  function calculateAndDisplayRoute(directionsService, directionsRenderer) {
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
  }

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
                <b> {currentTime} </b>
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