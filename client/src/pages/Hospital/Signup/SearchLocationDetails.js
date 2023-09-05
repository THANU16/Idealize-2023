import React from "react";

const SearchLocationDetails = ({ selectedPlace, coordinates, confirm }) => {
  // Check if selectedPlace and coordinates are available
  if (!selectedPlace || !coordinates) {
    return null;
  }

  // Construct the Google Maps URL with latitude and longitude
  const googleMapsUrl = `https://www.google.com/maps/place/${coordinates.latitude}N+${coordinates.longitude}E/@${coordinates.latitude},${coordinates.longitude},17z`;

  const placeID = selectedPlace.place_id;
  const latitude = coordinates.latitude;
  const longitude = coordinates.longitude;
  const address = selectedPlace.formatted_address;

  const handleConfirm = () => {
    const data = {
      placeID: placeID,
      latitude: latitude,
      longitude: longitude,
      address: address,
      locationURL: googleMapsUrl,
    };
    //  send the data to backend
    console.log(data);
  };

  return (
    <div className="location-details">
      <h1>{selectedPlace.name}</h1>
      <p>Address: {selectedPlace.formatted_address}</p>
      <p>Latitude: {coordinates.latitude}</p>
      <p>Longitude: {coordinates.longitude}</p>

      {/* Display photos if available */}
      {selectedPlace.photos && selectedPlace.photos.length > 0 && (
        <div>
          <h3>Photos</h3>
          {selectedPlace.photos.map((photo, index) => (
            <img key={index} src={photo.getUrl()} alt={`Photo ${index + 1}`} />
          ))}
        </div>
      )}

      {/* Display rating if available */}
      {selectedPlace.rating && <p>Rating: {selectedPlace.rating}</p>}

      {/* Display website link if available */}
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

      {/* Display phone number if available */}
      {selectedPlace.formatted_phone_number && (
        <p>Phone Number: {selectedPlace.formatted_phone_number}</p>
      )}

      {/* Display hours of operation if available */}
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

      {/* Display description if available */}
      {selectedPlace.formatted_address && (
        <div>
          <h3>Description</h3>
          <p>{selectedPlace.formatted_address}</p>
        </div>
      )}

      {/* Display location URL */}
      <p>
        Location URL:{" "}
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
          View on Google Maps
        </a>
      </p>

      <button onClick={handleConfirm()}>Confirm Location</button>
    </div>
  );
};

export default SearchLocationDetails;
