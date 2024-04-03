import React, { useEffect } from 'react'
import { Table, Form, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { GET_PURCHASE_ORDER_DETAILS_API_CALL } from '../../utils/Constant';

function ViewPurchase(props)  {

  const location = useLocation();
  const dispatch = useDispatch();

  console.log(props);

  useEffect(()=> {
    dispatch({type: GET_PURCHASE_ORDER_DETAILS_API_CALL, payload: {requestId: location.state.id}})
  }, [location.state.id]);


  return (
    <>
    <div style={{paddingLeft:50, paddingRight:50, marginTop:75}}>

      {/* <div className="d-flex justify-content-end">
        <Link to="/Purchase">
          <IoMdClose style={{fontSize:24, fontWeight:"500", color:"#1d1d5e"}} />
        </Link>
      </div> */}
      <Row>
        <Col className="col-4"></Col>
        <Col className="col-4 fw-bolder text-center" style={{ color: '#1d1d5e', fontSize: 16 }}>PURCHASE ORDER</Col>
        <Col className="col-4 text-end"><Link to="/Purchase"><IoMdClose style={{fontSize: 24, fontWeight:"500",color: "#1d1d5e"}} /></Link></Col>
      </Row>

      <Row className='mt-3'>
        <Col className="col-4">
          <p className='p-3 rounded-2' style={{ backgroundColor: '#f0f0f0', width: 250 }}>
            <strong>{props.purchase.purchaseOrderDetails.customerName}</strong> <br/>
            <small style={{ fontSize:13 }}>{props.purchase.purchaseOrderDetails.addressLine1}</small>, <br/>
            <small style={{ fontSize:13 }}>{props.purchase.purchaseOrderDetails.city}</small>, <br/>
            <small style={{ fontSize:13 }}>{props.purchase.purchaseOrderDetails.country}</small>

          </p>
        </Col>
        <Col className="col-4">
          <div
            style={{
              backgroundColor: "#f0f0f0",
              padding: "8px",
              width: 300,
              height: "auto",
              borderRadius: 5,
            }}
          >
            <p>
              <strong style={{ fontSize: 12 }}>Bill To:</strong> <br />
              <strong style={{ fontSize: 14 }}>H&T HOLIDAYS</strong> <br />
              <small style={{ fontSize: 12 }}>Tours & Travels</small> <br />
              <small style={{ fontSize: 12 }}>
                Building No.10 AlNahyan Camp
              </small>
              <br />
              <small style={{ fontSize: 12 }}>
                Near Executive Suites, Abu Dhabi
              </small>
            </p>
          </div>
        </Col>
        <Col className='text-end fw-bolder'>Purchase Order No: {props.purchase.purchaseOrderDetails.purchaseOrderId}</Col>
      </Row>

      <Row className="mt-4 mb-3">
        <Col className="col-7 d-flex justify-content-start">
          <Form.Group>
            <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
              Purchase Date
            </Form.Label>
            <Form.Control
              className="inputfocus rounded-0"
              style={{ height: "30px", fontSize: 14 }}
              type="date"
              value={props.purchase.purchaseOrderDetails.invoiceData}
              readOnly
            />
          </Form.Group>
          <Form.Group className="ms-2">
            <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
              Due Date
            </Form.Label>
            <Form.Control
              className="inputfocus rounded-0"
              style={{ height: "30px", fontSize: 14 }}
              type="date"
              value={props.purchase.purchaseOrderDetails.dateDueDate}
              readOnly
            />
          </Form.Group>
          <Form.Group className="ms-2">
            <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
              Net
            </Form.Label>
            <Form.Control
              className="inputfocus rounded-0"
              style={{ width: 175, height: "30px", fontSize: 14 }}
              readOnly
              value={`Net ${props.purchase.purchaseOrderDetails.net}`}
            />
          </Form.Group>
          <Form.Group className="ms-2">
            <Form.Label style={{ fontSize: 14, fontWeight: "500" }}>
              Ref Number <span style={{color: "red"}}>*</span>
            </Form.Label>
            <Form.Control
              className="inputfocus rounded-0"
              style={{ height: "30px", fontSize: 14 }}
              readOnly
              value={props.purchase.purchaseOrderDetails.referenceNumber}
            />
          </Form.Group>
        </Col>
      </Row>

      <div>
        <Table striped hover size="sm" bordered>
          <thead>
            <tr>
              <th style={{ backgroundColor: "#1d1d5e", color:"white" }}>Product</th>
              <th style={{ backgroundColor: "#1d1d5e", color:"white" }}>Description</th>
              <th style={{ backgroundColor: "#1d1d5e", color:"white" }}>Quantity</th>
              <th style={{ backgroundColor: "#1d1d5e", color:"white" }}>Price</th>
              <th style={{ backgroundColor: "#1d1d5e", color:"white" }}>Discount %</th>
              <th style={{ backgroundColor: "#1d1d5e", color:"white" }}>VAT %</th>
              <th style={{ backgroundColor: "#1d1d5e", color:"white" }}>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {props.purchase.purchaseOrderDetails && props.purchase.purchaseOrderDetails.listProducts && props.purchase.purchaseOrderDetails.listProducts.length > 0 ? (
              props.purchase.purchaseOrderDetails.listProducts.map(item => {
                return <tr key={item.id}>
                  <td>{item.productName}</td>
                  <td>{item.description ? item.description : "-"}</td>
                  <td>{item.quantity}</td>
                  <td>{item.baseUnitPrice}</td>
                  <td>{item.discountPercentage ? item.discountPercentage : "-"}</td>
                  <td>{item.vatPercentage ? item.vatPercentage : "-"}</td>
                  <td>{item.finalAmount}</td>
                </tr>
              })
            ): <label style={{color: 'red'}}>No data to show!</label>}
          </tbody>
        </Table>
      </div>

      </div>

      <Row className="mt-3" style={{ paddingLeft: 50 }}>
        <Col className="col-8">
          <Form.Control
            className="inputfocus"
            as="textarea"
            row={4}
            placeholder="Description"
            value={props.purchase.purchaseOrderDetails.memo ? props.purchase.purchaseOrderDetails.memo : "-"}
            style={{ width: "400px", height: "100px" }}
            readOnly
          />
        </Col>
        <Col>
          <div>
            <Table
              className="w-75"
              style={{ marginLeft: "18%" }}
              hover
              bordered
              responsive
              size="sm"
            >
              <tbody>
                <tr>
                  <td
                    className="fw-bolder text-start"
                    style={{ color: "#1d1d5e" }}
                  >
                    Sub-Total
                  </td>
                  <td className="text-end">{props.purchase.purchaseOrderDetails.subtotal ? (props.purchase.purchaseOrderDetails.subtotal).toFixed(2) : "-"}</td>
                </tr>
                <tr>
                  <td
                    className="fw-bolder text-start"
                    style={{ color: "#1d1d5e" }}
                  >
                    Total Discount
                  </td>
                  <td className="text-end">{props.purchase.purchaseOrderDetails.totalDiscount ? (props.purchase.purchaseOrderDetails.totalDiscount).toFixed(2) : "-"}</td>
                </tr>
                <tr>
                  <td
                    className="fw-bolder text-start"
                    style={{ color: "#1d1d5e" }}
                  >
                    Before VAT
                  </td>
                  <td className="text-end">{props.purchase.purchaseOrderDetails.totalWithoutVat ? (props.purchase.purchaseOrderDetails.totalWithoutVat).toFixed(2) : "-"}</td>
                </tr>
                <tr>
                  <td className="text-start fw-bolder" style={{ color: "#1d1d5e" }}>
                    Global Discount
                  </td>
                  <td className="text-end">{props.purchase.purchaseOrderDetails.globalDiscount ? (props.purchase.purchaseOrderDetails.globalDiscount).toFixed(2) : "-"}</td>
                </tr>
                <tr>
                  <td
                    className="fw-bolder text-start"
                    style={{ color: "#1d1d5e" }}
                  >
                    VAT (AED)
                  </td>
                  <td className="text-end">{props.purchase.purchaseOrderDetails.vat ? (props.purchase.purchaseOrderDetails.vat).toFixed(2) : "-"}</td>
                </tr>
                <tr>
                  <td
                    className="fw-bolder text-start"
                    style={{ color: "#1d1d5e" }}
                  >
                    Total Amount (AED)
                  </td>
                  <td className="text-end">{props.purchase.purchaseOrderDetails.finalAmount ? (props.purchase.purchaseOrderDetails.finalAmount).toFixed(2) : "-"}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      
    </>
  )
}

const mapsToProps = (state) => {
  return {
    purchase: state.purchaseOrder,
  }
}

export default connect(mapsToProps)(ViewPurchase);