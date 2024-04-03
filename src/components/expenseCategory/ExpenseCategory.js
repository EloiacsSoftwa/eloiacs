import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Table,
} from "react-bootstrap";
import { TbCategory } from "react-icons/tb";
// import { FaTrashCan } from "react-icons/fa6";
import { connect, useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoAddCircleOutline } from "react-icons/io5";
import {
  GET_ALL_EXPENSE_API_CALL,
  ADD_EXPENSE_CATEGORY_API_CALL,
  SUCCESS_CODE_NO,
  ERROR_CODE_FAILURE,
  RESET_CODE,
  ADD_EXPENSE_SUB_CATEGORY_API_CALL,
  GET_ALL_EXPENSE_CATEGORY_API_RESPONSE,
  GET_ALL_EXPENSE_CATEGORY_API_CALL,
  GET_ALL_EXPENSE_SUBCATEGORY_API_CALL,
  GET_ALL_EXPENSES_SUB_CATEGORIES_API_CALL,
} from "../../utils/Constant";
import ExpenseSubCategoriesCard from "./ExpenseSubCategoriesCard";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { MdOutlineFormatListNumberedRtl } from "react-icons/md";

const ExpenseCategory = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isOldUi, setOldUi] = useState(false)
  const [isCategoryAdded, setCategoryAdded] = useState(false)
 
  const [showSubModal, setShowSubModal] = useState(false);
  const [categoryId, setCategoryId] = useState();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // modal sub category
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setExpenseCategory("");
    setError("");
  };

  const handleSubModal = () => {
    setShowSubModal(false);
    setSubCategory("");
    setError("");
  };
  // sub category add
  const navigateToNewModal = (id) => {
    setShowSubModal(true);
    setCategoryId(id);
  };
  // sub categor show
  const navigateToNewsubModal = (id) => {
    setShow(true);
    console.log("id", id);
    dispatch({ type: GET_ALL_EXPENSE_SUBCATEGORY_API_CALL, data: id });
    console.log("sub", props.expense.expenseSubcategoryList.expenseSubCategory);
  };
  console.log(props.expense.expenseSubcategoryList);

  // get expense category api
  useEffect(() => {
    dispatch({ type: GET_ALL_EXPENSE_CATEGORY_API_CALL });
    dispatch({ type: GET_ALL_EXPENSES_SUB_CATEGORIES_API_CALL })
  }, []);
  const expenseCategoryListALL = props.expense.expenseCategoryList;

  useEffect(() => {
    setData(expenseCategoryListALL.expenseCategory);
  }, [expenseCategoryListALL.expenseCategory]);

  // success toast
  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false);
      if (isCategoryAdded) {
        dispatch({ type: GET_ALL_EXPENSE_CATEGORY_API_CALL });
      }
      else {
        dispatch({ type: GET_ALL_EXPENSES_SUB_CATEGORIES_API_CALL })
      }
      setCategoryAdded(false)
      

      setShowModal(false);
      setShowSubModal(false);
      setExpenseCategory("")
      setSubCategory(null)
      toast("Category Added Succesfully", {
        type: "success",
        onClose: () => {
          setShowModal(false);
          setShowSubModal(false);
          dispatch({ type: GET_ALL_EXPENSE_CATEGORY_API_CALL });
        },
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.common.successCode]);

  //error toast
  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      setLoading(false);
      toast(props.common.errorMessage, {
        type: "error",
        onClose: () => { },
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.common.code]);

  // submit button
  const handleSubmit = () => {
    if (expenseCategory.trim().length === 0) {
      setError("Please add new category.");
      return;
    } else {
      setError("");
    }


    const reqData = {
      categoryName: expenseCategory,
      createdBy: props.loginUsers.loginId,
    };
    setLoading(true);
    dispatch({ type: ADD_EXPENSE_CATEGORY_API_CALL, payload: reqData });
  };

  // sub category submit button

  const handleSubmitSub = () => {
    if (subCategory.trim().length === 0) {
      setError("Please enter sub-category");
      return;
    }
    const bodyData = {
      subCategoryName: subCategory,
      categoryId: categoryId,
      createdBy: props.loginUsers.loginId,
    };
    setLoading(true);
    dispatch({ type: ADD_EXPENSE_SUB_CATEGORY_API_CALL, payload: bodyData });
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
        <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
          {/* <Link to="/Expense">
          <IoIosArrowBack style={{ fontSize: 25, color: "#1d1d5e" }} />
        </Link> */}
          {
            isOldUi ? <Container fluid className="mt-1 ">
              <Row className="mt-2 p-2">
                <Col className="d-flex align-items-evenly">
                  <TbCategory style={{ fontSize: 30, color: "#1d1d5e" }} />
                  <p
                    className="ms-2 mt-1 fs-5 fw-bolder"
                    style={{ color: "#1d1d5e" }}
                  >
                    Expense Category
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

              <div
                style={{ overflowY: "scroll", minHeight: 350, maxHeight: 550 }}
              >
                <Table striped hover size="sm" bordered>
                  <thead>
                    <tr>
                      <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                        ID
                      </th>
                      <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                        Category
                      </th>
                      <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item) => (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.value}</td>
                          <td>
                            <IoAddCircleOutline
                              style={{ color: "#555555", cursor: "pointer" }}
                              onClick={() => {
                                navigateToNewModal(item.id);
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Container> : <div>
            <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', paddingRight: 70, paddingTop: 25}}>
              <div style={{backgroundColor: '#1D1D5E', paddingRight: 18, paddingLeft: 18, paddingTop: 8, paddingBottom: 8, borderRadius: 10, cursor: 'pointer'}} onClick={() => {
                setShowModal(!showModal)
                setCategoryAdded(true)
                }}>
              <label style={{color: '#F8F8F8', cursor: 'pointer'}}>Add New Category</label>
              </div>
            </div>
              <div style={{ paddingLeft: 50, paddingRight: 50, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', paddingTop: 25 }}> 
              {
                data && data.map(item => {
                  return <div style={{ flex: '0 0 33.33%', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
                    <div key={item.id} style={{ flex: 1, borderRadius: 8, borderWidth: 1, borderColor: '#EEEEEE', borderStyle: 'solid' }}>
                      <div style={{ paddingTop: 10, paddingBottom: 10, backgroundColor: '#E5E5E5', borderTopLeftRadius: 8, borderTopRightRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <label style={{ fontSize: 15, fontWeight: 600, color: '#333333' }}>{item.value}</label>
                      </div>
                      <ExpenseSubCategoriesCard item={item} addNewSubCategoryEvent={navigateToNewModal} />
                    </div>
                  </div>
                })
              }
              </div>
            </div>
          }

        </div>

        <>
          <Modal centered show={showModal} onHide={handleCloseModal}>
            <ModalHeader closeButton>
              <ModalTitle style={{ color: "#1d1d5e" }}>Category</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    Expense Category <span style={{ color: "red" }}>*</span>
                  </Col>
                  <Col>
                    <FormControl
                      className="inputfocus rounded-0"
                      type="text"
                      value={expenseCategory}
                      onChange={(e) => setExpenseCategory(e.target.value)}
                    />
                    {error && !expenseCategory && (
                      <p style={{ fontSize: 12, color: "red" }}>
                        Please add a Category!
                      </p>
                    )}
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

        <>
          <Modal centered show={showSubModal} onHide={handleSubModal}>
            <ModalHeader closeButton>
              <ModalTitle style={{ color: "#1d1d5e" }}>Sub-Category</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    Sub Category <span style={{ color: "red" }}>*</span>
                  </Col>
                  <Col>
                    <FormControl
                      className="inputfocus rounded-0"
                      type="text"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                    />
                    {error && !subCategory && (
                      <p style={{ fontSize: 12, color: "red" }}>
                        Please add a sub-category!
                      </p>
                    )}
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
                onClick={handleSubmitSub}
              >
                Save
              </Button>
            </ModalFooter>
          </Modal>
        </>
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
        {/*  modal*/}
        <Modal className="mt-5" show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Sub Category List</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              <ul>
                {props.expense.expenseSubcategoryList &&
                  props.expense.expenseSubcategoryList?.expenseSubCategory?.map(
                    (item) => <li key={item.id}>{item.value}</li>
                  )}
              </ul>
            </>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

const mapsToProps = (state) => {
  return {
    loginUsers: state.users,
    common: state.commonReducer,
    expense: state.expense,
  };
};

export default connect(mapsToProps)(ExpenseCategory);
