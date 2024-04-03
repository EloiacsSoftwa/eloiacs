import React, { useEffect, useState } from "react";
import { GET_ALL_RECEIPT_API_RESPONSE } from "../../utils/Constant";
import { useDispatch, useSelector, connect } from "react-redux";
import { Alert, Row, Table, Col } from "react-bootstrap";
import Arrow from "../../Assets/images/play.svg";
import ArrowDown from "../../Assets/images/arrow-faded.svg";
import { BiDownload } from "react-icons/bi";
import { BeatLoader } from "react-spinners";

// import * as XLSX from "xlsx";

function SoaCustomer(props) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const customerlist = props.report.reportSummaryList || [];

  useEffect(() => {
    dispatch({ type: GET_ALL_RECEIPT_API_RESPONSE });
  }, []);
  console.log("list", props.report.reportSummaryList);

  //   const handleDownload = () => {
  //     const filteredCustomerList = customerlist.map(({ productTypeId, profit, ...rest }) => {
  //       const capitalizedKeys = Object.fromEntries(Object.entries(rest).map(([key, value]) => [key.toUpperCase(), value]));
  //       return capitalizedKeys;
  //     });
  // const wsData = [
  //   ["Statement of Profit and Loss"], // Heading row
  //   [],
  //   Object.keys(filteredCustomerList[0] || {}).map((header, index) => ({ v: header, s: { alignment: { horizontal: "center" } } })),
  //   ...filteredCustomerList.map(item => Object.values(item))
  // ];

  //     const ws = XLSX.utils.aoa_to_sheet(wsData);
  //     ws['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: (wsData[2] || []).length - 1 } }];
  //     const columnWidths = wsData[2].map((header, index) => {
  //       if (index === 0) {
  //         return { wch: 5 };
  //       }
  //       return { wch: 18 };
  //     });
  //     ws['!cols'] = columnWidths;
  //     const wb = XLSX.utils.book_new();
  //     XLSX.utils.book_append_sheet(wb, ws, "Customer List");
  //     XLSX.writeFile(wb, "customer_list.xlsx");
  //   }

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
          style={{
            paddingRight: 50,
            paddingLeft: 50,
            marginTop: 75,
          }}
        >
          <div>
            <div
              className="fw-bolder"
              style={{
                fontSize: 16,
                color: "#6E6A6A",
                textDecoration: "underline",
              }}
            >
              PROFIT - LOSS STATEMENT
            </div>
            {/* <div >   <BiDownload onClick={handleDownload}  className="download  me-5 rounded-circle p-1" style={{
          fontSize:40, cursor:"pointer"
        }} /> </div> */}
          </div>
          <div
            className="mt-3"
            style={{ overflowY: "scroll", minHeight: 100, maxHeight: 450 }}
          >
            <Table size="sm" striped hover bordered>
              <thead style={{ zIndex: 9 }}>
                <tr>
                  <td
                    className="fw-bolder"
                    scope="col"
                    style={{ backgroundColor: "#1d1d5e", color: "white" }}
                  >
                    ID
                  </td>
                  <td
                    className="fw-bolder text-start"
                    scope="col"
                    style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '2%' }}
                  >
                    Product Name
                  </td>
                  <td
                    className="fw-bolder text-start"
                    scope="col"
                    style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '2%' }}
                  >
                    Category
                  </td>
                  <td
                    className="fw-bolder text-start"
                    scope="col"
                    style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '4%' }}
                  >
                    Cost Price
                  </td>
                  <td
                    className="fw-bolder text-start"
                    scope="col"
                    style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '4%' }}
                  >
                    Billing Price
                  </td>
                  <td
                    className="fw-bolder text-start"
                    scope="col"
                    style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '4%' }}
                  >
                    Net Profit/Loss
                  </td>
                </tr>
              </thead>
              <tbody>
                {customerlist.length != 0 ? (
                  customerlist.map((item) => (
                    <tr key={item.id}>
                      <td scope="col">{item.id}</td>
                      <td scope="col" className="text-start" style={{ paddingLeft: '2%' }}>{item.productName}</td>
                      <td scope="col" className="text-start" style={{ paddingLeft: '2%' }}>{item.productType}</td>
                      <td scope="col" className="text-start" style={{ paddingLeft: '4%' }}>
                        {item.purchaseAmount.toFixed(2)}
                      </td>
                      <td scope="col" className="text-start" style={{ paddingLeft: '4%' }}>
                        {item.invoiceAmount.toFixed(2)}
                      </td>
                      <td scope="col" className="text-start" style={{ paddingLeft: '4%' }}>
                        {item.profitLossAmount.toFixed(2)}
                        {
                          item.profit ? (
                            <img
                              className="ms-2"
                              src={Arrow}
                              style={{
                                width: 8,
                                height: 8,
                                marginLeft: 5,
                                transform: "rotate(-90deg)",
                                zIndex: 1,
                              }}
                            />
                          ) : (
                            <img
                              src={ArrowDown}
                              className="ms-2"
                              style={{
                                width: 8,
                                height: 8,
                                marginLeft: 5,
                                transform: "rotate(90deg)",
                              }}
                            />
                          )
                          // arrow ,ark up down
                        }
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">
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
