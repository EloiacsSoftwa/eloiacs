import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";

const DraftInvoiceTableBody = (props) => {
  
  const [draftInvoiceData, setDraftInvoiceData] = useState([]);

  useEffect(() => {
    if (draftInvoiceData.length != props.rowCount) {
        setDraftInvoiceData([
        ...draftInvoiceData,
        {
          id: 0,
          product: "",
          description: "",
          qty: "",
          price: "",
          discount: "",
          vat: "",
          amount: "",
        },
      ]);
    }
  }, [props.rowCount]);

  const handleItemSelect = (id, index) => {
    const productItemId = draftInvoiceData.map((item, itemIndex) => {
      return index === itemIndex
        ? {
            qty: item.qty,
            id: id,
            price: item.price,
            description: item.description,
            discount: item.discount,
            vat: item.vat,
          }
        : item;
    });
    setDraftInvoiceData(productItemId);
    props.itemChanges(productItemId);
  };

  const handleQuantityChange = (quantity, index) => {
    const updateQuantity = draftInvoiceData.map((item, itemIndex) => {
      return index === itemIndex
        ? {
            qty: quantity,
            id: item.id,
            price: item.price,
            description: item.description,
            discount: item.discount,
            vat: item.vat,
          }
        : item;
    });
    setDraftInvoiceData(updateQuantity);
    props.itemChanges(updateQuantity);
  };

  const handleDescription = (description, index) => {
    setDraftInvoiceData(
        draftInvoiceData.map((item, itemIndex) => {
        return index === itemIndex
          ? {
              qty: item.qty,
              id: item.id,
              description: description,
              price: item.price,
              discount: item.discount,
              vat: item.vat,
            }
          : item;
      })
    );
  };

  const handlePriceChange = (price, index) => {
    const updatePriceChange = draftInvoiceData.map((item, itemIndex) => {
      return index === itemIndex
        ? {
            qty: item.qty,
            id: item.id,
            description: item.description,
            price: price,
            discount: item.discount,
            vat: item.vat,
          }
        : item;
    });
    props.itemChanges(updatePriceChange);
    setDraftInvoiceData(updatePriceChange);
  };

  const handleDiscountChange = (discount, index) => {
    const updateDiscountArray = draftInvoiceData.map((item, itemIndex) => {
      return index === itemIndex
        ? {
            qty: item.qty,
            id: item.id,
            description: item.description,
            price: item.price,
            discount: discount,
            vat: item.vat,
          }
        : item;
    });
    props.itemChanges(updateDiscountArray);
    setDraftInvoiceData(updateDiscountArray);
  };

  const handleVatChange = (vat, index) => {
    const updateVatArray = draftInvoiceData.map((item, itemIndex) => {
      return index === itemIndex
        ? {
            qty: item.qty,
            id: item.id,
            description: item.description,
            price: item.price,
            discount: item.discount,
            vat: vat,
          }
        : item;
    });
    props.itemChanges(updateVatArray);
    setDraftInvoiceData(updateVatArray);
  };

  const deleteRow = (id, indexItem) => {
    const filteredData = draftInvoiceData.filter((item) => {
      return item.id !== id;
    });
    setDraftInvoiceData(filteredData);

    props.itemChanges(filteredData);
    props.handleDeleteRow();
  };

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
    if (props.vatChecked) {
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
    <tbody>
      {draftInvoiceData?.map((item, index) => {
        return (
          <tr key={index}>
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
                {props?.products?.map((product) => {
                  return (
                    <option
                      key={product.id}
                      value={product.id}
                      style={{ fontSize: 12 }}
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
                style={{ height: 40 }}
              />
            </td>
            <td className="table-td">
              <Form.Control
                type="number"
                className="inputfocus border-0 rounded-0"
                placeholder="Quantity"
                style={{ width: 170, height: 30, fontSize: 14 }}
                value={isNaN(item.qty) ? "" : item.qty}
                onChange={(e) => handleQuantityChange(e.target.value, index)}
              />
            </td>
            <td className="table-td">
              <Form.Control
                type="number"
                className="inputfocus border-0 rounded-0"
                placeholder="Price (AED)"
                style={{ width: 170, height: 30, fontSize: 14 }}
                value={isNaN(item.price) ? "" : item.price}
                onChange={(e) => handlePriceChange(e.target.value, index)}
              />
            </td>
            <td className="table-td">
              <Form.Control
                type="number"
                className="inputfocus border-0 rounded-0"
                placeholder="Discount"
                style={{ width: 170, height: 30, fontSize: 14 }}
                value={isNaN(item.discount) ? "" : item.discount}
                onChange={(e) => handleDiscountChange(e.target.value, index)}
              />
            </td>
            <td className="table-td">
              <Form.Control
                type="number"
                className="inputfocus border-0 rounded-0"
                placeholder="VAT"
                style={{ width: 170, height: 30, fontSize: 14 }}
                value={isNaN(item.vat) ? "" : item.vat}
                onChange={(e) => handleVatChange(e.target.value, index)}
              />
            </td>
            <td className="table-td">{renderTotalAmount(item)}</td>
            <td className="table-td">
              {draftInvoiceData.length == 1 ? (
                <FaTrashCan style={{ color: "#AAAAAA", cursor: "pointer" }} />
              ) : (
                <FaTrashCan
                  style={{ color: "#555555", cursor: "pointer" }}
                  onClick={() => deleteRow(item.id, index)}
                />
              )}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default DraftInvoiceTableBody;
