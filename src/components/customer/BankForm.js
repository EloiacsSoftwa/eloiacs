import React from "react";
import { Button, FormGroup, Modal, Row, Col, FormLabel, FormControl } from "react-bootstrap";

function Bankform({ banktoggle, formData, setFormData }) {
  const handleClose = () => {
    banktoggle();
    // Do not reset the form data here, let the parent handle it
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    
  };

  return (
    <>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={true}
        onHide={handleClose}
        style={{
          width: "100%",
          placeItems: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Bank Form</Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <Row className="">
            <Col className="d-flex flex-column justify-content-end">
              <FormGroup className=" m-2 d-flex flex-row">
                <FormLabel className="f-14 w-100 w-100">
                  Bank Name
                  <FormControl
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className="f-14 w-100 br_b-2 rounded-0 mt-0 me-2 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Number
                  <FormControl
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Country
                  <FormControl
                    name="bankcountry"
                    value={formData.bankcountry}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Account Holder Name
                  <FormControl
                    name="accountholdername"
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
                <FormLabel className="f-14 w-100 ">
                  IBAN No
                  <FormControl
                    name="iban"
                    value={formData.iban}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
              <FormGroup className=" m-2">
                <FormLabel className="f-14 w-100 ">
                  Branch
                  <FormControl
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                    className="inputfocus f-14 br_b-2 rounded-0 inputfocus"
                    type="text"
                    style={{ border: "2px dotted #25316f" }}
                  />
                </FormLabel>
              </FormGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button type="reset" variant="secondary" onClick={handleClose}>
            Close
          </Button>
    
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Bankform;
