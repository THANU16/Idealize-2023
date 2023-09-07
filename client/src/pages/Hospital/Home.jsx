import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
import "../styles.css";

import Table from "react-bootstrap/Table";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import axios from "axios";

const Home = (props) => {
  // const { onRequest, onCancel } = props;
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");
  const [ambulanceLocation, setAmbulanceLocation] = useState([]);
  const [requestData, setRequestData] = useState([]);
  // useEffect(() => {
  //   if (coordinates) {
  //     sendLocationDataToBackend(coordinates.latitude, coordinates.longitude);
  //   }
  // }, [coordinates]);

  // useEffect(() => {
  // const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
  //   const typeID = JSON.parse(sessionStorage.getItem("typeID"));
  //   const socket = new WebSocket("ws://localhost:8000");

  //   // Send the session token to the server for authentication
  //   socket.onopen = () => {
  //     console.log("WebSocket connection opened.");
  //     socket.send(
  //       JSON.stringify({ sessionToken: sessionToken, typeID: typeID })
  //     );
  //   };

  //   socket.onerror = (error) => {
  //     console.error("WebSocket error:", error);
  //   };

  //   // Handle incoming messages from the server
  //   socket.onmessage = (event) => {
  //     const message = JSON.parse(event.data);
  //     // Handle incoming messages (e.g., display notifications)
  //     console.log("message ", message);
  //   };

  //   return () => {
  //     socket.close();
  //   };
  // }, []);

  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));

    axios
      .post(
        "http://localhost:8000/hospital/getHospitalAmbulanceLocation",
        {},
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        if (res.data.sucess) {
          console.log("======", res.data);

          setAmbulanceLocation(res.data.result);
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:8000/hospital/getRequest")
      .then((res) => {
        if (res.data.sucess) {
          setRequestData(res.data.result);
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

  const sendLocationDataToBackend = (lat, lng) => {
    // Send the coordinates to the backend using an Axios POST request
    // You can use Axios or any other method to send the data
    // Example:
    // axios.post('/api/saveLocation', { latitude: lat, longitude: lng })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.error('Error sending location data:', error);
    //   });
  };
  const [request, setRequest] = useState(false);
  const onCancel = () => {
    setRequest(false);
  };

  const onRequest = () => {
    setRequest(false);
  };

  const [showNotifications, setShowNotifications] = useState(false);

  // Function to toggle the visibility of notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Show the emergency request modal if request is true
  // Show the map if request is false
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
          {ambulanceLocation.map((location) => (
            <Marker
              key={location.locationID}
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
        <div className="tables">
          <h3 style={{ backgroundColor: "white" }}>Away from hospital</h3>
          <table className="table table-bordered table-striped table-hover ">
            <thead>
              <tr>
                <th>Amb.No</th>
                <th>Distance(km)</th>
              </tr>
            </thead>
            <tbody>
              {/* {transactionData.map((data) => ( */}
              <tr>
                <td>L0142</td>
                <td>5</td>
              </tr>
              <tr>
                <td>L0142</td>
                <td>4</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="notifications">
          <button className="white-button" onClick={toggleNotifications}>
            <h3>Notification</h3>
          </button>

          {/* Render notifications based on the state */}
          {showNotifications && (
            <div className="notification-container">
              {/* Notification content goes here */}
              {/* <div className="notification">
                Notification 1
                <span>
                  <button style={{ backgroundColor: "green", margin: "10px" }}>
                    Accept
                  </button>
                </span>
                <span>
                  <button style={{ backgroundColor: "red" }}>Reject</button>
                </span>
              </div> */}
              <div>
                <ul style={{ maxHeight: "300px", overflowY: "scroll" }}>
                  {requestData.map((req) => (
                    <li key={req.requestID}>
                      {req.status}
                      <span>
                        <button
                          style={{ backgroundColor: "green", margin: "10px" }}
                        >
                          Accept
                        </button>
                      </span>
                      <span>
                        <button style={{ backgroundColor: "red" }}>
                          Reject
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              {/* <div className="notification">Notification 2</div>
              <div className="notification">Notification 3</div> */}
            </div>
          )}

          {/* Render other components as needed */}
        </div>
      </div>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(Home);
