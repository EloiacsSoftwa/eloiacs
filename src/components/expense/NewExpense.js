import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Table,
  FormSelect,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import {
  ADD_ALL_EXPENSE_API_CALL,
  GET_ALL_EXPENSE_CATEGORY_API_CALL,
  GET_ALL_EMPLOYEE_API_CALL,
  GET_VEHICLE_API_CALL,
  GET_ALL_EXPENSE_SUBCATEGORY_API_CALL,
  GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL,
  SUCCESS_CODE_NO,
  RESET_CODE,
  ERROR_CODE_FAILURE,
} from "../../utils/Constant";

const NewExpense = (props) => {
  const tableHeader = [
    "Category",
    "ITEM",
    "Sub category",
    "Description",
    "Amount",
  ];
  const [dropdown1Item, setDropdown1Item] = useState();
  const [dropdown2Item, setDropdown2Item] = useState();
  const [MainCategory, setMainCategory] = useState();
  const [Description, setDescription] = useState("");
  const [PaymentDate, setPaymentDate] = useState("");
  const [paymentError, setPaymentError] = useState(false);
  const [Amount, setAmount] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [isVehicle, setIsVehicle] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);
  const [vehicleCatId, setVehicleCatId] = useState(0);
  const [employeeCatId, setEmployeeCatId] = useState(0);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  // Fetching data from Redux store useeffect

  useEffect(() => {
    dispatch({ type: GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL });
  }, []);

  useEffect(() => {
    const tempVehicle = props.expense.expenseMainList.filter((item) => {
      return item.vehicle;
    });

    if (tempVehicle.length > 0) {
      setVehicleCatId(tempVehicle[0].categoryId);
    }

    const tempEmployee = props.expense.expenseMainList.filter((item) => {
      return item.employee;
    });

    if (tempEmployee.length > 0) {
      setEmployeeCatId(tempEmployee[0].categoryId);
    }
  }, [props.expense.expenseMainList]);

  //  Function to handle category submission and select api call
  const handleCategory = (e) => {
    //second dropdown events
    dispatch({ type: GET_ALL_EXPENSE_CATEGORY_API_CALL });

    const tempVehicle = props.expense.expenseMainList.filter((item) => {
      return item.vehicle;
    });

    const tempEmployee = props.expense.expenseMainList.filter((item) => {
      return item.employee;
    });

    if (tempEmployee && e == tempEmployee[0].categoryId) {
      setIsEmployee(true);
      setIsVehicle(false);
      dispatch({ type: GET_ALL_EMPLOYEE_API_CALL });
      dispatch({ type: GET_ALL_EXPENSE_SUBCATEGORY_API_CALL, data: e });
    } else if (tempVehicle && e == tempVehicle[0].categoryId) {
      setIsEmployee(false);
      setIsVehicle(true);
      dispatch({ type: GET_VEHICLE_API_CALL });
      dispatch({ type: GET_ALL_EXPENSE_SUBCATEGORY_API_CALL, data: e });
    } else {
      setIsEmployee(false);
      setIsVehicle(false);
    }
  };

  // function table cat change
  const handleTableCategoryChange = (e) => {
    const tempOther = props.expense.expenseMainList.filter((item) => {
      return !item.employee && !item.vehicle;
    });

    if (!isVehicle && !isEmployee && e == tempOther[0].categoryId) {
      dispatch({ type: GET_ALL_EXPENSE_SUBCATEGORY_API_CALL, data: e });
    }
  };
// toast
useEffect(() => {
  if (props.common.successCode === SUCCESS_CODE_NO) {
    setLoading(false);
    toast("Expense Created Succesfully", {
      type: "success",
      onClose: () => {       
        dispatch({ type: ADD_ALL_EXPENSE_API_CALL });       
      },      
    });
    dispatch({ type: RESET_CODE });
    navigation(-1);   
  }
}, [props.common.successCode]);

