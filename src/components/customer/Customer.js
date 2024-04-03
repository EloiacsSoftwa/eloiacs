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
import { useDispatch, useSelector, connect } from "react-redux";
import { GET_ALL_CUSTOMERS_API_CALL } from "../../utils/Constant";
import ProfilePic from "../../Assets/avatars/1.jpg";
import Close from "../../Assets/images/close.svg";
import CustomerForm from "./CustomerForm";
import { useNavigate } from "react-router-dom";
import { Location } from "react-router-dom";
import { BeatLoader } from "react-spinners";

function Customer(props) {
  const [card, setCards] = useState([]);
  const [cardActive, setCardActive] = useState(true);
  const [tableActive, setTableActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startingIndex, setStartIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(15);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleCard = () => {
    setFilteredData(props.customers.customersList);
    setCardActive(true);
    setSearchQuery("");
    setTableActive(false);
    // if (searchValue.length > 0) {
    //   setSearchValue('');
    //   setFilteredData(props.customers.customersList);
    // }
  };
  const handleTable = () => {
    setTableActive(true);
    setFilteredData(props.customers.customersList);
    setSearchQuery("");
    setCardActive(false);
    // if (searchValue.length > 0) {
    //   setSearchValue('');
    //   setFilteredData(props.customers.customersList);
    // }
  };
  const navigateToNewPage = (id) => {
    navigation("/customer-details", { state: { id: id } });
  };
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
    // handleClick(1);
  }, []);

  useEffect(() => {
    setCards(props.customers.customersList);
    setFilteredData(props.customers.customersList);
  }, [props.customers.customersList]);
  const handleFilter = (e) => {
    const searchInput = e.target.value;
    setSearchQuery(searchInput);

    if (searchInput.length > 0) {
      const tempArray = props.customers.customersList.filter((item) => {
        return item.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setFilteredData(tempArray);
    } else {
      setFilteredData(props.customers.customersList);
    }
  };

  const rendertabledata = (data) => {
    console.log(data);
    let address = null;
    if (data && data.addresses && data?.addresses[0]?.city) {
      address = data?.addresses[0]?.city;
    }
    if (address) {
      if (data.addresses && data?.addresses[0]?.state) {
        address = address + ", " + data?.addresses[0]?.state;
      }
    } else if (data && data.addresses && data?.addresses[0]?.state) {
      address = data.addresses && data?.addresses[0]?.state;
    }
    if (address) {
      if (data.addresses && data?.addresses[0]?.countryName) {
        address = address + ", " + data?.addresses[0]?.countryName;
      }
    } else if (data.addresses && data?.addresses[0]?.countryName) {
      address = data?.addresses[0]?.countryName;
    }
    return (
      <td
        scope="col"
        className="text-start"
        style={{ textAlign: "text-start" }}
      >
        {address ? address : "N/A"}
      </td>
    );
  };
  const renderPagination = () => {
    const { customersList } = props.customers;
    const totalItems = customersList.length;
    const itemsPerPage = 15;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxDisplayedPages = 3;

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
          <Stack className="mt-4 d-flex" direction="horizontal" gap={5}>
            <div className="ps-5 ms-3">
              <Link to="/CustomerForm">
                <Button
                  className="rounded text-white btn-blue b-none w-100 b-none"
                  style={{
                    backgroundColor: "#1d1d5e",
                    fontSize: "14px",
                    width: "",
                    justifyContent: "space-evenly",
                  }}
                >
                  New+
                </Button>
              </Link>
            </div>
            <div className="">
              <span style={{ color: "#25316f" }}>Customers</span>
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
                    style={{
                      background: "#80808036",
                      boxShadow: "none",
                      outline: "none",
                      borderColor: "white",
                    }}
                    value={searchQuery}
                    placeholder="Search Here"
                    onChange={(e) => {
                      handleFilter(e);
                    }}
                  />
                </InputGroup>
              </div>
            </div>
            <div
              className="icons-set align-items-center"
              style={{ paddingLeft: "18%", width: "33%" }}
            >
              <AiOutlineContacts
                onClick={handleCard}
                style={{ cursor: "pointer" }}
                className={cardActive ? "selectedIcon" : ""}
              />
              <IoMdMenu
                onClick={handleTable}
                style={{ cursor: "pointer" }}
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
                    key={item.id}
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
                        key={item.id}
                        className="flex container d-flex flex-row align-items-center p-10"
                        style={{
                          width: "100%",
                          height: 100,
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          navigateToNewPage(item.id);
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
                              {item.title && `${item.title}. `}
                              {item.name ? item.name : item.businessTypeName}
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
                    className="fs-5 mt-5 text-center blockquote fst-italic"
                    style={{ color: "red", marginLeft: "40%" }}
                  >
                    No Data Found!
                  </p>
                )}
              </div>
            </div>
          ) : null}
          <div className="table-container mt-5 ">
            {tableActive ? (
              <div
                style={{ marginLeft: 48, marginRight: 48, paddingBottom: 50 }}
              >
                <Table striped hover bordered size="sm">
                  <thead class="overflow-hidden">
                    <tr style={{ paddingTop: 100, paddingBottom: 100 }}>
                      <th
                        className="text-start border border-2"
                        style={{ backgroundColor: "#1d1d5e", color: "white" }}
                        scope="col"
                      >
                        Customer Code
                      </th>
                      <th
                        className="text-start border border-2"
                        style={{ backgroundColor: "#1d1d5e", color: "white" }}
                        scope="col"
                      >
                        Name
                      </th>
                      <th
                        className="text-start border border-2"
                        style={{ backgroundColor: "#1d1d5e", color: "white" }}
                        scope="col"
                      >
                        Mobile
                      </th>
                      <th
                        className="text-start border border-2"
                        style={{ backgroundColor: "#1d1d5e", color: "white" }}
                        scope="col"
                      >
                        Email
                      </th>
                      <th
                        className="text-start border border-2"
                        style={{ backgroundColor: "#1d1d5e", color: "white" }}
                        scope="col"
                      >
                        Category
                      </th>
                      <th
                        className="text-start border border-2"
                        style={{ backgroundColor: "#1d1d5e", color: "white" }}
                        scope="col"
                      >
                        Job Tittle
                      </th>
                      <th
                        className="text-start border border-2"
                        style={{ backgroundColor: "#1d1d5e", color: "white" }}
                        scope="col"
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
                              style={{
                                textAlign: "text-start",
                                cursor: "pointer",
                              }}
                              onClick={() => navigateToNewPage(tableItem.id)}
                            >
                              {tableItem.name
                                ? tableItem.name
                                : tableItem.businessTypeName}
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
                              {tableItem.email ? tableItem.email : "N/A"}
                            </td>
                            <td
                              scope="col"
                              className="text-start"
                              style={{ textAlign: "text-start" }}
                            >
                              {tableItem.businessTypeName}
                            </td>
                            <td
                              scope="col"
                              className="text-start"
                              style={{ textAlign: "text-start" }}
                            >
                              {tableItem.jobPosition
                                ? tableItem.jobPosition
                                : "NA"}
                            </td>
                            {rendertabledata(tableItem)}
                          </tr>
                        ))
                    ) : (
                      <tr>
                      <td className="fst-italic mt-3 ms-5" colSpan={7} style={{ color: 'red', fontWeight: 400, fontSize: 16 }}>No Data Found!</td>
                    </tr>                      
                    )}
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
}
const mapsToProps = (state) => {
  return {
    customers: state.customers,
  };
};
export default connect(mapsToProps)(Customer);
