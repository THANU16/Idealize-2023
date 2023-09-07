const express = require("express");
const decodedUserId = require("../Authentication/decodedToken");

const WebSocket = require("ws");
const database = require("../utils/databaseUtils");

// Create a function that takes the 'server' as a parameter
function createEmergencyRouter(server) {
  const router = express.Router();
  const wss = new WebSocket.Server({ server }); // Use the 'server' parameter

  const databaseObj = new database();
  databaseObj.connectDatabase("Emergency Request");

  const connection = databaseObj.connection;

  // Maintain a list of WebSocket connections for hospitals and ambulances
  const hospitalConnections = new Map(); // Map to associate hospital IDs with connections
  const ambulanceConnections = new Map(); // Map to associate ambulance IDs with connections

  // Define an array of selected hospital IDs
  const selectedHospitalIDs = ["1", "2"]; // Replace with the actual hospital IDs

  // Selected ambulance ID
  const selectedAmbulanceIDs = ["1", "2"]; // Replace with the actual ambulance ID

  // WebSocket handling
  wss.on("connection", (ws) => {
    ws.on("message", (message) => {
      const data = JSON.parse(message);
      // Decode the session token to get the client's ID
      const clientId = decodedUserId(data.sessionToken); // Implement your token decoding logic
      const typeID = data.typeID;
      console.log(`Received WebSocket message: ${JSON.stringify(data)}`);

      // Check if the client ID matches any of the selected hospital IDs
      if ((typeID = "ho")) {
        if (selectedHospitalIDs.includes(clientId)) {
          // Notify the selected hospital
          hospitalConnections.set(clientId, ws); // Associate the WebSocket connection with the hospital ID
          ws.send(
            JSON.stringify({
              type: "notification",
              message: "Emergency request received.",
            })
          );
        }
      } else if ((typeID = dr)) {
        if (selectedAmbulanceIDs.includes(clientId)) {
          // Notify the selected ambulance
          ambulanceConnections.set(clientId, ws); // Associate the WebSocket connection with the ambulance ID
          ws.send(
            JSON.stringify({
              type: "notification",
              message: "Emergency request received.",
            })
          );
        }
      }
    });

    ws.on("close", (code, reason) => {
      console.log(
        `WebSocket connection closed with code ${code}, reason: ${reason}`
      );
      // Handle WebSocket connection closure if needed...
    });

    ws.on("error", (error) => {
      console.error(`WebSocket error: ${error.message}`);
      // Handle WebSocket errors if needed...
    });
  });

  // Handle emergency requests from users
  router.post("/", (req, res) => {
    const requestData = req.body; // Assuming you receive the emergency request data from the user
    console.log(requestData);
    const sessionToken = req.headers.authorization.replace("key ", "");
    const userID = decodedUserId(sessionToken);
    console.log(userID);
    const setQuery =
      "insert into emergency_request (userID, status, lat, lng, requestedTime) values(?,?,?,?,?);";
    const getIDQuery =
      "select * from emergency_request where (userID = ? and status = ? and lat = ? and lng = ? and requestedTime = ?);";

    connection.query(
      setQuery,
      [
        userID,
        "Pending",
        requestData.lat,
        requestData.lng,
        requestData.dateTime,
      ],
      (err, result) => {
        if (err) {
          res.send({
            sucess: false,
            isExist: false,
            error: err,
            result: null,
          });
        } else {
          connection.query(
            getIDQuery,
            [
              userID,
              "Pending",
              requestData.lat,
              requestData.lng,
              requestData.dateTime,
            ],
            (err, result) => {
              if (err) {
                res.send({
                  sucess: false,
                  isExist: false,
                  error: err,
                  result: null,
                });
              } else {
                res.send({
                  sucess: true,
                  isExist: true,
                  error: null,
                  result: result,
                });
              }
            }
          );
        }
      }
    );

    // Notify the selected hospitals
    selectedHospitalIDs.forEach((hospitalID) => {
      const hospitalSocket = hospitalConnections.get(hospitalID);
      if (hospitalSocket) {
        console.log(`Sending message to hospital ${hospitalID}`);
        hospitalSocket.send(JSON.stringify(requestData));
      }
    });

    // Notify the selected ambulance
    selectedAmbulanceIDs.forEach((ambulanceID) => {
      const ambulanceSocket = ambulanceConnections.get(ambulanceID);
      if (ambulanceSocket) {
        console.log(`Sending message to hospital ${ambulanceID}`);
        ambulanceSocket.send(JSON.stringify(requestData));
      }
    });
  });

  return router;
}

module.exports = createEmergencyRouter;
