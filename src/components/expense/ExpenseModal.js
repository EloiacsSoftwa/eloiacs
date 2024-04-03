import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModalComponent = ({
  show,
  handleClose,
  handleSubmit,
  title,
  children,
}) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      dialogClassName="custom-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-5 fw-bolder c-b">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-start">
        <Button
          type="submit"
          className="btn-s fw-bolder"
          onClick={handleSubmit}
        >
          Save
        </Button>
        <Button className="btn-c fw-bolder" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ExpenseModal = ({
  showContactModal,
  showAccountModal,
  showAddCategoryModal,
  handleCloseContactModal,
  handleCloseAccountModal,
  handleCloseCategoryModal,
}) => {
  const [newContact, setNewContact] = useState("");
  const [bankName, setBankName] = useState("");
  const [newAccount, setNewAccount] = useState("");
  const [newIBAN, setNewIBAN] = useState("");
  const [newBranch, setNewBranch] = useState("");
  const [newAdditional, setNewAdditional] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [categorySubType, setCategorySubType] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categoryAdditional, setCategoryAdditional] = useState("");

  const handleSubmitContact = () => {
    console.log("New contact name:", newContact);
    handleCloseContactModal();
  };
  const handleSubmitAccount = () => {
    // Here you can handle the submission of account details
    console.log("Bank Name:", bankName);
    console.log("Account Number:", newAccount);
    console.log("IBAN Number:", newIBAN);
    console.log("Branch:", newBranch);
    console.log("Additional:", newAdditional);

    // Reset fields
    setBankName("");
    setNewAccount("");
    setNewIBAN("");
    setNewBranch("");
    setNewAdditional("");

    handleCloseAccountModal();
  };
  const handleSubmitCategory = () => {
    console.log("Name: ", categoryName);
    console.log("Sub Type: ", categorySubType);
    console.log("Description: ", categoryDescription);
    console.log("Additional: ", categoryAdditional);

    setCategoryName("");
    setCategorySubType("");
    setCategoryDescription("");
    setCategoryAdditional("");

    handleCloseCategoryModal();
  };

  // const 
  

  return (
    <>
      <ModalComponent
        show={showContactModal}
        handleClose={handleCloseContactModal}
        handleSubmit={handleSubmitContact} // handle submit function
        title="Create Contact"
      >
        <Form>
          <Form.Group>
            <Form.Label className="fs-6 c-b">Contact Name</Form.Label>
            <Form.Control
              type="text"
              className="inputfocus"
              value={newContact}
              onChange={(e) => setNewContact(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </ModalComponent>

      <ModalComponent
        show={showAccountModal}
        handleClose={handleCloseAccountModal}
        handleSubmit={handleSubmitAccount} // handle submit function
        title="Account Details"
      >
        <Form style={{ gap: "30px" }}>
          <Form.Group>
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              className="inputfocus"
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
            />
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              className="inputfocus"
              type="text"
              value={newAccount}
              onChange={(e) => setNewAccount(e.target.value)}
            />
            <Form.Label>IBAN Number</Form.Label>
            <Form.Control
              className="inputfocus"
              type="text"
              value={newIBAN}
              onChange={(e) => setNewIBAN(e.target.value)}
            />
            <Form.Label>Branch</Form.Label>
            <Form.Control
              className="inputfocus"
              type="text"
              value={newBranch}
              onChange={(e) => setNewBranch(e.target.value)}
            />
            <Form.Label>Additional</Form.Label>
            <Form.Control
              className="inputfocus"
              type="text"
              value={newAdditional}
              onChange={(e) => setNewAdditional(e.target.value)}
            />
          </Form.Group>
        </Form>
      </ModalComponent>

      <ModalComponent
        show={showAddCategoryModal}
        handleClose={handleCloseCategoryModal}
        handleSubmit={handleSubmitCategory} // handle submit function
        title="Add Category"
      >
        <Form>
          <Form.Group>
            <Form.Label className="mt-2">Type</Form.Label>
            <Form.Control value="Expense" className="inputfocus" readOnly />
          </Form.Group>
          <Form.Group>
            <Form.Label  className="mt-1">Name <span style={{color:"red"}} >*</span></Form.Label>
            <Form.Control
              className="inputfocus"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Sub Type <span style={{color:"red"}} >*</span></Form.Label>
            <Form.Control
              className="inputfocus"
              type="text"
              value={categorySubType}
              onChange={(e) => setCategorySubType(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Description</Form.Label>
            <Form.Control
              className="inputfocus"
              as="textarea"
              rows={1}
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mt-2">Additional</Form.Label>
            <Form.Control
              className="inputfocus"
              as="textarea"
              rows={3}
              value={categoryAdditional}
              onChange={(e) => setCategoryAdditional(e.target.value)}
            />
          </Form.Group>
        </Form>
      </ModalComponent>
    </>
  );
};

export default ExpenseModal;
