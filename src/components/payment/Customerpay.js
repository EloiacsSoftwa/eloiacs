import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Stack,
  Row,
  FormGroup,
  FormControl,
  FormLabel,
  FormSelect,
} from "react-bootstrap";
import { IoMdContact } from "react-icons/io";
import { IoCalendar } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AE } from "country-flag-icons/react/3x2";
import { MdPayments } from "react-icons/md";
import { useDispatch, connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  SEARCH_CUSTOMER_API_CALL,
  MASTER_API_CALL,
  GET_PAYMENT_SUMMARY_API_CALL,
  SUCCESS_CODE,
  RESET_CODE,
  ADD_CUSTOMER_PAYMENT_API_CALL,
  SUCCESS_CODE_NO,
  ERROR_CODE_FAILURE,
  RESET_CUSTOMER_LISTS,
} from "../../utils/Constant";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Customerpay(props) {
  const [masterCategory, setMasterCategory] = useState("");
  const [masterCategoryError, setMasterCategoryError] = useState(false);
  const [amount, setAmount] = useState("");
  // const [paymentType, setPaymenttype] = useState("");
  const [Referenceno, setReferenceno] = useState("");
  const [chequeNumber, setchequeNumber] = useState("");
  const [Chequedate, setChequedate] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [chequerefnum, setChequerefnum] = useState(false); // Define chequerefnum state
  // const [paymentsummary, setPaymentsummary] = useState("");
  const [disableButton, setDisableButton] = useState(false);
  const [errormessage, setErrormessage] = useState("");
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState("");
  const [description, setDescription] = useState("");
  const [paymodeError, setPaymodeError] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [customerOptions, setCustomerOptions] = useState([]);
  const [showTypeahead, setShowTypeahead] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      props.customers.searchList.length > 0 &&
      props.customers.searchList[0].businessTypeId == 3
    ) {
      dispatch({ type: RESET_CUSTOMER_LISTS });
      dispatch({
        type: SEARCH_CUSTOMER_API_CALL,
        payload: { businessTypeId: 1 || 2 },
      });
    } else if (props.customers.searchList.length === 0) {
      dispatch({
        type: SEARCH_CUSTOMER_API_CALL,
        payload: { businessTypeId: 1 || 2 },
      });
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

  //Reset values
  const resetValues = () => {
    setSelectedCustomer("");
    setSelectedPaymentTypeId("");
    setAmount("");
    setReferenceno("");
    setchequeNumber("");
    setChequedate("");
    setCollectionDate("");
  };

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false);
      setDisableButton(true);
      toast("We have received your payment", {
        type: "success",
        onClose: () => {
          dispatch({ type: RESET_CUSTOMER_LISTS });
        },
      });
      resetValues();
      dispatch({ type: RESET_CODE });
      setTimeout(() => {
        navigation(-1);
      }, 2000);
    }
  }, [props.common.successCode]);

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      setLoading(false);
      setDisableButton(false);
      toast(props.common.errorMessage, {
        type: "error",
      });
    }
  }, [props.common.code]);

  // useEffect(() => {
  //   dispatch({type: GET_PAYMENT_SUMMARY_API_CALL, data: {customerId: selectedCustomer?.id}})
  // }, [selectedCustomer]);

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
  }, []);

  useEffect(() => {
    setChequerefnum(selectedPaymentTypeId === "3");
  }, [selectedPaymentTypeId]);

  const handlereceieve = (e) => {
    const paymentmodeRegex = /[0-9]/;  
    setPaymodeError('');
    e.preventDefault();
    setErrormessage("");
  
    // Validate if payment mode is selected
    if (!selectedPaymentTypeId) {
      setErrormessage("Please select Mode of Payment.");
      return;
    }
  
    // Validate other required fields
    if (!selectedCustomer) {
      setErrormessage("Please enter the customer name.");
      return;
    }
    if (!amount) {
      setErrormessage("Please enter Amount.");
      return;
    }
    if (!Referenceno) {
      setErrormessage("Please enter REF No.");
      return;
    }
    if (!paymentmodeRegex.test(selectedPaymentTypeId.trim())) {
      setPaymodeError( "Please select Mode of Payment.");
      return
    }
    
  
    setDisableButton(true);
  
    const customerpayment = {
      customerId: selectedCustomer.id,
      createdBy: props.loggedInUser.loginId,
      paymentType: selectedPaymentTypeId,
      amount: amount,
      referenceNumber: Referenceno,
      chequeNumber: chequeNumber,
      chequeDate: Chequedate,
      description: description,
      collectionDate: collectionDate,
    };
    setLoading(true);
    dispatch({ type: ADD_CUSTOMER_PAYMENT_API_CALL, payload: customerpayment });
  };
  

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <ToastContainer />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Container fluid className="flex mt-5 pt-3">
          <Row className="w-100 ms-0 mt-2 bg-blur">
            <Col lg={2}></Col>
            <Col
              className="border rounded rounded shadow p-3 w-80 "
              style={{
                minHeight: 520,
                maxHeight: 820,
                backgroundColor: "white ",
              }}
            >
              <Stack
                direction="horizontal"
                className=" mt-2 p-2 "
                gap={3}
                style={{ backgroundColor: "#e4e4e4", height: "50px" }}
              >
                <div className="f-20 text-capitalize">Receipt</div>
                <button
                  disabled={disableButton}
                  className="p-1 ms-auto f-14 btn-blue"
                  onClick={handlereceieve}
                >
                  Receive
                </button>
                <Link to="/Receipt" style={{ display: "none" }}>
                  <button className="p-1 f-14 me-2 btn-blue">Cancel</button>
                </Link>
              </Stack>

              <Row
                className="f-20 mt-3"
                style={{
                  paddingLeft: 25,
                  paddingRight: 25,
                }}
              >
                <Col>
                  <p className="f-20 ms-auto d-flex align-items-center">
                    <IoMdContact style={{ fontSize: 40 }} />
                    <span className="ms-2 f-18 text-capitalize">
                      Contact details
                    </span>
                  </p>
                  <FormGroup>
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
                            setSelectedCustomer('');
                            setShowTypeahead(!showTypeahead)}}
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
                            </small>
                            ,{" "}
                            <small>
                              {selectedCustomer.addresses[0]?.zipcode}
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
                  </FormGroup>
                  {errormessage && !selectedCustomer && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      Please enter the customer name.
                    </p>
                  )}
                </Col>

                <Col className="font-large f-20 text-end text-capitalize">
                  <p
                    className="d-flex flex-column mt-2"
                    style={{ fontSize: 12 }}
                  >
                    Outstanding Amount
                    {/* {Paymentsummary &&
                    Object.values(Paymentsummary).map((value, index) => (
                      <span key={index} className="f-18 mt-2">
                        {value.totalOutstanding} AED
                      </span>
                    ))} */}
                    <span
                      className="mt-2"
                      style={{ fontSize: 24, fontWeight: "bold" }}
                    >
                      {" "}
                      {parseFloat(props.payment.totalOutstanding).toFixed(
                        2
                      )}{" "}
                      AED
                    </span>
                  </p>

                  <div className="mt-4">
                    <FormLabel className="d-flex justify-content-end align-items-center f-16 txt-ht_blue fw-bold font-bolder ">
                      <span className="mb-1 me-2">
                        <IoCalendar
                          style={{
                            fontSize: 20,
                          }}
                        />
                      </span>
                      <span>Receipt Date :</span>
                      <FormControl
                        type="date"
                        label=""
                        className="w-40 ms-2 inputfocus"
                        defaultValue={currentDate}
                        min={currentDate}
                      ></FormControl>
                    </FormLabel>
                  </div>
                  <div className="mt-4 d-flex justify-content-around">
                    <FormLabel className="d-flex justify-content-end ms-auto align-items-center f-16 txt-ht_blue fw-bold font-bolder me-2">
                      <span>Currency :</span>
                    </FormLabel>
                    <AE
                      className="w-40 mt-1"
                      country="AE"
                      style={{
                        height: "20",
                      }}
                    />
                  </div>
                </Col>
              </Row>
              <div
                className=""
                style={{
                  margin: "5px 5px 5px 5px",
                  width: "98%",
                }}
              >
                <div className="p-1 pt-3">
                  <FormGroup className="d-flex align-items-center">
                    <FormLabel className="d-flex align-items-center mt-8 f-16 fw-bold txt_ht-blue">
                      <span className="ms-2 me-2">
                        <MdPayments style={{ fontSize: 20 }} />
                      </span>
                      Receipt details
                    </FormLabel>
                    {/* <FormCheck
                    type="switch"
                    className="fs-4 ms-3 mt-1"
                    onClick={handleSwitchClick}
                  /> */}
                  </FormGroup>
                </div>
                {/* {switchpayment ? ( */}
                <div className="p-1">
                  <FormGroup
                    className="d-flex justify-content-between"
                    style={{ paddingRight: 15, paddingLeft: 15 }}
                  >
                    <FormLabel>
                      Payment Type{" "}
                      <span
                        style={{
                          color: "red",
                        }}
                      >
                        *
                      </span>
                      <FormSelect
                        className="inputfocus w-100"
                        name="paymenttype"
                        style={{ flex: 3, marginRight: "1px" }}
                        onChange={(event) => {
                          setPaymodeError(false)     
                          const selectedId = event.target.value;
                          setMasterCategory(selectedId);
                          setMasterCategoryError(false);
                          setSelectedPaymentTypeId(selectedId);

                          // Set chequerefnum based on the selected value
                          setChequerefnum(selectedId === "3"); // Assuming '3' is the value for "Cheque"
                          console.log("Selected Payment Type ID:", selectedId);
                          console.log("Selected chequerefnum", chequerefnum);
                        }}
                        placeholder="Select Payment type"
                      >
                        <option>Select the Payment Mode</option>
                        {props.masterData.paymentTypes &&
                          props.masterData.paymentTypes.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.value}
                            </option>
                          ))}
                      </FormSelect>         
                      {errormessage && !masterCategory && (
                        <p style={{ color: "red", fontSize: 12 }}>
                          Please select Mode of Payment.
                        </p>
                      )}
                      {paymodeError && <p style={{color: 'red'}}>{paymodeError}</p>}
                    </FormLabel>

                    <FormLabel className="">
                      Amount
                      <FormControl
                        type="number"
                        className="inputfocus"
                        value={amount}
                        name="amount"
                        style={{
                          width: 250,
                        }}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          // handleSearchChange(e)
                        }}
                      ></FormControl>
                      {errormessage && !amount && (
                        <p style={{ color: "red", fontSize: 12 }}>
                          Please enter amount.
                        </p>
                      )}
                    </FormLabel>
                    <FormLabel className="">
                      Reference No
                      <FormControl
                        name="referenceno"
                        className="inputfocus"
                        style={{
                          width: 250,
                        }}
                        onChange={(e) => setReferenceno(e.target.value)}
                      ></FormControl>
                      {errormessage && !Referenceno && (
                        <p style={{ color: "red", fontSize: 12 }}>
                          Please enter the REF No.
                        </p>
                      )}
                    </FormLabel>
                  </FormGroup>

                  <div
                    className="p-1 "
                    style={{ paddingRight: 15, paddingLeft: 15 }}
                  >
                    {chequerefnum && (
                      <FormGroup className="d-flex justify-content-between ms-2 me-3 mt-2">
                        <FormLabel className="ms-2">
                          Cheque Date
                          <FormControl
                            className="inputfocus "
                            type="date"
                            name="chequedate"
                            min={currentDate}
                            style={{
                              maxWidth: 250,
                              minWidth: 200,
                            }}
                            onChange={(e) => setChequedate(e.target.value)}
                          ></FormControl>
                        </FormLabel>

                        <FormLabel className="ms-2 me-2">
                          Collection Date
                          <FormControl
                            className="mt-1 inputfocus"
                            type="date"
                            name="collectiondate"
                            min={currentDate}
                            value={collectionDate}
                            onChange={(e) => {
                              setCollectionDate(e.target.value);
                            }}
                            style={{
                              maxWidth: 250,
                              minWidth: 250,
                            }}
                          ></FormControl>
                        </FormLabel>

                        <FormLabel className="ms-4">
                          Cheque Number
                          <FormControl
                            className="inputfocus"
                            name="chequeNumber"
                            type="text"
                            style={{
                              maxWidth: 250,
                              minWidth: 240,
                            }}
                            onChange={(e) => {
                              setchequeNumber(e.target.value);
                            }}
                          ></FormControl>
                        </FormLabel>
                      </FormGroup>
                    )}
                  </div>
                </div>
                {/* ) : null} */}
              </div>

              <div>
                <FormControl
                  className="ms-4 inputfocus rounded-0"
                  as="textarea"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ width: 210, height: 40 }}
                />
              </div>

              <div className="d-flex flex-column align-item-center text-end pe-3 pt-3">
                <p className="txt-ht_blue f-16 fw-bolder">
                  <span>Paid Amount :</span>
                  <span
                    className="fst-normal"
                    style={{
                      color: "black",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {parseFloat(props.payment.totalDebitAmount).toFixed(2)}
                  </span>
                </p>

                <p className="txt-ht_blue f-16 fw-bolder">
                  <span> Remaining Amount :</span>
                  <span
                    className=""
                    style={{
                      color: "black",
                      marginLeft: "10px",
                      fontSize: "20px",
                    }}
                  >
                    {parseFloat(
                      props.payment.totalOutstanding - amount
                    ).toFixed(2)}
                  </span>
                </p>
              </div>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </Container>
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
    </div>
  );
}

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    masterData: state.masterData,
    loggedInUser: state.users,
    payment: state.payment,
    common: state.commonReducer,
  };
};

export default connect(mapsToProps)(Customerpay);
