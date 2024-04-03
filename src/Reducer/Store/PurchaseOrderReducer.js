import {
  GET_ALL_PURCHASE_ORDER_API_RESPONSE,
  RESET_PURCHASE_ORDERS_ARRAY,
  RESET_CODE,
  ERROR_MESSAGE,
  GENERATE_PURCHASE_ORDER_PDF_API_RESPONSE,
  GET_PURCHASE_ORDER_DETAILS_API_RESPONSE
} from "../../utils/Constant";

const INITIAL_STATE = {
    listPurchaseOrder: [],
    purchaseOrderDetails: {},
    paidAmount: 0,
    unpaidAmount: 0,
    totalAmount: 0,
    totalOrders: 0,
    fileurl: '',
    code: 0
}

const PurchaseOrderReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_ALL_PURCHASE_ORDER_API_RESPONSE:
            return {...state, listPurchaseOrder: action.payload.data.listPurchaseOrders, paidAmount: action.payload.data.paidAmount, unpaidAmount: action.payload.data.unPaidAmount, totalAmount: action.payload.data.toalPurchaseOrderAmount, totalOrders: action.payload.data.totalOrder}
    
        case RESET_PURCHASE_ORDERS_ARRAY:
            return {...state, listPurchaseOrder: []}

        case GENERATE_PURCHASE_ORDER_PDF_API_RESPONSE:
            console.log(action.payload)
            return {...state, fileurl: action.payload.fileUrl, code: 0}

        case GET_PURCHASE_ORDER_DETAILS_API_RESPONSE:
            return {...state, purchaseOrderDetails: action.payload}

        case RESET_CODE:
            return {...state, code: 0}
        }

  return state;
};

export default PurchaseOrderReducer;
