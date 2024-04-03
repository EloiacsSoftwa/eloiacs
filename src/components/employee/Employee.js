import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormSelect,
  InputGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Table,
  FormLabel,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaSearch } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./Employee.css";
import { connect, useDispatch } from "react-redux";

import {
  GET_ALL_EMPLOYEE_API_CALL,
  GET_ALL_EMPLOYEE_DESIGNATION_API_CALL,
  ADD_EMPLOYEE_API_CALL,
  SUCCESS_CODE_NO,
  ERROR_CODE_FAILURE,
  RESET_CODE,
  ADD_DESIGNATION_API_CALL,
} from "../../utils/Constant";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useAsync } from "react-bootstrap-typeahead";
import { BeatLoader } from "react-spinners";

const Employee = (props) => {
  //useStates
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [empName, setEmpName] = useState("");
  const [empID, setEmpID] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [error, setError] = useState("");
  const [date, setDate] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [country, setCountry] = useState();
  const [isDesignationOpened, setDesignationOpened] = useState(false);

  // const [employeeData, setEmployeeData] = useState([]);
  const [designationData, setDesginationData] = useState();
  const [desginationID, setDesginationID] = useState();
  const [showDesignationModal, setShowDesignationModal] = useState(false);
  const [designationError, setDesignationError] = useState();
  const [loading, setLoading] = useState(false);

  const navigation = useNavigate();
  const dispatch = useDispatch();

  const tableHeader = [
    "Name",
    "Employee ID",
    "Desgination",
    "DOB",
    "Mobile",
    "City",
    "Country",
  ];

  //Handlers
  const handleCloseModal = () => {
    setShowModal(false);
    setAddress("");
    setDate("");
    setEmpName("");
    setEmpID("");
    setCity("");
    setMobileNo("");
    setCountry("");
    setError("");
  };
  const handleShowModal = () => setShowModal(true);

  useEffect(() => {
    dispatch({ type: GET_ALL_EMPLOYEE_API_CALL });
    dispatch({ type: GET_ALL_EMPLOYEE_DESIGNATION_API_CALL });
  }, []);

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      setLoading(false);
      toast(props.common.errorMessage, {
        type: "error",
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.common.code]);

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false);
      toast(
        isDesignationOpened
          ? "Designation added Successfully"
          : "Added Successfully",
        {
          type: "success",
          onClose: () => {},
        }
      );
      dispatch({ type: RESET_CODE });
      if (isDesignationOpened) {
        setShowModal(true);
        setShowDesignationModal(false);
        setDesignationOpened(false);
      } else {
        dispatch({ type: GET_ALL_EMPLOYEE_API_CALL });
        setShowModal(false);
      }
    }
  }, [props.common.successCode]);

  const handleSubmit = () => {
    const nameError = "Employee Name is Required";
    const empIDError = "Employee ID is Required";
    const mobileError = "10 Digit Mobile Number is required";
    setError("");

    if (empName.length === 0) {
      setError(nameError);
      return;
    }
    if (empID.length === 0) {
      setError(empIDError);
      return;
    }
    if (mobileNo.length !== 10 || isNaN(mobileNo)) {
      setError(mobileError);
      return;
    }
    if (date.length === 0) {
      setError("Select DOB");
      return;
    }
    if (!desginationID) {
      setError("Choose Designation.");
      return;
    } 

    const reqData = {
      employeeName: empName,
      designationId: desginationID,
      dob: date,
      address: address,
      city: city,
      countryId: 1,
      phone: mobileNo,
      createdBy: props.loggedInUser.loginId,
    };
    setLoading(true);
    dispatch({ type: ADD_EMPLOYEE_API_CALL, payload: reqData });
  };

  const EmployeeFormdata = () => {
    setShowModal(false);
    setAddress("");
    setDate("");
    setEmpName("");
    setEmpID("");
    setCity("");
    setMobileNo("");
    setCountry("");
    setError("");
  };

  const addDesignation = () => {
    // navigation('/Desgination')
    setShowModal(false);
    setDesignationOpened(true);
    setShowDesignationModal(true);
  };

  const submitDessignation = () => {
    if (!designationData) {
      setDesignationError("Please add new desgination.");
      return;
    }

    const reqData = {
      designation: designationData,
      createdBy: props.loggedInUser.loginId,
    };
    setLoading(true);
    dispatch({ type: ADD_DESIGNATION_API_CALL, payload: reqData });
  };

  const handleDesignationClose = () => {
    setDesignationOpened(false);
    setShowDesignationModal(false);
    setDesignationError("")
    setShowModal(true);
  };

  return (
    <>
      <ToastContainer />

      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ paddingLeft: 70, paddingRight: 70, marginTop: 75 }}>
          {/* <Link to="/Expense">
          <IoIosArrowBack style={{ fontSize: 25, color: "#1d1d5e" }} />
        </Link> */}
          <Container fluid className="mt-1">
            <Row className="w-100 mt-2 p-2 ">
              <Col
                className="col-5 fw-bolder text-start"
                style={{ color: "#1d1d5e", fontSize: 16 }}
              >
                Employee Details
              </Col>
              <Col className="col-7 d-flex justify-content-end">
                <InputGroup style={{ width: 300 }}>
                  <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                    <FaSearch className="text-white" />
                  </InputGroupText>
                  <FormControl
                    placeholder="Search Employee..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                      background: "#80808036",
                      boxShadow: "none",
                      outline: "none",
                      borderColor: "white",
                    }}
                  />
                </InputGroup>
              </Col>
            </Row>

            <div className="mt-2">
              <Button
                style={{
                  backgroundColor: "#1d1d5e",
                  color: "white",
                  textAlign: "center",
                  borderColor: "#1d1d5e",
                }}
                onClick={handleShowModal}
              >
                New Employee +
              </Button>
            </div>

            <div
              className="mt-3"
              style={{ overflowY: "scroll", minHeight: 100, maxHeight: 350 }}
            >
              <Table striped hover size="sm" bordered>
                <thead>
                  <tr>
                    {tableHeader.map((header, index) => (
                      <th
                        key={index}
                        style={{
                          backgroundColor: "#1d1d5e",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {props.expense.employeeList
                    .filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.employeeName
                            .toLowerCase()
                            .includes(search.toLowerCase());
                    })
                    .map((item) => (
                      <tr key={item.id}>
                        <td className="text-start" style={{ paddingLeft: '2.5%' }}>{item.employeeName}</td>
                        <td>{item.id}</td>
                        <td className="text-start" style={{ paddingLeft: '4.5%' }}>{item.designationName}</td>
                        <td>{item.dob}</td>
                        <td>{item.phone}</td>
                        <td  className="text-start" style={{ paddingLeft: '6%' }}>{item.city}</td>
                        <td>{item.country}</td>
                      </tr>
                    ))}
                  {props.expense.employeeList.filter((item) =>
                    search.item === ""
                      ? item
                      : item.employeeName
                          .toLowerCase()
                          .includes(search.toLowerCase())
                  ).length === 0 && (
                    <tr>
                      <td
                        colSpan={7}
                        className="fst-italic"
                        style={{ color: "red" }}
                      >
                        No data found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Container>

          {/*  -----------------------------Modal Window--------------------------- */}
          <>
            <Modal
              show={showModal}
              onHide={handleCloseModal}
              centered
              dialogClassName="custom-modal"
            >
              <ModalHeader closeButton>
                <ModalTitle style={{ color: "#1d1d5e" }}>
                  Add Employee
                </ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <Row className="d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">
                      Employee Name<span style={{ color: "red" }}>*</span> :
                    </Col>
                    <Col className="col-6 text-end">
                      <FormControl
                        className="inputfocus"
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                      />
                      {error && !empName ? (
                        <p style={{ color: "red", fontSize: 10 }}>
                          Employee Name is Required
                        </p>
                      ) : null}
                    </Col>
                  </Row>
                  <Row className="mt-3 d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">
                      Employee ID<span style={{ color: "red" }}>*</span> :
                    </Col>
                    <Col className="col-6 text-end">
                      <FormControl
                        className="inputfocus "
                        value={empID}
                        onChange={(e) => setEmpID(e.target.value)}
                      />
                      {error && !empID ? (
                        <p style={{ color: "red", fontSize: 10 }}>
                          Employee ID is Required
                        </p>
                      ) : null}
                    </Col>
                  </Row>
                  <Row className="mt-3 d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">
                      DOB<span style={{ color: "red" }}>*</span> :{" "}
                    </Col>
                    <Col className="col-6 text-end">
                      <FormControl
                        className="inputfocus"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                      />
                      {error && !date ? (
                        <p style={{ color: 'red', fontSize: 10 }}>DOB  is required.</p>
                      ) : null}

                    </Col>
                  </Row>
                  <Row className="mt-3 d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">
                      Mobile<span style={{ color: "red" }}>*</span> :
                    </Col>
                    <Col className="col-6 text-end">
                      <FormControl
                        className="inputfocus"
                        type="number"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                      />
                      {error && !mobileNo ? (
                        <p style={{ color: "red", fontSize: 10 }}>
                          Enter Valid Number
                        </p>
                      ) : null}
                    </Col>
                  </Row>
                  <Row className="mt-3 d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">City : </Col>
                    <Col className="col-6 text-end">
                      <FormControl
                        className="inputfocus"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3 d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">Country : </Col>
                    <Col className="col-6 text-end">
                      <FormSelect
                        className="inputfocus"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value={1}>India</option>
                        <option value={2}>UAE</option>
                      </FormSelect>
                    </Col>
                  </Row>
                  <Row className="mt-3 d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">Address : </Col>
                    <Col className="col-6 text-end inputfocus">
                      <FormControl
                        className="inputfocus"
                        as="textarea"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-3 d-flex align-items-center">
                    <Col className="col-6 fs-6 text-start">
                      Desgination<span style={{ color: "red" }}>*</span> :{" "}
                    </Col>
                    <Col className="col-6 inputfocus">
                      <FormSelect
                        className="inputfocus"
                        value={desginationID}
                        onChange={(e) => setDesginationID(e.target.value)}
                      >
                        <option defaultChecked>Select Desgination</option>
                        {props.expense.designationList.map((item) => (
                          <option
                            key={item.id}
                            value={item.id}
                            onChange={(e) => e.target.value}
                          >
                            {item.value}
                          </option>
                        ))}
                        
                      </FormSelect>
                      {error && !desginationID && (
                          <p className="text-end" style={{ color: 'red', fontSize: 10 }}>Select Desgination.</p>
                        )}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onClick={addDesignation}
                      >
                        <label style={{ fontSize: 14 }}></label>
                        <u
                          style={{
                            fontSize: 12,
                            cursor: "pointer",
                            marginLeft: 25,
                            color: "#0d6efd",
                            textDecoration: 'underline'
                          }}
                        >
                          + Add Designation
                        </u>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="fw-bolder me-4"
                  style={{
                    backgroundColor: "#1d1d5e",
                    borderColor: "#1d1d5e",
                    width: 100,
                  }}
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </ModalFooter>
            </Modal>
          </>

          {/* Add Designation Modal */}
          <>
            <Modal
              centered
              show={showDesignationModal}
              onHide={handleDesignationClose}
            >
              <ModalHeader closeButton>
                <ModalTitle style={{ color: "#1d1d5e" }}>
                  Add Desgination
                </ModalTitle>
              </ModalHeader>
              <ModalBody>
                <Form>
                  <FormLabel>
                    Desgination <span style={{ color: "red" }}>*</span>
                  </FormLabel>
                  <FormControl
                    className="inputfocus"
                    type="text"
                    value={designationData}
                    onChange={(e) => setDesginationData(e.target.value)}
                  />
                  {designationError && !designationData && (
                    <p style={{ fontSize: 12, color: "red" }}>
                      Please add a desgination!
                    </p>
                  )}
                </Form>
              </ModalBody>
              <ModalFooter>
                <Button
                  className="fw-bolder "
                  style={{
                    backgroundColor: "#1d1d5e",
                    borderColor: "#1d1d5e",
                    width: 100,
                  }}
                  onClick={submitDessignation}
                >
                  Save
                </Button>
              </ModalFooter>
            </Modal>
          </>
        </div>
        {loading && (
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100vh",
              top: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <div
              style={{
                backgroundColor: "#EEEEEE33",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <BeatLoader color="#1d1d5e" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const mapsToProps = (state) => {
  return {
    loggedInUser: state.users,
    expense: state.expense,
    common: state.commonReducer,
  
  };
};

export default connect(mapsToProps)(Employee);
