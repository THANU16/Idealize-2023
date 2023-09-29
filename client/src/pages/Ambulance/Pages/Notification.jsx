import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Notification.css"; // Import your CSS file
import axios from "axios";

const useWebSockets = (
  sessionToken,
  typeID,
  updateRequestData,
  updateHospitalReqData
) => {
  useEffect(() => {
    // Construct the WebSocket URL with headers as query parameters
    const websocketUrl = `ws://localhost:8000/?sessionToken=${sessionToken}&typeID=${typeID}`;

    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log("connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.identify === "hospitalReq") {
        updateHospitalReqData(data.requestData);
      } else {
        updateRequestData(data.requestData);
      }
    };

    return () => {
      console.log("web socket close");
      websocket.close();
    };
  }, [sessionToken, typeID, updateRequestData, updateHospitalReqData]); // Include updateRequestData in the dependencies
};

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Notification 1" },
    { id: 2, text: "Notification 2" },
    { id: 3, text: "Notification 3" },
    // Add more notifications as needed
  ]);
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [hospitalReqData, setHospitalReqData] = useState(false);
  const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
  const typeID = JSON.parse(sessionStorage.getItem("typeID"));

  // Create a function to update requestData
  const updateRequestData = (newData) => {
    setRequestData([...requestData, newData]); // Assuming newData is an object you want to add to requestData
  };

  // Create a function to update requestData
  const updateHospitalReqData = (newData) => {
    setHospitalReqData([...requestData, newData]); // Assuming newData is an object you want to add to requestData
    sessionStorage.setItem("hospitalReqData", JSON.stringify(hospitalReqData));
    navigate("/show");
  };

  // Pass updateRequestData to useWebSockets
  useWebSockets(sessionToken, typeID, updateRequestData, updateHospitalReqData);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hospital/getRequest`)
      .then((res) => {
        console.log(res.data);
        if (res.data.sucess) {
          console.log("we want to set to notification pannel data");
        }
      })
      .catch((err) => console.log(err));
  }, [requestData]);

  const handleAccept = (notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );

    console.log(
      "i create restapi now i want to pass the data to backend so i want to set the data inside this finction"
    );

    // axios
    //   .post(
    //     `${process.env.REACT_APP_API_URL}/emergency/assignAmbulance`,
    //     requestData,
    //     { headers: { Authorization: "key " + sessionToken } }
    //   )
    //   .then((response) => {
    //     // Handle the response from the server, if needed
    //     console.log("Assign Ambulance Response:", response.data);

    //     // You can update the state or perform other actions based on the response
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occurred during the request
    //     console.error("Assign Ambulance Error:", error);
    //   });
  };

  const handleReject = (notificationId) => {
    // Handle the "Reject" action for the notification with the specified ID
    // You can add your logic here, such as marking the notification as rejected.
    // For this example, we will remove the notification from the list.
    setNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => notification.id !== notificationId
      )
    );
  };

  return (
    <div>
      <h1 className="heading1">Notifications </h1>

      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <span className="notification-text">{notification.text}</span>
            <button
              className="accept-button"
              onClick={() => handleAccept(notification.id)}
            >
              Accept
            </button>
            <button
              className="reject-button"
              onClick={() => handleReject(notification.id)}
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
