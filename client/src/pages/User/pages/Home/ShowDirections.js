import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";

class ShowPath extends Component {
  constructor(props) {
    super(props);
    const acceptData = JSON.parse(sessionStorage.getItem("sessionToken"));
    this.state = {
      // origin: { lat: 6.7880706, lng: 79.8912813 },
      origin: { lat: acceptData.lat, lng: acceptData.longitude },
      // destination: { lat: 13.9793774204024, lng: 78.5910979011596 },
      destination: null,
    };
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.setState(
            {
              destination: { lat: latitude, lng: longitude },
            },
            () => {
              // Initialize the map once destination is obtained
              this.initMap();
            }
          );
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Handle the error, e.g., by providing a user-friendly message
        }
      );
    } else {
      console.error("Geolocation is not available in this browser.");
    }
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
})(ShowPath);
