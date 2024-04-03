import { Button, Col, Row, Table, Modal, Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import { connect, useDispatch } from "react-redux";
import {
  ADD_VEHICLE_API_RESPONSE,
  GET_VEHICLE_API_RESPONSE,
  ADD_VEHICLE_API_CALL,
  GET_VEHICLE_API_CALL,
  ERROR_CODE_FAILURE,
  RESET_CODE,
  SUCCESS_CODE_NO,
} from "../../utils/Constant";
import { toast, ToastContainer } from "react-toastify";
import { BsFillCarFrontFill } from "react-icons/bs";
import { BeatLoader } from "react-spinners";

function Vehicle(props) {
  const [show, setShow] = useState(false);
  const [VehicleType, SetVehicleType] = useState("");
  const [VehicleNumber, SetVehicleNumber] = useState("");
  const [Vehicle, setVehicle] = useState([]);
  const [Error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // console.log("props",props);
  // console.log("props 2",props);

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false);
      setShow(false);
      toast("Success fully Registered", {
        type: "success",
        onClose: () => {
          dispatch({ type: GET_VEHICLE_API_CALL });
        },
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.common.successCode]);

  useEffect(() => {
    if (props.common.code) {
      setLoading(false);
      toast(props.common.errorMessage, {
        type: "error",
      });

      dispatch({ type: RESET_CODE });
    }
  }, [props.common.code]);
  const handlechange = (e) => {
    const { name, value } = e.target;

    if (name === "vehicleType") {
      SetVehicleType(value);
    }

    if (name === "vehicleNumber") {
      SetVehicleNumber(value);
    }
  };

  useEffect(() => {
    // axios
    //   .post("http://68.178.161.233:8080/handt/v2/vehicle/getVehicles")
    //   .then((response) => {
    //     setVehicle(response.data.data);
    //     console.log("the data file", response.data.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching vehicles:", error);
    //   });
    dispatch({ type: GET_VEHICLE_API_CALL });
  }, []);

  useEffect(() => {
    setVehicle(props.Vehicle.vehicleList);
  }, [props.Vehicle.vehicleList]);

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleSubmit = () => {
    if (!VehicleType) {
      setError(true);
      return;
    }

    if (!VehicleNumber) {
      setError(true);
      return;
    }

    setError(false);

    const data = {
      vehicleType: VehicleType,
      vehicleNumber: VehicleNumber,
      createdBy: props.loggedInUser.loginId,
    };

    // axios
    // .post("http://68.178.161.233:8080/handt/v2/vehicle/addVehicle", data)
    // .then((response) => {
    //   console.log("the data", response.data);
    // })
    // .catch((error) => {
    //   console.error("Error:", error);
    // });
    setLoading(true);
    dispatch({ type: ADD_VEHICLE_API_CALL, payload: data });
  };

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
          <ToastContainer />
          <Row className="mt-2 p-2">
            <Col className="d-flex align-items-evenly">
              <p
                className="ms-2 mt-1 fs-5 fw-bolder"
                style={{ color: "#1d1d5e" }}
              >
                <BsFillCarFrontFill
                  style={{ fontSize: 28, color: "#1d1d5e" }}
                />
                Vehicle List
              </p>
            </Col>
            <Col className="text-end">
              <Button
                className="border-0 fw-bolder"
                style={{ backgroundColor: "#1d1d5e", marginRight: 25 }}
                onClick={() => setShow(!show)}
              >
                Add +
              </Button>
            </Col>
          </Row>
          {/* <div style={{ paddingLeft: 50, paddingRight: 50 }}> */}
          <Table size="sm" bordered hover striped>
            <thead>
              <tr style={{ backgroundColor: "#1d1d5e" }}>
                <th
                  scope="col"
                  style={{ backgroundColor: "#1d1d5e", color: "#ffffff" }}
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="text-start"
                  style={{ backgroundColor: "#1d1d5e", color: "#ffffff", paddingLeft: '5%' }}
                >
                  Vehicle Name
                </th>
                <th
                  scope="col"
                  style={{ backgroundColor: "#1d1d5e", color: "#ffffff" }}
                >
                  Vehicle Number
                </th>
                <th
                  scope="col"
                  style={{ backgroundColor: "#1d1d5e", color: "#ffffff" }}
                >
                  Vehicle Status
                </th>
                <th
                  scope="col"
                  style={{ backgroundColor: "#1d1d5e", color: "#ffffff" }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {Vehicle !== null ? (
                Vehicle.length > 0 ? (
                  Vehicle.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td className="text-start" style={{ paddingLeft: '5%' }}>{item.vehicleType}</td>
                      <td>{item.vehicleNumber}</td>
                      <td></td>
                      <td>
                        <MdDeleteForever className="f-18" style={{ cursor: 'disabled' }} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ color: "red" }}>
                      No data found
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="4" style={{ color: "red" }}>
                    No data found,Try after sometime!....
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
          {/* </div> */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "#1d1d5e" }}>
                Vehicle Category
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="p-3">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="fw-bolder">Vehicle Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Vehicle Name"
                    autoFocus
                    name="vehicleType"
                    className="inputfocus"
                    onChange={(e) => {
                      handlechange(e);
                    }}
                  />
                  {Error && !VehicleType && (
                    <p className="error" style={{ color: "red", fontSize: 12 }}>
                      Please enter Vehicle Name (eg:Skoda, BMW)
                    </p>
                  )}
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="fw-bolder">Vehicle Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter the Vehicle Number"
                    autoFocus
                    name="vehicleNumber"
                    className="inputfocus"
                    onChange={(e) => {
                      handlechange(e);
                    }}
                  />
                  {Error && !VehicleNumber && (
                    <p className="error" style={{ color: "red", fontSize: 12 }}>
                      Please enter a Vehicle Number
                    </p>
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <div className="d-flex justify-content-end me-5">
              <Button
                variant="primary"
                onClick={handleSubmit}
                className="border-0 fw-bolder w-30 mb-3 "
                style={{ backgroundColor: "#1d1d5e" }}
              >
                Save Changes
              </Button>
            </div>
          </Modal>
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
}

const mapsToProps = (state) => {
  return {
    loggedInUser: state.users,
    common: state.commonReducer,
    Vehicle: state.Vehicle,
  };
};

export default connect(mapsToProps)(Vehicle);
