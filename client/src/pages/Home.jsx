/* global google */
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useLoadScript,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";

import { useState, useMemo, useCallback, useRef } from "react";
import "./map.css";
import Places from "../components/places";
import Distance from "../components/distance";

const Map = () => {
  const [office, setOffice] = useState();
  const [directions, setDirections] = useState();
  const center = useMemo(() => ({ lat: 43.45, lng: -80.49 }), []);
  const options = useMemo(
    () => ({
      // mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  );
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const houses = useMemo(() => generateHouses(center), [center]);

  const fetchDirections = (house) => {
    if (!office) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: house,
        destination: office,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });
  const [mapRef, setMapRef] = useState();
  const [isOpen, setIsOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState();
  const markers = [
    { lat: 9.6702, lng: 80.0395 },
    { lat: 9.6652, lng: 80.0208 },
    { lat: 9.6615, lng: 80.0255 },
  ];

  const onMapLoad = (map) => {
    setMapRef(map);
    const bounds = new google.maps.LatLngBounds();
    markers?.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
    map.fitBounds(bounds);
  };

  const handleMarkerClick = (id, lat, lng, address) => {
    mapRef?.panTo({ lat, lng });
    setInfoWindowData({ id, address });
    setIsOpen(true);
  };

  return (
    <div className="container">
      <div className="map">
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            {markers.map(({ address, lat, lng }, ind) => (
              <Marker
                key={ind}
                position={{ lat, lng }}
                onClick={() => {
                  handleMarkerClick(ind, lat, lng, address);
                }}
              >
                {isOpen && infoWindowData?.id === ind && (
                  <InfoWindow
                    onCloseClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <h3>{infoWindowData.address}</h3>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </GoogleMap>
        )}
      </div>
      <div className="controls">
        {" "}
        <h1>Commute?</h1>
        <Places
          setOffice={(position) => {
            setOffice(position);
            mapRef.current?.panTo(position);
          }}
        />
        {!office && <p>Enter the address of your office.</p>}
        {directions && <Distance leg={directions.routes[0].legs[0]} />}
      </div>
    </div>
  );
};

export default Map;
