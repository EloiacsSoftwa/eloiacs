import { takeEvery, call, put, take } from "redux-saga/effects";
import {
  GET_ALL_CUSTOMERS_API_CALL,
  GET_ALL_CUSTOMERS_API_RESPONSE,
  ERROR_MESSAGE,
  CREATE_CUSTOMER_API_CALL,
  CREATE_CUSTOMER_API_RESPONSE,
  SEARCH_CUSTOMER_API_CALL,
  SEARCH_CUSTOMER_API_RESPONSE,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE,
  ADD_CUSTOMER_BANK_DETAILS_API_CALL,
  ADD_CUSTOMER_BANK_DETAILS_API_RESPONSE,
  ADD_CUSTOMR_ADDRESS_API_CALL,
  ADD_CUSTOMER_ADDRESS_API_RESPONSE,
  ERROR_CODE,
  SUCCESS_CODE
} from "../utils/Constant";
import {
  GetAllCustomersCall,
  CreateCustomerApiCall,
  SearchCustomerApiCall, 
  AddCustomerBankDetailsApiCall,
  AddCustomerAddressApiCall
} from "../Reducer/Action/CustomersActions";
import { SearchCustomersById } from "../Reducer/Action/UserAction";

function* getAllCustomersApiCall(data) {
  const response = yield call(GetAllCustomersCall, data.data);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: GET_ALL_CUSTOMERS_API_RESPONSE,
          payload: response.data.data,
        });
      } else if (response.data.code === 400) {
        yield put({
          type: GET_ALL_CUSTOMERS_API_RESPONSE,
          payload: [],
        });
        // yield put({
        //   type: ERROR_MESSAGE,
        //   payload: { message: response.data.message },
        // });
      }
    } else {
      yield put({
        type: ERROR_MESSAGE,
        payload: { message: "try after some time" },
      });
    }
  } catch (error) {}
}

function* createCustomerAPICall(bodyData) {
  const response = yield call(CreateCustomerApiCall, bodyData.payload);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: CREATE_CUSTOMER_API_RESPONSE,
          payload: response.data.code,
        });
        yield put({type: SUCCESS_CODE})
      } else {
        yield put({
          type: ERROR_CODE,
          payload: { message: response.data.message },
        });
        // alert(response.data.message);
      }
    } else {
      yield put({
        type: ERROR_MESSAGE,
        payload: { message: "try after some time" },
      });
    }
  } catch (error) {
    alert("Error: ", error);
  }
}

function* searchCustomerApiCall(bodyData) {
  console.log("calling search Customers", bodyData)
  const response = yield call(SearchCustomerApiCall, bodyData.payload)
    try {
      if (response.status === 200) {
        if (response.data.code === 200) {
          console.log("search category")
          yield put({type: SEARCH_CUSTOMER_API_RESPONSE, payload: response.data.data})
        }
      }
    }
    catch(error) {

    }
}

function* searchCustomerByID(data) {
  const response = yield call(SearchCustomersById, data.data);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE, payload: response.data.data})
      }
    }
  }
  catch(error) {

  }
}

function* addCustomerBankDetailsCall(data) {
  const response = yield call(AddCustomerBankDetailsApiCall, data.payload)

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({type: ADD_CUSTOMER_BANK_DETAILS_API_RESPONSE, payload: response.data.code})
        yield put({ type: SUCCESS_CODE })
      }
      else {
        yield put({
          type: ERROR_CODE,
          payload: { message: response.data.message },
        });
      }
    }
  }
  catch(error) {

  }
}

function* AddCustomerAddressApiRequest(data) {
  const response = yield call(AddCustomerAddressApiCall, data.payload);

  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({type: ADD_CUSTOMER_ADDRESS_API_RESPONSE, payload: response.data.code})
        yield put({ type: SUCCESS_CODE })
      }
      else {
        yield put({
          type: ERROR_CODE,
          payload: { message: response.data.message },
        });
      }
    }
  }
  catch(error) {

  }
}

function* CustomersSaga() {
  yield takeEvery(GET_ALL_CUSTOMERS_API_CALL, getAllCustomersApiCall);
  yield takeEvery(CREATE_CUSTOMER_API_CALL, createCustomerAPICall);
  yield takeEvery(SEARCH_CUSTOMER_API_CALL, searchCustomerApiCall);
  yield takeEvery(SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL, searchCustomerByID);
  yield takeEvery(ADD_CUSTOMER_BANK_DETAILS_API_CALL, addCustomerBankDetailsCall)
  yield takeEvery(ADD_CUSTOMR_ADDRESS_API_CALL, AddCustomerAddressApiRequest)
}

export default CustomersSaga;
