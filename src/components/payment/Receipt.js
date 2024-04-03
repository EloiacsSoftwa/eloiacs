import React, { useEffect, useState } from "react";
import {
  Container,
  FormSelect,
  Pagination,
  Row,
  Table,
  Button,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { useDispatch, connect } from "react-redux";
import { GENERATE_RECEIPT_PDF_API_CALL, GET_ALL_RECEIPT_API_CALL, ERROR_CODE, ERROR_CODE_FAILURE, RESET_CODE, SUCCESS_CODE_NO } from "../../utils/Constant";
import { FiDownload } from "react-icons/fi";
import { BeatLoader } from "react-spinners";

const  Receipt = (props) => {
  const [entitiesPerPage, setEntitiesPerPage] = useState("");
  const [search, setSearch] = useState("");
  const [filteredReceipt, setFilteredReceipt] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [startingIndex, setStartIndex] = useState(0)
  const [endingIndex, setEndingIndex] = useState(15)
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  console.log(props)

  useEffect(() => {
    dispatch({type: GET_ALL_RECEIPT_API_CALL,payload:{}})
  }, [])

  useEffect(() => {
    setFilteredReceipt(props.receipt.listAllReceipt);
  }, [props.receipt.listAllReceipt])

  // console.log("the data pages",entitiesPerPage);
  
  useEffect(() => {
    setLoading(false)
      if (props.common.code === ERROR_CODE_FAILURE) {
        setLoading(false)
        dispatch({ type: RESET_CODE });
      }
  }, [props.common.code])

  useEffect(() => {
    if (props.common.successCode === SUCCESS_CODE_NO) {
      window.open(props.receipt.fileurl, "_blank");
      setLoading(false);
      // dispatch({ type: RESET_INVOICE_CODE });
    }
    dispatch({ type: RESET_CODE });
  }, [props.common.successCode]);

 
  const renderPagination = () => {
    let totalItems = 0;
    if (filteredReceipt != null) {
      totalItems = filteredReceipt.length;
    }
   
    const itemsPerPage = entitiesPerPage ? parseInt(entitiesPerPage) : 15;
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
        (number === 1 || number === totalPages) ||
        (number >= currentPage - 1 && number <= currentPage + 1 && currentPage !== totalPages)
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
      if ((number === 2 && currentPage > 3) || (number === totalPages - 1 && currentPage < totalPages - 2)) {
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

  // useEffect(()=> {
  //   if (props.receipt.code === 100) {
  //     window.open(props.receipt.fileurl, "_blank");
  //     setLoading(false);
  //   }
  // }, [props.receipt.code])  
  
  return (
    <div className="mt-5" style={{ paddingLeft: 50, paddingRight: 50 }}>
      <div style={{position: 'relative', display: 'flex', flexDirection: 'column'}}>
      <Container fluid>
        <div
          className="d-flex mt-4 pt-4 "
          style={{
            // border: "1px solid #80808042",
            paddingLeft: "1%",
            paddingRight: "1%",
            marginBottom: "1%",
          }}
        >
          <Col>
            <Link to="/Customerpay">
              <Button
                className="b-none fw-bolder"
                style={{ backgroundColor: "#1d1d5e", color: "white" }}
              >
                New Receipt
              </Button>
            </Link>
          </Col>
          <Col>
            <InputGroup style={{ height: "10px", width: "100%" }}>
              <InputGroupText style={{ backgroundColor: "#1d1d5e " }}>
                <FaSearch className="text-white" />
              </InputGroupText>
              <FormControl
                placeholder="Search Customer..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setFilteredReceipt(props.receipt.listAllReceipt.filter((item) => {
                    return item.customerName.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
                  }));
                }}
                style={{
                  background: "#80808036",
                  boxShadow: "none",
                  outline: "none",
                  borderColor: "white",
                  height: "35px",
                }}
              />
            </InputGroup>
          </Col>

          <Col className="d-flex align-items-center justify-content-end me-3">
            <div className="d-flex align-items-start pt-1 ms-3">
          
         
            </div>
          </Col>
        </div>
        <div >
          <Table striped hover size="sm" bordered>
            <thead>
              <tr>
                <th className="text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '4%' }}>
                  Receipt ID
                </th>
                <th  className="text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '4%' }}>
                  Customer Name
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Mode of Pay
                </th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                  Amount
                </th>
                <th className="text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '2%' }}>
                  Reference Number
                </th>
                <th className="text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '2%' }}>Description</th>
                <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredReceipt && filteredReceipt.map((item) => (
                  <tr key={item.id}>
                    <td className="text-start" style={{ paddingLeft: '4%' }}>{item.billReference}</td>
                    <td className="text-start" style={{ paddingLeft: '4%' }}>{item.customerName}</td>
                    <td className="text-start" style={{ paddingLeft: '3.5%' }}>{item.paymentTypeName}</td>
                    <td className="text-start" style={{ paddingLeft: '2.5%' }}>{item.amount}</td>
                    <td className="text-start" style={{ paddingLeft: '2%' }}>{item.referenceNumber ? item.referenceNumber : "-"}</td>
                    <td className="text-start" style={{ paddingLeft: '2%' }}>{item.description ? item.description : "-"}</td>
                    <td>
                      <FiDownload style={{ cursor: 'pointer' }} onClick={()=>{
                        if(item.receiptUrl) {
                          window.open(item.receiptUrl, "_new");
                        } else {
                          setLoading(true);
                          dispatch({type: GENERATE_RECEIPT_PDF_API_CALL, payload: item.billReference})
                        }                        
                      }} />
                    </td>
                  </tr>
                ))}
              {filteredReceipt && filteredReceipt.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
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
        <div className="d-flex justify-content-center ms-auto text-center mt-3">
          <Pagination size="md"></Pagination>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 20, paddingBottom: 100 }}>
        {
          props.receipt.listAllReceipt?.length > 0 && renderPagination()
        }
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
    </div>
  );
}

const mapsToProps = (state) => {
  return {
    customers: state.customers,
    receipt: state.receipt,
    common: state.commonReducer
  };
};

export default connect(mapsToProps)(Receipt);
