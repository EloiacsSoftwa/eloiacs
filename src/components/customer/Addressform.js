import React, { useState } from "react";
import { Button, FormGroup, FormLabel, Form, Modal } from "react-bootstrap";

function AddressForm({ addresstoggle }) {
  const [show, setShow] = useState(true);
  const [formData, setFormData] = useState({
    addressType: "Contact Address",
    customeraddress: "",
    city: "",
    emirates: "",
    country: "",
    zip: "",
  });
  const [savedFormData, setSavedFormData] = useState(null);

  const handleClose = () => {
    setShow(false);
    addresstoggle();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setSavedFormData({ ...formData });
    handleClose();
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
          <div className="f-14 d-flex flex-row" style={{ flex: "1" }}>
            <FormGroup
              style={{
                display: "flex",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
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
                className="f-14 br_b-2 rounded-0 mt-2 inputfocus"
                style={{ border: "2px dotted #25316f" }}
                placeholder="Address"
                name="customeraddress"
                value={formData.customeraddress}
                onChange={handleChange}
              />
              <FormGroup className="f-14 d-flex justify-space-between">
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Emirates"
                  name="emirates"
                  value={formData.emirates}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup className="f-14 d-flex justify-space-between">
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                  name="country"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleChange}
                />
                <Form.Control
                  className="f-14 br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                  style={{ border: "2px dotted #25316f" }}
                  placeholder="Zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormGroup>
          </div>
          {/* Display form data values */}
          {savedFormData && (
            <div className="mt-3">
              <h5>Saved Form Data:</h5>
              <p>Address Type: {savedFormData.addressType}</p>
              <p>Customer Address: {savedFormData.customeraddress}</p>
              <p>City: {savedFormData.city}</p>
              <p>Emirates: {savedFormData.emirates}</p>
              <p>Country: {savedFormData.country}</p>
              <p>Zip: {savedFormData.zip}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          
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

export default AddressForm;
