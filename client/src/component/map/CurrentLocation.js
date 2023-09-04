import React, { useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

function EmergencyMap(props) {
  const [currentLocation, setCurrentLocation] = useState(null);

  const handleEmergencyButtonClick = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCurrentLocation({ lat: latitude, lng: longitude });
        console.log(currentLocation);
      });
    } else {
      console.error("Geolocation is not available in this browser.");
    }
  };

  return (
    <div>
      <button onClick={handleEmergencyButtonClick}>Emergency</button>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(EmergencyMap);
