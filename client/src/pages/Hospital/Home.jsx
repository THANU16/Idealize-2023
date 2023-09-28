import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
import "../styles.css";
import PopupMessage from "./PopupMessage";
import { Modal } from "react-bootstrap";
import moment from "moment";

import Table from "react-bootstrap/Table";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import axios from "axios";

const useWebSockets = (sessionToken, typeID, updateRequestData) => {
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
      console.log(data);

      // Call the function to update requestData when new data is received
      updateRequestData(data);
    };

    return () => {
      console.log("web socket close");
      websocket.close();
    };
  }, [sessionToken, typeID, updateRequestData]); // Include updateRequestData in the dependencies
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

  // Create a function to update requestData
  const updateRequestData = (newData) => {
    setRequestData([...requestData, newData]); // Assuming newData is an object you want to add to requestData
  };

  // Pass updateRequestData to useWebSockets
  useWebSockets(sessionToken, typeID, updateRequestData);

  useEffect(() => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/hospital/getHospitalAmbulanceLocation`,
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        if (res.data.sucess) {
          setAmbulanceLocation(res.data.result);
        }
      })
      .catch((err) => console.log(err));
    axios
      .get(`${process.env.REACT_APP_API_URL}/hospital/getRequest`)
      .then((res) => {
        console.log(res.data);
        if (res.data.sucess) {
          setRequestData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hospital/getRequest`)
      .then((res) => {
        console.log(res.data);
        if (res.data.sucess) {
          setRequestData(res.data.result);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/hospital/getAvailableAmbulance`,
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
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
  const handleReject = (notificationID) => {
    // Make a POST request to your backend with the notificationID
    axios
      .post(`${process.env.REACT_APP_API_URL}/hospital/rejectNotification`, {
        notificationID: notificationID,
      })
      .then((response) => {
        // Handle the response from the server, if needed
        console.log("Reject Notification Response:", response.data);

        // You can update the state or perform other actions based on the response
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Reject Notification Error:", error);
      });
  };

  useEffect(() => {
    setIsNewRequest(true);
  }, [requestData]);

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

    const handleAssignAmbulance = (ambulanceID, notification,driverID) => {
      // Define the data to send in the request body
      const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
      const requestData = {
        ambulanceID: ambulanceID,
        notification: notification,
        driverID: driverID,
        connectedTime: currentDateTime,
      };
      // console.log(requestData);
      const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    
      // Make a POST request to your backend
      axios
        .post(`${process.env.REACT_APP_API_URL}/emergency/assignAmbulance`, requestData,{ headers: { Authorization: "key " + sessionToken }})
        .then((response) => {
          // Handle the response from the server, if needed
          console.log('Assign Ambulance Response:', response.data);
    
          // You can update the state or perform other actions based on the response
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error('Assign Ambulance Error:', error);
        });
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
  };

  return (
    <div>
      <div className="container">
        <div className="map">
          {/* Render the Google Map */}
          <Map
            google={props.google}
            zoom={14}
            // initialCenter={{ lat: 9.7486, lng: 80.0164 }}
            initialCenter={{ lat: 6.9271, lng: 79.8612 }}
            mapContainerClassName="map-container"
          >
            {/* Map each location to a Marker */}
            {ambulanceLocation.map((location, index) => (
              <Marker
                key={index}
                position={{ lat: location.latitude, lng: location.longitude }}
                icon={{
                  url: ambulanceMarkerIcon,
                  scaledSize: new window.google.maps.Size(100, 100),
                }}
              />
            ))}
          </Map>
        </div>
        {/*Active ambulance details */}
        <div className="controls">
          {/* <div className="tables"> */}
          {/* <h3 style={{ backgroundColor: "white" }}>Away from hospital</h3> */}
          {/* <table className="table table-bordered table-striped table-hover "> */}
          {/* <thead> */}
          {/* <tr> */}
          {/* <th>AmbID</th> */}
          {/* <th>LocID</th> */}
          {/* </tr> */}
          {/* </thead> */}
          {/* <tbody> */}
          {/* {ambulanceLocation.map((ambulance, index) => ( */}
          {/* <tr key={index}> */}
          {/* <td>{ambulance.ambulanceID}</td> */}
          {/* <td>{ambulance.locationID}</td> */}
          {/* Add more <td> elements for other properties */}
          {/* </tr> */}
          {/* ))} */}
          {/* </tbody> */}
          {/* </table> */}
          {/* </div> */}

          <div className="notifications">
            <button
              className={
                isNewRequest ? "white-button red-button" : "white-button"
              }
              onClick={toggleNotifications}
            >
              <h3>Notification - {requestData.length}</h3>
            </button>

            {/* Render notifications based on the state */}
            {showNotifications && (
              <div className="notification-container">
                {requestData.slice(0, 5).map((notification, index) => (
                  <div className="notification" key={index}>
                    {notificationDropdowns[notification.requestID] ? (
                      <div className="notification-dropdown">
                        {/* Dropdown content here */}
                        <h4>Available Ambulances:</h4>
                        <button
                          style={{ backgroundColor: "red", marginLeft: "10px" }}
                          onClick={() => handleCancel(notification.requestID)}
                        >
                          Cancel
                        </button>
                        <ul>
                          {AvailableAmbulance.map((ambulance, index) => (
                            <li key={index}>
                              Ambulance No: {ambulance.ambulanceNumber}
                              <button
                                style={{
                                  backgroundColor: "green",
                                  marginLeft: "10px",
                                }}
                                onClick={() =>
                                  handleAssignAmbulance(
                                    ambulance.ambulanceID,
                                    notification,
                                    ambulance.driverID
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
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Render other components as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(Home);
