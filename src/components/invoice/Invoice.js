import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  Table,
  Container,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import ProgressBar from "react-bootstrap/ProgressBar";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import "./Invoice.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import {
  GET_ALL_INVOICE_API_CALL,
  GENERATE_INVOICE_PDF_API_CALL,
  RESET_INVOICE_CODE,
  RESET_CODE,
  SUCCESS_CODE_NO,
  ERROR_CODE_FAILURE
} from "../../utils/Constant";
import { BeatLoader } from "react-spinners";

const Newproduct = (props) => {
  //use states
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [startingIndex, setStartIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(15);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigate();

  console.log(props);

  useEffect(() => {
    setLoading(true)
    dispatch({ type: GET_ALL_INVOICE_API_CALL });
  }, []);

  useEffect(() => {
    setLoading(false)
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false)
    dispatch({ type: RESET_CODE });
    }
  }, [props.common.successCode])

  useEffect(() => {
    setLoading(false)
      if (props.common.code === ERROR_CODE_FAILURE) {
        setLoading(false)
        dispatch({ type: RESET_CODE });
      }
  }, [props.common.code])

  useEffect(() => {
    if (props.invoice.code === 100) {
      window.open(props.invoice.fileurl, "_blank");
      setLoading(false);
      dispatch({ type: RESET_INVOICE_CODE });
    }
  }, [props.invoice.code]);

  //Handlers
  const handleDateChange = (dates) => {
    if (!dates) {
      setStartDate(new Date());
      setEndDate(null);
    } else {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    }
  };

  //Dummy table headers
  const tableValue = [
    "Invoice No",
    "Customer Name",
    "Invoice Date",
    "Due Date",
    "Net",
    "Total Amount",
    "Action",
  ];

  //Pagination
  const renderPagination = () => {
    const { invoiceList } = props.invoice;
    const totalItems = invoiceList.length;
    const itemsPerPage = 15;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxDisplayedPages = 3; // Number of pages to display between the first, last, and current page

    const getPageNumbers = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return pageNumbers;
    };

    const pageNumbers = getPageNumbers();

    const handleClick = (page) => {
      setCurrentPage(page);

      const startIndex = (page - 1) * 15;
      const endIndex = page * 15;

      setStartIndex(startIndex);
      setEndingIndex(endIndex);
    };

    const renderPageNumbers = pageNumbers.map((number) => {
      if (
        number === 1 ||
        number === totalPages ||
        (number >= currentPage - 1 &&
          number <= currentPage + 1 &&
          currentPage !== totalPages)
      ) {
        return (
          <Pagination.Item
            key={number}
            active={number === currentPage}
            onClick={() => handleClick(number)}
          >
            {number}
          </Pagination.Item>
        );
      }
      if (
        (number === 2 && currentPage > 3) ||
        (number === totalPages - 1 && currentPage < totalPages - 2)
      ) {
        return <Pagination.Ellipsis key={number} />;
      }
      return null;
    });

    return (
      <Pagination>
        <Pagination.First onClick={() => handleClick(1)} />
        <Pagination.Prev
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPageNumbers}
        <Pagination.Next
          onClick={() => handleClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => handleClick(totalPages)} />
      </Pagination>
    );
  };

  //View Invoice
  const navigateToView = (id) => {
    navigation("/view-invoice", { state: { id: id } });
  };
  const navigateToDraft = (id) => {
    navigation("/draftInvoice", { state: { id: id } });
  };

  return (
    <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
    <Container fluid className="mt-2">
      <div style={{ paddingLeft: 50, paddingRight: 50, marginTop: 75 }}>
        <Row className="ms-1">
          <Col lg={6} xxl={6} className="col-6 p-1">
            <div
              className="p-2 shadow rounded-3"
              style={{ background: "#87ceeb2e", height: 180 }}
            >
              <h6
                className="pt-3 f-20"
                style={{ marginLeft: "20px", marginBottom: "20px" }}
              >
                Invoice Summary
              </h6>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginBottom: "10 px",
                    marginLeft: "3%",
                    color: "grey",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total Amount
                  <br />
                  <span style={{ color: "black" }}>
                    {props.invoice.totalAmount.toFixed(2)} AED
                  </span>
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "19%",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid
                  <br />
                  <span style={{ color: "black" }}>
                    {props.invoice.unpaidAmount.toFixed(2)} AED
                  </span>
                </p>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "26%",
                    color: "blue",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Paid
                  <br />
                  <span style={{ color: "black" }}>
                    {props.invoice.paidAmount.toFixed(2)} AED
                  </span>
                </p>
              </div>
            </div>
          </Col>

          <Col lg={6} xxl={6} className="col-6 p-1">
            <div
              className="p-2 shadow rounded-3"
              style={{ background: "#87ceeb2e", height: 180 }}
            >
              <h6
                className="pt-3 f-20 "
                style={{ marginLeft: "20px", marginBottom: "20px" }}
              >
                Invoice Summary
              </h6>
              <div style={{ display: "flex" }}>
                <p
                  style={{
                    marginBottom: "10px",
                    marginLeft: "3%",
                    color: "grey",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Total Amount :{" "}
                  <span style={{ color: "black" }}>
                    {props.invoice.totalAmount.toFixed(2)} AED
                  </span>
                </p>
                <p
                  style={{
                    marginLeft: "51%",
                    color: "red",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid :{" "}
                  <span style={{ color: "black" }}>
                    {props.invoice.unpaidAmount.toFixed(2)} AED
                  </span>
                </p>
              </div>
              <ProgressBar
                className="progress"
                now={parseInt(
                  (props.invoice.paidAmount / props.invoice.totalAmount) * 100
                )}
                style={{ width: "93%", marginLeft: "21px" }}
              />
              <div className="d-flex">
                <div class="square"></div>
                <p
                  style={{
                    marginLeft: "-7%",
                    fontSize: "14px",
                    marginTop: "2px",
                    fontWeight: "500",
                  }}
                >
                  Paid
                  <br />
                  {props.invoice.paidAmount.toFixed(2)} AED
                </p>
                <div
                  class="square"
                  style={{ marginLeft: "15%", background: "#d2d4d7" }}
                ></div>
                <p
                  style={{
                    marginLeft: "-6%",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  Unpaid
                  <br />
                  {props.invoice.unpaidAmount.toFixed(2)} AED
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <Row style={{ marginTop: "2%" }}>
          <Col className="col-8" style={{ paddingLeft: "2%" }}>
            <div className="d-flex">
              <Link
                to="/NewInvoice"
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button
                  style={{
                    backgroundColor: "#1d1d5e",
                    borderColor: "#1d1d5e",
                    width: "80px",
                  }}
                >
                  New +
                </Button>
              </Link>
              <InputGroup
                style={{ height: "10px", width: "39%", marginLeft: "10%" }}
              >
                <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                  <FaSearch className="text-white" />
                </InputGroupText>
                <FormControl
                  placeholder="Search Invoice..."
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    background: "#80808036",
                    boxShadow: "none",
                    outline: "none",
                    borderColor: "white",
                  }}
                />
              </InputGroup>
            </div>
          </Col>
          {/* <Col
            className="d-flex justify-content-end"
            style={{ marginLeft: "75px" }}
          >
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              dateFormat={"yyyy/MM/dd"}
              placeholderText="Select Date Range"
              className="rounded"
              selectsRange
            />
          </Col> */}
        </Row>
        <div
          style={{ paddingLeft: "1%", paddingRight: "1%" }}
          className="mt-3 mb-4"
        >
          <Table striped hover size="sm" bordered>
            <thead>
              <tr>
                {tableValue.map((tablename, index) => (
                  <th
                    key={index}
                    className={index == 0 ? "text-start" : ""}
                    style={{
                      backgroundColor: "#1d1d5e",
                      color: "white",
                      paddingLeft: index == 0 ? "2%" : 0,
                    }}
                  >
                    {tablename}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.invoice.invoiceList
                .filter((item) => {
                  const invoiceDate = new Date(item.invoiceDate);
                  return (
                    (search.toLowerCase() === "" ||
                      item.customerName
                        .toLowerCase()
                        .includes(search.toLowerCase())) &&
                    (!startDate ||
                      !endDate ||
                      (invoiceDate >= startDate && invoiceDate <= endDate))
                  );
                })
                .sort((a, b) => b.id - a.id)
                .slice(startingIndex, endingIndex)
                .map((item) => (
                  <tr key={item.id}>
                    <td className="text-start" style={{ paddingLeft: "2%" }}>
                      {props.users.UserRoleID === 1 ? (
                        !item.drafted ? (
                          <u
                            onClick={() => navigateToView(item.invoiceOrderId)}
                            style={{
                              textDecorationColor: "#CCCCCC",
                              cursor: "pointer",
                              color:'#0483d1'
                            }}
                          >
                            {item.invoiceOrderId}
                          </u>
                        ) : (
                          <u
                            onClick={() => navigateToDraft(item.invoiceOrderId)}
                            style={{
                              textDecorationColor: "#CCCCCC",
                              cursor: "pointer",
                              color:'#0483d1'
                            }}
                          >
                            {item.invoiceOrderId}
                          </u>
                        )
                      ) : (
                        <u
                          onClick={() => navigateToView(item.invoiceOrderId)}
                          style={{
                            textDecorationColor: "#CCCCCC",
                            cursor: "pointer",
                            color:'#0483d1'
                          }}
                        >
                          {item.invoiceOrderId}
                        </u>
                      )}
                    </td>

                    <td className="text-start" style={{ paddingLeft: '5%' }}>{item.customerName}</td>
                    <td>{item.invoiceDate}</td>
                    <td>{item.dueDate}</td>
                    <td>{item.net}</td>
                    <td className="text-start" style={{ paddingLeft: '4%' }}>{item.totalAmount.toFixed(2)}</td>
                    <td>
                      {item.products.length > 0 && !item.drafted && (
                        <FiDownload
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (item.supplierPOUrl) {
                              window.open(item.supplierPOUrl, "_new");
                            } else {
                              setLoading(true);
                              dispatch({
                                type: GENERATE_INVOICE_PDF_API_CALL,
                                invoiceId: item.invoiceOrderId,
                              });
                            }
                          }}
                        />
                      )}
                    </td>
                  </tr>
                ))}
              {props.invoice.invoiceList.filter((item) => {
                const invoiceDate = new Date(item.invoiceDate);
                return (
                  (search.toLowerCase() === "" ||
                    item.customerName
                      .toLowerCase()
                      .includes(search.toLowerCase())) &&
                  (!startDate ||
                    !endDate ||
                    (invoiceDate >= startDate && invoiceDate <= endDate))
                );
              }).length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="fst-italic"
                    style={{ color: "red" }}
                  >
                    No data found!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
          paddingBottom: 100,
        }}
      >
        {props.invoice.invoiceList?.length > 0 ? renderPagination() : null}
      </div>
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
  );
};

const mapsToProps = (state) => {
  return {
    invoice: state.invoice,
    users: state.users,
    common: state.commonReducer,
  };
};

export default connect(mapsToProps)(Newproduct);
