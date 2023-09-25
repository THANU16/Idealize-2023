import React, { Component } from "react";
import { GoogleApiWrapper } from "google-maps-react";
import axios from "axios";

class ShowPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //   origin: { lat: 12.9802347063322, lng: 77.5907760360903 }, // Replace with your origin latitude and longitude
      //   destination: { lat: 13.9793774204024, lng: 78.5910979011596 }, // Replace with your destination latitude and longitude
      origin: null,
      destination: null,
    };
  }

  componentDidMount() {
    // Call the API to fetch origin and destination data
    const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
    axios
      .get(`${process.env.REACT_APP_API_URL}/xxxxxxxxxxxxxxx`, {
        headers: { Authorization: "key " + sessionToken },
      })
      .then((res) => {
        if (res.data.success) {
          this.setState({
            origin: { lat: res.data.originLat, lng: res.data.originLng },
            destination: {
              lat: res.data.destinationLat,
              lng: res.data.destinationLng,
            },
          });
          // Initialize the map once data is fetched
          this.initMap();
        }
      })
      .catch((err) => console.log(err));
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
