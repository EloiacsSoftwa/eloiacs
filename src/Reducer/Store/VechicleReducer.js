import { ADD_VEHICLE_API_CALL,ERROR_MESSAGE,GET_ALL_VEHICLE_INVOICE_API_RESPONSE,GET_VEHICLE_API_RESPONSE, GET_VEHICLE_INVOICE_DETAILS_API_RESPONSE } from "../../utils/Constant";

const INITIAL_STATE = {
 vehicleList:[],
 vehicleInvoiceList: [],
 vehicleInvoiceDetails: {},
}

const VehicleReducer = (state = INITIAL_STATE,action) =>{

    switch(action.type){

        case GET_VEHICLE_API_RESPONSE:{
            return {...state, vehicleList: action.payload, code:200};
        }
        case ADD_VEHICLE_API_CALL:{
            return {...state};
        }
        case GET_ALL_VEHICLE_INVOICE_API_RESPONSE: {
            return { ...state, vehicleInvoiceList: action.payload, code: 200 };
        }
        case GET_VEHICLE_INVOICE_DETAILS_API_RESPONSE: {
            return { ...state, vehicleInvoiceDetails: action.payload }
        }
       
    }
    return state;
}

export default VehicleReducer;


