import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
  Table,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaSearch } from "react-icons/fa";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { useDispatch, connect } from "react-redux";
import { GET_ALL_VEHICLE_INVOICE_API_CALL } from "../../utils/Constant";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

const VehicleInvoice = (props) => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(()=> {
    dispatch({ type:GET_ALL_VEHICLE_INVOICE_API_CALL, payload: { query: "" } })
  }, []);

  // console.log("Vehicle", props.vehicle);

  const navigateToView = (id) => {
    navigation("/viewVehicleInvoice", {state: { id: id }})
  }

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
                className="col-3"
                style={{ color: "#1d1d5e", fontWeight: "700" }}
              >
                <LiaFileInvoiceSolid
                  style={{ fontSize: 26, color: "#1d1d5e" }}
                />
                <Link to="/New-VehicleInvoice" style={{ color: "#1d1d5e" }}>
                  <u
                    style={{
                      textDecorationColor: "#1d1d5e",
                      cursor: "pointer",
                    }}
                  >
                    Create Vehicle Invoice
                  </u>
                </Link>
              </Col>
              <Col className="col-4">
                <InputGroup style={{ width: 250 }}>
                  <InputGroupText style={{ backgroundColor: "#1d1d5e" }}>
                    <FaSearch className="text-white" />
                  </InputGroupText>
                  <FormControl
                    style={{
                      background: "#80808036",
                      boxShadow: "none",
                      outline: "none",
                      borderColor: "white",
                      width: 100,
                    }}
                    placeholder="Search Invoice..."
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                  />
                </InputGroup>
              </Col>
              {/* <Col className="col-5 d-flex justify-content-end">
                <div>
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat={"dd/MM/yyyy"}
                    selectsRange
                    placeholderText="Select Date Range"
                    className="rounded ms-2 inputfocus"
                  />
                </div>
              </Col> */}
            </Row>

            <div
              className="mt-4"
              style={{ overflowY: "scroll", minHeight: 100, maxHeight: 450 }}
            >
              <Table size="sm" striped hover bordered>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                      Invoice No
                    </th>
                    <th className="text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '3%' }}>
                      Customer Name
                    </th>
                    <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                      Invoice Date
                    </th>
                    <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                      Due Date
                    </th>
                    <th style={{ backgroundColor: "#1d1d5e", color: "white" }}>
                      Net
                    </th>
                    <th className="text-start" style={{ backgroundColor: "#1d1d5e", color: "white", paddingLeft: '3%' }}>
                      Total Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props.vehicle.vehicleInvoiceList.filter((item)=>{
                    return search === "" || item.customerName.toLowerCase().includes(search.toLowerCase())
                  }).map((item)=> {
                    return (
                      <tr key={item.id}>
                        <td><u style={{ textDecorationColor: '#CCCCCC', cursor: 'pointer' }} onClick={()=> navigateToView(item.incomeOrderId)}>{item.incomeOrderId}</u></td>
                        <td className="text-start" style={{ paddingLeft: '3%' }}>{item.customerName}</td>
                        <td>{item.incomeInvoiceDate}</td>
                        <td>{item.incomeDueDate}</td>
                        <td>{item.net}</td>
                        <td className="text-start" style={{ paddingLeft: '3%' }}>{item.totalAmount}</td>
                      </tr>
                    )
                  })}
                  {props.vehicle.vehicleInvoiceList.filter(item => {
                    return (
                      search === "" || item.customerName.toLowerCase().includes(search.toLowerCase()))
                  }).length === 0 && (
                    <tr>
                      <td colSpan={6} className="fst-italic" style={{ color: 'red' }}>
                        No Data Found!
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
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
    </>
  );
};

const mapsToProps = (state) => {
  return {
    vehicle: state.Vehicle,
  }
}

export default connect(mapsToProps)(VehicleInvoice);
