import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_PAYMENT_SUMMARY_API_CALL, GET_PAYMENT_SUMMARY_API_RESPONSE, ERROR_MESSAGE, ADD_CUSTOMER_PAYMENT_API_CALL, ADD_CUSTOMER_PAYMENT_API_RESPONSE, SUCCESS_CODE, ERROR_CODE_FAILURE,
GET_ALL_PAYMENTS_API_CALL, GET_ALL_PAYMENTS_API_RESPONSE, ADD_SUPPLIER_PAYMENT_API_CALL, ADD_SUPPLIER_PAYMENT_API_RESPONSE, ERROR_CODE, RESET_VALUES, GENERATE_SUPPLIER_PAYMENT_PDF_API_RESPONSE, GENERATE_SUPPLIER_PAYMENT_PDF_API_CALL, GENERATE_RECEIPT_PDF_API_RESPONSE, GENERATE_RECEIPT_PDF_API_CALL } from "../utils/Constant";
import { GetPaymentSummaryApiCall, AddCustomerPayment, GetAllPayments, AddSupplierPayment, GenerateSupplierPdf } from "../Reducer/Action/PaymentAction";


function* getPaymentSummaryApiCall(data) {
    const response = yield call(GetPaymentSummaryApiCall, data.payload);
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({type: GET_PAYMENT_SUMMARY_API_RESPONSE, payload: response.data.data})
            // yield put({type: SUCCESS_CODE})
        }
        else {
            yield put({type: RESET_VALUES})
            yield put({type: ERROR_MESSAGE, payload: response.data.message})
        }
    }
}

function* addCustomerPayment(data) {
    const response = yield AddCustomerPayment(data.payload)

    if (response.status === 200) {
        if (response.data.code === 200) {

            yield put({type: ADD_CUSTOMER_PAYMENT_API_RESPONSE })
            yield put({type: SUCCESS_CODE})
        }
        else {
            yield put({type: RESET_VALUES})
            yield put({type: ERROR_CODE, payload: response.data.message})
        }
    }
}

function* getAllPayments(data) {
    const response = yield call(GetAllPayments,data.payload)
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({type: GET_ALL_PAYMENTS_API_RESPONSE, payload: response.data.data})
        }
        else {
            yield put({type: ERROR_CODE, payload: response.data.message})
        }
    }
}

function* addSupplierPaymentApiCall (data) {
    const response = yield call(AddSupplierPayment, data.payload)
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({type: ADD_CUSTOMER_PAYMENT_API_RESPONSE})
            yield put({type: SUCCESS_CODE})
        }
        else {
            yield put({type: ERROR_CODE, payload: response.data})
        }
    }
}

function* generateSupplierPayPDFApiCall (data) {
    const response = yield call(GenerateSupplierPdf, data.payload)
    if (response.status === 200) {
        if (response.data.code == 200) {
            yield put({ type: GENERATE_SUPPLIER_PAYMENT_PDF_API_RESPONSE, payload: response.data.data });
            yield put({ type: SUCCESS_CODE });
        }
        else {
            yield put({ type: ERROR_CODE, payload: response.data })
        }
    }
}

function* PaymentSaga() {
    yield takeEvery(GET_PAYMENT_SUMMARY_API_CALL, getPaymentSummaryApiCall)
    yield takeEvery(ADD_CUSTOMER_PAYMENT_API_CALL, addCustomerPayment)
    yield takeEvery(GET_ALL_PAYMENTS_API_CALL, getAllPayments)
    yield takeEvery(ADD_SUPPLIER_PAYMENT_API_CALL, addSupplierPaymentApiCall)
    yield takeEvery(GENERATE_SUPPLIER_PAYMENT_PDF_API_CALL, generateSupplierPayPDFApiCall)
}

export default PaymentSaga;
