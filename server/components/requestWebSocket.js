// const { WebSocketServer } = require("ws");
// const decodedUserId = require("../Authentication/decodedToken");
// const url = require("url");

// // Map to store session tokens and associated WebSocket connections.
// const sessions = new Map();

// // Create a function to handle WebSocket connections.
// function handleWebSocketConnections(server) {
//   const wsServer = new WebSocketServer({ server });

//   wsServer.on("connection", (socket, req) => {
//     console.log("WebSocket client connected");

//     // const sessionToken = req.headers.sessiontoken;
//     // const typeID = req.headers.typeID;

//     const { query } = url.parse(req.url, true);
//     console.log(query);
//     const sessionToken = query.sessionToken;
//     const typeID = query.typeID;

//     const clientID = decodedUserId(sessionToken);

//     // Check if the session token is valid (you should implement your validation logic here).
//     if (sessionToken && clientID) {
//       // Store the WebSocket connection with the session token.
//       sessions.set(sessionToken, socket);

//       socket.send(JSON.stringify("I Lve You"));

//       socket.on("message", (message) => {
//         console.log(`Received message: ${message}`);
//         // Handle WebSocket messages here.
//       });

//       socket.on("close", () => {
//         console.log("WebSocket client disconnected");

//         // Remove the WebSocket connection from the sessions map when the client disconnects.
//         sessions.delete(sessionToken);
//       });
//     } else {
//       // If the session token is invalid, close the WebSocket connection.
//       console.log("Invalid session token. Closing WebSocket connection.");
//       socket.close();
//     }
//   });
// }

// module.exports = handleWebSocketConnections;

const express = require("express");
const { WebSocketServer } = require("ws");
const decodedUserId = require("../Authentication/decodedToken");
const url = require("url");
const database = require("../utils/databaseUtils");
const databaseObj = new database();

// Map to store session tokens and associated WebSocket connections for hospitals.
const hospitalsConnection = new Map();

const router = express.Router();
databaseObj.connectDatabase("Emergency");
const connection = databaseObj.connection;

// Create a function to handle WebSocket connections.
function handleWebSocketConnections(server) {
  const wsServer = new WebSocketServer({ server });

  wsServer.on("connection", (socket, req) => {
    console.log("WebSocket client connected");

    // Extract query parameters from the request URL.
    const { query } = url.parse(req.url, true);
    const sessionToken = query.sessionToken;
    const typeID = query.typeID;

    const clientID = decodedUserId(sessionToken);

    // console.log(clientID && typeID && sessionToken);

    // Check if the session token is valid (you should implement your validation logic here).
    if (clientID) {
      // if (clientID === "ho") {
        
      // Store the WebSocket connection with the session token.
      hospitalsConnection.set(clientID, socket);
      // } else if (clientID === "dr") {
      //   // Handle connections for other client types (e.g., doctors) here if needed.
      // }

      socket.on("message", (message) => {
        console.log(`Received message: ${message}`);
        // Handle WebSocket messages here.
      });

      // socket.on("close", () => {
      //   console.log("WebSocket client disconnected");

      //   // Remove the WebSocket connection from the map when the client disconnects.
      //   hospitalsConnection.delete(clientID);
      // });
    } else {
      // If the session token is invalid, close the WebSocket connection.
      console.log("Invalid session token. Closing WebSocket connection.");
      socket.close();
    }
  });

  // Handle emergency requests from users
  router.post("/addEmergencyRequest", (req, res) => {
    const requestData = req.body; // Assuming you receive the emergency request data from the user
    const sessionToken = req.headers.authorization.replace("key ", "");
    const userID = decodedUserId(sessionToken);
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
            success: false,
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
                  success: false,
                  isExist: false,
                  error: err,
                  result: null,
                });
              } else {
                res.send({
                  success: true,
                  isExist: true,
                  error: null,
                  result: result,
                });
                // Notify all hospitals about the new emergency request
                hospitalsConnection.forEach((hospitalSocket) => {
                  console.log("Sending message to a hospital");
                  hospitalSocket.send(JSON.stringify(requestData));
                });
              }
            }
          );
        }
      }
    );
  });

  return router;
}

module.exports = handleWebSocketConnections;
