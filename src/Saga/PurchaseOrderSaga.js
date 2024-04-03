import { takeEvery, call, put, take } from "redux-saga/effects";
import {
  GET_ALL_PURCHASE_ORDER_API_CALL, GET_ALL_PURCHASE_ORDER_API_RESPONSE, CREATE_PURCHASE_ORDER_API_CALL, CREATE_PURCHASE_ORDER_API_RESPONSE,
  GENERATE_PURCHASE_ORDER_PDF_API_CALL, GENERATE_PURCHASE_ORDER_PDF_API_RESPONSE, ERROR_CODE_FAILURE, SUCCESS_CODE, ERROR_CODE, GET_PURCHASE_ORDER_DETAILS_API_RESPONSE, GET_PURCHASE_ORDER_DETAILS_API_CALL
} from "../utils/Constant";
import { GetAllPurchaseOrder, CreatePurchaseOrder, generatePoPDF, GetPurchaseOrderDetails } from "../Reducer/Action/PurchaseOrderAction";


function* getAllPurchaseOrders() {
  const response = yield call(GetAllPurchaseOrder);

  if (response.status === 200) {
    if (response.data.code == 200) {
      yield put({ type: GET_ALL_PURCHASE_ORDER_API_RESPONSE, payload: response.data })
    }
    else {
      yield put({ type: ERROR_CODE, payload: response.data.message })
    }
  }
}

function* createPurchaseOrder(data) {
  const response = yield call(CreatePurchaseOrder, data.data);
  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({ type: CREATE_PURCHASE_ORDER_API_RESPONSE });
        yield put({ type: SUCCESS_CODE })
      } else {
        yield put({
          type: ERROR_CODE,
          payload: { message: response.data },
        });
      }
    } else {
      yield put({
        type: ERROR_CODE_FAILURE,
        data: { message: "try after some time" },
      });
    }
  } catch (error) {
  }


}

function* generatePurchaseOrderPdfApiCall(data) {
  const response = yield call(generatePoPDF, data)

  console.log(response)
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({ type: GENERATE_PURCHASE_ORDER_PDF_API_RESPONSE, payload: response.data.data })
      yield put({ type: SUCCESS_CODE })
    }
    else {
      yield put({ type: ERROR_CODE, payload: response.data })
    }
  }
}

function* getPurchaseOrderDetails(data) {
  const response = yield call(GetPurchaseOrderDetails, data.payload)
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({type: GET_PURCHASE_ORDER_DETAILS_API_RESPONSE, payload: response.data.data})
    }
    else {
      yield put({type: ERROR_CODE, payload: response.data.data.errorMessage})
    }
  }
}

function* PurchaseOrderSaga() {
  yield takeEvery(GET_ALL_PURCHASE_ORDER_API_CALL, getAllPurchaseOrders)
  yield takeEvery(CREATE_PURCHASE_ORDER_API_CALL, createPurchaseOrder)
  yield takeEvery(GENERATE_PURCHASE_ORDER_PDF_API_CALL, generatePurchaseOrderPdfApiCall)
  yield takeEvery(GET_PURCHASE_ORDER_DETAILS_API_CALL, getPurchaseOrderDetails)

}

export default PurchaseOrderSaga;
