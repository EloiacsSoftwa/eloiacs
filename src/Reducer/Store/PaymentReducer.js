import { GET_PAYMENT_SUMMARY_API_RESPONSE, ERROR_MESSAGE, ADD_CUSTOMER_PAYMENT_API_RESPONSE, GET_ALL_PAYMENTS_API_RESPONSE, RESET_VALUES, GENERATE_SUPPLIER_PAYMENT_PDF_API_RESPONSE } from "../../utils/Constant";
const INITIAL_STATE = {
    customerId: 0,
    customerName: null,
    totalCreditAmount: 0.0,
    totalDebitAmount: 0.0,
    totalOutstanding: 0.0,
    createdBy: null,
    modifiedBy: null,
    code: 0,
    errorMessage: null,
    listPayments: [],
    fileurl: '',
}

const PaymentReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case GET_PAYMENT_SUMMARY_API_RESPONSE:
            return { ...state, customerId: action.payload.customerId, customerName: action.payload.customerName, totalCreditAmount: action.payload.totalCreditAmount, totalDebitAmount: action.payload.totalDebitAmount, totalOutstanding: action.payload.totalOutstanding, createdBy: action.payload.createdBy, modifiedBy: action.payload.modifiedBy }

        case ERROR_MESSAGE:
            return { ...state, code: 150, errorMessage: action.payload }

        case ADD_CUSTOMER_PAYMENT_API_RESPONSE:
            return { ...state, code: 100 }

        case GET_ALL_PAYMENTS_API_RESPONSE:
            return { ...state, listPayments: action.payload }
        
        case GENERATE_SUPPLIER_PAYMENT_PDF_API_RESPONSE:
            return { ...state, fileurl: action.payload.fileUrl, code: 0 }    

        case RESET_VALUES: {
            return {...state, totalCreditAmount: 0.0, totalDebitAmount: 0.0, totalOutstanding: 0.0}
        }
    }

    return state;
}

export default PaymentReducer;