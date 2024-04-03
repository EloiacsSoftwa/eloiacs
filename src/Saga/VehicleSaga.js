import { takeEvery, put, call, take } from "redux-saga/effects";
import {
  ADD_VEHICLE_API_CALL,
  ADD_VEHICLE_API_RESPONSE,
  CREATE_VEHICLE_INVOICE_API_CALL,
  CREATE_VEHICLE_INVOICE_API_RESPONSE,
  ERROR_CODE,
  GET_ALL_VEHICLE_INVOICE_API_CALL,
  GET_ALL_VEHICLE_INVOICE_API_RESPONSE,
  GET_VEHICLE_API_CALL,
  GET_VEHICLE_API_RESPONSE,
  GET_VEHICLE_INVOICE_DETAILS_API_CALL,
  GET_VEHICLE_INVOICE_DETAILS_API_RESPONSE,
  SUCCESS_CODE,
} from "../utils/Constant";
import { addVehicle, CreateVehicleInvoice, GetAllVehicle, GetVehicleInvoiceDetails, GetVehicleInvoiceList } from "../Reducer/Action/VehicleAction";

function* CreateaddVehicle(bodyData) {
  try{
  const response = yield call(addVehicle, bodyData.payload);
  console.log(response)
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({ type: ADD_VEHICLE_API_RESPONSE });
      yield put({ type: SUCCESS_CODE });
    } else {
      yield put({ type: ERROR_CODE, payload: {message: response.data.message} });
    }
  }
} catch (error){
  // ("error:",error)
}
}

function* callGetAllVehicle() {
  const response = yield call(GetAllVehicle);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: GET_VEHICLE_API_RESPONSE,
          payload: response.data.data,
        });
      }
    }
  } catch (error) {}
}

function* getAllVehicleInvoiceList(data) {
  const response = yield call(GetVehicleInvoiceList, data.data);
  if(response.status === 200){
    if(response.data.code === 200){
      yield put({ type: GET_ALL_VEHICLE_INVOICE_API_RESPONSE, payload: response.data.data })
    }
  }
}

function* createVehicleInvoice(data) {
  const response = yield call(CreateVehicleInvoice, data.data)
  if(response.status === 200) {
    yield put({ type: CREATE_VEHICLE_INVOICE_API_RESPONSE })
    yield put({ type: SUCCESS_CODE })
  }
  else {
    yield put({ type: ERROR_CODE, payload: { message: response.data.message } })
  }
}

function* getVehicleInvoiceDetails(data) {
  const response = yield call(GetVehicleInvoiceDetails, data.payload)
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({ type: GET_VEHICLE_INVOICE_DETAILS_API_RESPONSE, payload: response.data.data})
    }
    else {
      yield put({ type: ERROR_CODE, payload: {message: response.data.errorMessage} })
    }
  }
}

function* Vehiclesaga() {
  yield takeEvery(GET_VEHICLE_API_CALL, callGetAllVehicle);
  yield takeEvery(ADD_VEHICLE_API_CALL, CreateaddVehicle);
  yield takeEvery(GET_ALL_VEHICLE_INVOICE_API_CALL, getAllVehicleInvoiceList);
  yield takeEvery(CREATE_VEHICLE_INVOICE_API_CALL, createVehicleInvoice);
  yield takeEvery(GET_VEHICLE_INVOICE_DETAILS_API_CALL, getVehicleInvoiceDetails)
}

export default Vehiclesaga;
