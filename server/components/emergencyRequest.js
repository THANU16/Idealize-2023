const express = require("express");
const decodedUserId = require("../Authentication/decodedToken");

const WebSocket = require("ws");
const database = require("../utils/databaseUtils");


const router = express.Router();
const wss = new WebSocket.Server({ server });
const databaseObj = new database();
databaseObj.connectDatabase("Emergency Request");

const connection = databaseObj.connection;

// Maintain a list of WebSocket connections for hospitals and ambulances
const hospitalConnections = new Map(); // Map to associate hospital IDs with connections
const ambulanceConnections = new Map(); // Map to associate ambulance IDs with connections

// Define an array of selected hospital IDs
const selectedHospitalIDs = ["hospital123", "hospital456", "hospital789"]; // Replace with the actual hospital IDs

// WebSocket handling
wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const data = JSON.parse(message);

    // Decode the session token to get the client's ID
    const clientId = decodedUserId(data.token); // Implement your token decoding logic
    const typeID = data.typeID

    // Check if the client ID matches any of the selected hospital IDs
    if (selectedHospitalIDs.includes(clientId)) {
      // Notify the selected hospital
      hospitalConnections.set(clientId, ws); // Associate the WebSocket connection with the hospital ID
      ws.send(
        JSON.stringify({
          type: "notification",
          message: "Emergency request received.",
        })
      );
    } else if (clientId === selectedAmbulanceID) {
      // Notify the selected ambulance
      ambulanceConnections.set(clientId, ws); // Associate the WebSocket connection with the ambulance ID
      ws.send(
        JSON.stringify({
          type: "notification",
          message: "Emergency request received.",
        })
      );
    }
  });
});

// Handle emergency requests from users
router.post("/emergency", (req, res) => {
  const requestData = req.body; // Assuming you receive the emergency request data from the user
  const body = req.body;

  const sessionToken = req.headers.authorization.replace("key ");

  const hospitalID = decodedUserId(sessionToken);

  const setQuery = "insert into ambulanceLocation (ambulanceID, lat, lng) values (?, ?, ?);";

  connection.query(setQuery, [ambulanceID, body.lat, body.lng], (err, result) => {
    if (err) {
      res.send({
        sucess: false,
        isExist: false,
        error: err,
        result: null,
      });
    } else {
      if (result.length > 0) {
        res.send({
          sucess: true,
          isExist: true,
          error: null,
          result: result,
        });
      } else {
        res.send({
          sucess: false,
          isExist: false,
          error: null,
          result: result,
        });
      }
    }
  });

  
  
  // Notify the selected hospitals
  selectedHospitalIDs.forEach((hospitalID) => {
    const hospitalSocket = hospitalConnections.get(hospitalID);
    if (hospitalSocket) {
      hospitalSocket.send(JSON.stringify(requestData));
    }
  });

  // Notify the selected ambulance
  const ambulanceSocket = ambulanceConnections.get(selectedAmbulanceID);
  if (ambulanceSocket) {
    ambulanceSocket.send(JSON.stringify(requestData));
  }

  res.sendStatus(200); // Respond to the user's emergency request
});

server.listen(3000, () => {
  console.log("WebSocket server is listening on port 3000");
});

// Function to decode the session token and return the client's ID
function decodeSessionToken(token) {
  // Implement your token decoding logic here
  // Return the client's ID extracted from the token
}

// Selected ambulance ID
const selectedAmbulanceID = "ambulance456"; // Replace with the actual ambulance ID
