import { takeEvery, call, put, take } from "redux-saga/effects";
import {
  CUSTOMER_INVOICE_SUMMARY_API_CALL,
  CUSTOMER_INVOICE_SUMMARY_API_RESPONSE,
  GET_ALL_ORDERS_SUMMARY_API_CALL,
  ERROR_CODE,
  GET_ALL_ORDERS_SUMMARY_API_RESPONSE,
  GET_SUPPLIER_PAYMENT_REPORT_API_CALL,
  GET_SUPPLIER_PAYMENT_REPORT_API_REPONSE,
  GET_PRODUCT_TYPE_SUMMARY_REPORT_API_CALL,
  GET_PRODUCT_TYPE_SUMMARY_REPORT_API_REPOSNE,
  GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_CALL,
  GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_RESPONSE,
  SOA_CUSTOMER_REPORT_API_CALL,
  SOA_CUSTOMER_REPORT_API_RESPONSE,
  SOA_SUPPLIER_REPORT_API_RESPONSE,
  SOA_SUPPLIER_REPORT_API_CALL,
  PDF_VIEW_CUSTOMER_API_RESPONSE,
  PDF_VIEW_CUSTOMER_API_CALL,
  SUCCESS_CODE,
  GENERATE_SUPPLIER_SUMMARY_PDF_API_RESPONSE,
  GENERATE_SUPPLIER_SUMMARY_PDF_API_CALL,
} from "../utils/Constant";
import {
  GetAllCustomerInvoiceSummaryApiCall,
  GetAllSummaryApiCall,
  GetAllSupplierPaymentReportCall,
  GetProductTypeBasedSummaryreports,
  GetInvoicesBasedOnProductTypes,
  GetSoaCustomer,
  GetSoaSupplier,
  pdfViewsoacustomer,
  GenerateSupplierSummaryPDF,
} from "../Reducer/Action/ReportAction";

function* customerInvoiceSummaryApiCall() {
  const response = yield call(GetAllCustomerInvoiceSummaryApiCall);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: CUSTOMER_INVOICE_SUMMARY_API_RESPONSE,
        payload: response.data.data,
      });
    } else {
      // yield put({ type: ERROR_CODE, payload: response.data.message });
    }
  }
}

function* callGetAllOrdersSUmmaryAPICall() {
  const response = yield call(GetAllSummaryApiCall);

  if (response.status === 200) {
    if (response.data.code === 200) {
      console.log(response);
      yield put({
        type: GET_ALL_ORDERS_SUMMARY_API_RESPONSE,
        payload: response.data.data,
      });
    }
  }
}

function* callSupplierPaymentReportApi() {
  const response = yield call(GetAllSupplierPaymentReportCall);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: GET_SUPPLIER_PAYMENT_REPORT_API_REPONSE,
        payload: response.data.data,
      });
    }
  }
}

function* productTypeBasedSummaryReportApiCall() {
  const response = yield call(GetProductTypeBasedSummaryreports);

  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: GET_PRODUCT_TYPE_SUMMARY_REPORT_API_REPOSNE,
        payload: response.data.data,
      });
    }
  }
}

function* getInvoicesBasedOnProductTypesApiCall(data) {
  const response = yield call(GetInvoicesBasedOnProductTypes, data.payload);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_RESPONSE,
        payload: response.data.data,
      });
    } else {
      yield put({ type: ERROR_CODE, message: response.data.errorMessage });
    }
  }
}

// report soa customer
function* getCustomerSOAList(requestId) {
  const response = yield call(GetSoaCustomer, requestId);
  if (response.status == 200) {
    if (response.data.code === 200) {
      yield put({
        type: SOA_CUSTOMER_REPORT_API_RESPONSE,
        payload: response.data.data,
      });
    } else {
      yield put({ type: ERROR_CODE, message: response.data.errorMessage });
    }
  }
}
// report soa customer
function* getSupploerSOAList(requestId) {
  const response = yield call(GetSoaSupplier, requestId);
  console.log("reid", response);
  if (response.status == 200) {
    if (response.data.code === 200) {
      yield put({
        type: SOA_SUPPLIER_REPORT_API_RESPONSE,
        payload: response.data.data,
      });
    } else {
      yield put({ type: ERROR_CODE, message: response.data.errorMessage });
    }
  }
}
function* CustomerViewpdfdownload(data) {
  const response = yield call(pdfViewsoacustomer, data);

  if (response.status == 200) {
    if (response.data.code === 200) {
      yield put({
        type: PDF_VIEW_CUSTOMER_API_RESPONSE,
        payload: response.data.data,
      });
      yield put({ type: SUCCESS_CODE });

      console.log("response", response);
    } else {
      yield put({ type: ERROR_CODE, message: response.data.errorMessage });
    }
  }
}

function* supplierSummaryPDF(data) {
  const response = yield call(GenerateSupplierSummaryPDF, data);
  console.log("repro", response)

  if(response.status === 200) {
    if(response.data.code === 200) {
      yield put({ type: GENERATE_SUPPLIER_SUMMARY_PDF_API_RESPONSE, payload: response.data.data })
      yield put({ type: SUCCESS_CODE })
    }
    else {
      yield put({ type: ERROR_CODE, message: response.data.errorMessage })
    }
  }
}

function* ReportSaga() {
  yield takeEvery(CUSTOMER_INVOICE_SUMMARY_API_CALL, customerInvoiceSummaryApiCall);
  yield takeEvery(GET_ALL_ORDERS_SUMMARY_API_CALL, callGetAllOrdersSUmmaryAPICall);
  yield takeEvery(GET_SUPPLIER_PAYMENT_REPORT_API_CALL, callSupplierPaymentReportApi);
  yield takeEvery(GET_PRODUCT_TYPE_SUMMARY_REPORT_API_CALL, productTypeBasedSummaryReportApiCall);
  yield takeEvery(GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_CALL, getInvoicesBasedOnProductTypesApiCall);
  yield takeEvery(SOA_CUSTOMER_REPORT_API_CALL, getCustomerSOAList);
  yield takeEvery(SOA_SUPPLIER_REPORT_API_CALL, getSupploerSOAList);
  yield takeEvery(PDF_VIEW_CUSTOMER_API_CALL, CustomerViewpdfdownload);
  yield takeEvery(GENERATE_SUPPLIER_SUMMARY_PDF_API_CALL, supplierSummaryPDF);
}

export default ReportSaga;
