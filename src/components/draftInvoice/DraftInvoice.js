import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  GET_ALL_PRODUCTS_API_CALL,
  GET_ALL_CUSTOMERS_API_CALL,
  SEARCH_CUSTOMER_API_CALL,
  CREATE_INVOICE_API_CALL,
  ERROR_CODE_FAILURE,
  RESET_CODE,
  SUCCESS_CODE_NO,
  GET_PAYMENT_SUMMARY_API_CALL,
  GET_INVOICE_DETAILS_API_CALL,
  UPDATE_DRAFTED_INVOICE_API_CALL
} from "../../utils/Constant";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";
import DraftInvoiceForm from "./DraftInvoiceForm";
import "../invoice/Invoice.css";
import { BeatLoader } from "react-spinners";
import moment from 'moment';

const DraftInvoice = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation()
  
  //use State
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
  // const [error, setError] = useState("");
  const [showTypeahead, setShowTypeahead] = useState(true);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  //Handlers
  const handletoggleDraft = () => {
    setIsTaxInvoive(!isTaxInvoice);
  };

  useEffect(() => {
    // const currentDate = new Date().toISOString().split("T")[0];
    // setInvoiceDate(currentDate);
    // calculateDueDate(currentDate, selectedNet);

    // dispatch({ type: GET_ALL_PRODUCTS_API_CALL });
    // dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
  }, []);


  useEffect(() => {
    if (props.invoice.invoiceDetails.invoiceDate) {
      let date = moment(props.invoice.invoiceDetails.dateDueDate, 'YYYY-MM-DD').format('yyyy-MM-DD')
      let dt = new Date(date)

      let invoiceDate = new moment(props.invoice.invoiceDetails.invoiceDate, 'YYYY-MM-DD').format('yyyy-MM-DD')
      let dt1 = new Date(invoiceDate);

      setDueDate(dt.toISOString().split("T")[0])
      setInvoiceDate(dt1.toISOString().split("T")[0])
    }
  }, [props.invoice.invoiceDetails])

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

  useEffect(() => {
    dispatch({ type: GET_INVOICE_DETAILS_API_CALL, payload: { requestId: location.state.id } })
  }, [location.state.id])

  const handleCustomerSelection = (selected) => {
    setSelectedCustomer(selected[0]);
    setShowTypeahead(!selected[0]);

    dispatch({
      type: GET_PAYMENT_SUMMARY_API_CALL,
      payload: { customerId: selected[0]?.id },
    });
  };

  const handleSearchChange = (query) => {
    dispatch({
      type: SEARCH_CUSTOMER_API_CALL,
      payload: { query },
    });
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

  useEffect(() => {
    dispatch({ type: RESET_CODE });
  }, []);

  const resetValues = () => {
    setSelectedCustomer("");
    setAllItems([]);
  };

  const setValues = (items) => {
    setAllItems(items)
  }

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      resetValues();
      dispatch({ type: RESET_CODE });
      toast(props.common.errorMessage, {
        type: "error",
        onClose: () => { },
      });
    }
  }, [props.common.code]);

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      dispatch({ type: RESET_CODE });
      setLoading(false)
      toast("Successfully Created Invoice", {
        type: "success",
      });
      navigation(-1)
    }
  }, [props.common.successCode]);

  const handleSubmit = (isDrafted) => {
    const customerError = "Please enter customer name";
    // setError("");
    // if (selectedCustomer.length === 0) {
    //   setError(customerError);
    //   return;
    // }

    const tempArray = allItems.map((item) => {
      return {
        productId: item.id,
        description: item.description,
        quantity: item.qty,
        unitPrice: item.price,
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
      createdBy: props.loginUsers.loginId,
      customerId: selectedCustomer.id,
      invoiceDate: invoiceDate,
      dueDate: dueDate,
      net: selectedNet,
      referenceNumber: "Nil",
      memo: description,
      globalDiscount: globalDiscountState,
      isDrafted: isDrafted,
      products: tempArray,
      invoiceId: location.state.id,
      customerId: props.invoice.invoiceDetails.customerId
    };
    setLoading(true)
    dispatch({ type: UPDATE_DRAFTED_INVOICE_API_CALL, payload: requestData });
  };

  return (
    <>
     <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Container fluid className="mt-2 ">
        <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
          <Row>
            <Col className="d-flex justify-content-end">
              <div>
                <Link
                  to="/Invoice"
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

                <Button
                    className="ms-3 fw-bolder"
                    style={{
                      backgroundColor: "#777780",
                      borderColor: "#333333",
                      color: "#FFFFFF",
                      display: 'none' //new 
                    }}
                    onClick={() => {handleSubmit(true)}}
                  >
                    Save as draft
                  </Button>

                <Button className="ms-3 btn-save" onClick={() => {handleSubmit(false)}}>
                  { "Save"}
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
                    <strong style={{ fontSize: 12 }}>Bill From:</strong> <br />
                    <strong style={{ fontSize: 14 }}>H&T HOLIDAYS</strong>{" "}
                    <br />
                    <small style={{ fontSize: 12 }}>Tours & Travels</small>{" "}
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

                  <p
                    className={`inputfocus text-start rounded-1 p-2`}
                    style={{ width: 250, backgroundColor: "#f0f0f0" }}
                  >
                    <strong onClick={() => setShowTypeahead(!showTypeahead)}>
                      {props.invoice.invoiceDetails.customerName}
                    </strong>
                    <br />
                    { (
                      <div>
                        <small>
                          {props.invoice.invoiceDetails?.addressLine1}
                        </small>
                        ,<br />
                        <small>{props.invoice.invoiceDetails?.city}</small>,{" "}
                        <small>{props.invoice.invoiceDetails?.state}</small>{" "}
                        <br />
                        <small>
                          {props.invoice.invoiceDetails?.countryName}
                        </small>
                      </div>
                    )}
                  </p>

                  {/* {showTypeahead ? (
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
                      <strong onClick={() => setShowTypeahead(!showTypeahead)}>
                        {selectedCustomer.name}
                      </strong>
                      <br />
                      {selectedCustomer.addresses && (
                        <div>
                          <small>
                            {selectedCustomer.addresses[0]?.addressLine1}
                          </small>
                          ,<br />
                          <small>{selectedCustomer.addresses[0]?.city}</small>,{" "}
                          <small>{selectedCustomer.addresses[0]?.state}</small>{" "}
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
                  )} */}
                </Form.Group>
              </Col>
              <Col className="col-4 d-flex justify-content-end">
                <p>
                  <strong>
                    Balance: {props.payment.totalOutstanding.toFixed(2)} AED{" "}
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
                        selected={net.value === props.invoice.invoiceDetails.net}
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
                    value={props.invoice.invoiceDetails.createdBy}
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
      <DraftInvoiceForm
        values={setValues}
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
    payment: state.payment,
    common: state.commonReducer,
    invoice: state.invoice
  };
};
export default connect(mapsToProps)(DraftInvoice);
