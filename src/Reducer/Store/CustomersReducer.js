import {
  GET_ALL_CUSTOMERS_API_RESPONSE,
  ERROR_MESSAGE,
  SEARCH_CUSTOMER_API_RESPONSE,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE,
  ADD_CUSTOMER_BANK_DETAILS_API_RESPONSE,
  UPDATE_CUSTOMER_STATUS_CODE,
  ADD_CUSTOMER_ADDRESS_API_RESPONSE,
  CREATE_CUSTOMER_API_RESPONSE,
  RESET_CODE,
  RESET_CUSTOMER_LISTS,
  SUCCESS_CODE_NO
} from "../../utils/Constant";

const INITIAL_STATE = {
  customersList: [],
  message: null,
  searchList: [],
  selectedCustomerDetails: null,
  code: 0,
  goback: false
};

const CustomersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_CUSTOMERS_API_RESPONSE: {
      return { ...state, customersList: action.payload, code: 200 };
    }
    case ERROR_MESSAGE: {
      return { ...state, message: action.payload.message, code: 100 };
    }

    case SEARCH_CUSTOMER_API_RESPONSE: {
      console.log(action.payload)
      return { ...state, searchList: action.payload }
    }

    case SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE: {
      return { ...state, selectedCustomerDetails: action.payload }
    }

    case ADD_CUSTOMER_BANK_DETAILS_API_RESPONSE: {
      return { ...state, code: action.payload, goback: true }
    }

    case UPDATE_CUSTOMER_STATUS_CODE: {
      return { ...state, code: action.payload }
    }
    case ADD_CUSTOMER_ADDRESS_API_RESPONSE: {
      return { ...state, code: action.payload }
    }

    case RESET_CODE: {
      return {...state, code: 0, goback: false, message: null}
    }

    case CREATE_CUSTOMER_API_RESPONSE: {
      return {...state, code: SUCCESS_CODE_NO, goback: true, message: 'Registered Successfully'}
    }

    case RESET_CUSTOMER_LISTS: {
      return {...state, customersList: [], searchList: []}
    }



  }
  return state;
};

export default CustomersReducer;
