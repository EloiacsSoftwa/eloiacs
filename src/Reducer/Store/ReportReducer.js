import { act } from "react-dom/test-utils";
import {
  CUSTOMER_INVOICE_SUMMARY_API_RESPONSE,
  GET_ALL_ORDERS_SUMMARY_API_RESPONSE,
  GET_SUPPLIER_PAYMENT_REPORT_API_REPONSE,
  GET_PRODUCT_TYPE_SUMMARY_REPORT_API_REPOSNE,
  GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_RESPONSE,
  SOA_SUPPLIER_REPORT_API_CALL,
  SOA_CUSTOMER_REPORT_API_RESPONSE,
  SOA_SUPPLIER_REPORT_API_RESPONSE,
  PDF_VIEW_CUSTOMER_API_RESPONSE,
  PDF_VIEW_CUSTOMER_API_CALL,
  GENERATE_SUPPLIER_SUMMARY_PDF_API_RESPONSE
} from "../../utils/Constant";

const INITIAL_STATE = {
  customersInvoiceList: [],
  reportSummaryList: [],
  supplierPaymentReportList: [],
  productTypeBasedSummary: [],
  productTypesInvoices: { listInvoices: [], listPurchaseOrders: [] },
  soaSupplierList: [],
  soaCustomerList: [],
  pdfcustomerView:[],
  supplierSummaryPDF: [],
};

const ReportReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CUSTOMER_INVOICE_SUMMARY_API_RESPONSE:
      return { ...state, customersInvoiceList: action.payload };

    case GET_ALL_ORDERS_SUMMARY_API_RESPONSE:
      return { ...state, reportSummaryList: action.payload };

    case GET_SUPPLIER_PAYMENT_REPORT_API_REPONSE:
      return { ...state, supplierPaymentReportList: action.payload };

    case GET_PRODUCT_TYPE_SUMMARY_REPORT_API_REPOSNE:
      return { ...state, productTypeBasedSummary: action.payload };

    case GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_RESPONSE:
      return {
        ...state,
        productTypesInvoices: {
          listInvoices: action.payload.listInvoices,
          listPurchaseOrders: action.payload.listPurchaseOrders,
        },
      };

    case SOA_SUPPLIER_REPORT_API_RESPONSE:
      return { ...state, soaSupplierList: action.payload, code: 200 };

    case SOA_CUSTOMER_REPORT_API_RESPONSE:
      return { ...state, soaCustomerList: action.payload, code: 200 };

      case PDF_VIEW_CUSTOMER_API_RESPONSE:
        return {...state, pdfcustomerView: action.payload, code:200 };

    case GENERATE_SUPPLIER_SUMMARY_PDF_API_RESPONSE:
      return { ...state, supplierSummaryPDF: action.payload, code: 200 };
  }
  return state;
};

export default ReportReducer;
