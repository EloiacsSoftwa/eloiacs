import { takeEvery, call, put } from "redux-saga/effects";
import { GET_ALL_PRODUCTS_API_CALL, GET_ALL_PRODUCTS_RESPONSE, PRODUCT_ERROR, ADD_PRODUCT_API_CALL, ADD_PRODUCT_API_RESPONSE, ERROR_CODE, SUCCESS_CODE, SUCCESS_CODE_NO,
ADD_EXPENSE_SUB_CATEGORY_API_CALL, ADD_EXPENSE_SUB_CATEGORY_API_RESPONSE } from "../utils/Constant";
import { GetAllProducts, AddProducts } from "../Reducer/Action/ProductAction";

function* getAllProducts() {
    const response = yield call(GetAllProducts)

    try {   
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: GET_ALL_PRODUCTS_RESPONSE, payload: response.data.data})
                // yield put({type: SUCCESS_CODE})
            }
            else {yield put({
                type: ERROR_CODE,
                payload: { message: response.data},
              });
            }
        }
    }
    catch(error) {
        yield put({type: PRODUCT_ERROR, payload: {message: "Please Try After some time"}}) 
    }
}


function* addProductAPiCall(bodyData) {
    const response = yield call(AddProducts, bodyData.payload)

    try {
        if (response.status === 200) {
            if (response.data.code === 200) {
                yield put({type: ADD_PRODUCT_API_RESPONSE, payload: response.data.code})
                yield put({type: SUCCESS_CODE})
            }
            else {yield put({
                type: ERROR_CODE,
                payload: { message: response.data.message},
              });
            }
        }
        else {

        }
    }
    catch(error) {

    }
}

function* ProductSaga() {
    yield takeEvery(GET_ALL_PRODUCTS_API_CALL, getAllProducts)
    yield takeEvery(ADD_PRODUCT_API_CALL, addProductAPiCall)
}

export default ProductSaga;