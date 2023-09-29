import React, { useEffect, useState } from "react";
import { GoogleApiWrapper } from "google-maps-react";

function ShowPath(props) {
  const destination = { lat: 6.912901, lng: 79.877633 };

  const origin = { lat: 6.793697, lng: 79.901385 };

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          // setDestination({ lat: latitude, lng: longitude });
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
    const acceptData = JSON.parse(sessionStorage.getItem("acceptData"));
    console.log(acceptData);

    if (acceptData) {
      // setOrigin({
      //   lat: acceptData.ambulancelat,
      //   lng: acceptData.ambulancelng,
      // });
    }
  }, []); // Empty dependency array means this effect runs only once when the component mounts

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

  return (
    <div>
      <div id="map" style={{ height: "1000px" }}></div>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(ShowPath);
