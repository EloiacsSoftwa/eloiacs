import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";

const PruchaseTableBody = (props) => {

  const [purchaseData, setPurchaseData] = useState([])

  useEffect(() => {
    if (purchaseData.length != props.rowCount) {
      setPurchaseData([...purchaseData, { id: 0, product: '', description: '', qty: '', price: '', discount: '', vat: '', amount: '' }])
    }
  }, [props.rowCount])


  const handleItemSelect = (id, index) => {
    const selectId = purchaseData.map((item, itemIndex) => {
      return index === itemIndex ? { qty: item.qty, id: id, price: item.price, description: item.description, discount: item.discount, vat: item.vat } : item
    })
    setPurchaseData(selectId);

    props.itemChanges(selectId);
  }

  const handleQuantityChange = (quantity, index) => {
    const updateQuantity = purchaseData.map((item, itemIndex) => {
      return index === itemIndex ? { qty: quantity, id: item.id, price: item.price, description: item.description, discount: item.discount, vat: item.vat } : item
    })
    setPurchaseData(updateQuantity);
    props.itemChanges(updateQuantity);
  }

  const handleDescription = (description, index) => {
    setPurchaseData(purchaseData.map((item, itemIndex) => {
      return index === itemIndex ? { qty: item.qty, id: item.id, description: description, price: item.price, discount: item.discount, vat: item.vat } : item
    }));

  }

  const handlePriceChange = (price, index) => {
    const updatePriceChange = purchaseData.map((item, itemIndex) => {
      return index === itemIndex ? { qty: item.qty, id: item.id, description: item.description, price: price, discount: item.discount, vat: item.vat } : item
    })
    props.itemChanges(updatePriceChange)
    setPurchaseData(updatePriceChange);
  }

  const handleDiscountChange = (discount, index) => {
    const updateDiscountArray = purchaseData.map((item, itemIndex) => {
      return index === itemIndex ? { qty: item.qty, id: item.id, description: item.description, price: item.price, discount: discount, vat: item.vat } : item
    })
    props.itemChanges(updateDiscountArray)
    setPurchaseData(updateDiscountArray);
  }

  const handleVatChange = (vat, index) => {
    const updateVatArray = purchaseData.map((item, itemIndex) => {
      return index === itemIndex ? { qty: item.qty, id: item.id, description: item.description, price: item.price, discount: item.discount, vat: vat } : item
    })
    props.itemChanges(updateVatArray)
    setPurchaseData(updateVatArray);
  }

  const deleteRow = (id, itemIndex) => {
    const filteredData = purchaseData.filter((item, index) => {
      return index !== itemIndex
    })
    setPurchaseData(filteredData)

    props.itemChanges(filteredData)
    props.handleDeleteRow()
  }

  const renderTotalAmount = (item) => {

    let findTotalAmount;
    if (item.qty && !isNaN(item.qty)) {
      findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 0)
    }
    else {
      findTotalAmount = 0;
    }
    // let findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 0)
    let discountAmount;
    if (item.discount && !isNaN(item.discount)) {
      discountAmount =  (item.discount / 100) * findTotalAmount
    }
    else {
      discountAmount = 0;
    }

    let vatIncludedPrice;
    if (props.vatChecked) {
      if (item.vat && !isNaN(item.vat)) {
        let findVatAmount = (findTotalAmount - discountAmount) - ((findTotalAmount - discountAmount)/(1 + (!isNaN(item.vat)/100)))
        let priceWithoutVat = findTotalAmount - discountAmount - findVatAmount
        vatIncludedPrice = priceWithoutVat + findVatAmount
      }
      else {
        let findVatAmount = 0
        vatIncludedPrice = parseFloat(findTotalAmount - discountAmount - findVatAmount).toFixed(2)
      }
    }
    else {
      if (item.vat && !isNaN(item.vat)) {
        let findVatAmount =  (findTotalAmount - discountAmount)*(item.vat/100)
        vatIncludedPrice = parseFloat(findTotalAmount - discountAmount + findVatAmount).toFixed(2) // 
      }
      else {
        vatIncludedPrice = (findTotalAmount - discountAmount).toFixed(2)
      }
    }
    return <span>{vatIncludedPrice}</span>
  }

  return <tbody>{purchaseData?.map((item, index) => {
    return <tr key={index}>
      <td className="table-td">
        <Form.Select
          className="inputfocus rounded-0"
          onChange={e => { handleItemSelect(e.target.value, index) }}
          style={{ width: 170, height: 30, fontSize: 12 }}
          defaultChecked={0}
          value={item.id}
        >
          <option defaultChecked style={{fontSize:14}}>Select Product</option>
          {
            props?.products?.map(product => {
              return <option key={product.id} value={product.id} style={{fontSize: 12}}>{product.productName}</option>
            })
          }
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
          onChange={(e) => handleQuantityChange(e.target.value, index)
          }
        />
      </td>
      <td className="table-td">
        <Form.Control
          type="number"
          className="inputfocus border-0 rounded-0"
          placeholder="Price (AED)"
          style={{ width: 170, height: 30, fontSize: 14 }}
          value={isNaN(item.price) ? "" : item.price}
          onChange={(e) =>
            handlePriceChange(e.target.value, index)
          }
        />
      </td>
      <td className="table-td">
        <Form.Control
          type="number"
          className="inputfocus border-0 rounded-0"
          placeholder="Discount"
          style={{ width: 170, height: 30, fontSize: 14 }}
          value={isNaN(item.discount) ? "" : item.discount}
          onChange={(e) =>
            handleDiscountChange(e.target.value, index)
          }
        />
      </td>
      <td className="table-td">
        <Form.Control
          type="number"
          className="inputfocus border-0 rounded-0"
          placeholder="VAT"
          style={{ width: 170, height: 30, fontSize: 14 }}
          value={isNaN(item.vat) ? "" : item.vat}
          onChange={(e) =>
            handleVatChange(e.target.value, index)
          }
        />
      </td>
      <td className="table-td">
        {renderTotalAmount(item)}

      </td>
      <td className="table-td">
        {
          purchaseData.length == 1 ? <FaTrashCan
            style={{ color: "#AAAAAA", cursor: "pointer" }}
          /> : <FaTrashCan
            style={{ color: "#555555", cursor: "pointer" }}
            onClick={() => deleteRow(item.id, index)}
          />
        }

      </td>
    </tr>
  })}
  </tbody>
}


export default PruchaseTableBody;