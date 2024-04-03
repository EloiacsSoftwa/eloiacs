import React, { useEffect, useState } from 'react';
import { Form } from "react-bootstrap";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch, connect } from 'react-redux';
import { GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL, GET_VEHICLE_API_CALL } from '../../utils/Constant';

const VehicleInvoiceTableBody = (props) => {

  const [vehicleInvoiceData, setVehicleInvoiceData] = useState([]);

  useEffect(()=> {
        if (vehicleInvoiceData.length != props.rowCount) {
            setVehicleInvoiceData([...vehicleInvoiceData, { id: 0, product: '', description:'', qty: 1, price: '', discount: '', vat: '', amount: ''}])
        }
  }, [props.rowCount]);

  const handleVehicleSelect = (id, index) => {
        const productItemId = vehicleInvoiceData.map((item, itemIndex) => {
          return index === itemIndex ? { qty: item.qty, id: id, price: item.price, description: item.description, discount: item.discount, vat: item.vat } : item
        })
        setVehicleInvoiceData(productItemId);
        props.itemChanges(productItemId);
  }

  const handleQuantityChange = (quantity, index) => {
        const updateQuantity = vehicleInvoiceData.map((item, itemIndex) => {
          return index === itemIndex ? { qty: quantity, id: item.id, price: item.price, description: item.description, discount: item.discount, vat: item.vat } : item
        })
        setVehicleInvoiceData(updateQuantity);
        props.itemChanges(updateQuantity);
  }

  const handleDescription = (description, index) => {
        setVehicleInvoiceData(vehicleInvoiceData.map((item, itemIndex) => {
          return index === itemIndex ? { qty: item.qty, id: item.id, description: description, price: item.price, discount: item.discount, vat: item.vat } : item
        }));
  }

  const handlePriceChange = (price, index) => {
        const updatePriceChange = vehicleInvoiceData.map((item, itemIndex) => {
          return index === itemIndex ? { qty: item.qty, id: item.id, description: item.description, price: price, discount: item.discount, vat: item.vat } : item
        })
        props.itemChanges(updatePriceChange)
        setVehicleInvoiceData(updatePriceChange);
  }


  const handleDiscountChange = (discount, index) => {
        const updateDiscountArray = vehicleInvoiceData.map((item, itemIndex) => {
          return index === itemIndex ? { qty: item.qty, id: item.id, description: item.description, price: item.price, discount: discount, vat: item.vat } : item
        })
        props.itemChanges(updateDiscountArray)
        setVehicleInvoiceData(updateDiscountArray);
  }

  const handleVatChange = (vat, index) => {
        const updateVatArray = vehicleInvoiceData.map((item, itemIndex) => {
          return index === itemIndex ? { qty: item.qty, id: item.id, description: item.description, price: item.price, discount: item.discount, vat: vat } : item
        })
        props.itemChanges(updateVatArray)
        setVehicleInvoiceData(updateVatArray);
  }

  const deleteRow = (id) => {
        const filteredData = vehicleInvoiceData.filter((item) => {
          return item.id !== id
        })
        setVehicleInvoiceData(filteredData)
    
        props.itemChanges(filteredData)
        props.handleDeleteRow()
  }

  const renderTotalAmount = (item) => {

        let findTotalAmount;
        if (item.qty && !isNaN(item.qty)) {
          findTotalAmount = (!isNaN(item.price) ? item.price : 0) * (!isNaN(item.qty) ? item.qty : 1)
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

  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch({ type:GET_VEHICLE_API_CALL })
  }, []);

  // console.log("vehicle List", props.vehicle.vehicleList);

  return <tbody>{vehicleInvoiceData?.map((item, index) => {
    // console.log(item);
    return <tr key={item.id}>
      <td className="table-td">
        <Form.Select
          className="inputfocus rounded-0"
          onChange={e => { handleVehicleSelect(e.target.value, index) }}
          style={{ width: 200, height: 30, fontSize: 12 }}
          defaultChecked={0}
          value={item.id}
        >
          <option style={{fontSize:12}}>Select Vehicle</option>
          {props.vehicle.vehicleList.map(vehicle => {
            return <option key={vehicle.id} value={vehicle.id} style={{fontSize: 12}}>{vehicle.vehicleType} : {vehicle.vehicleNumber}</option>
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
      {/* <td className="table-td">
        <Form.Control
          type="number"
          className="inputfocus border-0 rounded-0"
          placeholder="Quantity"
          style={{ width: 170, height: 30, fontSize: 14 }}
          value={isNaN(item.qty) ? "" : item.qty}
          onChange={(e) => handleQuantityChange(e.target.value, index)}
        />
      </td> */}
      <td className="table-td">
        <Form.Control
          type="number"
          className="inputfocus border-0 rounded-0"
          placeholder="Price (AED)"
          style={{ width: 200, height: 30, fontSize: 14 }}
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
          style={{ width: 200, height: 30, fontSize: 14 }}
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
          style={{ width: 200, height: 30, fontSize: 14 }}
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
          vehicleInvoiceData.length == 1 ? <FaTrashCan
            style={{ color: "#AAAAAA", cursor: "pointer" }}
          /> : <FaTrashCan
            style={{ color: "#555555", cursor: "pointer" }}
            onClick={() => deleteRow(item.id)}
          />
        }

      </td>
    </tr>
  })}
  </tbody>
}

const mapsToProps = (state) => {
  return {
    vehicle: state.Vehicle,
  }
}

export default connect(mapsToProps)(VehicleInvoiceTableBody);