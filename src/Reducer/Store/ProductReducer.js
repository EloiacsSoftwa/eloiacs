import { GET_ALL_PRODUCTS_RESPONSE, PRODUCT_ERROR } from "../../utils/Constant";

const INITIAL_STATE = {
    products: [],
    error: null
}

const ProductReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_ALL_PRODUCTS_RESPONSE:
            return {...state, products: action.payload}

        case PRODUCT_ERROR:
            return {...state, error: action.payload}
        
    }
    return state
}

export default ProductReducer;