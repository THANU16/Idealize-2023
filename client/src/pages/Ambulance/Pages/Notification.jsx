import React, { useState } from 'react';
import './Notification.css'; // Import your CSS file

const Notification = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'Notification 1' },
    { id: 2, text: 'Notification 2' },
    { id: 3, text: 'Notification 3' },
    // Add more notifications as needed
  ]);

  const handleAccept = (notificationId) => {
    // Handle the "Accept" action for the notification with the specified ID
    // You can add your logic here, such as marking the notification as accepted.
    // For this example, we will remove the notification from the list.
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  const handleReject = (notificationId) => {
    // Handle the "Reject" action for the notification with the specified ID
    // You can add your logic here, such as marking the notification as rejected.
    // For this example, we will remove the notification from the list.
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
  };

  return (
    <div>
          <h1 className='heading1'>Notifications </h1>
        
      <ul className="notification-list">
        {notifications.map((notification) => (
          <li key={notification.id} className="notification-item">
            <span className="notification-text">{notification.text}</span>
            <button className="accept-button" onClick={() => handleAccept(notification.id)}>Accept</button>
            <button className="reject-button" onClick={() => handleReject(notification.id)}>Reject</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
