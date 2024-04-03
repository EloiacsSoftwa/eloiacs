import { takeEvery, call, put, take } from "redux-saga/effects";
import { GET_ALL_INVOICE_API_CALL, GET_ALL_INVOICE_API_RESPONSE, CREATE_INVOICE_API_RESPONSE, CREATE_INVOICE_API_CALL, GENERATE_INVOICE_PDF_API_CALL, GENERATE_INVOICE_PDF_API_RESPONSE, SUCCESS_CODE, ERROR_CODE, GET_INVOICE_DETAILS_API_CALL, GET_INVOICE_DETAILS_API_RESPONSE,
UPDATE_DRAFTED_INVOICE_API_CALL, UPDATE_DRAFTED_INVOICE_API_RESPONSE, SUCCESS_CODE_NO, ERROR_CODE_FAILURE } from "../utils/Constant";
import { GetAllInvoiceRequest, CreateInvoice, GenerateInvoicePdfApi, GetInvoiceDetails, UpdateDraftedInvoice } from "../Reducer/Action/InvoiceAction";


function* getAllInvoiceApiCall() {
    const response = yield call(GetAllInvoiceRequest)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({ type: GET_ALL_INVOICE_API_RESPONSE, payload: response.data.data })
                yield put({ type: SUCCESS_CODE })
            }
            else {
                yield put({type: ERROR_CODE, payload: {message: response.data.message}})
            }
        }
    }
    catch (error) {

    }
}

function* createInvoice(data) {
    const response = yield call(CreateInvoice, data.data);
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({ type: CREATE_INVOICE_API_RESPONSE })
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

function* generateInvoicePDFApiCall(data) {
    const response = yield call(GenerateInvoicePdfApi, data.invoiceId)
    console.log(response)
    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({ type: GENERATE_INVOICE_PDF_API_RESPONSE, data: response.data.data.fileUrl })
            }
            else {
            }
        }
    }
    catch (error) {

    }

}

function* getInvoiceDetails(data) {
    const response = yield call(GetInvoiceDetails, data.payload)
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({type: GET_INVOICE_DETAILS_API_RESPONSE, payload: response.data.data})
        }
        else {
            yield put({type: ERROR_CODE, payload: {message: response.data.errorMessage}})
        }
    }
}

function* updateDraftedInvoices(data) {
    const response = yield call(UpdateDraftedInvoice, data.payload)
    if (response.status === 200) {
        if (response.data.code === 200) {
            yield put({type: SUCCESS_CODE})
        }
        else {
            yield put({type: ERROR_CODE, payload: response.data.errorMessage})
        }
     }
}

function* InvoiceSaga() {
    yield takeEvery(GET_ALL_INVOICE_API_CALL, getAllInvoiceApiCall)
    yield takeEvery(CREATE_INVOICE_API_CALL, createInvoice)
    yield takeEvery(GENERATE_INVOICE_PDF_API_CALL, generateInvoicePDFApiCall)
    yield takeEvery(GET_INVOICE_DETAILS_API_CALL, getInvoiceDetails)
    yield takeEvery(UPDATE_DRAFTED_INVOICE_API_CALL, updateDraftedInvoices)
}

export default InvoiceSaga;