import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";

import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

import LocationDetails from "./locationDetails";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPlace: null,
      coordinates: null,
      address: "",
    };
  }

  onMapClick = (mapProps, map, event) => {
    // Get latitude and longitude from the clicked location
    const clickedLatitude = event.latLng.lat();
    const clickedLongitude = event.latLng.lng();

    // Update state with the captured coordinates
    this.setState({
      selectedPlace: null,
      coordinates: { latitude: clickedLatitude, longitude: clickedLongitude },
    });

    // Send the location data to the backend
    this.sendLocationDataToBackend(clickedLatitude, clickedLongitude);
  };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      coordinates: null,
    });
  };

  handleSelect = async (address) => {
    const results = await geocodeByAddress(address);
    const latLng = await getLatLng(results[0]);

    this.setState({
      selectedPlace: results[0],
      coordinates: { latitude: latLng.lat, longitude: latLng.lng },
      address: address,
    });

    this.sendLocationDataToBackend(latLng.lat, latLng.lng);
  };

  sendLocationDataToBackend = (lat, lng) => {
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

  render() {
    return (
      <div>
        <PlacesAutocomplete
          value={this.state.address}
          onChange={(address) => this.setState({ address })}
          onSelect={this.handleSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
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

        {/* Display the selected place or coordinates */}
        <LocationDetails
          selectedPlace={this.state.selectedPlace}
          coordinates={this.state.coordinates}
        />

        {/* Render the Google Map */}
        <Map
          google={this.props.google}
          zoom={10}
          onClick={this.onMapClick}
          center={{ lat: 6.9271, lng: 79.8612 }} // Update with Sri Lanka coordinates
        >
          {/* Add a Marker for the selected place */}
          {this.state.selectedPlace && (
            <Marker
              title={this.state.selectedPlace.name}
              name={this.state.selectedPlace.name}
              position={{
                lat: this.state.selectedPlace.geometry.location.lat(),
                lng: this.state.selectedPlace.geometry.location.lng(),
              }}
              onClick={this.onMarkerClick}
            />
          )}
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAl5YvfOlFxEH09-MkWNh9OhYoQdN3uJOs", // Replace with your API key
})(Search);