//error toast
useEffect(() => {
  if (props.common.code === ERROR_CODE_FAILURE) {
    setLoading(false);
    toast(props.common.errorMessage, {
      type: "error",
      onClose: () => {},
    });
    dispatch({ type: RESET_CODE });
  }
}, [props.common.code]);

  const handleSave = () => {
    // Validation
    if (!PaymentDate) {
      setPaymentError("Payment Date is required");
      return;
    }
    if (!dropdown1Item) {
      setCategoryError("Category is required.");
      return;
    }
    if (!dropdown2Item) {
      setSubCategoryError("Sub category is required");
      return;
    }
    if (!Amount) {
      setAmountError("Amount is required");
      return;
    }

    let catId;

    if (isVehicle) {
      catId = MainCategory;
    } else if (isEmployee) {
      catId = MainCategory;
    } else {
      catId = dropdown1Item;
    }

    // Dispatch action with data
    const requestData = {
      amount: Amount,
      expenseDate: PaymentDate,
      description: Description,
      categoryId: catId,
      subcategoryId: dropdown2Item,
      createdBy: props.loginUsers.loginId,
      employeeId: isEmployee ? dropdown1Item : 0,
      vehicleId: isVehicle ? dropdown1Item : 0,
    };
    setLoading(true)
    dispatch({ type: ADD_ALL_EXPENSE_API_CALL, payload: requestData });
  };
  // props suceess toast
  
  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container fluid className="mt-1">
          <div style={{ paddingRight: 50, paddingLeft: 50, marginTop: 75 }}>
            <ToastContainer />
            <Row className="mt-3 w-100 p-1 d-flex align-items-center">
              <Col className="fs-6 fw-bolder c-b d-flex gap-3 border-none">
                <p className="mt-2">Create Direct Expense</p>
              </Col>
              <Col className="d-flex justify-content-end">
                <div>
                  <Link
                    to="/expense"
                    style={{ textDecoration: "none", color: "#1d1d5e" }}
                  >
                    <Button className="fw-bolder btn-c">Close</Button>
                  </Link>
                  <Button className="ms-3 fw-bolder btn-s" onClick={handleSave}>
                    Save
                  </Button>
                </div>
              </Col>
            </Row>

            <Row className="d-flex align-items-center mt-3 w-100 p-1 mb-3">
              <Col className="d-flex align-items-center">
                <div>
                  <Form>
                    <Form.Group>
                      <div>
                        <Form.Label className="fs-6 fw-bolder">
                          Payment Date <span style={{ color: "red" }}>*</span>
                        </Form.Label>
                        <Form.Control
                          type="date"
                          className={`border rounded-0 inputfocus ${
                            paymentError ? "error" : ""
                          }`}
                          required
                          value={PaymentDate}
                          onChange={(e) => {
                            setPaymentDate(e.target.value);
                            setPaymentError(false);
                          }}
                        />
                        {paymentError && (
                          <p
                            style={{
                              color: "red",
                            }}
                          >
                            {paymentError}
                          </p>
                        )}
                      </div>
                    </Form.Group>
                  </Form>
                </div>
              </Col>
            </Row>

            <div>
              <Table hover size="sm" striped bordered>
                <thead style={{ padding: "0.75rem" }}>
                  <tr>
                    {tableHeader.map((header, index) => (
                      <th
                        key={index}
                        style={{
                          textAlign: "center",
                          verticalAlign: "middle",
                          backgroundColor: "#1d1d5e",
                          color: "white",
                        }}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ alignItems: "center", height: 105 }}>
                    {/* first dropdown starts hre */}
                    <td
                      className="w-max"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        width: "max-content",
                      }}
                    >
                      <FormSelect
                        className="border border-0 inputfocus "
                        name="MainCategory"
                        onChange={(e) => {
                          setMainCategory(e.target.value);
                          handleCategory(e.target.value);
                        }}
                        value={MainCategory}
                      >
                        <option style={{ fontSize: 12 }} value="">
                          Select category
                        </option>
                        {props.expense.expenseMainList.length > 0 &&
                          props.expense.expenseMainList.map((item) => (
                            <option key={item.id} value={item.categoryId}>
                              {item.categoryName}
                            </option>
                          ))}
                      </FormSelect>
                    </td>

                    <td
                      className="w-max"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        width: "max-content",
                        position: "relative",
                      }}
                    >
                      {/* second drop down starting here */}
                      <Form.Select
                        style={{ fontSize: 12 }}
                        className={`rounded-0 inputfocus ${
                          categoryError ? "error" : ""
                        }`}
                        onChange={(e) => {
                          // dropdown-1= main category, dropdown2=dropdown1Item
                          setDropdown1Item(e.target.value);
                          handleTableCategoryChange(e.target.value);
                          setCategoryError(false);
                        }}
                        value={dropdown1Item}
                      >
                        <option style={{ fontSize: 12 }} value="">
                          Select category
                        </option>
                        {isVehicle ? (
                          <>
                            {" "}
                            {props.Vehicle.vehicleList &&
                              props.Vehicle.vehicleList.length > 0 &&
                              props.Vehicle.vehicleList.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {`${item.vehicleNumber} ${item.vehicleType}`}
                                </option>
                              ))}
                          </>
                        ) : isEmployee ? (
                          <>
                            {props.expense.employeeList &&
                              props.expense.employeeList.length > 0 &&
                              props.expense.employeeList.map((item) => (
                                <option key={item.id} value={item.id}>
                                  {item.employeeName}
                                </option>
                              ))}
                          </>
                        ) : (
                          <>
                            {
                              // other categories dropdown
                              props.expense.expenseCategoryList
                                .expenseCategory &&
                                props.expense.expenseCategoryList.expenseCategory
                                  .filter((item) => {
                                    return (
                                      item.id !== vehicleCatId &&
                                      item.id !== employeeCatId
                                    );
                                  })
                                  .map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.value}
                                    </option>
                                  ))
                            }
                          </>
                        )}
                      </Form.Select>
                      {categoryError && (
                        <p
                          style={{
                            color: "red",
                            position: "absolute",
                            bottom: "-5px",
                            left: "0",
                            width: "100%",
                          }}
                        >
                          {categoryError}
                        </p>
                      )}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        position: "relative",
                      }}
                    >
                      <Form.Select
                        className="inputfocus rounded-0"
                        style={{ fontSize: 12 }}
                        onChange={(e) => {
                          // setSelectedSubcategory(e.target.value);
                          setDropdown2Item(e.target.value);
                          setSubCategoryError(false);
                        }}
                        value={dropdown2Item}
                      >
                        <option style={{ fontSize: 12 }} value="">
                          Select Sub category
                        </option>
                        {props.expense.expenseSubcategoryList
                          .expenseSubCategory &&
                          props.expense.expenseSubcategoryList
                            .expenseSubCategory.length > 0 &&
                          props.expense.expenseSubcategoryList.expenseSubCategory.map(
                            (subItem) => (
                              <option key={subItem.id} value={subItem.id}>
                                {subItem.value}
                              </option>
                            )
                          )}
                      </Form.Select>
                      {subCategoryError && (
                        <p style={{ color: "red" }}>{subCategoryError}</p>
                      )}
                    </td>

                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        position: "relative",
                      }}
                    >
                      <Form.Control
                        className="border-0 rounded-0 inputfocus"
                        as="textarea"
                        placeholder="Description"
                        style={{ height: 30 }}
                        onChange={(e) => setDescription(e.target.value)}
                        value={Description}
                      />
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        position: "relative",
                      }}
                    >
                      <Form.Control
                        className={`border-0 rounded-0 inputfocus ${
                          amountError ? "error" : ""
                        }`}
                        type="number"
                        placeholder="AED"
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setAmountError(false);
                        }}
                        value={Amount}
                      />
                      {amountError && (
                        <p
                          style={{
                            color: "red",
                            position: "absolute",
                            bottom: "-5px",
                            left: "0",
                            width: "100%",
                          }}
                        >
                          {amountError}
                        </p>
                      )}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>
        </Container>
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
            // display: "flex",
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
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loginUsers: state.users,
    common: state.commonReducer,
    expense: state.expense,
    Vehicle: state.Vehicle,
  };
};

export default connect(mapStateToProps)(NewExpense);
