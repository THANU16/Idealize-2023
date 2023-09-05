import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./ambulance.css";

function AmbulanceAllocation({ onCancel }) {
  const [ambulances] = useState([
    { id: 1, name: "Ambulance 1", arrivalTime: "10 minutes" },
    { id: 2, name: "Ambulance 2", arrivalTime: "15 minutes" },
    // Add more ambulances and arrival times as needed
  ]);
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);

  const handleAmbulance = (ambulanceId) => {
    // const selected = ambulances.find(
    //   (ambulance) => ambulance.id === ambulanceId
    // );
    // setSelectedAmbulance(selected);
  };

  const handleAmbulanceSelect = (ambulanceId) => {
    // Find the selected ambulance
    const selectedAmbulance = ambulances.find(
      (ambulance) => ambulance.id === ambulanceId
    );

    // Navigate to the map page with the selected ambulance's details
    history.push(`/ambulance-map/${selectedAmbulance.id}`);
  };

  return (
    <div className="emergency-request-modal">
      <div className="emergency-request-content">
        <div className="emergency-header">
          <h1>
            Assign the ambulance quickly{" "}
            <div className="emergency-center">
              <img
                src="https://tse3.mm.bing.net/th?id=OIP.KVn9TAzNkGpIwXy_iu9ChgHaHa&pid=Api&P=0&h=180"
                alt="Emergency"
                width="100"
                height="100"
              />
            </div>
          </h1>

          <div className="small-request-modal">
            <div className="small-request-content">
              <div className="emergency-header">
                <table className="ambulance-table">
                  <thead>
                    <tr>
                      <th className="left-header">Name</th>
                      <th className="right-header">Arrival Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ambulances.map((ambulance) => (
                      <tr
                        key={ambulance.id}
                        onClick={() => handleAmbulanceSelect(ambulance.id)}
                        style={{
                          cursor: "pointer",
                          backgroundColor:
                            selectedAmbulance?.id === ambulance.id
                              ? "#EFEFEF"
                              : "transparent",
                        }}
                        className="ambulance-row" // Add a class for styling
                      >
                        <td>
                          <h2>{ambulance.name}</h2>
                        </td>
                        <td>
                          <h2>{ambulance.arrivalTime}</h2>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AmbulanceAllocation;
