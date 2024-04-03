import React, { useState } from "react";
import { Button, FormGroup, FormLabel, Form, Modal } from "react-bootstrap";

function VendorAddressform({ addresstoggle }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    addresstoggle();
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter" className="h-20">
            Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["radio"].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  className="inputfocus"
                  inline
                  label="Contact Address"
                  name="group1"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  className="inputfocus"
                  inline
                  label="Invoice Address"
                  name="group1"
                  type={type}
                  id={`inline-${type}-4`}
                />
                <Form.Check
                  inline
                  label="Other Address"
                  name="group1"
                  type={type}
                  id={`inline-${type}-5`}
                />
              </div>
            ))}
          </Form>
          <div className=" f-14 d-flex flex-row" style={{ flex: "1" }}>
            <FormGroup
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContents: "center",
              }}
            >
              <FormLabel
                className="f-20 "
                style={{
                  flex: 2,
                  fontWeight: "bolder",
                  color: "#25316f",
                }}
              >
                Address
              </FormLabel>
            </FormGroup>
            <FormGroup
              style={{
                display: "flex",
                flex: 3,
                flexDirection: "column",
              }}
            >
              <Form.Control
                className=" f-14  br_b-2 rounded-0 mt-2 inputfocus"
                style={{ border: "2px dotted #25316f" }}
                placeholder="Address"
              ></Form.Control>
              <FormGroup className=" f-14 d-flex justify-space-between ">
                <Form.Control
                  className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="City"
                ></Form.Control>
                <Form.Control
                  className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Emirates"
                ></Form.Control>
              </FormGroup>
              <FormGroup className=" f-14 d-flex justify-space-between ">
                <Form.Control
                  className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Country"
                ></Form.Control>
                <Form.Control
                  className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Zip"
                ></Form.Control>
              </FormGroup>
            </FormGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="b-none"
            style={{
              height: "max-content",
              width: "max-content",
              backgroundColor: "#25316f",
            }}
          >
            Save
          </Button>
          <Button
            className="b-none"
            style={{
              height: "max-content",
              width: "max-content",
              backgroundColor: "#25316f",
            }}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default VendorAddressform;
