// import React, { useState, useEffect } from "react";
// import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
// import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
// import driverMarkerIcon from "../../assets/icons/placeholder.png";
// import driverIcon from "../../assets/icons/download.png"
// import "./Ambulance_Home.css";
// import moment from "moment";
// import DriverProfile from "./Pages/DriverProfile";
// import { Link } from "react-router-dom";
// import Table from "react-bootstrap/Table";
// import PlacesAutocomplete, {
//   geocodeByAddress,
//   getLatLng,
// } from "react-places-autocomplete";

// import axios from "axios";

// const Home = (props) => {
//   // const { onRequest, onCancel } = props;
//   const [selectedPlace, setSelectedPlace] = useState(null);
//   const [coordinates, setCoordinates] = useState(null);
//   const [address, setAddress] = useState("");

//   const [requestData, setRequestData] = useState({});
//   const [ambulanceNo, setAmbulanceNo] = useState([]);
//   const [selectedAmbulance, setSelectedAmbulance] = useState({});

//   const [userLocation, setUserLocation] = useState({
//     latitude: null,
//     longitude: null,
//   });
//   // Store driver's location here
//   useEffect(() => {
//     const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));

//     axios
//       .get(
//         `${process.env.REACT_APP_API_URL}/driver/getAllHospitalAmbulance`,

//         { headers: { Authorization: "key " + sessionToken } }
//       )
//       .then((res) => {

//         if (res.data.sucess) {
//           setAmbulanceNo(res.data.result);

//         }
//       })
//       .catch((err) => console.log(err));
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         const latitude = position.coords.latitude;
//         const longitude = position.coords.longitude;

//         // Set the user's location in the state
//         setUserLocation({ latitude, longitude });
//       });
//     } else {
//       console.log("Geolocation is not available in this browser.");
//     }
//   }, []);
//   const onMapClick = (mapProps, map, event) => {
//     const clickedLatitude = event.latLng.lat();
//     const clickedLongitude = event.latLng.lng();

//     setSelectedPlace(null);
//     setCoordinates({ latitude: clickedLatitude, longitude: clickedLongitude });
//   };
//   const onMarkerClick = (props, marker, e) => {
//     setSelectedPlace(props);
//     setCoordinates(null);
//   };
//   const [request, setRequest] = useState(false);
//   const onCancel = () => {
//     setRequest(false);
//   };
//   const onRequest = () => {
//     setRequest(false);
//   };
//   // Show the emergency request modal if request is true
//   if (request)
//     return (
//       <div className="emergency-request-modal">
//         <div className="emergency-request-content">
//           <div className="emergency-header">
//             <h1>
//               There is an emergency{" "}
//               <div className="emergency-center">
//                 <img
//                   src="https://media.istockphoto.com/photos/emergency-symbol-picture-id453100595?k=6&m=453100595&s=170667a&w=0&h=Bi6sk8KHGJLcqZ5awSX7_i0esgjsWTMIdVn_EOaS2xo="
//                   alt="Emergency"
//                   width="100"
//                   height="100"
//                 />
//               </div>
//             </h1>{" "}
//             {/* Add the ambulance emoji */}
//           </div>
//           <p>
//             <h2>Please accept request and send the ambulance</h2>
//           </p>
//           <div className="emergency-button-container">
//             <button className="reject-button" onClick={onCancel}>
//               Reject
//             </button>
//             <button className="accept-button" onClick={onRequest}>
//               Accept
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   const handleAmbulanceSelect = (ambulance) => {
//     setSelectedAmbulance(ambulance);
//     const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
//     const currentDate = moment().format("YYYY-MM-DD");
//     const ambulanceData = {
//       currentDateTime,
//       currentDate,
//       ambulance_ID: ambulance.ambulanceID, // Replace with the actual property name for ambulance ID
//       lat: userLocation.latitude,
//       long: userLocation.longitude,
//     };
//     console.log(ambulanceData);
//   };
//   // console.log(ambulanceNo);

//   return (
//     <div>
//       <div className="profile-and-ambulance-container">
//         <Link to="/driverProfile">
//           <div className="profile_link">
//             <img
//               src={driverIcon}
//               alt="Driver Icon"
//               className="driver-icon"
//             />

//           </div>

//         </Link>
//         {selectedAmbulance.ambulanceNumber ? (
//           <div>
//             <p>AmbulanceNo:{selectedAmbulance.ambulanceNumber} </p>
//           </div>
//         ) : (
//           <div className="dropdown">
//             <button className="dropbtn">Select Ambulance</button>
//             <div className="dropdown-content">
//               {ambulanceNo.map((ambulance, index) => (
//                 <a
//                   key={index}
//                   // href="#"
//                   onClick={() => handleAmbulanceSelect(ambulance)}
//                 >
//                   {ambulance.ambulanceNumber}
//                 </a>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//       <div className="container">
//         <div className="map">
//           {/* Render the Google Map */}
//           {userLocation.latitude && userLocation.longitude && (
//             <Map
//               google={props.google}
//               zoom={10}
//               initialCenter={{ lat: userLocation.latitude, lng: userLocation.longitude, }}
//               mapContainerClassName="map-container"
//             >
//               {/* Add a Marker for the user's location */}
//               <Marker
//                 position={{
//                   lat: userLocation.latitude,
//                   lng: userLocation.longitude,
//                 }}
//                 icon={{
//                   url: driverMarkerIcon,
//                   scaledSize: new window.google.maps.Size(100, 100),
//                 }}
//               />
//             </Map>)}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
// })(Home);


import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import ambulanceMarkerIcon from "../../assets/icons/map_ambulance.svg";
import deiverMarkerIcon from "../../assets/icons/placeholder.png";
import "./Ambulance_Home.css";
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
  // const { onRequest, onCancel } = props;
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);

  const [selectedAmbulance, setSelectedAmbulance] = useState({});
  const [requestData, setRequestData] = useState([]);

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

  // Pass updateRequestData to useWebSockets
  useWebSockets(sessionToken, typeID, updateRequestData);

  // Store driver's location here
  useEffect(() => {
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    // setSelectedAmbulance(JSON.parse(sessionStorage.getItem("ambulance")));
    setSelectedAmbulance({ ambulanceNumber: "BIW8105" });

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/driver/checkConnection`,

        { headers: { Authorization: "key " + sessionToken } }
      )
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

  const handleAmbulanceSelect = (ambulance) => {
    setSelectedAmbulance(ambulance);
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const currentDate = moment().format("YYYY-MM-DD");
    const ambulanceData = {
      currentDateTime,
      currentDate,
      ambulanceID: ambulance.ambulanceID, // Replace with the actual property name for ambulance ID
      lat: userLocation.latitude,
      lng: userLocation.longitude,
    };
    console.log(ambulanceData);

    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/driver/setAmbulance`,
        { data: ambulanceData },
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((res) => {
        console.log(res.data);
        // if (res.data.sucess) {
        //   setAmbulanceNo(res.data.result);

        // }
      })
      .catch((err) => console.log(err));
  };



  return (
    <div>
      <div>
        <div>
          <p>AmbulanceNo:{selectedAmbulance.ambulanceNumber} </p>
        </div>
      </div>

      <div className="container">
        <div className="map">
          {/* Render the Google Map */}
          {userLocation.latitude && userLocation.longitude && (
            <Map
              google={props.google}

              zoom={10}
              initialCenter={{ lat: userLocation.latitude, lng: userLocation.longitude, }}

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
                  scaledSize: new window.google.maps.Size(100, 100),
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
