// // import React, { useState, useEffect } from "react";

// // import { Map, GoogleApiWrapper, DirectionsRenderer } from "google-maps-react";

// // function GetPath(props) {
// //   const [response, setResponse] = useState(null);

// //   useEffect(() => {
// //     // Call the Directions Service when the component mounts
// //     calculateDirections();
// //   }, []);

// //   const calculateDirections = () => {
// //     const directionsService = new window.google.maps.DirectionsService();

// //     const origin = { lat: 12.9802347063322, lng: 77.5907760360903 }; // Replace with your starting latitude and longitude
// //     const destination = { lat: 13.9793774204024, lng: 78.5910979011596 }; // Replace with your destination latitude and longitude

// //     directionsService.route(
// //       {
// //         origin: origin,
// //         destination: destination,
// //         travelMode: "DRIVING", // You can change this to other travel modes like "WALKING" or "BICYCLING"
// //       },
// //       (result, status) => {
// //         if (status === window.google.maps.DirectionsStatus.OK) {
// //           setResponse(result);
// //         } else {
// //           console.error("Directions request failed with status:", status);
// //         }
// //       }
// //     );
// //   };

// //   return (
// //     <div>
// //       <Map
// //         google={props.google}
// //         zoom={14}
// //         initialCenter={{ lat: 12.9802347063322, lng: 77.5907760360903 }} // Use an initial center point
// //       >
// //         {response && <DirectionsRenderer directions={response} />}
// //       </Map>
// //     </div>
// //   );
// // }

// // export default GoogleApiWrapper({
// //   apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
// // })(GetPath);

// import React from "react";
// import { Map, GoogleApiWrapper } from "google-maps-react";
// import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

// const GetPath = (props) => {
//   // Define the initial center and zoom level for the map
//   const mapStyles = {
//     width: "100%",
//     height: "400px",
//   };

//   const defaultCenter = {
//     lat: 37.7749, // Replace with the latitude of your starting location
//     lng: -122.4194, // Replace with the longitude of your starting location
//   };

//   const defaultZoom = 10;

//   // Define the directions options
//   const directionsOptions = {
//     origin: { lat: 6.7951, lng: 79.9009 }, // Replace with your starting latitude and longitude
//     destination: { lat: 6.9754, lng: 79.9156 }, // Replace with your destination latitude and longitude
//     travelMode: "WALKING", // You can change this to other travel modes like 'WALKING' or 'BICYCLING'
//   };

//   return (
//     <div>
//       <Map
//         google={props.google}
//         mapContainerStyle={mapStyles}
//         zoom={defaultZoom}
//         center={defaultCenter}
//       >
//         <DirectionsService options={directionsOptions} />
//         <DirectionsRenderer />
//       </Map>
//     </div>
//   );
// };

// export default GoogleApiWrapper({
//   apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
// })(GetPath);
import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";

class GetPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: { lat: 12.9802347063322, lng: 77.5907760360903 }, // Replace with your origin latitude and longitude
      destination: { lat: 13.9793774204024, lng: 78.5910979011596 }, // Replace with your destination latitude and longitude
    };
  }

  componentDidMount() {
    // Initialize the map once the component has mounted
    this.initMap();
  }

  initMap() {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const map = new window.google.maps.Map(document.getElementById("map"), {
      zoom: 7,
      center: this.state.origin,
    });

    directionsRenderer.setMap(map);

    this.calculateAndDisplayRoute(directionsService, directionsRenderer);
  }

  calculateAndDisplayRoute(directionsService, directionsRenderer) {
    const { origin, destination } = this.state;
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

  render() {
    return (
      <div>
        <div id="map" style={{ height: "1000px" }}></div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(GetPath);
