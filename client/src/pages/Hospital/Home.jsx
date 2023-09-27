import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
import "../styles.css";
import PopupMessage from "./PopupMessage";
import { Modal } from "react-bootstrap";

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
  },[]);

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
  },[]);



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

  const [isNewRequest, setIsNewRequest] = useState(true);

  const handleAccept = () => {};
  const handleReject = () => {};


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
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

    // Show the emergency request modal if request is true
  // if (xyz)
  //   return (
  //     <div className="emergency-request-modal">
  //       <div className="emergency-request-content">
  //         <div className="emergency-header">
  //           <h1>
  //             There is an emergency{" "}
  //             <div className="emergency-center">
  //               <img
  //                 src="https://media.istockphoto.com/photos/emergency-symbol-picture-id453100595?k=6&m=453100595&s=170667a&w=0&h=Bi6sk8KHGJLcqZ5awSX7_i0esgjsWTMIdVn_EOaS2xo="
  //                 alt="Emergency"
  //                 width="100"
  //                 height="100"
  //               />
  //             </div>
  //           </h1>{" "}
  //           {/* Add the ambulance emoji */}
  //         </div>
  //         <p>
  //           <h2>Please accept request and send the ambulance</h2>
  //         </p>
  //         <div className="emergency-button-container">
  //           <button className="reject-button" onClick={onCancel}>
  //             Reject
  //           </button>
  //           <button className="accept-button" onClick={onRequest}>
  //             Accept
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );

  // Show the map if request is false
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
        <div className="tables">
          <h3 style={{ backgroundColor: "white" }}>Away from hospital</h3>
          <table className="table table-bordered table-striped table-hover ">
            <thead>
              <tr>
                <th>AmbID</th>
                <th>LocID</th>
              </tr>
            </thead>
            <tbody>
            {ambulanceLocation.map((ambulance, index) => (
          <tr key={index}>
            <td>{ambulance.ambulanceID}</td>
            <td>{ambulance.locationID}</td>
            {/* Add more <td> elements for other properties */}
          </tr>
        ))}
            </tbody>
          </table>
        </div>

        <div className="notifications">
          <button className={isNewRequest ? 'white-button red-button':'white-button'} onClick={toggleNotifications}>
            <h3>Notification - {requestData.length}</h3>
          </button>


          {/* Render notifications based on the state */}
          {showNotifications && (
            <div className="notification-container">
              {requestData.map((notification, index) => (
                <div className="notification" key={index}>
                  <p>{notification.requestID}</p>
                  <p>{formatTime(notification.requestedTime)}</p> {/* Use a function to format the time */}
                  <span>
                    <button style={{ backgroundColor: "green", margin: "10px" }} onClick={handleAccept}>
                      Accept
                    </button>
                  </span>
                  <span>
                    <button style={{ backgroundColor: "red" }} onClick={handleReject}>Reject</button>
                  </span>
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