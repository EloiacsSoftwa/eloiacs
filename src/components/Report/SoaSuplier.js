import React, { useEffect, useState } from "react";
import { CUSTOMER_INVOICE_SUMMARY_API_CALL } from "../../utils/Constant";
import { useDispatch, useSelector, connect } from "react-redux";
import { Alert, Table } from "react-bootstrap";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function SoaCustomer(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const customerlist = props.report.supplierPaymentReportList || [];
  const navigation = useNavigate();

  const navigateToSupplierSOA = (id) =>{
    navigation("/SOAsupplierList",{state: {id:id}});
    console.log("supplier id",id);
  }

  useEffect(() => {
    dispatch({ type: CUSTOMER_INVOICE_SUMMARY_API_CALL });
  }, []);
  console.log("list", props.report.supplierPaymentReportList);

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          className=""
          style={{ paddingRight: 50, paddingLeft: 50, marginTop: 75 }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: "500",
              textDecoration: "underline",
              color: "#6E6A6A",
            }}
          >
            STATEMENT OF VENDOR
          </div>
          <div
            className="mt-3"
            style={{ minHeight: 100, maxHeight: 450, overflowY: "scroll" }}
          >
            <Table size="sm" striped bordered hover>
              <thead>
                <tr>
                  <td
                    scope="col fw-bolder f-16"
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    CODE
                  </td>
                  <td
                    scope="col fw-bolder f-16"
                    className="text-start ps-4"
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    Vendor Name
                  </td>
                  <td
                    scope="col fw-bolder f-16"
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    Enumeration
                  </td>
                  <td
                    scope="col fw-bolder f-16"
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    Current PO ID
                  </td>
                  <td
                    scope="col fw-bolder f-16"
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    Current PO Date
                  </td>
                </tr>
              </thead>
              <tbody>
                {customerlist.length != 0 ? (
                  customerlist.map((item) => (
                    <tr key={item.id}>
                      <td scope="col fw-normal f-14">{item.userName}</td>
                      <td scope="col fw-normal f-14">
                        <u
                        className="text-left d-flex ps-4"
                          style={{
                            textDecorationColor: "#0483d1",
                            cursor: "pointer",
                            color:'#0483d1',
                          }}
                          onClick={() =>{
                            navigateToSupplierSOA(item.customerId)
                          }}
                        >
                          {item.customerName}
                        </u>
                      </td>
                      <td scope="col fw-normal f-14">{item.counts}</td>
                      <td scope="col fw-normal f-14">
                        {item.latestInvoiceOrderId}
                      </td>
                      <td scope="col fw-normal f-14">{item.latestOrders}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <Alert variant="warning">
                        No data found. Try again later.
                      </Alert>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
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
    customers: state.customers,
    common: state.commonReducer,
    report: state.report,
  };
};

export default connect(mapsToProps)(SoaCustomer);
