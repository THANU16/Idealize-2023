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

// import React, { useEffect, useState } from "react";
// import { GoogleApiWrapper } from "google-maps-react";
// import axios from "axios";
// import moment from "moment";
// import driverIcon from "../../../assets/icons/download.png";
// import notification from "../../../assets/icons/images.png";
// import { Link } from "react-router-dom";
// import "../Ambulance_Home.css";
// import { useNavigate } from "react-router-dom";

// const useWebSockets = (sessionToken, typeID, updateRequestData) => {

//   useEffect(() => {
//     // Construct the WebSocket URL with headers as query parameters
//     const websocketUrl = `ws://localhost:8000/?sessionToken=${sessionToken}&typeID=${typeID}`;

//     const websocket = new WebSocket(websocketUrl);

//     websocket.onopen = () => {
//       console.log("connected");
//     };

//     websocket.onmessage = (event) => {
//       const data = JSON.parse(event.data);
//       console.log(data);

//       updateRequestData(data.requestData);
//     };

//     return () => {
//       console.log("web socket close");
//       websocket.close();
//     };
//   }, [sessionToken, typeID, updateRequestData]); // Include updateRequestData in the dependencies
// };

// function ShowPath() {

//   const [requestData, setRequestData] = useState([]);
//   const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
//   const typeID = JSON.parse(sessionStorage.getItem("typeID"));

//   const [origin, setOrigin] = useState({
//     lat: null,
//     lng: null,
//   }); // Replace with your origin latitude and longitude

//   const [destination, setDestination] = useState({
//     lat: null,
//     lng: null,
//   }); // Replace with your destination latitude and longitude

//   // Create a function to update requestData
//   const updateRequestData = (newData) => {
//     setRequestData([...requestData, newData]); // Assuming newData is an object you want to add to requestData

//     console.log(newData);
//   };

//   // Pass updateRequestData to useWebSockets
//   // useWebSockets(sessionToken, typeID, updateRequestData);

//   useEffect(() => {
//     // Call the API to fetch origin and destination data
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(function (position) {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;

//         // Set the user's location in the state
//         setOrigin({ lat, lng });
//       });
//     } else {
//       console.log("Geolocation is not available in this browser.");
//     }

//     const ambulance = JSON.parse(sessionStorage.getItem("ambulance"));

//     setDestination({ lat: ambulance.latitude, lng: ambulance.longitude });

//     const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));

//     // axios
//     //   .get(`${process.env.REACT_APP_API_URL}/xxxxxxxxxxxxxxx`, {
//     //     headers: { Authorization: "key " + sessionToken },
//     //   })
//     //   .then((res) => {
//     //     if (res.data.success) {
//     //       setOrigin({
//     //         lat: res.data.originLat,
//     //         lng: res.data.originLng,
//     //       });
//     //       setDestination({
//     //         lat: res.data.destinationLat,
//     //         lng: res.data.destinationLng,
//     //       });
//     //       // Initialize the map once data is fetched
//     //       initMap();
//     //     }
//     //   })
//     //   .catch((err) => console.log(err));
//     initMap();
//   }, []);

//   const [time, setTime] = useState(new Date());

//   useEffect(() => {
//     const interval = setInterval(() => {
//       // Update the time every 1 second
//       setTime(new Date());
//     }, 1000);

//     // Clear the interval when the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   const formattedTime = time.toLocaleTimeString();
//   // useEffect(() => {
//   //   setCurrentTime(moment().format("HH:mm:ss"));
//   // }, );

//   const initMap = () => {
//     const directionsService = new window.google.maps.DirectionsService();
//     const directionsRenderer = new window.google.maps.DirectionsRenderer();
//     const map = new window.google.maps.Map(document.getElementById("map"), {
//       zoom: 7,
//       center: origin,
//     });

//     directionsRenderer.setMap(map);

//     calculateAndDisplayRoute(directionsService, directionsRenderer);
//   };

//   const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
//     directionsService
//       .route({
//         origin,
//         destination,
//         travelMode: window.google.maps.TravelMode.DRIVING,
//       })
//       .then((response) => {
//         directionsRenderer.setDirections(response);
//       })
//       .catch((error) => {
//         window.alert("Directions request failed due to " + error.status);
//       });
//   };
//   const navigate = useNavigate();
//   const handleNotificationClick = () => {
//     navigate("/notification");
//   };
//   return (
//     <div className="driverContainer">
//       <div>
//         <div className="profile-and-ambulance-container">
//           <Link to="/driverProfile">
//             <div className="profile_link">
//               <img src={driverIcon} alt="Driver Icon" className="driver-icon" />
//             </div>
//           </Link>
//           <div className="amno">
//             <p>
//               <h4>
//                 <b> {formattedTime} </b>
//               </h4>
//             </p>
//           </div>
//           <div>
//             <img
//               src={notification}
//               alt="notification"
//               className="notification-icon"
//               onClick={handleNotificationClick} // Add the onClick event handler
//             />

//           </div>
//         </div>
//       </div>
//       <div className="driverMap">
//         <div id="map" style={{ height: "670px" }}></div>
//       </div>
//     </div>
//   );
// }

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key

// })(ShowPath);
