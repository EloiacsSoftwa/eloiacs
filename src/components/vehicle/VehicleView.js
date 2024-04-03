import React, { useEffect } from 'react';
import { Table, Form, Row, Col, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useLocation } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import { GET_VEHICLE_INVOICE_DETAILS_API_CALL } from '../../utils/Constant';

const VehicleView = (props) => {
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch({ type: GET_VEHICLE_INVOICE_DETAILS_API_CALL, payload: { requestId: location.state.id } })
    }, [location.state.id])

  return (
    <>
        <div style={{ paddingLeft: 50, paddingRight: 50,marginTop: 75 }}>

            <Row>
                <Col className='col-4'></Col>
                <Col className='col-4 fw-bolder text-center' style={{ color: '#1d1d5e', fontSize: 16 }}>VEHICLE TAX INVOICE</Col>
                <Col className="col-4 text-end"><Link to="/VehicleInvoice"><IoMdClose style={{fontSize: 24, fontWeight:"500",color: "#1d1d5e"}} /></Link></Col>
            </Row>

            <Row className='mt-3'>
                <Col className='col-4'>
                    <div style={{ backgroundColor: '#f0f0f0', padding: '8px', width: 300, height: 'auto', borderRadius: 5 }}>
                        <p>
                            <strong style={{ fontSize: 12 }}>Bill From:</strong><br/>
                            <strong style={{ fontSize: 14 }}>H&T HOLIDAYS</strong><br/>
                            <small style={{ fontSize: 12 }}>Tours & Travels,</small><br/>
                            <small style={{ fontSize: 12 }}>Building No.10 AlNahyan Camp,</small><br/>
                            <small style={{ fontSize: 12 }}>Near Executive Suites, Abu Dhabi</small>
                        </p>                        
                    </div>
                </Col>
                <Col className='col-4 d-flex justify-content-center'>
                    <p className='p-3 rounded-2' style={{ backgroundColor: '#f0f0f0', width: 250 }}>
                        <strong>{props.vehicle.vehicleInvoiceDetails.customerName}</strong> <br/>
                        <small style={{ fontSize:13 }}>{props.vehicle.vehicleInvoiceDetails.addressLine1}</small>, <br />
                        <small style={{ fontSize:13 }}>{props.vehicle.vehicleInvoiceDetails.city}</small>, <br/>
                        <small style={{ fontSize:13 }}>{props.vehicle.vehicleInvoiceDetails.country}</small>
                    </p>
                </Col>
                <Col className='col-4 text-end fw-bolder'>Vehicle Invoice No: {props.vehicle.vehicleInvoiceDetails.invoiceOrderId}</Col>
            </Row>

            <Row className='mt-4 mb-3'>
                <Col className='col-7 d-flex justify-content-start'>
                    <FormGroup>
                        <FormLabel style={{ fontSize:14, fontWeight: "500" }}>Invoice Date</FormLabel>
                        <FormControl className='inputfocus rounded-0' style={{ height: '30px', fontSize: 14 }} type='date' value={props.vehicle.vehicleInvoiceDetails.invoiceDate} readOnly />
                    </FormGroup>
                    <FormGroup className='ms-2'>
                        <FormLabel style={{ fontSize:14, fontWeight: "500" }}>Due Date</FormLabel>
                        <FormControl className='inputfocus rounded-0' style={{ height: '30px', fontSize: 14 }} type='date' value={props.vehicle.vehicleInvoiceDetails.dateDueDate} readOnly />
                    </FormGroup>
                    <FormGroup className='ms-2'>
                        <FormLabel style={{ fontSize:14, fontWeight: "500" }}>Net *</FormLabel>
                        <FormControl className='inputfocus rounded-0' style={{ width: 175, height: '30px', fontSize: 14 }} value={props.vehicle.vehicleInvoiceDetails.net} readOnly />
                    </FormGroup>
                    <FormGroup className='ms-2'>
                        <FormLabel style={{ fontSize:14, fontWeight: "500" }}>Sales Person</FormLabel>
                        <FormControl className='inputfocus rounded-0' style={{ height: '30px', fontSize: 14 }} value={props.vehicle.vehicleInvoiceDetails.createdBy} readOnly />
                    </FormGroup>
                </Col>
            </Row>

            <div>
                <Table striped hover size='sm' bordered>
                    <thead>
                        <tr>
                            <th style={{ backgroundColor: '#1d1d5e', color: 'white' }}>Vehicle</th>
                            <th style={{ backgroundColor: '#1d1d5e', color: 'white' }}>Description</th>                                                        
                            <th style={{ backgroundColor: '#1d1d5e', color: 'white' }}>Price</th>                            
                            <th style={{ backgroundColor: '#1d1d5e', color: 'white' }}>Discount %</th>                            
                            <th style={{ backgroundColor: '#1d1d5e', color: 'white' }}>VAT %</th>
                            <th style={{ backgroundColor: '#1d1d5e', color: 'white' }}>Total Amount</th>                    
                        </tr>
                    </thead>
                    <tbody>
                        {props.vehicle.vehicleInvoiceDetails && props.vehicle.vehicleInvoiceDetails.listProducts && props.vehicle.vehicleInvoiceDetails.listProducts.length > 0 ? (
                            props.vehicle.vehicleInvoiceDetails.listProducts.map(item => {
                                return <tr key={item.id}>
                                    <td>{item.productName}</td>
                                    <td>{item.description ? item.description : '-'}</td>
                                    <td>{item.baseUnitPrice}</td>
                                    <td>{item.discountPercentage ? item.discountPercentage : "-"}</td>
                                    <td>{item.vatPercentage ? item.vatPercentage : "-"}</td>
                                    <td>{item.finalAmount}</td>
                                </tr>
                            })
                        ) : <label className='fst-italic' style={{color: 'red'}}>No data to show!</label> }

                    </tbody>
                </Table>
            </div>
            
        </div>
        
        <Row className='mt-3' style={{ paddingLeft: 50 }}>
            <Col className='col-8'>
                <FormControl className='inputfocus' as='textarea' placeholder='Description' value={""} style={{ width: '400px', height: '100px' }} readOnly />
            </Col>
            <Col className=''>
                <div>
                    <Table className='w-75' style={{ marginLeft: '18%' }} hover bordered responsive size='sm'>
                        <tbody>
                            <tr>
                                <td className='fw-bolder text-start' style={{ color: '#1d1d5e' }}>Sub-Total</td>
                                <td className='text-end'>{props.vehicle.vehicleInvoiceDetails.subtotal}</td>
                            </tr>
                            <tr>
                                <td className='fw-bolder text-start' style={{ color: '#1d1d5e' }}>Total Discount</td>
                                <td className='text-end'>{props.vehicle.vehicleInvoiceDetails.totalDiscount}</td>
                            </tr>
                            <tr>
                                <td className='fw-bolder text-start' style={{ color: '#1d1d5e' }}>Before VAT</td>
                                <td className='text-end'>{props.vehicle.vehicleInvoiceDetails.totalWithoutVat}</td>
                            </tr>
                            <tr>
                                <td className='fw-bolder text-start' style={{ color: '#1d1d5e' }}>Global Discount</td>
                                <td className='text-end'>{props.vehicle.vehicleInvoiceDetails.globalDiscount}</td>
                            </tr>
                            <tr>
                                <td className='fw-bolder text-start' style={{ color: '#1d1d5e' }}>VAT (AED)</td>
                                <td className='text-end'>{props.vehicle.vehicleInvoiceDetails.vat}</td>
                            </tr>
                            <tr>
                                <td className='fw-bolder text-start' style={{ color: '#1d1d5e' }}>Total Amount (AED)</td>
                                <td className='text-end'>{(props.vehicle.vehicleInvoiceDetails.finalAmount)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Col>

        </Row>
    </>
  )
}

const  mapStateToProps = (state) => {
    return{
        vehicle: state.Vehicle,
    }
}

export default connect(mapStateToProps)(VehicleView);