import React from "react";
import { Marker } from "google-maps-react";

function TraverseLocation(props) {
  const location = props.location;
  const index = props.index;
  console.log(location);
  return (
    <div>
      <Marker key={index} position={{ lat : 32, lng: 32}} />
    </div>
  );
}

export default TraverseLocation;
