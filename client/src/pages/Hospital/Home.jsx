import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
import "../styles.css";
import moment from "moment";
import user_profile from "../../assets/icons/user_profile.svg";

import Table from "react-bootstrap/Table";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import axios from "axios";

// Import your notification sound
import notificationSound from "../soundmp3/iphoneRingtone.mp3";

const useWebSockets = (
  sessionToken,
  typeID,
  updateRequestData,
  playNotificationSound
) => {
  useEffect(() => {
    // Construct the WebSocket URL with headers as query parameters
    const websocketUrl = `ws://localhost:8000/?sessionToken=${sessionToken}&typeID=${typeID}`;

    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log("connected");
    };

    // websocket.send(JSON.stringify("hiii "));

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('hospital request')
      console.log(data.requestData);

      // Call the function to update requestData when new data is received
      updateRequestData(data.requestData);

      // Play the notification sound when a new notification arrives
      playNotificationSound();
    };

    return () => {
      console.log("web socket close");
      websocket.close();
    };
  }, [sessionToken, typeID, updateRequestData, playNotificationSound]); // Include updateRequestData and playNotificationSound in the dependencies
};

const Home = (props) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");
  const [ambulanceLocation, setAmbulanceLocation] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
  const typeID = JSON.parse(sessionStorage.getItem("typeID"));
  const [AvailableAmbulance, setAvailableAmbulance] = useState([]);
  const [hospitalLocation, setHospitalLocation] = useState([]);

  // Create an Audio element for the notification sound
  const notificationAudio = new Audio(notificationSound);

  // Define a function to play the notification sound
  const playNotificationSound = () => {
    notificationAudio.play();
  };

  // Create a function to update requestData
  const updateRequestData = (newData) => {
    setRequestData([...requestData, newData]); // Assuming newData is an object you want to add to requestData
    console.log('new data',newData)
  };


  // Pass playNotificationSound to useWebSockets
  useWebSockets(sessionToken, typeID, updateRequestData, playNotificationSound);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/hospital/getHospitalAmbulanceLocation`,
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        // console.log("check");
        // console.log(res.data);
        if (res.data.sucess) {
          setAmbulanceLocation(res.data.result);
        }
      })
      .catch((err) => console.log(err));

    if (JSON.parse(sessionStorage.getItem("hospitalLocation"))==null) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/hospital/getHospitalLocation`, {
          headers: { Authorization: "key " + sessionToken },
        })
        .then((res) => {
          console.log(res.data.result[0]);
          if (res.data.sucess) {
            setHospitalLocation(res.data.result[0]);
            sessionStorage.setItem(
              "hospitalLocation",
              JSON.stringify(res.data.result[0])
            );
          }
        })
        .catch((err) => console.log(err));
    } 
    else {
      setHospitalLocation(JSON.parse(sessionStorage.getItem("hospitalLocation")));
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/hospital/getRequest`)
      .then((res) => {
        if (res.data.sucess) {
          setRequestData(res.data.result);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API_URL}/hospital/getAvailableAmbulance`, {
        headers: { Authorization: "key " + sessionToken },
      })
      .then((res) => {
        if (res.data.sucess) {
          setAvailableAmbulance(res.data.result);
        }
      })
      .catch((err) => console.log(err));
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

  const handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      const latLng = await getLatLng(results[0]);

      setSelectedPlace(results[0]);
      setCoordinates({ latitude: latLng.lat, longitude: latLng.lng });
      setAddress(address);
    } catch (error) {
      console.error("Error selecting location:", error);
    }
  };

  const [isNewRequest, setIsNewRequest] = useState(true);

  const handleAccept = () => {};
  const handleReject = (notificationID) => {};

  const [showNotifications, setShowNotifications] = useState(false);

  // Function to toggle the visibility of notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setIsNewRequest(false);
  };

  function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function formatAndSubtractTime(timestamp) {
    // Parse the provided timestamp
    const providedTime = new Date(timestamp);

    // Get the current time
    const currentTime = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentTime - providedTime;

    // Check if the provided time is in the future
    if (timeDifference > 0) {
      // Convert the time difference to hours, minutes, and seconds
      const hours = Math.floor(timeDifference / 3600000);
      const minutes = Math.floor((timeDifference % 3600000) / 60000);
      const seconds = Math.floor((timeDifference % 60000) / 1000);

      // Format the time difference
      const formattedTime = `${minutes} min ago`;

      return formattedTime;
    } else {
      return "The provided time is in the past.";
    }
  }

  // Usage
  const providedTimestamp = "2023-09-28T05:20:14.000Z";
  const formattedDifference = formatAndSubtractTime(providedTimestamp);

  // Create a state variable to track the dropdown state for each notification
  const [notificationDropdowns, setNotificationDropdowns] = useState({});

  // Function to toggle the dropdown for a specific notification
  const toggleNotificationDropdown = (notificationID) => {
    setNotificationDropdowns((prevState) => ({
      ...prevState,
      [notificationID]: !prevState[notificationID],
    }));
  };

  const handleCancel = (notificationID) => {
    setNotificationDropdowns((prevState) => ({
      ...prevState,
      [notificationID]: !prevState[notificationID],
    }));
  };

  const handleAssignAmbulance = (ambulance, notification) => {
    // Define the data to send in the request body

    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const requestData = {      
      userID: notification.userID,
      ambulanceID: ambulance.ambulanceID,
      driverID: ambulance.driverID,
      requestID: notification.requestID,
      userlat: notification.lat,
      userlng: notification.lng,
      ambulancelat: ambulance.latitude,
      ambulancelng: ambulance.longitude,
      driverID: ambulance.driverID,
      connectedTime: currentDateTime,
    };
    // console.log(requestData);
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));

    // Make a POST request to your backend
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/emergency/assignAmbulance`,
        requestData,
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((response) => {
        // Handle the response from the server, if needed
        console.log("Assign Ambulance Response:", response.data);

        // You can update the state or perform other actions based on the response
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Assign Ambulance Error:", error);
      });

      setNotificationDropdowns((prevState) => ({
        ...prevState,
        [notification.requestID]: !prevState[notification.requestID],
      }));
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
    <div className="hospital-container">
      <div className="hospital-map">
        <div className="map-notifications-container">
          <button
            className={
              isNewRequest ? "green-button red-button" : "green-button"
            }
            onClick={toggleNotifications}
          >
            <h3>Notification - {requestData.length}</h3>
          </button>
          {showNotifications && (
            <div className="notification-container">
              {requestData.map((notification, index) => (
                <div className="notification" key={index}>
                  {notificationDropdowns[notification.requestID] ? (
                    <div className="notification-dropdown">
                      <h4>Available Ambulances:</h4>
                      <button
                        className="req_hos_cancel_button"
                        onClick={() => handleCancel(notification.requestID)}
                      >
                        Cancel
                      </button>
                      <ul>
                        {AvailableAmbulance.map((ambulance, index) => (
                          <li key={index}>
                            Ambulance No: {ambulance.ambulanceNumber}
                            <button
                              className="req_hos_assign_button"
                              onClick={() =>
                                handleAssignAmbulance(
                                  ambulance,
                                  notification,
                                )
                              }
                            >
                              Assign
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <>
                      <p>
                        <img src={user_profile} />
                      </p>
                      <p style={{ fontWeight: "bold" }}>
                        {formatAndSubtractTime(notification.requestedTime)}
                      </p>
                      <span>
                        <button
                          className="req_hos_accept_button"
                          onClick={() =>
                            toggleNotificationDropdown(notification.requestID)
                          }
                        >
                          Accept
                        </button>
                      </span>
                      <span>
                        <button
                          className="req_hos_reject_button"
                          onClick={() => handleReject(notification.requestID)}
                        >
                          Reject
                        </button>
                      </span>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <Map
          google={props.google}
          zoom={14}
          initialCenter={{ lat: 6.9271, lng: 79.8612 }}
          mapContainerClassName="hospital-map-container"
          onClick={onMapClick}
        >
          {ambulanceLocation.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.latitude, lng: location.longitude }}
              icon={{
                url: ambulanceMarkerIcon,
                scaledSize: new window.google.maps.Size(100, 100),
              }}
              onClick={onMarkerClick}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(Home);
