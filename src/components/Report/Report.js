import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import {
  CUSTOMER_INVOICE_SUMMARY_API_CALL,
  GET_ALL_ORDERS_SUMMARY_API_CALL,
  GET_SUPPLIER_PAYMENT_REPORT_API_CALL,
  GET_PRODUCT_TYPE_SUMMARY_REPORT_API_CALL,
} from "../../utils/Constant";
import { useDispatch, useSelector, connect } from "react-redux";
import Arrow from "../../Assets/images/play.svg";
import ArrowDown from "../../Assets/images/arrow-faded.svg";
import axios from "axios";
import { BeatLoader } from "react-spinners";

// import './Report.css';

function Report(props) {
  console.log(props);

  const dispatch = useDispatch();
  const [vendorData, setVendorData] = useState([]);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  // page navigate
  const navigateCustomerList = (id) => {
navigation("/SOAcustomerList",{state:{id:id}})
  };

  const navigateSupplierList = (id) => {
    navigation('/SOAsupplierList', { state: { id: id } })
  }

  useEffect(() => {
    dispatch({ type: CUSTOMER_INVOICE_SUMMARY_API_CALL });
    dispatch({ type: GET_ALL_ORDERS_SUMMARY_API_CALL });
    dispatch({ type: GET_SUPPLIER_PAYMENT_REPORT_API_CALL });
    dispatch({ type: GET_PRODUCT_TYPE_SUMMARY_REPORT_API_CALL });
  }, []);

  // console.log(props.report.productTypeBasedSummary)

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginTop: 75 }}>
          <h6 className="ms-5 mt-1 fw-bold fs-4 ">Reports</h6>
          <div className="ms-5 mt-1 me-5">
            <h6 className="mt-2 bold mb-3 fs-5" style={{ color: "#1b1b8e" }}>
              Business Overview
            </h6>
            <div className="row">
              <div
                className="col "
                style={{ paddingLeft: 10, paddingRight: 10 }}
              >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
                      {" "}
                      <a
                        className="text-decoration-none"
                        style={{ color: "rgb(6, 6, 6, 0.74)" }}
                      >
                        Statement of Profit and Loss
                      </a>
                    </p>
                    <div
                      style={{
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        paddingLeft: 10,
                        cursor: "pointer",
                      }}
                    >
                      <Link to="/ProfitLoss">
                        <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
                          {" "}
                          <u>View More</u>
                        </p>
                      </Link>
                    </div>
                  </div>
                  <div
                    style={{
                      height: 360,
                      overflow: "hidden",
                      backgroundColor: "#F5F5F5",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        backgroundColor: "#1d1d5e",
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          paddingLeft: 15,
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <p style={{ marginBottom: 0, color: "white" }}>
                          Product Name
                        </p>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "start",
                          paddingLeft: 15,
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <p style={{ marginBottom: 0, color: "white" }}>
                          Product Type
                        </p>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          justifyContent: "center",
                          paddingLeft: 15,
                          paddingTop: 5,
                          paddingBottom: 5,
                        }}
                      >
                        <p style={{ marginBottom: 0, color: "white" }}>
                          Profit Amount
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        paddingBottom: 8,
                        paddingTop: 3,
                      }}
                    >
                      {props.report.reportSummaryList.map((item) => {
                        return (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              flex: 1,
                            }}
                          >
                            <div
                              style={{ display: "flex", flexDirection: "row" }}
                            >
                              <div
                                style={{
                                  flex: 1,
                                  display: "flex",
                                  paddingLeft: 15,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                }}
                              >
                                <p
                                  style={{
                                    marginBottom: 0,
                                    cursor: "pointer",
                                    color: "#0483d1",
                                    fontWeight: 500,
                                  }}
                                >
                                  <u>{item.productName.length > 15 ? `${item.productName.substring(0,15)}...`:item.productName}</u>
                                </p>
                              </div>
                              <div
                                style={{
                                  flex: 1,
                                  display: "flex",
                                  justifyContent: "start",
                                  paddingLeft: 15,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                }}
                              >
                                <p style={{ marginBottom: 0 }}>
                                  {item.productType}
                                </p>
                              </div>
                              <div
                                style={{
                                  flex: 1,
                                  display: "flex",
                                  justifyContent: "center",
                                  paddingLeft: 15,
                                  paddingTop: 5,
                                  paddingBottom: 5,
                                  alignItems: "center",
                                }}
                              >
                                <p style={{ marginBottom: 0 }}>
                                  {item.profitLossAmount.toFixed(2)}
                                </p>
                                {
                                  item.profit ? (
                                    <img
                                      src={Arrow}
                                      style={{
                                        width: 8,
                                        height: 8,
                                        marginLeft: 5,
                                        transform: "rotate(-90deg)",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={ArrowDown}
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
                              </div>
                            </div>
                            <div
                              style={{
                                backgroundColor: "#EAEAEA",
                                width: "100%",
                                height: 1,
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    style={{
                      paddingTop: 10,
                      paddingBottom: 8,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <p style={{ fontSize: 14, fontWeight: 600 }}>
                      Product type Based reports
                    </p>
                    <div
                      style={{
                        height: 160,
                        overflow: "hidden",
                        backgroundColor: "#F5F5F5",
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          backgroundColor: "#1d1d5e",
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            paddingLeft: 15,
                            paddingTop: 5,
                            paddingBottom: 5,
                          }}
                        >
                          <p style={{ marginBottom: 0, color: "white" }}>
                            Product Type
                          </p>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: 15,
                            paddingTop: 5,
                            paddingBottom: 5,
                          }}
                        >
                          <p style={{ marginBottom: 0, color: "white" }}>
                            Total Purchase
                          </p>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: 15,
                            paddingTop: 5,
                            paddingBottom: 5,
                          }}
                        >
                          <p style={{ marginBottom: 0, color: "white" }}>
                            Total Invoice
                          </p>
                        </div>
                        <div
                          style={{
                            flex: 1,
                            display: "flex",
                            justifyContent: "center",
                            paddingLeft: 15,
                            paddingTop: 5,
                            paddingBottom: 5,
                          }}
                        >
                          <p style={{ marginBottom: 0, color: "white" }}>
                            Profit/Loss
                          </p>
                        </div>
                      </div>
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          flexDirection: "column",
                          paddingBottom: 8,
                          paddingTop: 3,
                        }}
                      >
                        {props.report.productTypeBasedSummary.map((item) => {
                          return (
                            <div
                              key={item.id}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                }}
                              >
                                <div
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    paddingLeft: 15,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                  }}
                                  onClick={() => {
                                    navigation("/ProductView", {
                                      state: { id: item.businessTypeId },
                                    });
                                  }}
                                >
                                  <p
                                    style={{
                                      marginBottom: 0,
                                      cursor: "pointer",
                                      color: "#0483d1",
                                      fontWeight: 500,
                                    }}
                                  >
                                    <u>{item.businessTypeName}</u>
                                  </p>
                                </div>
                                <div
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: 15,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                  }}
                                >
                                  <p style={{ marginBottom: 0 }}>
                                    {item.totalPurchaseAmount.toFixed(2)}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: 15,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                  }}
                                >
                                  <p style={{ marginBottom: 0 }}>
                                    {item.totalInvoiceAmount.toFixed(2)}
                                  </p>
                                </div>
                                <div
                                  style={{
                                    flex: 1,
                                    display: "flex",
                                    justifyContent: "center",
                                    paddingLeft: 15,
                                    paddingTop: 5,
                                    paddingBottom: 5,
                                    alignItems: "center",
                                  }}
                                >
                                  <p style={{ marginBottom: 0 }}>
                                    {item.profitLossAmount? item.profitLossAmount.toFixed(2) : 0}
                                  </p>
                                  {item.profit ? (
                                    <img
                                      src={Arrow}
                                      style={{
                                        width: 8,
                                        height: 8,
                                        marginLeft: 5,
                                        transform: "rotate(-90deg)",
                                      }}
                                    />
                                  ) : (
                                    <img
                                      src={ArrowDown}
                                      style={{
                                        width: 8,
                                        height: 8,
                                        marginLeft: 5,
                                        transform: "rotate(90deg)",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div
                                style={{
                                  backgroundColor: "#EAEAEA",
                                  width: "100%",
                                  height: 1,
                                }}
                              ></div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col" style={{ paddingLeft: 30 }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
                    {" "}
                    <a
                      className="text-decoration-none"
                      style={{ color: "rgb(6, 6, 6, 0.74)" }}
                    >
                      Statement of Customer
                    </a>
                  </p>
                  <div
                    style={{
                      paddingRight: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 10,
                      cursor: "pointer",
                    }}
                  >
                    <Link to="/SoaCustomer">
                      <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
                        {" "}
                        <u>View More</u>
                      </p>
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    height: 255,
                    overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#1d1d5e",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Customer Name
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Total Orders
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Last Invoice on
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Latest Orders
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#F5F5F5",
                      paddingBottom: 8,
                      paddingTop: 3,
                    }}
                  >
                    {props.report.customersInvoiceList.map((item) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p
                              style={{
                                marginBottom: 0,
                                cursor: "pointer",
                                color: "#0483d1",
                                fontWeight: 500,
                              }}
                            >
                              <u
                                onClick={() => {
                                  navigateCustomerList(item.customerId);
                                }}
                              >
                                {item.customerName.length > 15 ? `${item.customerName.substring(0, 15)}...` : item.customerName}
                              </u>
                            </p>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "center",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p style={{ marginBottom: 0 }}>{item.counts}</p>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "center",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p style={{ marginBottom: 0 }}>
                              {item.latestOrders}
                            </p>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "center",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p style={{ marginBottom: 0 }}>
                              {item.latestInvoiceOrderId}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 15,
                  }}
                >
                  <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
                    {" "}
                    <a
                      className="text-decoration-none"
                      style={{ color: "rgb(6, 6, 6, 0.74)" }}
                    >
                      Statement of Vendor
                    </a>
                  </p>
                  <div
                    style={{
                      paddingRight: 10,
                      paddingTop: 5,
                      paddingBottom: 5,
                      paddingLeft: 10,
                      cursor: "pointer",
                    }}
                  >
                    <Link to="/SoaSuplier">
                      <p style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
                        {" "}
                        <u>View More</u>
                      </p>
                    </Link>
                  </div>
                </div>
                <div
                  style={{
                    height: 255,
                    overflow: "hidden",
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      backgroundColor: "#1d1d5e",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Vendor Name
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Total Orders
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Last Purchase Order
                      </p>
                    </div>
                    <div
                      style={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "center",
                        paddingLeft: 15,
                        paddingTop: 5,
                        paddingBottom: 5,
                      }}
                    >
                      <p style={{ marginBottom: 0, color: "white" }}>
                        Latest Orders
                      </p>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      paddingBottom: 8,
                      paddingTop: 3,
                    }}
                  >
                    {props.report.supplierPaymentReportList.map((item) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p
                              style={{
                                marginBottom: 0,
                                cursor: "pointer",
                                color: "#0483d1",
                                fontWeight: 500,
                              }}
                            >
                              <u onClick={()=> navigateSupplierList(item.customerId)}>{item.customerName.length > 15?`${item.customerName.substring(0,15)}...`: item.customerName}</u>
                            </p>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "center",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p style={{ marginBottom: 0 }}>{item.counts}</p>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "center",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p style={{ marginBottom: 0 }}>
                              {item.latestOrders}
                            </p>
                          </div>
                          <div
                            style={{
                              flex: 1,
                              display: "flex",
                              justifyContent: "center",
                              paddingLeft: 15,
                              paddingTop: 5,
                              paddingBottom: 5,
                            }}
                          >
                            <p style={{ marginBottom: 0 }}>
                              {item.latestInvoiceOrderId}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="ms-5 mt-4 me-5">
                <h6 className='mt-1 p-2 bold mb-5 ms-2 fs-5' style={{ color: '#1b1b8e' }}>Sales</h6>
                <div className="row">

                    <div className="col">
                        <p className="p-2 ms-2"> <a href="Salesproduct" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Customer Sales Statement</a></p>
                        <hr />
                        <p className="p-2 ms-2"> <a href="Saleinvoice" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Invoice Sale Statement</a></p>
                        <hr />
                    </div>
                    <div className="col">
                        <p className="p-2 ms-2"> <a href="Salecategory" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Category Sales Statement</a></p>
                        <hr />
                    </div>
                </div>
            </div>





{/*}
            <div className="ms-5 mt-4 me-5">
                <h6 className='mt-1 p-2 bold mb-5 ms-2 fs-5' style={{ color: '#1b1b8e' }}>Purchase</h6>
                <div className="row">
                    <div className="col">
                        <p className="p-2 ms-2"> <a href="Vendarpurchase" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}> Purchase Vendor Statement</a></p>
                        <hr />
                        <p className="p-2 ms-2"> <a href="Vendarproduct" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Vendor Product Statement</a></p>
                        <hr />
                    </div>
                    <div className="col">


                    </div>
                </div>
            </div> */}
          {/*outstanding report */}

          {/* <div className="ms-5 mt-4 me-5">
                <h6 className='mt-1 p-2 bold mb-5 ms-2 fs-5' style={{ color: '#1b1b8e' }}>Accounts Report</h6>
                <div className="row">
                    <div className="col">
                        <p className="p-2 ms-2"> <a href="Expensereport" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Expense Statement of Accounts</a></p>
                        <hr />
                        <p className="p-2 ms-2" style={{ color: 'rgb(6, 6, 6, 0.74)' }}> <a href="Accountsincome" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Income Statement of Accounts</a></p>
                        <hr />
                    </div>
                    <div className="col">
                        <p className="p-2 ms-2" > <a href="Accountsupplier" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Supplier Statement of Accounts</a></p>
                        <hr />
                        <p className="p-2 ms-2"> <a href="Accountscustomer" className="text-decoration-none" style={{ color: 'rgb(6, 6, 6, 0.74)' }}>Customer Statement of Accounts</a></p>
                    </div>
                </div>
            </div> */}
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
    common: state.commonReducer,
    report: state.report,
  };
};

export default connect(mapsToProps)(Report);
