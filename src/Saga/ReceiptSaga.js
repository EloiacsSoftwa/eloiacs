import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_RECEIPT_API_CALL, GET_ALL_RECEIPT_API_RESPONSE, GET_ALL_ORDERS_SUMMARY_API_CALL, GET_ALL_ORDERS_SUMMARY_API_RESPONSE, GENERATE_RECEIPT_PDF_API_RESPONSE, GENERATE_RECEIPT_PDF_API_CALL, SUCCESS_CODE, ERROR_CODE } from "../utils/Constant";
import { GenerateRecepitPdf, GetAllReceipt, GetAllSummaryApiCall } from "../Reducer/Action/ReceiptActions";


function* callGetALlReceiptApi(data) {
    const response = yield call(GetAllReceipt,data.payload)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GET_ALL_RECEIPT_API_RESPONSE, payload: response.data.data})
            }
        }
    }
    catch(error) {

    }
}

function* generateReceiptPDFApiCall (data) {
    const response = yield call(GenerateRecepitPdf, data.payload)
    if (response.status === 200) {
        if (response.data.code == 200) {
            yield put({ type: GENERATE_RECEIPT_PDF_API_RESPONSE, payload: response.data.data });
            yield put({ type: SUCCESS_CODE })
        }
        else {
            yield put({ type: ERROR_CODE, payload: response.data })
        }
    }
}

function* ReceiptSaga() {
    yield takeEvery(GET_ALL_RECEIPT_API_CALL, callGetALlReceiptApi)
    yield takeEvery(GENERATE_RECEIPT_PDF_API_CALL, generateReceiptPDFApiCall)
}

export default ReceiptSaga;