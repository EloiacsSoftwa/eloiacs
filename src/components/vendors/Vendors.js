import { Form, Pagination } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import { FaSearch } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { RiArrowRightSLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineContacts } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import ProfilePic from "../../Assets/avatars/1.jpg";
import Close from "../../Assets/images/close.svg";
import { useDispatch, useSelector, connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";
import {
  GET_ALL_CUSTOMERS_API_CALL,
  RESET_CUSTOMER_LISTS,
  ERROR_CODE_FAILURE,
  RESET_CODE,
  SUCCESS_CODE_NO,
} from "../../utils/Constant";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Vendors(props) {
  const [cardActive, setCardActive] = useState(true);
  const [tableActive, setTableActive] = useState(false);
  const [errorcustomer, seterrorcustomer] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startingIndex, setStartIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(15);
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCard = () => {
    setFilteredData(props.customers.customersList);
    setSearchQuery("");
    setCardActive(true);
    setTableActive(false);
  };
  const handleTable = () => {
    setSearchQuery("");
    setTableActive(true);
    setCardActive(false);
    setFilteredData(props.customers.customersList);
  };

  useEffect(() => {
    //getCardData();
    if (props.customers.customersList.length > 0) {
      dispatch({ type: RESET_CUSTOMER_LISTS });
    }

    dispatch({ type: GET_ALL_CUSTOMERS_API_CALL, data: 3 });
  }, []);

  useEffect(() => {
    setFilteredData(props.customers.customersList);
  }, [props.customers.customersList]);

  const handleFilter = (e) => {
    setSearchQuery(e.target.value);
    if (e.target.value.length > 0) {
      const tempArray = props.customers.customersList.filter((item) => {
        return item.name.toLowerCase().includes(e.target.value.toLowerCase());
      });

      setFilteredData(tempArray);
    } else {
      setFilteredData(props.customers.customersList);
    }
  };

  const handleCustomerOnClick = (id) => {
    navigation("/vendor-details", { state: { id: id } });
  };
  const renderPagination = () => {
    const { customersList } = props.customers;
    const totalItems = customersList.length;
    const itemsPerPage = 15; // Define your items per page here
    const totalPages = Math.ceil(totalItems / itemsPerPage);

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

      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;

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

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ marginTop: "70px", marginTop: "70px" }}>
        <Stack
          className="mt-4 d-flex"
          direction="horizontal"
          gap={5}
          style={{}}
        >
          <div className="ps-5 ms-3">
            <Link to="/VendorForm">
              <Button
                className="rounded text-white btn-blue w-100 b-none"
                style={{
                  backgroundColor: "#1d1d5e",
                  fontSize: "14px",
                  width: "",
                  justifyContent: "space-evenly",
                }}
              >
                New
              </Button>
            </Link>
          </div>
          <div className="">
            <span style={{ color: "#1d1d5e" }}>Vendors</span>
          </div>
          <div
            className="group-search d-flex ml-6p"
            style={{
              width: "39%",
            }}
          >
            <div className="p-2 filter-icon mt-1"></div>

            <div className="p-2">
              <InputGroup className="w-max">
                <InputGroupText style={{ backgroundColor: "#1d1d5e" }}>
                  <FaSearch className="text-white" />
                </InputGroupText>
                <Form.Control
                  className="inputfocus"
                  style={{
                    background: "#80808036",
                  }}
                  value={searchQuery}
                  placeholder="Search Vendors "
                  onChange={(e) => [handleFilter(e)]}
                />
              </InputGroup>
            </div>
          </div>
          <div
            className="icons-set align-items-center"
            style={{ paddingLeft: "18%", width: "33%" }}
          >
            {/* <RiArrowLeftSLine />
          <RiArrowRightSLine /> */}
            <AiOutlineContacts
              style={{ cursor: "pointer" }}
              onClick={handleCard}
              className={cardActive ? "selectedIcon" : ""}
            />
            <IoMdMenu
              style={{ cursor: "pointer" }}
              onClick={handleTable}
              className={tableActive ? "selectedIcon" : ""}
            />
          </div>
        </Stack>

        {cardActive ? (
          <div
            className="card-container"
            style={{
              background: "#F2F4FF99",
              margin: 48,
              paddingTop: 15,
              paddingBottom: 50,
            }}
          >
            <div>
              <div
                style={{
                  flexDirection: "row",
                  display: "flex",
                  flexWrap: "wrap",
                  paddingRight: 8,
                  paddingLeft: 8,
                  paddingTop: 8,
                  paddingBottom: 8,
                }}
              >
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <div
                      style={{
                        flex: "0 0 25%",
                        paddingLeft: 7,
                        paddingRight: 7,
                        paddingTop: 7,
                        paddingBottom: 7,
                        position: "relative",
                      }}
                    >
                      <Card
                        onClick={() => {
                          handleCustomerOnClick(item.id);
                        }}
                        key={item.id}
                        className="flex container d-flex flex-row align-items-center p-10"
                        style={{
                          width: "100%",
                          height: 100,
                          cursor: "pointer",
                        }}
                      >
                        <div
                          className="image-container d-flex flex-column flex-1"
                          style={{
                            marginLeft: "20px",
                          }}
                        >
                          <Card.Img
                            style={{ width: "60px", height: "auto" }}
                            src={ProfilePic}
                            className="rounded-circle flex-1"
                          ></Card.Img>
                        </div>
                        <div className="image-container d-flex flex-column flex-1">
                          <Card.Body className="flex-1">
                            <Card.Title
                              style={{
                                fontSize: 15,
                                color: "#222222",
                                margin: 0,
                                marginTop: 8,
                              }}
                            >
                              {" "}
                              {item.title && `${item.title}. `}
                              {item.name}
                            </Card.Title>
                            <Card.Text
                              style={{ color: "#22222280", fontSize: 12 }}
                            >
                              {item.jobPosition}
                            </Card.Text>
                          </Card.Body>
                        </div>
                      </Card>

                      <div style={{ position: "absolute", top: 15, right: 25 }}>
                        <img src={Close} style={{ width: 7, height: 7 }} />
                      </div>
                    </div>
                  ))
                ) : (
                  <p
                    className="fst-italic mt-3 ms-5"
                    style={{ color: "red", fontWeight: 400, fontSize: 16 }}
                  >
                    No Data Found!
                  </p>
                )}
              </div>
            </div>
          </div>
        ) : null}

        <div className="table-container mt-5">
          {tableActive ? (
            <div style={{ marginLeft: 48, marginRight: 48, paddingBottom: 50 }}>
              <Table striped hover bordered size="sm">
                <thead className="overflow-hidden">
                  <tr style={{ paddingTop: 100, paddingBottom: 100 }}>
                    <th
                      className="text-start"
                      style={{ backgroundColor: "#1d1d5e", color: "white" }}
                    >
                      ID
                    </th>
                    <th
                      className="text-start"
                      style={{ backgroundColor: "#1d1d5e", color: "white" }}
                    >
                      Name
                    </th>
                    <th
                      className="text-start"
                      style={{ backgroundColor: "#1d1d5e", color: "white" }}
                    >
                      Mobile
                    </th>
                    <th
                      className="text-start"
                      style={{ backgroundColor: "#1d1d5e", color: "white" }}
                    >
                      Email
                    </th>
                    <th
                      className="text-start"
                      style={{ backgroundColor: "#1d1d5e", color: "white" }}
                    >
                      Business Type
                    </th>
                    <th
                      className="text-start"
                      style={{ backgroundColor: "#1d1d5e", color: "white" }}
                    >
                      Position
                    </th>
                    <th
                      className="text-start"
                      style={{ backgroundColor: "#1d1d5e", color: "white" }}
                    >
                      Address
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData
                    .sort((a, b) => b.id - a.id)
                    .slice(startingIndex, endingIndex)
                    .map((tableItem) => (
                      <tr key={tableItem.id}>
                        <td
                          scope="col"
                          className="text-start"
                          style={{ textAlign: "text-start" }}
                        >
                          {tableItem.userName}
                        </td>
                        <td
                          scope="col"
                          className="text-start"
                          style={{ textAlign: "text-start", cursor: "pointer" }}
                          onClick={() => {
                            handleCustomerOnClick(tableItem.id);
                          }}
                        >
                          {tableItem.title} {tableItem.name}
                        </td>
                        <td
                          scope="col"
                          className="text-start"
                          style={{ textAlign: "text-start" }}
                        >
                          {tableItem.mobile}
                        </td>
                        <td
                          scope="col"
                          className="text-start"
                          style={{ textAlign: "text-start" }}
                        >
                          {tableItem.email ? tableItem.email : "NA"}
                        </td>
                        <td
                          scope="col"
                          className="text-start"
                          style={{ textAlign: "text-start" }}
                        >
                          {tableItem.businessTypeName
                            ? tableItem.businessTypeName
                            : "NA"}
                        </td>
                        <td
                          scope="col"
                          className="text-start"
                          style={{ textAlign: "text-start" }}
                        >
                          {tableItem.jobPosition ? tableItem.jobPosition : "NA"}
                        </td>
                        <td
                          scope="col"
                          className="text-start"
                          style={{ textAlign: "text-start" }}
                        >
                          {tableItem.addresses && tableItem?.addresses[0]?.city}{" "}
                          {tableItem.addresses &&
                            tableItem?.addresses[0]?.state}{" "}
                          {tableItem.addresses &&
                            tableItem?.addresses[0]?.countryName}
                        </td>
                      </tr>
                    ))

                  ) : (
                    <tr>
                      <td className="fst-italic mt-3 ms-5" colSpan={7} style={{ color: 'red', fontWeight: 400, fontSize: 16 }}>No Data Found!</td>
                    </tr>
                  ) }
                </tbody>
              </Table>

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
                {props.customers.customersList?.length > 0
                  ? renderPagination()
                  : null}
              </div>
            </div>
          ) : null}
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
  );
}

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    common: state.commonReducer,
  };
};

export default connect(mapsToProps)(Vendors);
