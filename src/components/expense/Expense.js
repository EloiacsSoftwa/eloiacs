import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Button,
  FormControl,
  Row,
  Table,
  Dropdown,
  ButtonGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputGroup from "react-bootstrap/InputGroup";
import { FaSearch } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineDevicesOther } from "react-icons/md";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import "./Expense.css";
import { CiCreditCard2 } from "react-icons/ci";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import {
  GET_ALL_EXPENSE_API_CALL,
  GET_ALL_EXPENSE_API_RESPONSE,
  GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL,
} from "../../utils/Constant";

const Expense = (props) => {
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [expenseData, setExpenseData] = useState([]);
  const [showEmployee, setShowEmployee] = useState(false);
  const [showVehicle, setShowVehicle] = useState(false);
  const [showOtherCategory, setShowOtherCategory] = useState(true);
  const [vehicleCatId, setVehicleCatId] = useState(0);
  const [employeeCatId, setEmployeeCatId] = useState(0);
  const [isVehicle, setIsVehicle] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL });
  }, []);

  useEffect(() => {
    const tempVehicle = props.expense.expenseMainList.filter((item) => {
      return item.vehicle;
    });

    if (tempVehicle.length > 0) {
      setVehicleCatId(tempVehicle[0].categoryId);
      setIsVehicle(true);
    }

    const tempEmployee = props.expense.expenseMainList.filter((item) => {
      return item.employee;
    });

    if (tempEmployee.length > 0) {
      setEmployeeCatId(tempEmployee[0].categoryId);
      setIsEmployee(true);
    }
  }, [props.expense.expenseMainList]);

  console.log("employee", employeeCatId);
  console.log("vehicssle", vehicleCatId);
  // const handleDateChange = (dates) => {
  //   if (dates === NaN) {
  //     setStartDate();
  //     setEndDate();
  //   } else {
  //     const [start, end] = dates;
  //     setStartDate(start);
  //     setEndDate(end);
  //   }
  // };

  //Dummy Values
  const [othercategoryHeader, setotherCategoryHeader] = useState([
    { id: 1, value: "Date" },
    { id: 2, value: "Category" },
    { id: 3, value: "Sub-Category" },
    { id: 4, value: "Description" },
    { id: 5, value: "Amount" },
  ]);

  const [employeeHeader, setEmployeeHeader] = useState([
    { id: 1, value: "Date" },
    { id: 2, value: "Employee Name" },
    { id: 3, value: "Sub-Category" },
    { id: 4, value: "Description" },
    { id: 5, value: "Amount" },
  ]);

  const [vehicleHeader, setVehicleHeader] = useState([
    { id: 1, value: "Date" },
    { id: 2, value: "Vehicle Name" },
    { id: 3, value: "Vehicle Type" },
    { id: 4, value: "Sub-Category" },
    { id: 5, value: "Description" },
    { id: 6, value: "Amount" },
  ]);

  const handleEmployee = () => {
    setShowEmployee(true);
    setShowVehicle(false);
    setShowOtherCategory(false);
  };

  const handleVehicle = () => {
    setShowEmployee(false);
    setShowVehicle(true);
    setShowOtherCategory(false);
  };

  const handleOtherCategory = () => {
    setShowEmployee(false);
    setShowVehicle(false);
    setShowOtherCategory(true);
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_EXPENSE_API_CALL });
  }, []);

  console.log("lisst", props.expense.getexpenseList.expenses);

  return (
    <>
      <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
        <Container fluid className="mt-1">
          <Row className="w-100 mt-2 p-2 mb-3">
            <Col
              className="col-2 fw-bolder"
              style={{ color: "#1d1d5e", fontSize: 16 }}
            >
              <CiCreditCard2 style={{ fontSize: 36, color: "1d1d5e" }} />
              <u
                className="ms-1"
                style={{ textDecorationColor: "#1d1d5e", cursor: "pointer" }}
              >
                <Link to="/NewExpense" style={{ color: "#1d1d5e" }}>
                  Create New Expense
                </Link>
              </u>
            </Col>
            <Col className="col-4 d-flex justify-content-center">
              <InputGroup style={{ width: 300 }}>
                <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                  <FaSearch className="text-white" />
                </InputGroupText>
                <FormControl
                  placeholder="Search Expense..."
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
            <Col className="col-6 d-flex justify-content-end">
              {/* <div>
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  startDate={startDate}
                  endDate={endDate}
                  dateFormat={"dd/MM/yyyy"}
                  selectsRange
                  placeholderText="Select Date Range"
                  className="rounded ms-2 inputfocus"
                />
              </div> */}
            </Col>
          </Row>
          <Row>
            <Col
              lg={2}
              xxl={2}
              className="border border-3 d-flex flex-column shadow"
              style={{
                height: 470,
              }}
            >
              <div className="d-flex flex-column justify-content-between align-items-between p-3 ">
                <h3 className="mt-5"><AiOutlineTeam style={{fontSize:20,  color:'#1d1d5e'}} />
                  <u
                    className="p-3 mt-5"
                    style={{ color: "#25316f", cursor: "pointer" }}
                    onClick={handleEmployee}
                  >
                    Employee
                  </u>
                </h3>
                <h3 className="mt-3">< IoCarSportOutline style={{fontSize:20,  color:'#1d1d5e' }}/>
                  <u
                    className="p-3 mt-5"
                    style={{ color: "#25316f", cursor: "pointer" }}
                    onClick={handleVehicle}
                  >
                    Vehicle
                  </u>
                </h3>
                <h3 className="mt-3">< MdOutlineDevicesOther style={{fontSize: 20 , color:'#1d1d5e'}}/>
                  <u
                    className="p-3"
                    style={{ color: "#25316f", cursor: "pointer" }}
                    onClick={handleOtherCategory}
                  >
                    Other Category
                  </u>
                </h3>
              </div>
            </Col>
            <Col lg={10} xxl={10} style={{maxHeight:475 , minHeight:250 , overflowY:'scroll'}}>
              {showEmployee && (
                <Table striped bordered size="sm">
                  <thead>
                    <tr>
                      {employeeHeader.map((item) => (
                        <th className="ps-5 text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft:'2%' }} key={item.id}>{item.value}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {props.expense.getexpenseList.expenses ? (
                      props.expense.getexpenseList.expenses
                        .filter((item) => item.categoryId !== vehicleCatId && item.categoryId === employeeCatId)
                        .map((filteredItem) => (
                          <tr key={filteredItem.id} style={{minHeight:75}} >
                            <td className="ps-5 text-start" scope="col">{filteredItem.expenseDate}</td>
                            <td className="ps-5 text-start" scope="col">{filteredItem.employeeName}</td>
                            <td className="ps-5 text-start" scope="col">{filteredItem.subCategoryName}</td>
                            <td className="ps-5 text-start" scope="col">{filteredItem.description}</td>
                            <td className="ps-5 text-start" scope="col">{filteredItem.amount}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="fst-italic" style={{ color: 'red', fontSize: 16 }} >No Employee Expense data available.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
              {showVehicle && (
                <Table striped bordered size="sm">
                  <thead>
                    <tr >
                      {vehicleHeader.map((item) => (
                        <th className="ps-5 text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft:'2%' }} key={item.id}>{item.value}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  {props.expense.getexpenseList.expenses ? (
                      props.expense.getexpenseList.expenses
                        .filter((item) => item.categoryId === vehicleCatId && item.categoryId !== employeeCatId)
                        .map((filteredItem) => (
                          <tr key={filteredItem.id}>
                            <td scope="col" className="ps-5 text-start">{filteredItem.expenseDate}</td>
                            <td scope="col" className="ps-5 text-start">{filteredItem.vehicleType}</td>
                            <td scope="col" className="ps-5 text-start">{filteredItem.vehicleNumber}</td>
                            <td scope="col" className="ps-5 text-start">{filteredItem.subCategoryName}</td>
                            <td scope="col" className="ps-5 text-start">{filteredItem.description}</td>
                            <td scope="col" className="ps-5 text-start">{filteredItem.amount}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="fst-italic" style={{ color: 'red', fontSize: 16 }}>No Vehicle Expense data available.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
              {showOtherCategory && (
                <Table striped bordered size="sm">
                  <thead>
                    <tr>
                      {othercategoryHeader.map((item) => (
                        <th className="text-start ps-5" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft:'2%' }} key={item.id}>{item.value}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                  {props.expense.getexpenseList.expenses ? (
                      props.expense.getexpenseList.expenses
                        .filter((item) => item.categoryId !== vehicleCatId && item.categoryId !== employeeCatId)
                        .map((filteredItem) => (
                          <tr key={filteredItem.id}>
                            <td scope="col" className="text-start ps-5">{filteredItem.expenseDate}</td>
                            <td scope="col" className="text-start ps-5">{filteredItem.categoryName}</td>
                            <td scope="col" className="text-start ps-5">{filteredItem.subCategoryName}</td>
                            <td scope="col" className="text-start ps-5">{filteredItem.description}</td>
                            <td scope="col" className="text-start ps-5">{filteredItem.amount}</td>
                          </tr>
                        ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="fst-italic" style={{ color: 'red', fontSize:16 }}>No Other Expense data available.</td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loginUsers: state.users,
    common: state.commonReducer,
    expense: state.expense,
  };
};

export default connect(mapStateToProps)(Expense);
