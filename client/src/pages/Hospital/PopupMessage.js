import React from "react";
import Modal from "react-bootstrap/Modal";

const PopupMessage = ({ onClose, children }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};

export default PopupMessage;
