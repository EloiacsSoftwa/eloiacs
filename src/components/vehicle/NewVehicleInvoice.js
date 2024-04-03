import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useDispatch, connect } from "react-redux";
import { CREATE_VEHICLE_INVOICE_API_CALL, ERROR_CODE_FAILURE, GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL, RESET_CODE, RESET_CUSTOMER_LISTS, SEARCH_CUSTOMER_API_CALL, SUCCESS_CODE_NO } from "../../utils/Constant";
import { Link, useNavigate } from "react-router-dom";
import VehicleInvoiceForm from "./VehicleInvoiceForm";
import { BeatLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";

const NewVehicleInvoice = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const netOptions = [
    { label: "Net 0", value: 0 },
    { label: "Net 5", value: 5 },
    { label: "Net 10", value: 10 },
    { label: "Net 15", value: 15 },
    { label: "Net 30", value: 30 },
    { label: "Net 60", value: 60 },
    { label: "Net 90", value: 90 },
  ];
  const [selectedNet, setSelectedNet] = useState(0);
  const [dueDate, setDueDate] = useState("");
  const [isTaxInvoice, setIsTaxInvoive] = useState(false);
  const [invoiceDate, setInvoiceDate] = useState("");

  const [allItems, setAllItems] = useState([]);
  const [globalDiscountState, setGlobalDiscountState] = useState(0);
  const [description, setDescription] = useState("");
  const [vatChecked, setVatChecked] = useState(false);
  const [error, setError] = useState("");
  const [showTypeahead, setShowTypeahead] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  //Handlers
  const handletoggleDraft = () => {
    setIsTaxInvoive(!isTaxInvoice);
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setInvoiceDate(currentDate);
    calculateDueDate(currentDate, selectedNet);
    // dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
  }, []);

  const calculateDueDate = (date, net) => {
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + net);
    setDueDate(dueDate.toISOString().split("T")[0]);
  };

  const handleNetChange = (e) => {
    const selectedNetValue = parseInt(e.target.value);
    setSelectedNet(selectedNetValue);
    calculateDueDate(invoiceDate, selectedNetValue);
  };

  //Getting customer details;
  useEffect(() => {
    if (props.customers.searchList.length > 0 && props.customers.searchList[0].businessTypeId == 3) {
      dispatch({ type: RESET_CUSTOMER_LISTS });
      dispatch({
        type: SEARCH_CUSTOMER_API_CALL,
        payload: { businessTypeId: 1 || 2 },
      });
    }
    else if (props.customers.searchList.length ===0) {
      dispatch({ type: SEARCH_CUSTOMER_API_CALL, payload: { businessTypeId: 1 || 2 } })
    }    
  }, []);

  useEffect(() => {
    if (props.customers.searchList.length > 0) {
      setCustomerOptions(
        props.customers.searchList.map((item) => ({
          id: item.id,
          userName: item.userName,
          name: item.name,
          addresses: item.addresses,
          mobile: item.mobile,
        }))
      );
    } else {
      setCustomerOptions([]);
    }
  }, [props.customers.searchList]);

  const handleCustomerSelection = (selected) => {
    setSelectedCustomer(selected[0]);
    setShowTypeahead(!selected[0]);
  };

  const handleSearchChange = (query) => {
    dispatch({
      type: SEARCH_CUSTOMER_API_CALL,
      payload: { query },
    });
  };

  //values form InvoiceForm
  const productList = (item) => {
    setAllItems(item);
  };

  const globalDiscount = (value) => {
    setGlobalDiscountState(value);
  };

  const overallDescription = (value) => {
    setDescription(value);
  };

  const globalVatChecked = (value) => {
    setVatChecked(value);
  };

  const resetValues = () => {
    setSelectedCustomer("");
    setAllItems([]);
  };

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      setLoading(false);
      resetValues();
      dispatch({ type: RESET_CODE });
      toast(props.common.errorMessage, {
        type: 'error',
        onClose: () => {},
      });
    }
  }, [props.common.code]);

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false);
      dispatch({ type: RESET_CODE });
      toast('Successfully Created Invoice', {
        type: 'success'
      });
      navigation(-1);
    }
  }, [props.common.successCode]);

  useEffect(()=> {
    dispatch({ type: GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL })
  }, []);

  const vehicleCategoryId = props.expense.expenseMainList.filter((item)=> {
    return item.vehicle;
  })

  const handleSubmit = () => {
    const customerError = "Please enter customer name";
    setError("");
    if (selectedCustomer.length === 0) {
      setError(customerError);
      return;
    }

    const tempArray = allItems.map((item) => {
      return {
        subcategoryId: 0,
        amount: item.price,
        description: item.description,
        incomeDate: invoiceDate,
        employeeId: 0,
        vehicleId: item.id,
        // quantity: item.qty,
        discountPercentage: item.discount,
        vatPercentage: item.vat,
        unitPriceTaxInclusive: vatChecked,
      };
    });

    if (!tempArray || tempArray.length === 0) {
      toast.error("Table values shouldn't be empty");
      return;
    }
    const hasEmptyValues = tempArray.some(
      (item) =>
        item.unitPrice === "" ||
        item.unitPrice === 0 ||
        item.quantity === "" ||
        item.quantity === 0
    );

    if (hasEmptyValues) {
      toast.error("Price and Quantity fields can not be left blank.");
      return;
    }

    const requestData = {
      categoryId:vehicleCategoryId[0].categoryId,
      createdBy: props.loginUsers.loginId,
      customerId: selectedCustomer.id,
      globalDiscount: globalDiscountState,
      incomeInvoiceDate: invoiceDate,
      incomeDueDate: dueDate,
      net: selectedNet,
      referenceNumber: "Nil",
      memo: description,
      isTaxInvoice: true,
      isDrafted: isTaxInvoice,
      items: tempArray,
    };
    // console.log(requestData)
    setLoading(true);
    dispatch({ type: CREATE_VEHICLE_INVOICE_API_CALL, data: requestData })
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
        <ToastContainer position="top-right" autoClose={3000} />
        <Container fluid className="mt-2 ">
          <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
            <Row>
              <Col>
                <Form>
                  <Form.Check
                    style={{ fontWeight: "500", color: "#1d1d5e", display: 'none' }}
                    type="switch"
                    id="custom-switch"
                    label={
                      isTaxInvoice ? "Draft Vehicle Invoice" : "Vehicle Invoice"
                    }
                    value={isTaxInvoice}
                    onChange={handletoggleDraft} 
                  />
                </Form>
              </Col>
              <Col className="d-flex justify-content-end">
                <div>
                  <Link
                    to="/VehicleInvoice"
                    style={{
                      textDecoration: "none",
                      color: "#1d1d5e",
                      fontWeight: "500",
                    }}
                  >
                    <Button
                      className="fw-bolder"
                      style={{
                        backgroundColor: "white",
                        borderColor: "#1d1d5e",
                        color: "#1d1d5e",
                      }}
                    >
                      Close
                    </Button>
                  </Link>
                  <Button className="ms-3 btn-save" onClick={handleSubmit}>
                    {isTaxInvoice ? "Save Draft" : "Save"}
                  </Button>
                </div>
              </Col>
            </Row>

            <h1
              className="d-flex justify-content-center fs-6 fw-bolder"
              style={{ color: "#1d1d5e" }}
            >
              {isTaxInvoice ? "DRAFT INVOICE" : "NEW INVOICE"}
            </h1>

            <>
              <Row className="w-100">
                <Col className="col-4">
                  <div
                    style={{
                      backgroundColor: "#f0f0f0",
                      padding: "8px",
                      width: 300,
                      height: "auto",
                      borderRadius: 5,
                    }}
                  >
                    <p>
                      <strong style={{ fontSize: 12 }}>Bill From:</strong>{" "}
                      <br />
                      <strong style={{ fontSize: 14 }}>
                        H&T HOLIDAYS
                      </strong>{" "}
                      <br />
                      <small style={{ fontSize: 12 }}>
                        Tours & Travels
                      </small>{" "}
                      <br />
                      <small style={{ fontSize: 12 }}>
                        Building No.10 AlNahyan Camp
                      </small>
                      <br />
                      <small style={{ fontSize: 12 }}>
                        Near Executive Suites, Abu Dhabi
                      </small>
                    </p>
                  </div>
                </Col>
                <Col className="col-4 d-flex justify-content-center">
                  <Form.Group>
                    {showTypeahead ? (
                      <Typeahead
                        className="typeahead br_b-2 p-1"
                        id="supplierName"
                        onChange={handleCustomerSelection}
                        options={customerOptions}
                        labelKey="name"
                        onInputChange={handleSearchChange}
                        placeholder="+ Add Customer"
                        style={{ width: 200, border: "2px dotted #25316f" }}
                      />
                    ) : (
                      <p
                        className={`inputfocus text-start rounded-1 p-2 ${
                          selectedCustomer ? "f0f0f0" : ""
                        }`}
                        style={{ width: 250, backgroundColor: "#f0f0f0" }}
                      >
                        <strong
                          onClick={() => {
                            setSelectedCustomer('')
                            setShowTypeahead(!showTypeahead)
                          }}
                        >
                          {selectedCustomer.name}
                        </strong>
                        <br />
                        {selectedCustomer.addresses && (
                          <div>
                            <small>
                              {selectedCustomer.addresses[0]?.addressLine1}
                            </small>
                            ,<br />
                            {/* <small>
                            {selectedCustomer.addresses[0]?.addressLine2}
                          </small>
                          ,<br /> */}
                            <small>{selectedCustomer.addresses[0]?.city}</small>
                            ,{" "}
                            <small>
                              {selectedCustomer.addresses[0]?.state}
                            </small>{" "}
                            <small>
                              {selectedCustomer.addresses[0]?.zipcode
                                ? selectedCustomer.addresses[0]?.zipcode
                                : "null"}
                            </small>
                            ,
                            <br />
                            <small>
                              {selectedCustomer.addresses[0]?.countryName}
                            </small>
                          </div>
                        )}
                      </p>
                    )}
                    {error && !selectedCustomer && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        Please enter the customer name.
                      </p>
                    )}
                  </Form.Group>
                </Col>
                <Col className="col-4 d-flex justify-content-end">
                  <p>
                    <strong>
                      {/* Balance: {props.payment.totalOutstanding.toFixed(2)} AED{" "} */}
                    </strong>
                  </p>
                </Col>
              </Row>
            </>

            <>
              <Row className="mt-3 mb-3">
                <Col className="col-7 d-flex justify-content-start">
                  <Form.Group>
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Invoice Date
                    </Form.Label>
                    <Form.Control
                      className="inputfocus rounded-0"
                      style={{ height: "30px", fontSize: 14 }}
                      type="date"
                      value={invoiceDate}
                      onChange={(e) => setInvoiceDate(e.target.value)}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className="ms-2">
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Due Date
                    </Form.Label>
                    <Form.Control
                      className="inputfocus rounded-0"
                      style={{ height: "30px", fontSize: 14 }}
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className="ms-2">
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Net *
                    </Form.Label>
                    <Form.Select
                      className="inputfocus rounded-0"
                      style={{ width: 175, height: "30px", fontSize: 14 }}
                      onChange={handleNetChange}
                    >
                      {netOptions.map((net, index) => (
                        <option
                          key={index}
                          value={net.value}
                          style={{ fontSize: 12, height: 20 }}
                        >
                          {net.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="ms-2">
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Sales Person
                    </Form.Label>
                    <Form.Control
                      value={props.loginUsers.loginName}
                      className="inputfocus rounded-0"
                      style={{ height: "30px", fontSize: 14 }}
                      readOnly
                    />
                  </Form.Group>
                </Col>
              </Row>
            </>
          </div>
        </Container>
        <VehicleInvoiceForm
          allItems={productList}
          globalDiscount={globalDiscount}
          memo={overallDescription}
          vatChecked={globalVatChecked}
        />
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
    customers: state.customers,
    loginUsers: state.users,
    vehicle: state.Vehicle,
    common: state.commonReducer,
    expense: state.expense,
  };
};

export default connect(mapsToProps)(NewVehicleInvoice);
