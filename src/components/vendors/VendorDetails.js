import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  Button,
  FormGroup,
  Modal,
  FormLabel,
  FormControl,
  Container,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import {
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
  ADD_CUSTOMER_BANK_DETAILS_API_CALL,
  UPDATE_CUSTOMER_STATUS_CODE,
  MASTER_API_CALL,
  ADD_CUSTOMR_ADDRESS_API_CALL,
  RESET_CODE,
  SUCCESS_CODE_NO,
  ERROR_CODE_FAILURE,
} from "../../utils/Constant";
import Avatar from "../../Assets/avatars/1.jpg";
import { MdAddIcCall } from "react-icons/md";
import { MdOutlineMail } from "react-icons/md";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerDetails = (props) => {
  console.log(props);
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedCustomer, setselectedCustomer] = useState(null);
  const [showAddBankDetails, setShowBankDetails] = useState(false);
  const [showAddressesModal, setShowAddressModal] = useState(false);

  const [bankdetailserror, setbankdetailserror] = useState(false);
  const [accountnumerror, setAccountnumerror] = useState(false);
  const [accountanterror, setAccountanterror] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [branchError, setBrancherror] = useState(false);
  const [ibanError, setIbanerror] = useState(false);
  const [addressTypeError, setAddressTypeError] = useState(false);

  const [bankDetails, setBankDetails] = useState({
    customerId: location?.state?.id,
    country: "0",
  });

  const [savedFormData, setSavedFormData] = useState(null);

  const [formData, setFormData] = useState({
    addressTypeId: "",
    addressLine1: "",
    city: "",
    emirates: "",
    country: "",
    zipcode: "",
    state: "",
    customerId: location.state.id,
  });

  useEffect(() => {
    dispatch({
      type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
      data: location.state.id,
    });
  }, [location.state.id]);

  useEffect(() => {
    if (props.masterData.addressTypes.length === 0) {
      dispatch({ type: MASTER_API_CALL });
    }
  }, []);

  useEffect(() => {
    setselectedCustomer(props.customers.selectedCustomerDetails);
  }, [props.customers.selectedCustomerDetails]);

  useEffect(() => {
    if (props.customers.code === 200) {
      setShowBankDetails(false);
      setShowAddressModal(false);
      dispatch({
        type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
        data: location.state.id,
      });
      dispatch({ type: UPDATE_CUSTOMER_STATUS_CODE, payload: 0 });
      dispatch({ type: RESET_CODE });
    }
  }, [props.customers.code]);

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      //refresh
      setbankdetailserror(false);
    setAccountnumerror(false);
    setAccountanterror(false);
    setBrancherror(false);
    setIbanerror(false);

      toast("Updated Successfully", {
        type: "success",
      });
      dispatch({ type: RESET_CODE })
      setBankDetails({
        customerId: location.state.id,
        accountNumber: "",
        bankName: "",
        branchName: "",
        country: "",
      });
      setFormData({
        addressLine1: "",
        addressTypeId:"",
        state: "",
        city: "",
        emirates: "",
        zipcode: "",
      });
      dispatch({
        type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
        data: location.state.id,
      });
    }
  }, [props.common.successCode]);

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      //show toast alert
      toast(props.common.errorMessage, {
        type: "error",
      });
      dispatch({ type: RESET_CODE })
    }
  }, [props.common.code]);

  const bankNameChange = (value) => {
    setBankDetails({ ...bankDetails, bankName: value });
    setbankdetailserror(false);
  };

  const accountHolderNameChange = (value) => {
    setBankDetails({ ...bankDetails, accountHolderName: value });
    setAccountanterror(false);
  };

  const accountNumberChange = (value) => {
    setBankDetails({ ...bankDetails, accountNumber: value });
    setAccountnumerror(false);
  };

  const ibanNumberChange = (value) => {
    setBankDetails({ ...bankDetails, code: value });
    setIbanerror(false);
  };

  const onBranchNameChange = (value) => {
    setBankDetails({ ...bankDetails, branchName: value });
    setBrancherror(false);
  };

  const onSelectCountry = (value) => {
    setBankDetails({ ...bankDetails, country: value });
  };

  const showBankDetails = () => {
    setShowBankDetails(!showAddBankDetails);
    setbankdetailserror("");
    setAccountnumerror("");
    setAccountanterror("");
    setBrancherror("");
    setIbanerror("");
  };

  const handleAddAddress = () => {
    setShowAddressModal(!showAddressesModal);
    setAddressError("");
    setAddressTypeError("")
  };

  const handleAddressTypeChange = (value) => {
    setAddressTypeError(false)
    setFormData({ ...formData, addressTypeId: value });
  };

  const addressLine1Changes = (value) => {
    setFormData({ ...formData, addressLine1: value });
    setAddressError(false);
  };

  const handleCityChange = (value) => {
    setFormData({ ...formData, city: value });
  };

  const emiratesChange = (value) => {
    setFormData({ ...formData, emirates: value });
  };

  const onSelectCountryForAddress = (value) => {
    setFormData({ ...formData, country: value });
  };

  const onZipChange = (value) => {
    setFormData({ ...formData, zipcode: value });
  };

  const saveAddress = () => {
    if (!formData.addressLine1 || !formData.addressLine1.trim() && !formData.addressTypeId || formData.addressTypeId === '') {
      setAddressError(true);
      setAddressTypeError(true)
      return;
    }

    if (!formData.addressLine1 || !formData.addressLine1.trim()) {
      setAddressError(true);
      return;
    }

    if (!formData.addressTypeId || formData.addressTypeId === '') {
      setAddressTypeError(true)
      return;
    }

    setAddressError(false);
    setAddressTypeError(false)

    const tempArray = [];
    tempArray.push({
      ...formData,
      state: "",
      customerId: location.state.id,
    });

    dispatch({ type: ADD_CUSTOMR_ADDRESS_API_CALL, payload: tempArray });
  };

  const saveBankDetails = () => {
    setbankdetailserror(false);
    setAccountnumerror(false);
    setAccountanterror(false);
    setBrancherror(false);
    setIbanerror(false);
    if (!bankDetails.bankName || !bankDetails.bankName.trim()) {
      setbankdetailserror(true);
      return;
    }

    if (!bankDetails.accountNumber || !bankDetails.accountNumber.trim()) {
      setAccountnumerror(true);
      return;
    }
    if (
      !bankDetails.accountHolderName ||
      !bankDetails.accountHolderName.trim()
    ) {
      setAccountanterror(true);
      return;
    }
    if (!bankDetails.code || !bankDetails.code.trim()) {
      setIbanerror(true);
      return;
    }
    if (!bankDetails.branchName || !bankDetails.branchName.trim()) {
      setBrancherror(true);
      return;
    }
    // if (bankDetails.country == 0) {
    //   return;
    // }

    const bankInformation = [];
    bankInformation.push(bankDetails);

    dispatch({
      type: ADD_CUSTOMER_BANK_DETAILS_API_CALL,
      payload: bankInformation,
    });
  };

  return (
    <>
      <ToastContainer />
      <Container
        className="customercontents mt-5 "
        style={{
          backgroundColor: "white shadow",
          color: "#1d1d5e",
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
      >
        <Row
          className=""
          style={{ height: "", paddingBottom: 50, marginTop: 75 }}
        >
          {selectedCustomer && (
            <>
              <Col
                lg={3}
                className="d-flex pt-5 ps-4"
                style={{ borderRight: "1px solid #dbdcdc" }}
              >
                <div className=" profile-contents">
                  <img
                    className="w-50 rounded-circle"
                    style={{ border: "5px white solid" }}
                    src={Avatar}
                    alt="profile picture"
                  ></img>
                  <h4 className="mt-4">
                    {selectedCustomer.addresstype &&
                      `${selectedCustomer.addresstype}. `}
                    {selectedCustomer.name}
                  </h4>
                  <p>
                    {" "}
                    {selectedCustomer.jobPosition
                      ? selectedCustomer.jobPosition
                      : "NA"}
                  </p>
                  <p className="callsection" style={{ marginTop: "20%" }}>
                    <span
                      className="callicon mr-10 text-white"
                      style={{
                        padding: "10px",
                        borderRadius: "28px",
                        backgroundColor: "#0fbb0f",
                      }}
                    >
                      <MdAddIcCall className="" style={{ fontSize: "20px" }} />
                    </span>
                    {selectedCustomer.mobile ? selectedCustomer.mobile : "NA"}
                  </p>
                  <p className="mailsection" style={{ marginTop: "15%" }}>
                    <span
                      className="mailicon mr-10 text-white"
                      style={{
                        padding: "10px",
                        borderRadius: "28px",
                        backgroundColor: "#808080bf",
                      }}
                    >
                      <MdOutlineMail
                        className=""
                        style={{ fontSize: "20px" }}
                      />
                    </span>
                    {selectedCustomer.email ? selectedCustomer.email : "NA"}
                  </p>
                </div>
              </Col>
              <Col lg={9} className="ps-4p">
                <div>
                  <>
                    <Row
                      className="w-100"
                      style={{ borderBottom: "1px solid #dbdcdc" }}
                    >
                      <h5 className="mb-6 mt-4 mb-6p text-underline">
                        Official Information
                      </h5>
                      <Col className="">
                        <h6>Vendor Code</h6>
                        <p>{selectedCustomer.userName}</p>
                      </Col>
                      {/* <Col className="">
                        <h6>Vendor Category</h6>
                        <p>{selectedCustomer.customerCategory}</p>
                      </Col> */}
                      <Col className="">
                        <h6>Address</h6>
                        {selectedCustomer.addresses ? (
                          <p>
                            <span>
                              {selectedCustomer.addresses[0]?.addressLine1}
                            </span>
                            {selectedCustomer.addresses[0]?.addressLine1 &&
                              ", "}
                            {/* <span>
                              {selectedCustomer.addresses[0]?.addressLine2}
                            </span>
                            {selectedCustomer.addresses[0]?.addressLine2 &&
                              ", "} */}
                            <span>{selectedCustomer.addresses[0]?.city}</span>
                            {selectedCustomer.addresses[0]?.city && ", "}
                            <span>{selectedCustomer.addresses[0]?.state}</span>
                            {selectedCustomer.addresses[0]?.state && ", "}
                            <span>
                              {selectedCustomer.addresses[0]?.countryName}
                            </span>
                            {selectedCustomer.addresses[0]?.countryName && ", "}
                            <span>
                              {selectedCustomer.addresses[0]?.zipcode ? selectedCustomer.addresses[0]?.zipcode : null }
                            </span>
                          </p>
                        ) : (
                          "NA"
                        )}
                      </Col>
                      <Col></Col>
                    </Row>
                    <Row
                      className="w-100"
                      style={{ borderBottom: "1px solid #dbdcdc" }}
                    >
                      <h5 className="mb-6 mt-4 mb-6p text-underline">
                        Additional Information
                      </h5>
                      <Col>
                        <h6>Business Type</h6>
                        <p>{selectedCustomer.businessTypeName}</p>
                      </Col>
                      <Col>
                        <h6>VAT Treatment</h6>
                        <p>
                          {selectedCustomer.registered
                            ? "Registered"
                            : "Not Registered"}
                        </p>
                        <p>
                          TRN Number:{" "}
                          {selectedCustomer.trnNo
                            ? selectedCustomer.trnNo
                            : "NA"}
                        </p>
                      </Col>
                      <Col>
                        <h6>Phone Number</h6>
                        <p>
                          {selectedCustomer.phone
                            ? selectedCustomer.phone
                            : "NA"}
                        </p>
                        <h6>Website</h6>
                        <p>
                          {selectedCustomer.website
                            ? selectedCustomer.website
                            : "NA"}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col style={{ paddingLeft: 25 }}>
                        <h5 className="mt-4 text-underline">Bank Details</h5>
                        {props.customers.selectedCustomerDetails.bankAccounts &&
                          props.customers.selectedCustomerDetails.bankAccounts.map(
                            (item) => {
                              return (
                                <div
                                  style={{
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#F5F5F5",
                                    marginTop: 2,
                                  }}
                                >
                                  <label
                                    style={{
                                      fontSize: 16,
                                      fontWeight: "bold",
                                      color: "#505050",
                                    }}
                                  >
                                    {item.bankName} {item.accountNumber}
                                  </label>
                                  <label
                                    style={{ fontSize: 12, color: "#505050" }}
                                  >
                                    {item.bankName}&nbsp;{item.branchName}
                                  </label>
                                </div>
                              );
                            }
                          )}

                        <h6
                          style={{
                            cursor: "pointer",
                            marginTop: 35,
                            marginLeft: 8,
                            fontWeight: "600",
                          }}
                          onClick={showBankDetails}
                        >
                          <u>Add Bank Details</u>
                        </h6>
                        <p>{selectedCustomer.logNotes}</p>
                      </Col>
                      <Col>
                        <h5 className="mt-4 text-underline">Addresses</h5>

                        {props.customers.selectedCustomerDetails.addresses &&
                          props.customers.selectedCustomerDetails.addresses.map(
                            (item) => {
                              return (
                                <div
                                  style={{
                                    paddingLeft: 8,
                                    paddingRight: 8,
                                    paddingTop: 8,
                                    paddingBottom: 8,
                                    display: "flex",
                                    flexDirection: "column",
                                    backgroundColor: "#F5F5F5",
                                    marginTop: 2,
                                  }}
                                >
                                  <label style={{fontSize: 9, fontWeight: '600'}}>{item.addressType}</label>
                                  <label
                                    style={{
                                      fontSize: 16,
                                      fontWeight: "bold",
                                      color: "#505050",
                                    }}
                                  >
                                    {item.addressLine1 &&
                                      `${item.addressLine1}, `}
                                    {item.addressLine2 &&
                                      `${item.addressLine2}`}
                                  </label>
                                  <label
                                    style={{ fontSize: 12, color: "#505050" }}
                                  >
                                    {item.city && `${item.city}, `}
                                    {item.countryName && `${item.countryName}`}
                                  </label>
                                </div>
                              );
                            }
                          )}

                        <h6
                          style={{
                            cursor: "pointer",
                            marginTop: 35,
                            marginLeft: 8,
                            fontWeight: "600",
                          }}
                          onClick={handleAddAddress}
                        >
                          <u>Add Address</u>
                        </h6>
                      </Col>
                    </Row>
                  </>
                </div>
              </Col>
            </>
          )}
        </Row>

        <>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showAddBankDetails}
            style={{
              width: "100%",
              placeItems: "center",
            }}
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter">
                Add Bank Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="">
              <Row className="">
                <Col className="d-flex flex-column justify-content-end">
                  <FormGroup className=" m-2 d-flex flex-row">
                    <FormLabel className="f-14 w-100 w-100">
                      Bank Name
                      <FormControl
                        name="bankName"
                        className={`f-14 w-100 br_b-2 rounded-0 mt-0 me-2 inputfocus ${bankdetailserror ? "has-error" : ""
                          } `}
                        type="text"
                        onChange={(e) => bankNameChange(e.target.value)}
                        style={{ border: "2px dotted #25316f" }}
                      />
                      {bankdetailserror && (
                        <p style={{ color: "red" }}>Bank name is required</p>
                      )}
                    </FormLabel>
                  </FormGroup>

                  <FormGroup className=" m-2">
                    <FormLabel className="f-14 w-100 ">
                      Account Number
                      <FormControl
                        name="accountNumber"
                        className={`inputfocus f-14 br_b-2 rounded-0 inputfocus ${accountnumerror ? "has-error" : ""
                          } `}
                        type="text"
                        onChange={(e) => accountNumberChange(e.target.value)}
                        style={{ border: "2px dotted #25316f" }}
                      />
                      {accountnumerror && (
                        <p style={{ color: "red" }}>
                          Account number is required
                        </p>
                      )}
                    </FormLabel>
                  </FormGroup>
                  <FormGroup className=" m-2">
                    <FormLabel className="f-14 w-100 ">
                      Country
                      <Form.Select
                        className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                        style={{ border: "2px dotted #25316f" }}
                        placeholder="Country"
                        onChange={(e) => onSelectCountry(e.target.value)}
                        name="country"
                        value={bankDetails.country}
                      >
                        <option value="0">Select Country</option>
                        <option value="2">UAE</option>
                        <option value="1">INDIA</option>
                      </Form.Select>
                    </FormLabel>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className=" m-2">
                    <FormLabel className="f-14 w-100 ">
                      Account Holder Name
                      <FormControl
                        name="accountholdername"
                        className={`inputfocus f-14 br_b-2 rounded-0 inputfocus ${accountanterror ? "has-error" : ""
                          } `}
                        type="text"
                        onChange={(e) =>
                          accountHolderNameChange(e.target.value)
                        }
                        style={{ border: "2px dotted #25316f" }}
                      />
                      {accountanterror && (
                        <p style={{ color: "red" }}>
                          Account holder name is required
                        </p>
                      )}
                    </FormLabel>
                    <FormLabel className="f-14 w-100 ">
                      IBAN No
                      <FormControl
                        name="iban"
                        className={`inputfocus f-14 br_b-2 rounded-0 inputfocus ${ibanError ? "has_error" : ""
                          }`}
                        type="text"
                        onChange={(e) => ibanNumberChange(e.target.value)}
                        style={{ border: "2px dotted #25316f" }}
                      />
                      {ibanError && (
                        <p style={{ color: "red" }}>IBAN is required</p>
                      )}
                    </FormLabel>
                  </FormGroup>
                  <FormGroup className=" m-2">
                    <FormLabel className="f-14 w-100 ">
                      Branch
                      <FormControl
                        name="branch"
                        className={`inputfocus f-14 br_b-2 rounded-0 inputfocus ${branchError ? "has-error" : ""
                          } `}
                        type="text"
                        onChange={(e) => onBranchNameChange(e.target.value)}
                        style={{ border: "2px dotted #25316f" }}
                      />
                      {branchError && (
                        <p style={{ color: "red" }}>
                          Branchname name is required
                        </p>
                      )}
                    </FormLabel>
                  </FormGroup>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="reset"
                variant="secondary"
                onClick={showBankDetails}
              >
                Close
              </Button>

              <Button type="reset" variant="primary" onClick={saveBankDetails} style={{backgroundColor:"#1d1d5e", borderColor:"#1d1d5e"}}>
                Save
              </Button>
            </Modal.Footer>
          </Modal>
        </>

        <>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showAddressesModal}
            style={{
              width: "100%",
              placeItems: "center",
            }}
          >
            <Modal.Header>
              <Modal.Title id="contained-modal-title-vcenter" className="h-20">
                Add Address
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {["radio"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <FormGroup
                      style={{
                        display: "flex",
                        flex: 3,
                        flexDirection: "row",
                      }}
                    >
                      {props.masterData.addressTypes.map((item) => {
                        return (
                          <Form.Check
                            className="inputfocus"
                            inline
                            label={item.value}
                            value={item.id}
                            name="group1"
                            type={type}
                            onChange={(e) =>
                              handleAddressTypeChange(e.target.value)
                            }
                            id={`inline-${type}-3`}
                          />
                        );
                      })}
                      {
                        addressTypeError && <p style={{ color: "red" }}>Address type is required</p>
                      }
                    </FormGroup>
                  </div>
                ))}
              </Form>
              <div className="f-14 d-flex flex-row" style={{ flex: "1" }}>
                <FormGroup
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FormLabel
                    className="f-20 "
                    style={{
                      flex: 2,
                      fontWeight: "bolder",
                      color: "#25316f",
                    }}
                  >
                    Address
                  </FormLabel>
                </FormGroup>
                <FormGroup
                  style={{
                    display: "flex",
                    flex: 3,
                    flexDirection: "column",
                  }}
                >
                  <Form.Control
                    className={`f-14 br_b-2 rounded-0 mt-2 inputfocus ${addressError ? "has-error" : ""
                      } `}
                    style={{ border: "2px dotted #25316f" }}
                    placeholder="Address"
                    name="customeraddress"
                    value={formData.customeraddress}
                    onChange={(e) => addressLine1Changes(e.target.value)}
                  />
                  {addressError && (
                    <p style={{ color: "red" }}>Address is required</p>
                  )}

                  <FormGroup className="f-14 d-flex justify-space-between">
                    <Form.Control
                      className="f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="City"
                      name="city"
                      value={formData.city}
                      onChange={(e) => handleCityChange(e.target.value)}
                    />
                    <Form.Control
                      className="f-14 br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="Emirates"
                      name="emirates"
                      onChange={(e) => emiratesChange(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup className="f-14 d-flex justify-space-between">
                    <FormLabel className="f-14 w-100 ">
                      Country
                      <Form.Select
                        className=" f-14 rounded-0 me-2 inputfocus"
                        style={{ borderBottom: "2px dotted #25316f" }}
                        placeholder="Country"
                        onChange={(e) =>
                          onSelectCountryForAddress(e.target.value)
                        }
                        name="country"
                      >
                        <option value={0}>Select Country</option>
                        <option value={2}>UAE</option>
                        <option value={1}>INDIA</option>
                      </Form.Select>
                    </FormLabel>
                    <Form.Control
                      className="f-14 br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                      style={{ border: "2px dotted #25316f" }}
                      placeholder="Zip"
                      name="zip"
                      onChange={(e) => onZipChange(e.target.value)}
                      value={formData.zip}
                    />
                  </FormGroup>
                </FormGroup>
              </div>
              {/* Display form data values */}
              {savedFormData && (
                <div className="mt-3">
                  <h5>Saved Form Data:</h5>
                  <p>Address Type: {savedFormData.addressType}</p>
                  <p>Customer Address: {savedFormData.customeraddress}</p>
                  <p>City: {savedFormData.city}</p>
                  <p>Emirates: {savedFormData.emirates}</p>
                  <p>Country: {savedFormData.country}</p>
                  <p>Zip: {savedFormData.zip}</p>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                className="b-none"
                style={{
                  height: "max-content",
                  width: "max-content",
                  backgroundColor: "#888888",
                }}
                variant="secondary"
                onClick={handleAddAddress}
              >
                Close
              </Button>

              <Button
                className="b-none"
                style={{
                  height: "max-content",
                  width: "max-content",
                  backgroundColor: "#1d1d5e",
                }}
                variant="primary"
                onClick={saveAddress}
              >
                Save Address
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </Container>
    </>
  );
};

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    masterData: state.masterData,
    common: state.commonReducer,
  };
};

export default connect(mapsToProps)(CustomerDetails);
