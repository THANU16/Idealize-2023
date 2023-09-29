import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
import deiverMarkerIcon from "../../assets/icons/placeholder.png";
import driverIcon from "../../assets/icons/download.png";
import notification from "../../assets/icons/images.png";
import "./Ambulance_Home.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Link } from "react-router-dom";

// Import your notification sound
import notificationSound from "../soundmp3/iphoneRingtone.mp3";

import Table from "react-bootstrap/Table";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import axios from "axios";

const useWebSockets = (
  sessionToken,
  typeID,
  updateRequestData,
  updateHospitalReqData,
  playNotificationSound
) => {
  useEffect(() => {
    // Construct the WebSocket URL with headers as query parameters
    // console.log(`${process.env.REACT_APP_WEBSOCKET_URL}`);
    const websocketUrl = `${process.env.REACT_APP_WEBSOCKET_URL}/?sessionToken=${sessionToken}&typeID=${typeID}`;

    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log("connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.identify === "hospitalReq") {
        updateHospitalReqData(data.requestData);
      } else {
        updateRequestData(data.requestData);
      }
      // Play the notification sound when a new notification arrives
      playNotificationSound();
    };

    return () => {
      console.log("web socket close");
      websocket.close();
    };
  }, [sessionToken, typeID, updateRequestData, updateHospitalReqData, playNotificationSound]); // Include updateRequestData in the dependencies
};

const Home = (props) => {
  const navigate = useNavigate();
  const ambulance = JSON.parse(sessionStorage.getItem("ambulance"));
  // const { onRequest, onCancel } = props;
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setIsNewRequest(false);
  };
  const [selectedAmbulance, setSelectedAmbulance] = useState({});
  const [isNewRequest, setIsNewRequest] = useState(true);
  // Define a function to play the notification sound
  const playNotificationSound = () => {
    notificationAudio.play();
  };
  // Create a state variable to track the dropdown state for each notification
  const [notificationDropdowns, setNotificationDropdowns] = useState({});

  // Function to toggle the dropdown for a specific notification
  const toggleNotificationDropdown = (notificationID) => {
    setNotificationDropdowns((prevState) => ({
      ...prevState,
      [notificationID]: !prevState[notificationID],
    }));
  };

  const handleReject = () => {};
  function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const [requestData, setRequestData] = useState([]);
  const [hospitalReqData, setHospitalReqData] = useState(false);
  const [isClientReq, setIsClientReq] = useState(false);

  const [userLocation, setUserLocation] = useState({
    latitude: null,
    longitude: null,
  });

  const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
  const typeID = JSON.parse(sessionStorage.getItem("typeID"));

  // Create a function to update requestData
  const updateRequestData = (newData) => {
    setRequestData([...requestData, newData]); // Assuming newData is an object you want to add to requestData
  };

  // Create a function to update requestData
  const updateHospitalReqData = (newData) => {
    setHospitalReqData(newData); // Assuming newData is an object you want to add to requestData
    sessionStorage.setItem("hospitalReqData", JSON.stringify(newData));
    navigate("/show");
  };

  // Pass updateRequestData to useWebSockets
  useWebSockets(sessionToken, typeID, updateRequestData, updateHospitalReqData, playNotificationSound);

  // Store driver's location here
  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    setSelectedAmbulance(JSON.parse(sessionStorage.getItem("ambulance")));

    axios
      .get(`${process.env.REACT_APP_API_URL}/driver/checkConnection`, {
        headers: { Authorization: "key " + sessionToken },
      })
      .then((res) => {
        if (res.data.sucess) {
          //   setAmbulanceNo(res.data.result);
          if (!res.data.isExist) {
            // navigate to before select ambulance page
          }
        }
      })
      .catch((err) => console.log(err));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Set the user's location in the state
        setUserLocation({ latitude, longitude });
      });
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  const onMapClick = (mapProps, map, event) => {
    const clickedLatitude = event.latLng.lat();
    const clickedLongitude = event.latLng.lng();

    setSelectedPlace(null);
    setCoordinates({ latitude: clickedLatitude, longitude: clickedLongitude });
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setCoordinates(null);
  };

  const [request, setRequest] = useState(false);
  const onCancel = () => {
    setRequest(false);
  };

  const onRequest = () => {
    setRequest(false);
  };
  const handleNotificationClick = () => {
    navigate("/notification");
  };

  useEffect(() => {
    // Check if there are any new requests
    if (requestData.length > 0) {
      setIsNewRequest(true);
    } else {
      setIsNewRequest(false);
    }
  }, [requestData]);
  return (
    <div>
      <div>
        <div className="profile-and-ambulance-container">
          <Link to="/driverProfile">
            <div className="profile_link">
              <img src={driverIcon} alt="Driver Icon" className="driver-icon" />
            </div>
          </Link>
          <div classname="amno">
            <p>
              <h4
                style={{
                  backgroundColor: "#19295a",
                  borderRadius: "10px",
                  color: "white",
                  fontSize: "20px",
                  padding: "10px",
                }}
              >
                <b>AmbulanceNo:{ambulance.ambulanceNumber} </b>
              </h4>
            </p>
          </div>
          <div className="notifications">
            <img
              src={notification}
              alt="notification"
              className={
                isNewRequest ? "notification-icon ring" : "notification-icon"
              }
              onClick={handleNotificationClick} // Add the onClick event handler
            />
            {isNewRequest ? requestData.length : ''}
            {/* Render other components as needed */}
          </div>
        </div>
      </div>

      <div className="driverContainer">
        <div className="driverMap">
          {/* Render the Google Map */}
          {userLocation.latitude && userLocation.longitude && (
            <Map
              google={props.google}
              zoom={14}
              initialCenter={{
                lat: userLocation.latitude,
                lng: userLocation.longitude,
              }}
              mapContainerClassName="map-container"
            >
              {/* Add a Marker for the user's location */}

              <Marker
                position={{
                  lat: userLocation.latitude,
                  lng: userLocation.longitude,
                }}
                icon={{
                  url: deiverMarkerIcon,
                  scaledSize: new window.google.maps.Size(70, 70),
                }}
              />
            </Map>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(Home);
