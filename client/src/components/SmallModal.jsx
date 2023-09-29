import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { LuChevronsDown } from "react-icons/lu";
import Table from "react-bootstrap/Table";
import "./table.css";
import { Container, Row, Col } from "react-bootstrap";

function Example() {
  const [smShow, setSmShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => setSmShow(true)}
        className="me"
        style={{ width: "340px", height: "5vh", backgroundColor: "#19295a" }} // Adjust the width as needed
      >
        <h2>
          <LuChevronsDown />
        </h2>
      </Button>

      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            <h3> Request sent to</h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table className="custom-table">
            <thead>
              <tr>
                <th>Ambulance</th>
                <td>3</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Hospitals</th>
                <td>5</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
