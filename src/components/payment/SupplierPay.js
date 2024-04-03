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
import { AE } from "country-flag-icons/react/3x2";
import { MdPayments } from "react-icons/md";
import { useDispatch, connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SEARCH_CUSTOMER_API_CALL,
  MASTER_API_CALL,
  GET_PAYMENT_SUMMARY_API_CALL,
  ADD_SUPPLIER_PAYMENT_API_CALL,
  SUCCESS_CODE_NO,
  RESET_CODE,
  ERROR_CODE_FAILURE,
  RESET_CUSTOMER_LISTS,
} from "../../utils/Constant";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Customerpay(props) {
  const [chequerefnum, setChequerefnum] = useState(false); // Define chequerefnum state
  const [amount, setAmount] = useState("");
  const [Referenceno, setReferenceno] = useState("");
  const [chequeNumber, setChequeNumber] = useState("");
  const [chequeDate, setChequeDate] = useState("");
  const [CollectionDate, setCollectionDate] = useState("");
  const [errormessage, setErrormessage] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [showTypeahead, setShowTypeahead] = useState(true);
  const [selectedPaymentTypeId, setSelectedPaymentTypeId] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [paymodeError, setPaymodeError] = useState(false);


  const navigation = useNavigate();
  const dispatch = useDispatch();
  //Supplier Name Selection:
  useEffect(() => {
    if (props.customers.searchList.length > 0 && props.customers.searchList[0].businessTypeId != 3) {
      dispatch({ type: RESET_CUSTOMER_LISTS });
      dispatch({ type: SEARCH_CUSTOMER_API_CALL, payload: { businessTypeId:3 } });
    }
    else if (props.customers.searchList.length === 0) {
      dispatch({ type: SEARCH_CUSTOMER_API_CALL, payload: { businessTypeId:3 } });
    }
  }, []);

  useEffect(() => {
    if (props.customers.searchList.length > 0) {
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
    dispatch({
      type: SEARCH_CUSTOMER_API_CALL,
      payload: { query, businessTypeId: 3 },
    });
  };

  //Reset Values:
  const resetValues = () => {
    setSelectedSupplier("");
    setAmount("");
    setReferenceno("");
    setChequeNumber("");
    setChequeDate("");
    setCollectionDate("");
    setDescription("");
  };
  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      dispatch({ type: RESET_CODE });
      setLoading(false);
      setDisableButton(true);
      toast("We have received your payment", {
        type: "success",
        onClose: () => {},
      });
      resetValues();

      setTimeout(() => {
        dispatch({ type: RESET_CUSTOMER_LISTS });
        navigation(-1);
      }, 2000);
    }
  }, [props.common.successCode]);

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      setLoading(false);
      toast(props.common.errormessage, {
        type: "error",
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.common.code]);

  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
  }, []);

  useEffect(() => {
    setChequerefnum(selectedPaymentTypeId === "3");
  }, [selectedPaymentTypeId]);

  const handleSubmit = () => {
    const paymentmodeRegex = /[0-9]/;
    setErrormessage("");
    setPaymodeError("");
    if (!selectedSupplier) {
      setErrormessage("Please enter the supplier name.");
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
    setPaymodeError( "Payment mode is required");
    return
  }
 



    const requestData = {
      supplierId: selectedSupplier.id,
      createdBy: props.loginUsers.loginId,
      paymentType: selectedPaymentTypeId,
      amount: amount,
      referenceNumber: Referenceno,
      chequeNumber: chequeNumber,
      chequeDate: currentDate,
      description: description,
      collectionDate: CollectionDate,
    };
    setLoading(true);
    dispatch({ type: ADD_SUPPLIER_PAYMENT_API_CALL, payload: requestData });
  };

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
        <Container
          fluid
          className="flex"
          style={{
            marginTop: 75,
          }}
        >
          <Row className="w-100 ms-0 mt-2 bg-blur">
            <Col lg={2}></Col>
            <Col
              className="border  rounded rounded  shadow p-3 w-80 "
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
                <div className="f-20 text-capitalize">Receive Payment</div>
                <button
                  disabled={disableButton}
                  className="p-1 ms-auto f-14 btn-blue"
                  onClick={handleSubmit}
                >
                  Receive
                </button>
                {/* <Link to="/Payment">
                <button className="p-1 f-14 me-2 btn-blue">Cancel</button>
              </Link> */}
              </Stack>

              <Row className="f-20 mt-3">
                <Col className="ms-3 me-3">
                  <p className="f-20 ms-auto d-flex align-items-center">
                    <IoMdContact style={{ fontSize: 40 }} />
                    <span className="ms-2 f-18 text-capitalize">
                      Supplier details
                    </span>
                  </p>
                  <FormGroup>
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
                        className={`inputfocus text-start rounded-1 p-2 ${
                          selectedSupplier ? "f0f0f0" : ""
                        }`}
                        style={{ width: 250, backgroundColor: "#f0f0f0" }}
                      >
                        <strong
                          onClick={() => {
                            setSelectedSupplier('');
                            setShowTypeahead(!showTypeahead);
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
                            {/* <small>
                            {selectedSupplier.addresses[0]?.addressLine2}
                          </small>
                          ,<br /> */}
                            <small>{selectedSupplier.addresses[0]?.city}</small>
                            ,{" "}
                            <small>
                              {selectedSupplier.addresses[0]?.state}
                            </small>
                            ,{" "}
                            <small>
                              {selectedSupplier.addresses[0]?.zipcode}
                            </small>
                            ,<br />
                            <small>
                              {selectedSupplier.addresses[0].countryName}
                            </small>
                          </div>
                        )}
                      </p>
                    )}
                  </FormGroup>
                  {errormessage && !selectedSupplier && (
                    <p style={{ color: "red", fontSize: 12 }}>
                      Please enter the supplier name.
                    </p>
                  )}
                </Col>

                <Col className="font-large f-20 text-end text-capitalize">
                  <p
                    className="d-flex flex-column mt-2"
                    style={{ fontSize: 12 }}
                  >
                    Outstanding Amount
                    <span
                      className="f-18 mt-2"
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
                      <span>Payment Date :</span>
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
                      Payment details
                    </FormLabel>
                  </FormGroup>
                </div>

                <div className="p-1">
                  <FormGroup
                    className="d-flex justify-content-between"
                    style={{ paddingRight: 15, paddingLeft: 15 }}
                  >
                    <FormLabel>
                      Payment Type <span style={{ color: "red" }}>*</span>
                      <FormSelect
                        className="inputfocus"
                        name="paymenttype"
                        style={{ flex: 3, marginRight: "1px" }}
                        onChange={(event) => {
                          setPaymodeError(false)
                          const selectedId = event.target.value;
                          setSelectedPaymentTypeId(selectedId);
                          setChequerefnum(selectedId === "3");
                          
                        }}
                      >
                        <option defaultChecked>Select the Payment Mode</option>
                        {props.masters.paymentTypes.map((payment) => {
                          return (
                            <option key={payment.id} value={payment.id}>
                              {payment.value}
                            </option>
                          );
                        })}
                      </FormSelect>
                      {paymodeError && <p style={{color: 'red'}}>{paymodeError}</p>}
                    </FormLabel>
                    <FormLabel>
                      Amount <span style={{ color: "red" }}>*</span>
                      <FormControl
                        className="inputfocus"
                        type="number"
                        name="amount"
                        placeholder="AED"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                          width: 250,
                        }}
                      />
                      {errormessage && !amount && (
                        <p style={{ color: "red", fontSize: 12 }}>
                          Please enter the Amount.
                        </p>
                      )}
                    </FormLabel>
                    <FormLabel>
                      Reference No <span style={{ color: "red" }}>*</span>
                      <FormControl
                        className="inputfocus"
                        name="referenceno"
                        value={Referenceno}
                        onChange={(e) => setReferenceno(e.target.value)}
                        style={{
                          width: 250,
                        }}
                      ></FormControl>
                      {errormessage && !Referenceno && (
                        <p style={{ color: "red", fontSize: 12 }}>
                          Please enter the REF No.
                        </p>
                      )}
                    </FormLabel>
                  </FormGroup>

                  <div
                    className="p-1"
                    style={{ paddingRight: 15, paddingLeft: 15 }}
                  >
                    {chequerefnum && (
                      <FormGroup className="d-flex justify-content-between ms-2 me-3 mt-2">
                        <FormLabel className="ms-2">
                          Cheque Date
                          <FormControl
                            className="inputfocus"
                            type="date"
                            min={currentDate}
                            value={chequeDate}
                            onChange={(e) => setChequeDate(e.target.value)}
                            style={{ width: 200 }}
                          />
                        </FormLabel>

                        <FormLabel className="me-2">
                          Collection Date
                          <FormControl
                            className="inputfocus"
                            type="date"
                            min={currentDate}
                            value={CollectionDate}
                            onChange={(e) => setCollectionDate(e.target.value)}
                            style={{ width: 250 }}
                          />
                        </FormLabel>

                        <FormLabel className="me-">
                          Cheque Number
                          <FormControl
                            className="inputfocus"
                            type="text"
                            value={chequeNumber}
                            onChange={(e) => setChequeNumber(e.target.value)}
                            style={{ width: 250 }}
                          />
                        </FormLabel>
                      </FormGroup>
                    )}
                  </div>
                </div>
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
                    {parseFloat(props.payment.totalDebitAmount).toFixed(2)} AED
                  </span>
                </p>
                <p className="txt-ht_blue f-16 fw-bolder">
                  <span> Remaining Amount :</span>
                  <span
                    className=""
                    style={{
                      color: "black",
                      marginLeft: "10px",
                      fontSize: "12px",
                    }}
                  >
                    {parseFloat(
                      props.payment.totalOutstanding - amount
                    ).toFixed(2)}{" "}
                    AED
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
    masters: state.masterData,
    customers: state.customers,
    loginUsers: state.users,
    common: state.commonReducer,
    payment: state.payment,
  };
};

export default connect(mapsToProps)(Customerpay);
