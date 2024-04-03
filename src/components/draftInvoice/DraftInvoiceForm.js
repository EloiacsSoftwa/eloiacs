import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { MdOutlineClose } from "react-icons/md";
import {
  GET_ALL_PRODUCTS_API_CALL,
  GET_ALL_CUSTOMERS_API_CALL,
} from "../../utils/Constant";
import { useDispatch, connect } from "react-redux";
import DraftInvoieTableBody from "./DraftInvoiceTableBody";
import "../invoice/Invoice.css";
import { FaTrashCan } from "react-icons/fa6";
import Pencil from '../../Assets/images/pencil.svg';

const DraftInvoiceForm = (props) => {
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

  // const [draftInvoiceData, setDraftInvoiceData] = useState([
  //   {
  //     id: 1,
  //     product: "",
  //     description: "",
  //     qty: "",
  //     price: "",
  //     discount: "",
  //     vat: "",
  //     amount: "",
  //   },
  // ]);


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
  const [vatChecked, setVatChecked] = useState(false);
  const [description, setDescription] = useState("");

  const [items, setItems] = useState([]);


  useEffect(() => {
    if (props.invoice.invoiceDetails.listProducts) {
      const tempArray = props.invoice.invoiceDetails.listProducts.map((item) => {
        return {id: item.productId, qty: item.quantity, description: item.description, price: item.baseUnitPrice, discount: item.discountPercentage, vat: item.vatPercentage,}
      })
      if (props.invoice.invoiceDetails.listProducts && props.invoice.invoiceDetails.listProducts.length > 0) {
        setVatChecked(props.invoice.invoiceDetails.listProducts[0].unitPriceTaxInclusive)
      }
     
      setGlobalDiscountValue(props.invoice.invoiceDetails.globalDiscount)
      setItems(tempArray)
      props.values(tempArray)
      itemChanges(tempArray)
    }
    
  }, [props.invoice.invoiceDetails.listProducts])

  //Handlers
  const handleAddRow = () => {
    if (
      !items.length <= 0 &&
      items[items.length - 1] != null &&
      items[items.length - 1].id
    ) {
      console.log("true condition")
      // setRowCount(rowCount + 1);
      setItems([...items, {}])
    }
  };

  const handleDeleteRow = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  //unit price handlers:
  const handleVatChecked = (e) => {
    console.log(e.target.checked);
    setVatChecked(!vatChecked);
  };

  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCTS_API_CALL });
    // dispatch({ type: GET_ALL_CUSTOMERS_API_CALL });
  }, []);

  useEffect(() => {
    itemChanges(items, true);
    props.vatChecked(vatChecked)
  }, [vatChecked]);

  // Bottom Table Calculation:
  const handleGlobalDiscountClick = () => {
    setShowGlobalDiscount(true);
  };

  const handleGlobalDiscountClose = () => {
    setShowGlobalDiscount(false);
    // setGlobalDiscountValue(0);
  };

  const handleGlobalDiscountChange = (e) => {
    const discount = e.target.value.trim(); // Remove NaN if the input is 0
    setGlobalDiscountValue(discount);
    props.globalDiscount(discount);
  };

  const editClicked = () => {
    setShowGlobalDiscount(true);
  }

  const itemChanges = (allItems) => {
    // props.allItems(allItems);
    // props.vatChecked(vatChecked);
    // setItems(allItems);

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

      console.log("executng else case")
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

      console.log(findVatAmount)

      setSubTotal(findTotalAmount.toFixed(2));
      setTotalDiscount(totalDiscountTemp.toFixed(2));
      setBeforeVAT(findBeforeVat.toFixed(2));
      setTotalVAT(findVatAmount.toFixed(2));
      setTotalAmount((findBeforeVat + findVatAmount).toFixed(2));
    }

    console.log(allItems)

    props.values(allItems);
    // props.productList(allItems)
  };

  const handleItemSelect = (id, index) => {
    
    const productItemId = items.map((item, itemIndex) => {
      return index === itemIndex ? {id: id, description: item.description, qty: item.quantity, price: item.price, discount: item.discount, vat: item.vat} : item
    })
    setItems(productItemId)
    itemChanges(productItemId)
  };

  // props.globalDiscount(globalDiscountValue);
  // props.memo(description);

  const handleDescription = (value, index) => {
    const productItemId = items.map((item, itemIndex) => {
      return index === itemIndex ? {id: item.id, description: value, qty: item.quantity, price: item.price, discount: item.discount, vat: item.vat} : item
    })
    setItems(productItemId)
    itemChanges(productItemId)
  }

  const handleQuantityChange = (value, index) => {
    console.log(items)
    const productItemId = items.map((item, itemIndex) => {
      return index === itemIndex ? {id: item.id, description: item.description, qty: value, price: item.price, discount: item.discount, vat: item.vat} : item
    })

    setItems(productItemId)
    itemChanges(productItemId)
  }

  const handlePriceChange = (value, index) => {
    const productItemId = items.map((item, itemIndex) => {
      return index === itemIndex ? {id: item.id, description: item.description, qty: item.qty, price: value, discount: item.discount, vat: item.vat} : item
    })
    setItems(productItemId)
    itemChanges(productItemId)
  }

  const handleDiscountChange = (value, index) => {
    const productItemId = items.map((item, itemIndex) => {
      return index === itemIndex ? {id: item.id, description: item.description, qty: item.qty, price: item.price, discount: value, vat: item.vat} : item
    })
    setItems(productItemId)
    itemChanges(productItemId)
  }

  const handleVatChange = (value, index) => {
    const productItemId = items.map((item, itemIndex) => {
      return index === itemIndex ? {id: item.id, description: item.description, qty: item.qty, price: item.price, discount: item.discount, vat: value} : item
    })
    setItems(productItemId)
    itemChanges(productItemId)
  }

  const renderTotalAmount = (item) => {
    let findTotalAmount;
    if (item.qty && !isNaN(item.qty)) {
      findTotalAmount =
        (!isNaN(item.price) ? item.price : 0) *
        (!isNaN(item.qty) ? item.qty : 0);
    } else {
      findTotalAmount = 0;
    }
    // let findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 0)
    let discountAmount;
    if (item.discount && !isNaN(item.discount)) {
      discountAmount = (item.discount / 100) * findTotalAmount;
    } else {
      discountAmount = 0;
    }

    let vatIncludedPrice;
    if (vatChecked) {
      if (item.vat && !isNaN(item.vat)) {
        let findVatAmount =
          findTotalAmount -
          discountAmount -
          (findTotalAmount - discountAmount) / (1 + !isNaN(item.vat) / 100);
        let priceWithoutVat = findTotalAmount - discountAmount - findVatAmount;
        vatIncludedPrice = priceWithoutVat + findVatAmount;
      } else {
        let findVatAmount = 0;
        vatIncludedPrice = parseFloat(
          findTotalAmount - discountAmount - findVatAmount
        ).toFixed(2);
      }
    } else {
      if (item.vat && !isNaN(item.vat)) {
        let findVatAmount =
          (findTotalAmount - discountAmount) * (item.vat / 100);
        vatIncludedPrice = parseFloat(
          findTotalAmount - discountAmount + findVatAmount
        ).toFixed(2); //
      } else {
        vatIncludedPrice = (findTotalAmount - discountAmount).toFixed(2);
      }
    }

    return <span>{vatIncludedPrice}</span>;
  };

  return (
    <>
      <Container fluid className="mt-1">
        {/* Main Table */}
        <div style={{ paddingLeft: 50, paddingRight: 50 }}>
          <Table hover size="sm" responsive>
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
            <tbody>
              {
                items.map((item, index) => {
                  return <tr key={item.id}>
                  <td className="table-td">
                    <Form.Select
                      className="inputfocus rounded-0"
                      onChange={(e) => {
                        handleItemSelect(e.target.value, index);
                      }}
                      style={{ width: 170, height: 30, fontSize: 12 }}
                      defaultChecked={0}
                      value={item.id}
                    >
                      <option>Select Product</option>
                      {props?.productsData?.products.map((product) => {
                        return (
                          <option
                            key={product.id}
                            value={product.id}
                            style={{ fontSize: 12 }}
                            selected={product.id === item.id}
                          >
                            {product.productName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </td>
                  <td className="table-td">
                    <Form.Control
                      className="inputfocus border-0 rounded-0"
                      as="textarea"
                      placeholder="Description"
                      onChange={(e) => handleDescription(e.target.value, index)}
                      rows={1}
                      value={item.description}
                      style={{ height: 40 }}
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="inputfocus border-0 rounded-0"
                      placeholder="Quantity"
                      style={{ width: 170, height: 30, fontSize: 14 }}
                      value={item.qty}
                      onChange={(e) => handleQuantityChange(e.target.value, index)}
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="inputfocus border-0 rounded-0"
                      placeholder="Price (AED)"
                      style={{ width: 170, height: 30, fontSize: 14 }}
                      value={item.price}
                      onChange={(e) => handlePriceChange(e.target.value, index)}
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="inputfocus border-0 rounded-0"
                      placeholder="Discount"
                      style={{ width: 170, height: 30, fontSize: 14 }}
                      value={item.discount}
                      onChange={(e) => handleDiscountChange(e.target.value, index)}
                    />
                  </td>
                  <td className="table-td">
                    <Form.Control
                      type="number"
                      className="inputfocus border-0 rounded-0"
                      placeholder="VAT"
                      style={{ width: 170, height: 30, fontSize: 14 }}
                      value={item.vat}
                      onChange={(e) => handleVatChange(e.target.value, index)}
                    />
                  </td>
                  <td className="table-td">{renderTotalAmount(item)}</td>
                  <td className="table-td">
                    {items.length == 1 ? (
                      <FaTrashCan style={{ color: "#AAAAAA", cursor: "pointer" }} />
                    ) : (
                      <FaTrashCan
                        style={{ color: "#555555", cursor: "pointer" }}
                        onClick={() => handleDeleteRow(item.id)}
                      />
                    )}
                  </td>
                </tr>
                })
              }
            </tbody>
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
              onChange={(e) => setDescription(e.target.value)}
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
                  <td
                      className="fw-bolder text-start"
                      style={{ color: "#1d1d5e" }}
                    >
                      Global Discount
                    </td>
                    <td className="text-end">
                      {
                        showGlobalDiscount ? <div className="d-flex justify-content-between">
                        <Form.Control
                          type="number"
                          style={{ width: 170, height: "30px" }}
                          placeholder="Enter Discount"
                          value={globalDiscountValue}
                          onChange={handleGlobalDiscountChange}
                        />
                        <MdOutlineClose
                          onClick={handleGlobalDiscountClose}
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </div> : <><label onClick={editClicked}><u>{globalDiscountValue}</u></label>
                      <img src={Pencil} style={{width: 10, height: 10, marginLeft: 8}} onClick={editClicked}/></>
                      }
                      
                    </td>
                    {/* <td colSpan={2} className="text-start fw-bolder">
                      
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
                            type="number"
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
                    </td> */}
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
    invoice: state.invoice
  };
};

export default connect(mapsToProps)(DraftInvoiceForm);
