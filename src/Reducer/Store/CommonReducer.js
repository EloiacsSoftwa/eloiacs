import { ERROR_MESSAGE, ERROR_CODE, ERROR_CODE_SHOW, ERROR_CODE_FAILURE, SUCCESS_CODE, RESET_CODE, SUCCESS_CODE_NO } from "../../utils/Constant"
const INITIAL_STATE = {
    code: 0,
    errorMessage: '',
    successCode: 999
}

const CommonReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        
        case ERROR_CODE: 
            return {...state, code: ERROR_CODE_FAILURE, errorMessage: action.payload.message}

        case ERROR_CODE_FAILURE: 
        return {...state, code: ERROR_CODE_FAILURE, errorMessage: action.payload.message}

        case SUCCESS_CODE: 
        
        return {...state, successCode: SUCCESS_CODE_NO}

        case RESET_CODE: 
        return {...state, code: 0, errorMessage: null, successCode: 0}
    }

    return state
}

export default CommonReducer;