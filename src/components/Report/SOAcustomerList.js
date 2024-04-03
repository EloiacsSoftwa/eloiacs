import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import {
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
  SOA_CUSTOMER_REPORT_API_CALL,
  SOA_CUSTOMER_REPORT_API_RESPONSE,
  PDF_VIEW_CUSTOMER_API_CALL,
  PDF_VIEW_CUSTOMER_API_RESPONSE,
  SUCCESS_CODE,
  RESET_CODE,
} from "../../utils/Constant";
import { useDispatch, connect } from "react-redux";
import { IoMdDownload } from "react-icons/io";
import { BeatLoader } from "react-spinners";

const CustomerSOAList = (props) => {
  const [soaCustomer, setSoaCustomer] = useState([]);
  const [SelectedCustomer, setSelectedCustomer] = useState([]);
  const [Pdfview, setPdfView] = useState("");
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading,setLoading] = useState(false);
  const requestId = location.state.id;

  // soa customer api dispatch
  useEffect(() => {
    dispatch({ type: SOA_CUSTOMER_REPORT_API_CALL, requestId: requestId });
  }, [requestId]);

  useEffect(() => {
    setSoaCustomer(props.report.soaCustomerList);
  }, [props.report.soaCustomerList]);

  // dispatch for the customer search
  useEffect(() => {
    dispatch({
      type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
      data: requestId,
    });
  }, [requestId]);

  useEffect(() => {
    setSelectedCustomer(props.customers.selectedCustomerDetails);
  }, [props.customers.selectedCustomerDetails]);

  // dispatch for the customer summary handle submit pdf
  const handlesubmitpdfgenerate = () => {
    dispatch({ type: SUCCESS_CODE });
    dispatch({type:RESET_CODE})
    setLoading(true)
    dispatch({ type: PDF_VIEW_CUSTOMER_API_CALL, requestId: requestId });
  };

  useEffect(() => {
    // Open the PDF file when the API response is received
    if (props.report.pdfcustomerView?.fileUrl) {
      window.open(props.report.pdfcustomerView?.fileUrl, "_blank");
      setLoading(false)
    }
    console.log("report pdf", props.report);
  }, [props.report.pdfcustomerView]);
  console.log("pdf", props.report);

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
              Statement of Accounts - Customer
            </Col>
            <Col className="col-6 text-end">
              {SelectedCustomer ? (
                <p key={SelectedCustomer.id}>
                  <strong>{SelectedCustomer.name}</strong>
                  <br />
                  {SelectedCustomer.addresses &&
                  SelectedCustomer.addresses.length > 0 ? (
                    <>
                      <small>
                        {SelectedCustomer.addresses[0]?.addressLine1}
                      </small>
                      ,<br />
                      <small>{SelectedCustomer.addresses[0]?.city}</small>,
                      <small>
                        {SelectedCustomer.addresses[0]?.countryName}
                      </small>
                      {/* <br /><small>{SelectedCustomer.addresses[0]?.zipcode}</small> */}
                    </>
                  ) : (
                    <small></small>
                  )}
                  <br />
                  <small>{SelectedCustomer.mobile}</small>
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
                  <th
                    className="text-start ps-4"
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    CUSTOMER NAME
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
                {soaCustomer &&
                  soaCustomer.map((item) => (
                    <tr key={item.id}>
                      <td>{item.creditedDate}</td>
                      <td className="text-start ps-4">{item.name}</td>
                      <td>{item.orderId}</td>
                      <td>
                        {item.credited.toString() === "true"
                          ? item.amount.toFixed(2)
                          : "-"}
                      </td>
                      <td>
                        {item.credited.toString() === "false"
                          ? item.amount.toFixed(2)
                          : "-"}
                      </td>
                      <td>{item.outStandingAmount.toFixed(2)}</td>
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
            <u onClick={handlesubmitpdfgenerate}>
              {" "}
              <IoMdDownload
                style={{
                  fontSize: 20,
                }}
              />{" "}
              E- Statement of Customer 
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

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    report: state.report,
  };
};

export default connect(mapsToProps)(CustomerSOAList);
