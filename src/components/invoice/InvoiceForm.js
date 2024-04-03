import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import {
  GET_ALL_PRODUCTS_API_CALL,
  GET_ALL_PRODUCTS_RESPONSE,
  GET_ALL_CUSTOMERS_API_CALL,
  GET_ALL_INVOICE_API_CALL
} from "../../utils/Constant";
import { useDispatch, useSelector, connect } from "react-redux";
import InvoiceTableBody from "./InvoiceTableBody";
import "./Invoice.css";


const InvoiceForm = (props) => {
  const dispatch = useDispatch();
  const tableHeader = [
    "Product",
    "Description",
    "Qty",
    "Price",
    "Discount %",
    "VAT %",
    "Amount",
    "Action",
  ];

  const [invoiceData, setInvoiceData] = useState([
    {
      id: 1,
      product: "",
      description: "",
      qty: "",
      price: "",
      discount: "",
      vat: "",
      amount: "",
    },
  ]);
  const [subTotal, setSubTotal] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [totalVAT, setTotalVAT] = useState(0);
  const [beforeVAT, setBeforeVAT] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [showGlobalDiscount, setShowGlobalDiscount] = useState(false);
  const [globalDiscountValue, setGlobalDiscountValue] = useState(0);

  // Use State for Unit Price Excluding
  const [inclusiveSubTotal, setInclusiveSubTotal] = useState(0);
  const [inclusiveTotalVAT, setInclusiveTotalVAT] = useState(0);
  const [inclusiveBeforeVAT, setInclusiveBeforeVAT] = useState(0);
  const [inclusiveTotalAmount, setInclusiveTotalAmount] = useState(0);
  const [inclusiveTotalDiscount, setInclusiveTotalDiscount] = useState(0);
  const [rowCount, setRowCount] = useState(1);
  const [vatChecked, setVatChecked] = useState(false);
  const [description, setDescription] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {

  props.globalDiscount(globalDiscountValue);
  props.memo(description)
  }, [globalDiscountValue, description])
  //Handlers
  const handleAddRow = () => {
    if (!items.length <= 0 && items.length === rowCount && items[items.length - 1] != null && items[items.length - 1].id ) {
      // let tempArray = filteredData.filter((item) => {
      //     const ta1 = items.filter(arrayElement => {
      //       return arrayElement.id === item.id
      //     })

      //     return ta1.size === 0 ? true : false
      // })

      // setFilteredData(tempArray)

      setRowCount(rowCount + 1)
    }
  }

  const handleDeleteRow = (filteredData) => {
    setInvoiceData(filteredData);
    setRowCount(rowCount - 1)
  };

  //unit price handlers:
  const handleVatChecked = (e) => {
    setVatChecked(!vatChecked);
  };

  // useEffect(() => {
  //   dispatch({ type: GET_ALL_PRODUCTS_API_CALL });
  //   dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
  // }, []);

  useEffect(() => {
    itemChanges(items, true);
  }, [vatChecked]);

  useEffect(() => {
    setFilteredData(props.productsData.products)
  }, [props.productsData.products])

  // Bottom Table Calculation:
  const handleGlobalDiscountClick = () => {
    setShowGlobalDiscount(true);
  };

  const handleGlobalDiscountClose = () => {
    setShowGlobalDiscount(false);
    setGlobalDiscountValue(0);
  };

  const handleGlobalDiscountChange = (e) => {
    const discount = e.target.value.trim(); // Remove NaN if the input is 0
    setGlobalDiscountValue(discount);
  };

  const itemChanges = (allItems) => {
    props.allItems(allItems);
    props.vatChecked(vatChecked);
    setItems(allItems);

    let findTotalAmount;
    let totalDiscountTemp;
    let findBeforeVat;
    let findVatAmount;

    if (vatChecked) {
      findTotalAmount = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        let discount = !isNaN(item.discount)
          ? (item.discount / 100) * findTotalAmount
          : 0;
        let vat = !isNaN(item.vat)
          ? findTotalAmount -
            discount -
            (findTotalAmount - discount) / (1 + item.vat / 100)
          : 0;

        return total + findTotalAmount - discount - vat;
      }, 0); //inclusive sub-total vat

      totalDiscountTemp = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        let discount = !isNaN(item.discount)
          ? (item.discount / 100) * findTotalAmount
          : 0;
        return total + discount;
      }, 0); // inclusive discount

      findBeforeVat = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        let discount = !isNaN(item.discount)
          ? (item.discount / 100) * findTotalAmount
          : 0;

        let vat = !isNaN(item.vat)
          ? findTotalAmount -
            discount -
            (findTotalAmount - discount) / (1 + item.vat / 100)
          : findTotalAmount - discount;
        let priceWithoutVat = findTotalAmount - discount - vat;
        return total + priceWithoutVat;
      }, 0); // inclusive before vat

      findVatAmount = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        let discount = !isNaN(item.discount)
          ? (item.discount / 100) * findTotalAmount
          : 0;

        let vat = !isNaN(item.vat)
          ? findTotalAmount -
            discount -
            (findTotalAmount - discount) / (1 + item.vat / 100)
          : 0;

        return total + vat;
      }, 0); // inclusive VAT

      setInclusiveSubTotal(findTotalAmount.toFixed(2));
      setInclusiveTotalDiscount(totalDiscountTemp.toFixed(2));
      setInclusiveBeforeVAT(findBeforeVat.toFixed(2));
      setInclusiveTotalVAT(findVatAmount.toFixed(2));
      setInclusiveTotalAmount((findBeforeVat + findVatAmount).toFixed(2));
    } else {
      findTotalAmount = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        return total + findTotalAmount;
      }, 0); // subtotal

      totalDiscountTemp = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        let discount = !isNaN(item.discount)
          ? (item.discount / 100) * findTotalAmount
          : 0;
        return total + discount;
      }, 0); // discount

      findBeforeVat = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        let discount = !isNaN(item.discount)
          ? (item.discount / 100) * findTotalAmount
          : 0;
        let priceWithoutVat = findTotalAmount - discount;
        return total + priceWithoutVat;
      }, 0); // Before VAT

      findVatAmount = allItems.reduce(function (total, item) {
        let findTotalAmount =
          (!isNaN(item.price) ? item.price : 0) *
          (!isNaN(item.qty) ? item.qty : 0);
        let discount = !isNaN(item.discount)
          ? (item.discount / 100) * findTotalAmount
          : 0;

        let vat = !isNaN(item.vat)
          ? (findTotalAmount - discount) * (item.vat / 100)
          : 0;
        return total + vat;
      }, 0);

      setSubTotal(findTotalAmount.toFixed(2));
      setTotalDiscount(totalDiscountTemp.toFixed(2));
      setBeforeVAT(findBeforeVat.toFixed(2));
      setTotalVAT(findVatAmount.toFixed(2));
      setTotalAmount((findBeforeVat + findVatAmount).toFixed(2));
    }
    // props.productList(allItems)
  };


  return (
    <>
      <Container fluid className="mt-1">
        {/* Main Table */}
        <div style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Table hover size="sm" responsive bordered>
            <thead style={{ padding: "0.75rem" }}>
              <tr>
                {tableHeader.map((header, index) => (
                  <th
                    key={index}
                    style={{
                      textAlign: "center",
                      verticalAlign: "middle",
                      backgroundColor: "#1d1d5e",
                      color: "white",
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <InvoiceTableBody
              products={filteredData}
              invoiceData={props.invoiceData}
              handleDeleteRow={handleDeleteRow}
              rowCount={rowCount}
              vatChecked={vatChecked}
              itemChanges={itemChanges}
            />
          </Table>
        </div>

        <div
          className="w-100 d-flex justify-content-end align-items-center"
          style={{ paddingLeft: 50, paddingRight: 50 }}
        >
          <Form.Group className="d-flex">
            <Form.Check
              type="checkbox"
              id="custom-checkbox"
              checked={vatChecked}
              onChange={handleVatChecked}
            />
            <Form.Label
              className="ms-1"
              style={{ fontSize: 14, fontWeight: "500", color: "#1d1d5e" }}
            >
              Unit price is VAT inclusive
            </Form.Label>
          </Form.Group>
        </div>

        <div className="w-100" style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Button
            onClick={handleAddRow}
            style={{
              backgroundColor: "#1d1d5e",
              borderWidth: 0,
              width: 110,
              fontWeight: "bolder",
            }}
          >
            Add Items
          </Button>
        </div>

        <Row className="mt-3" style={{ paddingLeft: 50 }}>
          <Col className="col-8">
            <Form.Control
              className="inputfocus"
              as="textarea"
              row={4}
              placeholder="Description"
              value={description}
              onChange={(e)=> setDescription(e.target.value)}
              style={{ width: "400px", height: "100px" }}
            />
          </Col>
          <Col>
            <div className="table-container">
              <Table
                className="w-75"
                style={{ marginLeft: "20%" }}
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
                    <td className="text-end">
                      {!vatChecked ? subTotal : inclusiveSubTotal}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Total Discount
                    </td>
                    <td className="text-end">
                      {!vatChecked ? totalDiscount : inclusiveTotalDiscount}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Before VAT
                    </td>
                    <td className="text-end">
                      {!vatChecked ? beforeVAT : inclusiveBeforeVAT}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className="text-start fw-bolder">
                      {!showGlobalDiscount ? (
                        <p
                          className="text-decoration-underline"
                          style={{
                            marginBottom: "2px",
                            color: "#1d1d5e",
                            cursor: "pointer",
                          }}
                          onClick={handleGlobalDiscountClick}
                        >
                          Global Discount
                        </p>
                      ) : (
                        <div className="d-flex justify-content-between">
                          <Form.Control
                            type="integer"
                            style={{ width: 170, height: "30px" }}
                            placeholder="Enter Discount"
                            value={globalDiscountValue}
                            onChange={handleGlobalDiscountChange}
                          />
                          <MdOutlineClose
                            onClick={handleGlobalDiscountClose}
                            style={{ color: "red", cursor: "pointer" }}
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      VAT (AED)
                    </td>
                    <td className="text-end">
                      {!vatChecked ? totalVAT : inclusiveTotalVAT}
                    </td>
                  </tr>
                  <tr>
                    <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Total Amount (AED)
                    </td>
                    <td className="text-end">
                      {!vatChecked
                        ? (
                            parseFloat(totalAmount) - globalDiscountValue
                          ).toFixed(2)
                        : (
                            parseFloat(inclusiveTotalAmount) -
                            globalDiscountValue
                          ).toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const mapsToProps = (state) => {
  return {
    productsData: state.productsData,
    customers: state.customers,
  };
};

export default connect(mapsToProps)(InvoiceForm);
