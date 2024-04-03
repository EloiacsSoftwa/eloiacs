import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalHeader,
  ModalTitle,
  Row,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  SEARCH_CUSTOMER_API_CALL,
  CREATE_PURCHASE_ORDER_API_CALL,
  RESET_CODE,
  ERROR_CODE_FAILURE,
  SUCCESS_CODE_NO,
  GET_PAYMENT_SUMMARY_API_CALL,
  RESET_CUSTOMER_LISTS
} from "../../utils/Constant";
import PurchaseForm from "./PurchaseForm";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "./Purchase.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";

const NewPurchase = (props) => {
  // console.log(props);
  // const dispatch = useDispatch();

  //use State
  const [purchaseDate, setPurchaseDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [allItems, setAllItems] = useState([]);
  const [globalDiscountState, setGlobalDiscount] = useState(0);
  const [description, setDescription] = useState("");
  const [vatChecked, setVatChecked] = useState(false);
  const [error, setError] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [supplierOptions, setSupplierOptions] = useState([]);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

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
  const [showTypeahead, setShowTypeahead] = useState(true);

  const resetValues = () => {
    setSelectedSupplier("");
    setAllItems([]);
  };

  //Handlers

  //getting current date and due date
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    calculateDueDate(currentDate, selectedNet);
    setPurchaseDate(currentDate);
  }, []);

  const calculateDueDate = (date, net) => {
    const dueDate = new Date(date);
    dueDate.setDate(dueDate.getDate() + net);
    setDueDate(dueDate.toISOString().split("T")[0]);
  };

  const handleNetChange = (e) => {
    const selectedNetValue = parseInt(e.target.value);
    setSelectedNet(selectedNetValue);
    calculateDueDate(purchaseDate, selectedNetValue);
  };

  // getting supplier name
  useEffect(() => {
    if (props.customers.searchList?.length > 0 && props.customers.searchList[0].businessTypeId != 3) {
      dispatch({ type: RESET_CUSTOMER_LISTS })
      dispatch({
        type: SEARCH_CUSTOMER_API_CALL,
        payload: { businessTypeId: 3 },
      });
    }
    else if (props.customers.searchList?.length === 0) {
      dispatch({
        type: SEARCH_CUSTOMER_API_CALL,
        payload: { businessTypeId: 3 },
      });
    }
  }, []);

  useEffect(() => {
    if (props.customers.searchList?.length > 0) {
      setSupplierOptions(
        props.customers.searchList.map((item) => ({
          id: item.id,
          userName: item.userName,
          name: item.name,
          addresses: item.addresses,
          mobile: item.mobile,
        }))
      );
    } else {
      setSupplierOptions([]);
    }
  }, [props.customers.searchList]);

  const handleSupplierSelection = (selected) => {
    setSelectedSupplier(selected[0]);
    setShowTypeahead(!selected[0]);
    dispatch({
      type: GET_PAYMENT_SUMMARY_API_CALL,
      payload: { customerId: selected[0]?.id },
    });
  };

  const handleSearchChange = (query) => {
    console.log(query);
    dispatch({
      type: SEARCH_CUSTOMER_API_CALL,
      payload: { query: query, businessTypeId: 3 },
    });
  };

  //Values from PurchaseForm
  const productList = (item) => {
    setAllItems(item);
  };

  const globalDiscount = (value) => {
    setGlobalDiscount(value);
  };

  const overallDescription = (value) => {
    setDescription(value);
  };

  const globalVatChecked = (value) => {
    setVatChecked(value);
  };

  useEffect(() => {
    dispatch({ type: RESET_CODE });
    // dispatch({ type: SEARCH_CUSTOMER_API_CALL });
  }, []);

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

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false);
      toast("Successfully created Purchase Order", {
        type: "success",
        onClose: () => { },
      });
      resetValues();
      dispatch({ type: RESET_CODE });
      navigation(-1);

      // setTimeout(() => {
      //   navigation(-1);
      // }, 2000);
    }
  }, [props.common.successCode]);

  const handleSubmit = () => {
    const refNumError = "Please enter the REF Number";
    const supplierError = "Please select or add supplier";
    setError("");

    // Check for REF Number
    if (refNumber.length === 0) {
      setError(refNumError);
      return;
    }

    // Check for selected supplier
    if (!selectedSupplier) {
      setError(supplierError);
      return;
    }

    // Map allItems to create the products array
    const tempArray = allItems.map((item) => ({
      productId: item.id,
      description: item.description,
      quantity: item.qty,
      unitPrice: item.price,
      discountPercentage: item.discount,
      vatPercentage: item.vat,
      unitPriceTaxInclusive: vatChecked,
    }));

    if (tempArray.length === 0 || !tempArray.length) {
      toast.error("The product table is empty");
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
      toast.error("Price & Quantity cannot be empty or zero for each item");
      return;
    }

    const requestData = {
      createdBy: props.loggedInUser.loginId,
      supplierId: selectedSupplier.id,
      invoiceDate: purchaseDate,
      dueDate: dueDate,
      net: selectedNet,
      referenceNumber: refNumber,
      memo: description,
      globalDiscount: parseFloat(globalDiscountState),
      products: tempArray,
    };
    setLoading(true);
    dispatch({ type: CREATE_PURCHASE_ORDER_API_CALL, data: requestData });
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
        <div style={{ paddingRight: 50, paddingLeft: 50, marginTop: 75 }}>
          <Container fluid className="mt-2">
            <Row className="mt-3">
              <Col className="d-flex justify-content-end">
                <div>
                  <Link to="/Purchase">
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
                      backgroundColor: "#1d1d5e",
                      borderColor: "#1d1d5e",
                    }}
                    onClick={handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </Col>
            </Row>

            <h1
              className="d-flex justify-content-center fs-6 fw-bolder"
              style={{ color: "#1d1d5e" }}
            >
              NEW PURCHASE ORDER
            </h1>

            <>
              <Row className="w-100 mt-3">
                <Col className="col-4">
                  <Form.Group>
                    {showTypeahead ? (
                      <Typeahead
                        className="typeahead br_b-2 p-1"
                        id="supplierName"
                        onChange={handleSupplierSelection}
                        options={supplierOptions}
                        labelKey="name"
                        onInputChange={handleSearchChange}
                        placeholder="+ Add Supplier"
                        style={{ width: 200, border: "2px dotted #25316f" }}
                      />
                    ) : (
                      <p
                        className={`inputfocus text-start rounded-1 p-2 ${selectedSupplier ? "f0f0f0" : ""
                          }`}
                        style={{ width: 250, backgroundColor: "#f0f0f0" }}
                      >
                        <strong
                          onClick={() => {
                            setSelectedSupplier('')
                            setShowTypeahead(!showTypeahead)

                          }}
                        >
                          {selectedSupplier.name}
                        </strong>
                        <br />
                        {selectedSupplier.addresses && (
                          <div>
                            <small>
                              {selectedSupplier.addresses[0]?.addressLine1}
                            </small>
                            ,<br />
                            <small>{selectedSupplier.addresses[0]?.city}</small>
                            ,{" "}
                            <small>
                              {selectedSupplier.addresses[0]?.state}
                            </small>
                            ,{" "}
                            <small>
                              {selectedSupplier.addresses[0]?.zipcode
                                ? selectedSupplier.addresses[0]?.zipcode
                                : null}
                            </small>
                            <br />
                            <small>
                              {selectedSupplier.addresses[0].countryName}
                            </small>
                          </div>
                        )}
                      </p>
                    )}
                  </Form.Group>
                  {error && !selectedSupplier && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      Please enter the supplier name.
                    </p>
                  )}
                </Col>

                <Col className="col-4  d-flex justify-content-center">
                  <div
                    style={{
                      backgroundColor: "#f0f0f0",
                      padding: "8px",
                      width: 300,
                      // height: "auto",
                      borderRadius: 5,
                    }}
                  >
                    <p>
                      <strong style={{ fontSize: 12 }}>Bill To:</strong> <br />
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
                <Col className="col-8 d-flex justify-content-start">
                  <Form.Group>
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Purchase Date
                    </Form.Label>
                    <Form.Control
                      className="inputfocus rounded-0"
                      style={{ height: "30px", fontSize: 14 }}
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                    // readOnly
                    />
                  </Form.Group>

                  <Form.Group className="ms-2">
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Due Date
                    </Form.Label>
                    <Form.Control
                      className="inputfocus rounded-0"
                      style={{ height: "30px", fontSize: 14 }}
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      type="date"
                      readOnly
                    />
                  </Form.Group>

                  <Form.Group className="ms-2">
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Net
                    </Form.Label>
                    <Form.Select
                      className="inputfocus rounded-0"
                      style={{ width: 160, height: "30px", fontSize: 14 }}
                      onChange={handleNetChange}
                    >
                      {netOptions.map((item, index) => (
                        <option
                          key={index}
                          style={{ fontSize: 12, height: 20 }}
                          value={item.value}
                        >
                          {item.label}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="ms-2">
                    <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
                      Ref Number <span style={{ color: "red" }}>*</span>
                    </Form.Label>
                    <Form.Control
                      className="inputfocus rounded-0"
                      style={{ height: "30px", fontSize: 14 }}
                      value={refNumber}
                      onChange={(e) => setRefNumber(e.target.value)}
                    />
                    {error && !refNumber && (
                      <p style={{ color: "red", fontSize: 12 }}>
                        Please enter REF Number.
                      </p>
                    )}
                  </Form.Group>
                </Col>
              </Row>
            </>
          </Container>
        </div>
        <PurchaseForm
          allItems={productList}
          globalDiscountValue={globalDiscount}
          description={overallDescription}
          vatChecked={globalVatChecked}
        />

        <>
          {/* <Modal show={showAlertModal}>
          <ModalHeader>
            <ModalTitle>Purchase Data</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {success === "Success" ? (
              <div className="d-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circle-check"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#3bb54a"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: "31%" }}
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="12" cy="12" r="9" />
                  <path d="M9 12l2 2l4 -4" />
                </svg>
                <p className="mb-0 ml-2">Data Saved Successfully</p>
              </div>
            ) : (
              <Alert variant="danger">Data Saved Unsuccessfully</Alert>
            )}
          </ModalBody>
        </Modal> */}
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
      </div>
    </>
  );
};

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    loggedInUser: state.users,
    purchaseOrder: state.purchaseOrder,
    payment: state.payment,
    common: state.commonReducer,
  };
};

export default connect(mapsToProps)(NewPurchase);
