// import React, { useState, useContext } from "react";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useNavigate } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { UserContext } from "../../../UserContext";


// function Logout({ show, onHide }) {
//   const navigate = useNavigate();
//   const { setUser } = useContext(UserContext);


//   const handleCancel = (event) => {
//     navigate("/Home");
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     setUser(null);
//     sessionStorage.removeItem("sessionToken");
//     sessionStorage.removeItem("type_id");
//     navigate("/login");
//   };

//   return (
//     <>
//       <Modal
//         show={show}
//         onHide={onHide}
//         backdrop="static"
//         keyboard={false}
//         centered
//       >
//         <Modal.Header>
//           <Modal.Title>Do you want to Logout</Modal.Title>
//         </Modal.Header>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCancel} className="mx-2">
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={handleSubmit} type="submit">
//             Logout
//           </Button>

         
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// }

// export default Logout;
