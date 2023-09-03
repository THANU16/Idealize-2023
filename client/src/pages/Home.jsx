import React from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import "./styles.css";

const Home = () => {
  const markers = [
    {
      geocode: [9.6615, 80.0255],
      popUp: "Hello Sangaran",
    },
    {
      geocode: [9.6658, 80.0133],
      popUp: "Hello Sangaran",
    },
  ];

  const customIcon = new Icon({
    iconUrl: require("client/src/pages/icons/placeholder.png"),
    iconSize: [25, 25],
  });

  return (
    <MapContainer center={[9.6615, 80.0255]} zoom={13}>
      {/* OPEN STREEN MAPS TILES */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {markers.map((marker) => (
        <Marker position={marker.geocode}></Marker>
      ))}
    </MapContainer>
  );
};

export default Home;
