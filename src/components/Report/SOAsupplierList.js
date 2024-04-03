import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  ERROR_CODE_FAILURE,
  GENERATE_SUPPLIER_SUMMARY_PDF_API_CALL,
  RESET_CODE,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
  SOA_SUPPLIER_REPORT_API_CALL,
  SUCCESS_CODE_NO,
} from "../../utils/Constant";
import { useDispatch, connect } from "react-redux";
import { IoMdDownload } from "react-icons/io";
import { BeatLoader } from "react-spinners";

const SuplierSOAList = (props) => {
  const [soasuplier, setSoasuplier] = useState([]);
  const [selectedSuplier, setSelectedSuplier] = useState([]);
  const [loading, setLoading] = useState(false);
 
  const location = useLocation();
  const dispatch = useDispatch();
  

  console.log("suplier id", location.state.id);
  const requestId = location.state.id;

  // dispatch supplier
  useEffect(() => {
    dispatch({ type: SOA_SUPPLIER_REPORT_API_CALL, requestId: requestId });
  }, [requestId]);
  useEffect(() => {
    setSoasuplier(props.report.soaSupplierList);
  }, [props.report.soaSupplierList]);

  console.log("sss", props.report.soaSupplierList);

  useEffect(() => {
    dispatch({
      type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
      data: requestId,
    });
  }, [requestId]);

  useEffect(() => {
    setSelectedSuplier(props.customers.selectedCustomerDetails);
  }, [props.customers.selectedCustomerDetails]);

  // console.log("selectedSuplierDetails", props.customers.selectedCustomerDetails);

  // const handlesubmitpdfgenerate = () => {
  //   setLoading(true);
  //   // Data to be sent with the POST request
  //   const requestData = {
  //     requestId: requestId
  //   };
  
  //   // Making the POST request using Axios
  //   axios.post(
  //     "http://97.74.94.57:8080/handt/v2/pdf/getCustomerSummary",
  //     requestData
  //   )
  //   .then(response => {
  //     console.log('Success:', response.data);
      
  //   })
  //   .catch(error => {
  //     console.error('Error fetching data:', error);
  //   });
  // };
  
  // useEffect(()=> {
  //   if(props.common.successCode === SUCCESS_CODE_NO) {
  //     window.open(props.report.fileurl, "_blank");
  //     setLoading(false);
  //   }
  //   dispatch({ type: RESET_CODE })
  // }, [props.common.successCode])

  // useEffect(()=>{
  //   setLoading(false);
  //   if(props.common.code === ERROR_CODE_FAILURE){
  //     setLoading(false)
  //     dispatch({ type: RESET_CODE })
  //   }
  // }, [props.common.code])

  const handlesubmitPDF = () => {
    // dispatch({ type: SUCCESS_CODE_NO });
    // dispatch({ type: RESET_CODE });
    setLoading(true);
    dispatch({ type: GENERATE_SUPPLIER_SUMMARY_PDF_API_CALL, requestId: requestId })
  }

  useEffect(()=> {
    if(props.report.supplierSummaryPDF?.fileUrl) {
      window.open(props.report.supplierSummaryPDF?.fileUrl, '_blank');
      setLoading(false);
    }
  }, [props.report.supplierSummaryPDF])

  console.log("File URL",props.report.supplierSummaryPDF );


  return (
    <>
     <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
      <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
        <Container fluid>
          <Row>
            <Col
              style={{
                fontSize: 16,
                fontWeight: "500",
                color: "#6E6A6A",
                textDecoration: "underline",
              }}
            >
              Statement of Accounts - Supplier
            </Col>
            <Col className="col-6 text-end">
              {selectedSuplier ? (
                <p key={selectedSuplier.id}>
                  <strong>{selectedSuplier.name}</strong>
                  <br />
                  {selectedSuplier.addresses &&
                  selectedSuplier.addresses.length > 0 ? (
                    <>
                      <small>
                        {selectedSuplier.addresses[0]?.addressLine1}
                      </small>
                      ,<br />
                      <small>{selectedSuplier.addresses[0]?.city}</small>,
                      <small>{selectedSuplier.addresses[0]?.countryName}</small>
                      {/* <br /><small>{selectedSuplier.addresses[0]?.zipcode}</small> */}
                    </>
                  ) : (
                    <small></small>
                  )}
                  <br />
                  <small>{selectedSuplier.mobile}</small>
                </p>
              ) : (
                <p>NA</p>
              )}
            </Col>
          </Row>

          <div
            className="mt-3 p-1"
            style={{ overflowY: "scroll", minHeight: 380, maxHeight: 500 }}
          >
            <Table size="sm" striped hover bordered>
              <thead style={{}}>
                <tr>
                  <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    DATE
                  </th>
                  <th className="text-start ps-4" style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    SUPPLIER NAME
                  </th>
                  <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    ORDER NO
                  </th>
                  {/* <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    DESCRIPTION
                  </th> */}
                  <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    DR(AED)
                  </th>
                  <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    CR(AED)
                  </th>
                  <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                    BALANCE(AED)
                  </th>
                </tr>
                <tr>
                  <th
                    colSpan={3}
                    className="text-start ms-3 gap-3"
                    style={{
                      color: "#6E6A6A",
                      fontSize: 12,
                      fontWeight: "500",
                    }}
                  >
                    OPENING BALANCE AS ON STARTING DATE
                  </th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {soasuplier &&
                  soasuplier.map((item) => (
                    <tr key={item.id}>
                      <td>{item.creditedDate}</td>
                      <td className="text-start ps-4">{item.name}</td>
                      <td>{item.orderId}</td>
                      <td>
                        {item.credited.toString() === "false"
                          ? item.amount
                          : "-"}
                      </td>
                      <td>
                        {item.credited.toString() === "true"
                          ? item.amount
                          : "-"}
                      </td>
                      <td>{item.outStandingAmount}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>

          <div
            className="mt-2 text-end me-3 fs-5"
            style={{
              textDecoration: "underline",
              lineHeight: 1.4,
              letterSpacing: -0.7,
              cursor: "pointer",
              textUnderlineOffset: 4,
            }}
          >
            <u onClick={handlesubmitPDF}>
              {" "}
              <IoMdDownload
                style={{
                  fontSize: 20,
                }}
              />{" "}
              E- Statement of Supplier
            </u>
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
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    report: state.report,
    common: state.commonReducer,
  };
};

export default connect(mapStateToProps)(SuplierSOAList);
