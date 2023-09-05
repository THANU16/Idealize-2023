import React, { Component, useState } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function CompainMap({ google }) {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");

  const navigate = useNavigate();

  const onMapClick = (mapProps, map, event) => {
    // Get latitude and longitude from the clicked location
    const clickedLatitude = event.latLng.lat();
    const clickedLongitude = event.latLng.lng();

    // Update state with the captured coordinates
    setSelectedPlace(null);
    setCoordinates({ latitude: clickedLatitude, longitude: clickedLongitude });

    // Send the location data to the backend
    sendLocationDataToBackend(clickedLatitude, clickedLongitude);
  };

  const onMarkerClick = (props, marker, e) => {
    setSelectedPlace(props);
    setCoordinates(null);
  };

  const handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);

    setSelectedPlace(results[0]);
    setCoordinates({ latitude: latLng.lat, longitude: latLng.lng });
    setAddress(address);

    sendLocationDataToBackend(latLng.lat, latLng.lng);
  };

  const handleConfirm = () => {
    sessionStorage.setItem("coordinates", JSON.stringify(coordinates));
    navigate("/HospitalDetails"); // Use the navigate function for navigation
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

  return (
    <div>
      <PlacesAutocomplete
        value={address}
        onChange={(newAddress) => setAddress(newAddress)}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="search-box">
            <input
              {...getInputProps({
                placeholder: "Search Places...",
                className: "location-search-input",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? "suggestion-item--active"
                  : "suggestion-item";
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      {selectedPlace ? (
        <div className="location-details">
          <h1>{selectedPlace.name}</h1>
          <p>Address: {selectedPlace.formatted_address}</p>
          <p>Latitude: {coordinates.latitude}</p>
          <p>Longitude: {coordinates.longitude}</p>

          {selectedPlace.photos && selectedPlace.photos.length > 0 && (
            <div>
              <h3>Photos</h3>
              {selectedPlace.photos.map((photo, index) => (
                <img key={index} src={photo.getUrl()} alt={`Photo ${index + 1}`} />
              ))}
            </div>
          )}

          {selectedPlace.rating && <p>Rating: {selectedPlace.rating}</p>}

          {selectedPlace.website && (
            <p>
              Website:{" "}
              <a
                href={selectedPlace.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {selectedPlace.website}
              </a>
            </p>
          )}

          {selectedPlace.formatted_phone_number && (
            <p>Phone Number: {selectedPlace.formatted_phone_number}</p>
          )}

          {selectedPlace.opening_hours && (
            <div>
              <h3>Hours of Operation</h3>
              <ul>
                {selectedPlace.opening_hours.weekday_text.map((hours, index) => (
                  <li key={index}>{hours}</li>
                ))}
              </ul>
            </div>
          )}

          {selectedPlace.formatted_address && (
            <div>
              <h3>Description</h3>
              <p>{selectedPlace.formatted_address}</p>
            </div>
          )}

          <p>
            Location URL:{" "}
            <a
              href={`https://www.google.com/maps/place/${coordinates.latitude}N+${coordinates.longitude}E/@${coordinates.latitude},${coordinates.longitude},17z`}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Google Maps
            </a>
          </p>

          <button onClick={handleConfirm}>Confirm Location</button>
        </div>
      ) : (
        <p>No place selected.</p>
      )}

      <Map
        google={google}
        zoom={10}
        onClick={onMapClick}
        center={{ lat: 6.9271, lng: 79.8612 }} // Update with your desired coordinates
      >
        {selectedPlace && (
          <Marker
            title={selectedPlace.name}
            name={selectedPlace.name}
            position={{
              lat: coordinates.latitude,
              lng: coordinates.longitude,
            }}
            onClick={onMarkerClick}
          />
        )}
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs', // Replace with your Google Maps API key
})(CompainMap);
