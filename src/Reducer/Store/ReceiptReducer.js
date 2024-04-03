import { GET_ALL_RECEIPT_API_RESPONSE, GET_ALL_ORDERS_SUMMARY_API_RESPONSE, GENERATE_RECEIPT_PDF_API_RESPONSE } from "../../utils/Constant";

const INITIAL_STATE = {
    listAllReceipt: [],
    fileurl: '',
    code: 0,
}

const ReceiptReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_RECEIPT_API_RESPONSE: {
            return {...state, listAllReceipt: action.payload}
        }
        case GENERATE_RECEIPT_PDF_API_RESPONSE:
            return { ...state, fileurl: action.payload.fileUrl, code: 0 }
    }

    return state;
}

export default ReceiptReducer;