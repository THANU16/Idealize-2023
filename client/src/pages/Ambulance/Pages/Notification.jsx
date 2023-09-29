import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import "./Notification.css"; // Import your CSS file
import axios from "axios";
import moment from "moment";

import user_profile from "../../../assets/icons/user_profile.svg";
const useWebSockets = (
  sessionToken,
  typeID,
  updateRequestData,
  updateHospitalReqData
) => {
  useEffect(() => {
    // Construct the WebSocket URL with headers as query parameters

    const websocketUrl = `${process.env.REACT_APP_WEBSOCKET_URL}/?sessionToken=${sessionToken}&typeID=${typeID}`;

    const websocket = new WebSocket(websocketUrl);

    websocket.onopen = () => {
      console.log("connected");
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
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
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState([]);
  const [hospitalReqData, setHospitalReqData] = useState(false);
  const sessionToken = JSON.parse(sessionStorage.getItem("sessionToken"));
  const typeID = JSON.parse(sessionStorage.getItem("typeID"));
  const [isNewRequest, setIsNewRequest] = useState(true);
  // Create a function to update requestData
  const updateRequestData = (newData) => {
    setRequestData([...requestData, newData]); // Assuming newData is an object you want to add to requestData
  };

  // Create a function to update requestData
  const updateHospitalReqData = (newData) => {
    setHospitalReqData(newData); // Assuming newData is an object you want to add to requestData
    sessionStorage.setItem("hospitalReqData", JSON.stringify(newData));
    navigate("/show");
  };

  // Pass updateRequestData to useWebSockets
  useWebSockets(sessionToken, typeID, updateRequestData, updateHospitalReqData);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/hospital/getRequest`)
      .then((res) => {
        if (res.data.sucess) {
          setNotifications(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, [requestData]);
  // console.log(notifications);

  const handleAccept = (notification) => {
    const currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss");
    const ambulancedata = JSON.parse(sessionStorage.getItem("ambulance"));
    const data = {
      ambulanceID: ambulancedata.ambulanceID,
      userID: notification.userID,
      requestID: notification.requestID,
      //  we want to set the current location of the ambulance driver location =========================================================
      // ======================================================
      // Please consider
      // =======================================================================
      // =====================================================
      // =======================================
      latitude: notification.lat,
      longtitude: notification.lng,
      connectedTime: currentDateTime,
    };


    axios
      .post(
        `${process.env.REACT_APP_API_URL}/emergency/ambulanceAcceptReq`,
        data,
        { headers: { Authorization: "key " + sessionToken } }
      )
      .then((response) => {
        if (response.data.success) {
          navigate("/show");
        }

        // You can update the state or perform other actions based on the response
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error("Assign Ambulance Error:", error);
      });
  };
  function formatTime(dateTimeString) {
    const dateTime = new Date(dateTimeString);
    const hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const seconds = dateTime.getSeconds();
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  const handleReject = (notificationId) => {
    // Handle the "Reject" action for the notification with the specified ID
    // You can add your logic here, such as marking the notification as rejected.
    // For this example, we will remove the notification from the list.
  };


  return (
    <div>
      <h1 className="heading1">Notifications</h1>
      <ul className="notification-list">
        {notifications.map((notification, index) => (
          <li
            key={index}
            className={`notification-item ${index % 2 === 0 ? "even" : "odd"}`}
          >
            <p>
              <img src={user_profile} alt="User Profile" />
            </p>
            <p style={{ fontWeight: "bold" }}>
              {moment(notification.requestedTime).format("HH:mm:ss")}
            </p>
            <button
              className="ambulance-accept-button"
              onClick={() => handleAccept(notification)}
            >
              Accept
            </button>
            <button
              className="ambulance-reject-button"
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
