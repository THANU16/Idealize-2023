import React, { useEffect, useRef, ReactElement } from "react";
import ReactDOM from "react-dom";
import { Wrapper, Status } from "../src";


function MyMapComponent(center,zoom) {
  const ref = useRef();

  useEffect(() => {
    new window.google.maps.Map(ref.current, {
      center,
      zoom,
    });
  });

  return <div ref={ref} id="map" />;
}

function App() {
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <Wrapper apiKey="" render={render}>
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}
