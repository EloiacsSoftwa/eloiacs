import { takeEvery, call, put } from "redux-saga/effects";
import { MASTER_API_CALL, MASTER_API_RESPONSE } from "../utils/Constant";
import { MasterApiCall } from "../Reducer/Action/MasterAction";

function* callMasterApi() {
    const response = yield call(MasterApiCall)

    if (response.status === 200) {
        if (response.data.code === 200) {
            console.log("success")
            yield put({type: MASTER_API_RESPONSE, payload: response.data.data})
        }
       
    }
}

function* MasterSaga() {
    yield takeEvery(MASTER_API_CALL, callMasterApi)
}

export default MasterSaga;