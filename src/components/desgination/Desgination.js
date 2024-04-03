import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Table,
} from "react-bootstrap";
import { IoBriefcaseSharp } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, connect } from "react-redux";
import {
  ADD_DESIGNATION_API_CALL,
  ERROR_CODE_FAILURE,
  SUCCESS_CODE_NO,
  RESET_CODE,
  GET_ALL_EMPLOYEE_DESIGNATION_API_CALL
} from "../../utils/Constant";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const Desgination = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [desgination, setDesgination] = useState("");
  const [error, setError] = useState("");
  const [desginationData, setDesginationData] = useState([]);

  console.log("pro",props);

  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setShowModal(false);
    setError("");
  };
  useEffect (() =>{
    dispatch ({type: GET_ALL_EMPLOYEE_DESIGNATION_API_CALL})
  },[])
  

  useEffect(() => {
    console.log(props.common.code);
    console.log(props.common.code === ERROR_CODE_FAILURE);
    if (props.common.code === ERROR_CODE_FAILURE) {
      toast(props.common.errorMessage, {
        type: "error",
        onClose: () => dispatch({ type: RESET_CODE }),
      });
    }
  }, [props.common.code]);

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setDesgination("");
      setShowModal(false);
      toast("Successfully Added the designation", {
        type: "success",
        onClose: () => {
          dispatch({ type: RESET_CODE });
        },
      });
    }
  }, [props.common.successCode]);

  const handleSubmit = () => {
    if (desgination.trim().length === 0) {
      setError("Please add new desgination.");
      return;
    }

    // const isDesignationExists = desginationData.some(
    //   (item) => item.value === desgination
    // );

    // if (isDesignationExists) {
    //   setError("Designation already exists!");
    //   toast.error("Designation already exists!");
    //   return;
    // }

    const reqData = {
      designation: desgination,
      createdBy: props.loginUsers.loginId,
    };

    dispatch({ type: ADD_DESIGNATION_API_CALL, payload: reqData });
  };


  return (
    <>
      <ToastContainer />
      <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
      <Link to="/Expense"><IoIosArrowBack style={{fontSize:25, color:"#1d1d5e"}} /></Link>
        <Container fluid className="mt-1">
          <Row className="mt-2 p-2">
            <Col className="d-flex align-items-evenly">
              <IoBriefcaseSharp style={{ fontSize: 30, color: "#1d1d5e" }} />
              <p
                className="ms-2 mt-1 fs-5 fw-bolder"
                style={{ color: "#1d1d5e" }}
              >
                Desgination Available
              </p>
            </Col>
            <Col className="text-end">
              <Button
                className="border-0 fw-bolder"
                style={{ backgroundColor: "#1d1d5e" }}
                onClick={() => setShowModal(!showModal)}
              >
                Add +
              </Button>
            </Col>
          </Row>

          <div>
            <Table striped hover size="sm" bordered>
              <thead>
                <tr>
                  <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    ID
                  </th>
                  <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    Desgination
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.expense.designationList.map(item=> (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Container>
      </div>
    </>
  );
};

const mapsToProps = (state) => {
  return {
    loginUsers: state.users,
    expense: state.expense,
    common: state.commonReducer,
  };
};

export default connect(mapsToProps)(Desgination);
