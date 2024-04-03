import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Col,
  Row,
  Button,
  Container,
  Modal,
  Form,
  FormControl,
  FormLabel,
  FormGroup,
  FormSelect,
  Alert,
} from "react-bootstrap";
import avtar1 from "../../Assets/avatars/1.jpg";
import avtar2 from "../../Assets/avatars/2.jpg";
import avtar3 from "../../Assets/avatars/3.jpg";
import avtar4 from "../../Assets/avatars/4.png";
import avtar5 from "../../Assets/avatars/5.png";
import profile from "../../Assets/images/profile.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import Vendorform from "./VendorBankForm";
import { useSelector, useDispatch, connect } from "react-redux";
import {
  MASTER_API_CALL,
  CREATE_CUSTOMER_API_CALL,
  REGISTER_API_CALL,
  INITIAL_STATE,
  RESET_CODE,
  ERROR_CODE_FAILURE,
  SUCCESS_CODE_NO,
} from "../../utils/Constant";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const isEmailValid = (email1) => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailPattern.test(email1);
};

function VendorForm(props) {
  // const [selectedImage, setSelectedImage] = useState(profile);
  // const [isAvatarsOpen, setIsAvatarsOpen] = useState(false);
  const [suppliername, setSupplierName] = useState("");
  const [supllieraddress, setSupplierAddress] = useState("");
  const [city, setCity] = useState("");
  const [emirates, setEmirates] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [vattreatment, setVatTreatment] = useState("");
  const [trnnum, setTrnNum] = useState("");
  const [title, setTitle] = useState("");
  const [jobposition, setJobPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [mobile, setMobile] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [bankdetails, setbankdetails] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [vatError, setVatError] = useState(false);
  // const [savedbankFormData, setSavedBankFormData] = useState("");
  // const [MobileValue, setMobileValue] = useState("");
  const [Errormessage, setErrorMessage] = useState(false);
  // const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    iban: "",
    branch: "",
    bankcountry: "",
  });
  // const captureImage = (e) => {
  //   const selectedImageSrc = e.target.src;
  //   setSelectedImage(selectedImageSrc);
  //   setIsAvatarsOpen(false);
  // };

  // const bankModal = () => {
  //   if (suppliername.trim() !== "") {
  //     setBankDetails(!bankdetails);
  //   } else {
  //     console.error("setName");
  //   }
  // };
  const bankmodal = () => {
    setbankdetails(!bankdetails);
  };
  // const handleModalClose = () => {
  //   setbankdetails(false);
  // };

  // useEffect(() => {
  //   dispatch({ type: RESET_CODE });
  // }, []);

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      setLoading(false);
      dispatch({ type: RESET_CODE });
      toast(props.common.errorMessage, {
        type: "error",
      });
    }
  }, [props.common.code]);
  

  useEffect(() => {
    if (props.customers.goback) {
      setLoading(false);
      // navigation(-1)
      // resetValues();
      toast("Successfully registered", {
        type: "success",
        onClose: () => {
          navigation(-1);
        },
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.customers.goback]);

  useEffect(() => {
    if (props.customers.code === 100) {
      setLoading(false);
      toast(props.customers.error, {
        type: "error",
        onClose: () => {},
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.customers.code]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (e.target.name === "mobile") {
      setMobile(e.target.value);
    }
    if (mobile.length === 0) {
      setMobileError("The Mobile Number is Required");
    }

    if (e.target.name === "email") {
      setEmail(e.target.value);
      setEmailError(isEmailValid(e.target.value) ? "" : "Invalid email format");
    }

    if (e.target.name === "suppliername") setSupplierName(e.target.value);
    if (e.target.name === "supllieraddress") setSupplierAddress(e.target.value);
    if (e.target.name === "city") setCity(e.target.value);
    if (e.target.name === "emirates") setEmirates(e.target.value);
    if (e.target.name === "country") setCountry(e.target.value);
    if (e.target.name === "zip") setZip(e.target.value);
    if (e.target.name === "vattreatment") setVatTreatment(e.target.value);
    if (e.target.name === "trnnumber") setTrnNum(e.target.value);
    if (e.target.name === "title") setTitle(e.target.value);
    if (e.target.name === "jobposition") setJobPosition(e.target.value);
    if (e.target.name === "phone") setPhone(e.target.value);
    if (e.target.name === "email") setEmail(e.target.value);
    if (e.target.name === "website") setWebsite(e.target.value);
  };

  const handlesubmit = () => {
    if (suppliername.length === 0) {
      setErrorMessage(true);
      return;
    }
    if (!mobile.trim() || mobileError) {
      setErrorMessage(true);
      return;
    }
    if (!country) {
      setErrorMessage(true);
      return;
    }


    const bankDetails = [];

    if (
      formData.accountNumber !== "" &&
      formData.bankName !== "" &&
      formData.iban !== ""
    ) {
      bankDetails.push({
        code: formData.iban ? formData.iban : "",
        bankName: formData.bankName ? formData.bankName : "",
        accountNumber: formData.accountNumber ? formData.accountNumber : "",
        branchName: formData.branch ? formData.branch : "",
        accountHolderName: formData.bankName ? formData.bankName : "",
        country: formData.bankcountry ? formData.bankcountry : "",
      });
    }

    const tempAddressArray = [];
    if (supllieraddress || city || zip) {
      tempAddressArray.push({
        addressLine1: supllieraddress ? supllieraddress : null,
        // addressLine2: city ,
        city: city ? city : null,
        state: emirates ? emirates : null,
        country: country ? country : null,
        zipcode: zip ? zip : null,
        addressTypeId: 1,
      });
    }

    const sendsupplierdata = {
      name: suppliername,
      jobPosition: jobposition,
      trnNo: trnnum,
      phone: phone,
      mobile: mobile,
      email: email,
      website: website,
      isRegistered: vattreatment,
      title: title,
      createdBy: 1,
      businessTypeId: 3,
      addresses: tempAddressArray,
      bankAccounts: bankDetails,
      country: country,
    };
    setLoading(true);
    dispatch({
      type: CREATE_CUSTOMER_API_CALL,
      payload: sendsupplierdata,
    });
  };

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
  }, []);

  const handleVatreatment = (item) => {
    setVatTreatment(item.target.value);
  };

  // console.log("the errormessage",Errormessage.message)

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
        <div
          style={{
            backgroundColor: "#F5F5F5",
            marginTop: 65,
            paddingLeft: 30,
            paddingRight: 30,
            maxHeight: "100vh",
            minHeight: 600,
          }}
        >
          <Container fluid className=" f-14 pt-1 ">
            <Row className=" f-14 ms-1 me-1 pb-1 pt-1 mt-3 mb-3">
              <Col
                className=" f-14 d-flex justify-content-end "
                style={{ paddingRight: "10%" }}
              >
                <Button
                  type="submit"
                  className=" f-14 bg-blue b-none f-14 mt-1 text-uppercase rounded-1"
                  style={{
                    height: "28px",
                    backgroundColor: "#25316f",
                  }}
                  onClick={handlesubmit}
                >
                  Save
                </Button>
                <Button
                  type="submit"
                  className="fw-bolder f-14 bg-blue b-none f-14 mt-1 ms-2 text-uppercase rounded-1"
                  style={{
                    height: "28px",
                    backgroundColor: "#bebec3",
                    color: "black",
                  }}
                  onClick={handlesubmit}
                >
                  <Link
                    to="/Vendor"
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    Cancel{" "}
                  </Link>
                </Button>
              </Col>
            </Row>
            {/*---------------form starts ---------------------*/}
            <Row
              xs={12}
              sm={12}
              lg={12}
              md={12}
              xxl={12}
              className=""
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Col
                xs={10}
                md={10}
                lg={10}
                xxl={10}
                className="border border-2  shadow"
              >
                <Row style={{ flex: 1 }} className=" ms-0 ">
                  <Col
                    xs={10}
                    sm={10}
                    lg={10}
                    md={10}
                    xxl={10}
                    className=" f-14 d-flex p-4"
                  ></Col>
                </Row>

                <Row
                  className="ps-3 pe-3"
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    marginTop: "4%",
                  }}
                >
                  <Col
                    xxl={7}
                    lg={7}
                    md={7}
                    sm={7}
                    xs={7}
                    className=" f-14 "
                    style={{ position: "relative", top: "-40px" }}
                  >
                    <div>
                      <FormGroup>
                        <FormControl
                          type="text"
                          placeholder="Supplier Name"
                          onChange={(e) => handleChange(e)}
                          className=" f-14 w-100 h-10 br_b-2  pt-3 ps-3 rounded-0 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          name="suppliername"
                        ></FormControl>

                        {Errormessage && !suppliername && (
                          <p className="error f-14" style={{ color: "red" }}>
                            Supplier Name is required.
                          </p>
                        )}
                      </FormGroup>
                    </div>
                    <div
                      className=" f-14 d-flex flex-row"
                      style={{ flex: "1" }}
                    >
                      <FormGroup
                        style={{
                          display: "flex",
                          flex: 1,
                          alignItems: "center",
                          justifyContents: "center",
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
                          className=" f-14  br_b-2 rounded-0 mt-2 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          placeholder="Address"
                          name="supllieraddress"
                          onChange={(e) => handleChange(e)}
                        ></Form.Control>
                        <FormGroup className=" f-14 d-flex justify-space-between ">
                          <Form.Control
                            className=" f-14 br_b-2 rounded-0 mt-2 me-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="City"
                            name="city"
                            onChange={(e) => handleChange(e)}
                          ></Form.Control>
                          <Form.Control
                            className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="Emirates"
                            onChange={(e) => handleChange(e)}
                            name="emirates"
                          ></Form.Control>
                        </FormGroup>
                        <FormGroup className=" f-14 d-flex justify-space-between ">
                          <Form.Select
                            className=" f-14  br_b-2 rounded-0 mt-2 me-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="Country"
                            onChange={(e) => handleChange(e)}
                            name="country"
                            value={country}
                          >
                            <option defaultChecked>Select Country</option>
                            <option value="1">India</option>
                            <option value="2">UAE</option>
                          </Form.Select>
                          <Form.Control
                            className=" f-14  br_b-2 rounded-0 mt-2 ms-2 inputfocus"
                            style={{ border: "2px dotted #25316f" }}
                            placeholder="PO-BOX"
                            value={zip}
                            onChange={(e) => handleChange(e)}
                            name="zip"
                          ></Form.Control>
                        </FormGroup>
                        {Errormessage && !country && (
                            <p style={{ color: 'red', fontSize: 14 }}>Select Country.</p>
                        )}
                      </FormGroup>
                    </div>
                    <FormGroup>
                      <FormLabel className=" txt-ht_blue w-100 mt-2 f-16">
                        Vat Treatment
                        <Form.Select
                          aria-label="Default select example"
                          type="text"
                          placeholder=""
                          className="f-14 w-100 h-10 br_b-2 pt-1 ps-3 rounded-0 inputfocus"
                          style={{ border: "2px dotted #25316f" }}
                          defaultValue="Unregistered"
                          onChange={(item) => handleVatreatment(item)}
                          name="vattreatment"
                        >
                          <option value="true">Registered</option>
                          <option value="false">Unregistered</option>
                        </Form.Select>
                      </FormLabel>

                      <div
                        className={`mb-3 ${vatError ? "has-error" : ""}`}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <FormLabel className=" b txt-ht_blue h-30 w-100 f-14">
                          TRN NO
                          <FormControl
                            className={`f-14 br_b-2 rounded-0 inputfocus ${
                              vatError ? "has-error" : ""
                            }`}
                            style={{
                              border: "2px dotted #25316f",
                              height: "2rem",
                            }}
                            onChange={(e) => {
                              handleChange(e);
                              setVatError(false);
                            }}
                            name="trnnumber"
                          ></FormControl>
                        </FormLabel>
                        <div>
                          {" "}
                          {vatError && (
                            <span style={{ color: "red" }}>Required</span>
                          )}
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Salutation
                        <FormSelect
                          className="f-14   br_b-2 rounded-0 inputfocus"
                          onChange={(e) => handleChange(e)}
                          name="title"
                          value={title}
                          style={{
                            border: "2px dotted #25316f",
                            height: "2.5rem",
                          }}
                        >
                          <option>Select Salutation</option>
                          <option value="Mr">Mr.</option>
                          <option value="Mrs">Mrs.</option>
                          <option value="Miss">Miss.</option>
                        </FormSelect>
                      </FormLabel>
                    </FormGroup>
                  </Col>

                  <Col
                    xs={5}
                    sm={5}
                    md={5}
                    lg={5}
                    xxl={5}
                    className=" f-14 "
                    style={{ position: "relative", top: "-48px" }}
                  >
                    <FormGroup>
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Job Position
                        <FormControl
                          className="f-14   br_b-2 rounded-0 inputfocus"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          onChange={(e) => {
                            handleChange(e);
                          }}
                          name="jobposition"
                        ></FormControl>
                      </FormLabel>
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Phone
                        <FormControl
                          className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          name="phone"
                          onChange={(e) => handleChange(e)}
                        ></FormControl>
                      </FormLabel>

                      <div
                        className={`mb-3 ${mobileError ? "has-error" : ""}`}
                        style={{ alignItems: "center" }}
                      >
                        <FormLabel className="b txt-ht_blue w-100 f-14">
                          Mobile
                          <span className="f-16 ms-2" style={{ color: "red" }}>
                            *
                          </span>
                          <div key={`inline-radio`} className="mb-1">
                            <FormControl
                              placeholder="Enter phone number"
                              value={mobile}
                              onChange={(event) => {
                                const inputValue = event.target.value.replace(
                                  /\D/g,
                                  ""
                                );

                                setMobile(inputValue);
                                setMobileError(false);
                              }}
                              className={`inputfocus f-14 br_b-2 rounded-0 ${
                                mobileError ? "has-error" : ""
                              }`}
                              style={{
                                border: "none",
                                backgroundColor: "white",
                                border: "2px dotted #25316f",
                                height: "2rem",
                              }}
                              name="mobile"
                              type="tel"
                              maxLength={10}
                            />
                          </div>
                        </FormLabel>
                        {Errormessage && !mobile && (
                          <p className="error f-14" style={{ color: "red" }}>
                            Mobile Number is required.
                          </p>
                        )}
                      </div>

                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Email
                        <FormControl
                          className="inputfocus f-14   br_b-2 rounded-0 inputfocus"
                          placeholder="example@gmail.com"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          name="email"
                          onChange={(e) => handleChange(e)}
                        ></FormControl>
                      </FormLabel>
                      {emailError && (
                        <p style={{ color: "red" }}>{emailError}</p>
                      )}
                      <FormLabel className=" b txt-ht_blue w-100 f-14">
                        Website
                        <FormControl
                          className="f-14   br_b-2 rounded-0 inputfocus"
                          placeholder="www.example.com"
                          style={{
                            border: "2px dotted #25316f",
                            height: "2rem",
                          }}
                          onChange={(e) => handleChange(e)}
                          name="website"
                        ></FormControl>
                      </FormLabel>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              {/*bamk modal for the bank details */}

              {bankdetails && (
                <Vendorform
                  banktoggle={bankmodal}
                  formData={formData}
                  handleChange={handleChange}
                  setFormData={setFormData}
                />
              )}
            </Row>
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
}
const mapsToProps = (state) => {
  return {
    master: state.masterData,
    loggedInUser: state.users,
    customers: state.customers,
    common: state.commonReducer,
  };
};

export default connect(mapsToProps)(VendorForm);