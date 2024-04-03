import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Button,
  FormControl,
  Table,
  Modal,
  Form,
  Alert,
  Pagination,
} from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer from react-toastify
import "react-toastify/dist/ReactToastify.css";
import InputGroup from "react-bootstrap/InputGroup";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Typeahead } from "react-bootstrap-typeahead";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { FaSearch } from "react-icons/fa";
import { useDispatch, connect } from "react-redux";
import {
  GET_ALL_PRODUCTS_API_CALL,
  ADD_PRODUCT_API_CALL,
  GET_ALL_CUSTOMERS_API_CALL,
  ERROR_CODE_FAILURE,
  RESET_CODE,
  SUCCESS_CODE_NO,
  MASTER_API_CALL,
} from "../../utils/Constant";
import { BeatLoader } from "react-spinners";

const Newproduct = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [productNameError, setProductNameError] = useState(false);
  const [productUrl, setProductUrl] = useState();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [startingIndex, setStartIndex] = useState(0);
  const [endingIndex, setEndingIndex] = useState(15);
  // const [customerCategories, setCustomerCategories] = useState([]);
  const [masterCategory, setMasterCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [masterCategoryError, setMasterCategoryError] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCTS_API_CALL });

    // if (props.customers.customersList.length === 0) {
      // dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
    // }
  }, []);

  useEffect(() => {
    if (props.common.code === ERROR_CODE_FAILURE) {
      setLoading(false);
      toast(props.common.errorMessage, {
        type: "error",
        onClose: () => {
          dispatch({ type: RESET_CODE });
        },
      });
    }
  }, [props.common.code]);

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      setLoading(false);
      setProductName("");
      setProductUrl("");
      setDescription("");
      setMasterCategory("");
      setProductNameError(false);
      resetInputFields();
      setShowModal(false);
      toast("Product Added Successfully...", {
        type: "success",
        onClose: () => {
          dispatch({ type: GET_ALL_PRODUCTS_API_CALL });
          // setShowModal(false);
        },
      });
      dispatch({ type: RESET_CODE });
    }
  }, [props.common.successCode]);

  const handleSubmit = () => {
    if (!masterCategory) {
      setMasterCategoryError(true);
      return;
    }
    if (!productName.trim()) {
      setProductNameError(true);
      return;
    }
   

    const bodyData = {
      productName: productName,
      supplierId: 0,
      productDescription: description,
      createdBy: props.loggedInUser.loginId,
      productUrl: productUrl,
      productType: masterCategory[0]?.id,
    };
    setLoading(true);
    dispatch({ type: ADD_PRODUCT_API_CALL, payload: bodyData });
  };

  const resetInputFields = () => {
    setProductName("");
    setProductUrl("");
    setDescription("");
    setMasterCategory("");
    setProductNameError(false);
  };

  const handleOptionClick1 = (index) => {
    //handleCloseModaledit();
  };
  const paginationEvent = (index) => {
    setCurrentPage(index);
    setStartIndex((index - 1) * 15);
    setEndingIndex(index * 15);
  };
  const tableValue = [
    "Product Code",
    "Product Name",
    "Product Type",
    "Description",
    // "Action",
  ];

  useEffect(() => {
    dispatch({ type: MASTER_API_CALL });
  }, []);
  console.log("master categorysss", props.master.handtCategories);

  const renderPagination = () => {
    const { products } = props.productsData;
    const totalItems = products.length;
    const itemsPerPage = 15; // Set the number of items per page
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const maxDisplayedPages = 3; // Number of pages to display between the first, last, and current page
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    const handleClick = (page) => {
      setCurrentPage(page);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = page * itemsPerPage;
      setStartIndex(startIndex);
      setEndingIndex(endIndex);
    };

    return (
      <Pagination>
        <Pagination.First onClick={() => handleClick(1)} />
        <Pagination.Prev
          onClick={() => handleClick(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {pageNumbers.map((number) => {
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
        })}
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
      <div style={{ paddingRight: 50, paddingLeft: 50, marginTop: 70 }}>
        <ToastContainer position="top-right" autoClose={3000} />
        <Row style={{ marginTop: "2%" }}>
          <Col className="col-8" style={{}}>
            <div className="d-flex">
              <Button
                onClick={handleShowModal}
                style={{
                  background: "#1d1d5e",
                  color: "white",
                  width: "11%",
                  height: "31px",
                  textAlign: "center",
                  border: "none",
                  padding: "0px",
                  marginTop: "3px",
                }}
              >
                New +
              </Button>
              <p
                style={{
                  marginLeft: "38px",
                  marginTop: "6px",
                  marginRight: "13px",
                  color: "#1d1d5e",
                  fontWeight: "bold",
                }}
              >
                Products
              </p>
              <InputGroup
                style={{
                  height: "10px",
                  width: "27%",
                  marginLeft: "10%",
                  fontWeight: "bold",
                }}
              >
                <InputGroupText style={{ backgroundColor: "#1d1d5e" }}>
                  <FaSearch className="text-white" />
                </InputGroupText>
                <FormControl
                  placeholder="Search Products..."
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
        </Row>
        <div className="mt-4" fluid style={{ flex: 1 }}>
          <Table striped hover bordered size="sm">
            <thead>
              <tr>
                {tableValue.map((tablename, index) => (
                  <th
                    className="text-start"
                    key={index}
                    style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft:'2%' }}
                  >
                    {tablename}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {props.productsData.products
                .filter((items) => {
                  return search.toLowerCase() === ""
                    ? items
                    : items.productName
                        .toLowerCase()
                        .includes(search.toLowerCase());
                })
                .sort((a, b) => b.id - a.id)
                .slice(startingIndex, endingIndex)
                .map((items) => (
                  <tr key={items.id}>
                    <td className="text-start" style={{paddingLeft:'2%'}}>{items.productId}</td>
                    <td className="text-start" style={{paddingLeft:'2%'}}>{items.productName}</td>
                    <td className="text-start" style={{paddingLeft:'2%'}}>{items.category}</td>
                    <td
                      style={{
                        maxWidth: "20px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingLeft:'2%'
                      }}
                      className="text-start"
                    >
                      <div
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                        title={items.productDescription}
                      >
                        {items.productDescription
                          .split(" ")
                          .slice(0, 10)
                          .join(" ")
                          ? items.productDescription
                              .split(" ")
                              .slice(0, 10)
                              .join(" ")
                          : "NA"}
                        {items.productDescription.split(" ").length > 10 &&
                          "..."}
                      </div>
                    </td>
                    <td className="text-start" style={{paddingLeft:'2%', display: 'none'}}>
                      <FaEdit
                        onClick={() => handleOptionClick1(items.id)}
                        style={{
                          alignItems: "center",
                          marginLeft: "13px",
                          marginBottom: "-3px",
                        }}
                      />
                      <MdDelete style={{ marginLeft: "13px" }} />
                    </td>
                  </tr>
                ))}
              {props.productsData.products.filter((items) => {
                return search.toLowerCase() === ""
                  ? items
                  : items.productName
                      .toLowerCase()
                      .includes(search.toLowerCase());
              }).length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="fst-italic"
                    style={{ textAlign: "center", color: "red" }}
                  >
                    No data found!
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton onClick={resetInputFields}>
            <Modal.Title style={{ fontSize: "18px", color: "#1d1d5e" }}>
              New Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <p
                style={{
                  border: "none",
                  marginRight: "10px",
                  color: "#1d1d5e",
                  marginBottom: "16px",
                  fontSize: "16px",
                  marginTop: "10px",
                  margin: "-2px 6px 17px -4px",
                }}
              >
                General Info
              </p>
            </div>
            <Row>
              <Col>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    className={`mb-3 ${masterCategoryError ? "has-error" : ""}`}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label
                      className="control-label mr-3"
                      style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                    >
                      Master Category <span style={{ color: "red" }}>*</span>
                    </label>
                    <Typeahead
                      id="masterCategoryTypeahead"
                      className="inputfocus"
                      style={{ flex: 3, marginRight: "1px" }}
                      selected={masterCategory}
                      options={props.master.handtCategories.map((category) => ({
                        id: category.id,
                        label: category.value,
                      }))}
                      labelKey="label"
                      onChange={(selected) => {
                        setMasterCategory(selected);
                        setMasterCategoryError(false);
                      }}
                      placeholder="Search..."
                    />
                    {masterCategoryError && !masterCategory && (
                      <span
                        style={{
                          color: "red",
                          marginTop: "48px",
                          marginLeft: "-32%",
                          fontSize: "12px",
                        }}
                      >
                        Master Category Required
                      </span>
                    )}
                  </div>
                  <div
                    className={`mb-3 ${masterCategoryError ? "has-error" : ""}`}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label
                      className="control-label mr-3"
                      style={{ fontSize: "14px", padding: "0px", flex: 2 }}
                    >
                      Product Name <span style={{ color: "red" }}>*</span>
                    </label>
                    <Form.Control
                      type="text"
                      placeholder=" "
                      className="inputfocus"
                      style={{
                        flex: 3,
                        marginLeft: 17,
                      }}
                      value={productName}
                      onChange={(e) => {
                        setProductName(e.target.value);
                        setProductNameError(false);
                      }}
                    />
                    {productNameError && (
                      <span
                        style={{
                          color: "red",
                          marginTop: "53px",
                          marginLeft: "-29%",
                          fontSize: "12px",
                        }}
                      >
                        Product Name Required
                      </span>
                    )}
                  </div>

                  <div
                    className="mb-3"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <label
                      className="control-label"
                      style={{ fontSize: "14px", flex: 2 }}
                    >
                      Description
                    </label>
                    <textarea
                      className="form-control inputfocus description"
                      rows="4"
                      placeholder="Enter your message"
                      style={{ flex: 3, marginLeft: "20px" }}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="button"
              onClick={handleSubmit}
              style={{
                background: "#1d1d5e",
                color: "white",
                width: "13%",
                height: "31px",
                textAlign: "center",
                border: "none",
                padding: "0px",
                marginTop: "4px",
                marginRight: "22px",
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

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
          {props.productsData.products?.length > 0 ? renderPagination() : null}
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
    productsData: state.productsData,
    loggedInUser: state.users,
    customers: state.customers,
    common: state.commonReducer,
    master: state.masterData,
  };
};

export default connect(mapsToProps)(Newproduct);
