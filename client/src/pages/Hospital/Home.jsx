import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
import "../styles.css";

import Table from "react-bootstrap/Table";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const Home = (props) => {
  // const { onRequest, onCancel } = props;
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");

  // useEffect(() => {
  //   if (coordinates) {
  //     sendLocationDataToBackend(coordinates.latitude, coordinates.longitude);
  //   }
  // }, [coordinates]);

  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    const typeID = JSON.parse(sessionStorage.getItem("typeID"));
    const socket = new WebSocket("ws://localhost:8000");

    // Send the session token to the server for authentication
    socket.onopen = () => {
      console.log("WebSocket connection opened.");
      socket.send(
        JSON.stringify({ sessionToken: sessionToken, typeID: typeID })
      );
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Handle incoming messages from the server
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      // Handle incoming messages (e.g., display notifications)
      console.log("message ", message);
    };

    return () => {
      socket.close();
    };
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
  const locations = [
    {
      lat: 9.6638,
      lng: 80.0208, // Jaffna Town
      bearing: 0, // Bearing is set to 0 for reference
    },
    {
      lat: 9.6825,
      lng: 80.0054, // Nallur
      bearing: 0,
    },
    {
      lat: 9.7651,
      lng: 80.0003, // Point Pedro
      bearing: 0,
    },
    {
      lat: 9.6555,
      lng: 80.0754, // Chavakachcheri
      bearing: 0,
    },
    {
      lat: 9.7486,
      lng: 80.0164, // Valvettithurai
      bearing: 0,
    },
    {
      lat: 9.7178,
      lng: 80.0081, // Kayts
      bearing: 0,
    },
    {
      lat: 9.6809,
      lng: 80.2526, // Delft Island
      bearing: 0,
    },
  ];

  const [showNotifications, setShowNotifications] = useState(false);

  // Function to toggle the visibility of notifications
  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  // Show the emergency request modal if request is true
  if (request)
    return (
      <div className="emergency-request-modal">
        <div className="emergency-request-content">
          <div className="emergency-header">
            <h1>
              There is an emergency{" "}
              <div className="emergency-center">
                <img
                  src="https://media.istockphoto.com/photos/emergency-symbol-picture-id453100595?k=6&m=453100595&s=170667a&w=0&h=Bi6sk8KHGJLcqZ5awSX7_i0esgjsWTMIdVn_EOaS2xo="
                  alt="Emergency"
                  width="100"
                  height="100"
                />
              </div>
            </h1>{" "}
            {/* Add the ambulance emoji */}
          </div>
          <p>
            <h2>Please accept request and send the ambulance</h2>
          </p>
          <div className="emergency-button-container">
            <button className="reject-button" onClick={onCancel}>
              Reject
            </button>
            <button className="accept-button" onClick={onRequest}>
              Accept
            </button>
          </div>
        </div>
      </div>
    );

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
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
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
              <div className="notification">
                Notification 1
                <span>
                  <button style={{ backgroundColor: "green", margin: "10px" }}>
                    Accept
                  </button>
                </span>
                <span>
                  <button style={{ backgroundColor: "red" }}>Reject</button>
                </span>
              </div>
              <div className="notification">Notification 2</div>
              <div className="notification">Notification 3</div>
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
