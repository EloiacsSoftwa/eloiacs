import { takeEvery, call, put, take } from "redux-saga/effects";
import {
  ADD_DESIGNATION_API_CALL,
  ADD_DESIGNATION_API_REPONSE,
  SUCCESS_CODE,
  ERROR_CODE,
  GET_ALL_EMPLOYEE_API_CALL,
  GET_ALL_EMPLOYEE_API_RESPONSE,
  GET_ALL_EMPLOYEE_DESIGNATION_API_CALL,
  GET_ALL_EMPLOYEE_DESIGNATION_API_RESPONE,
  ADD_EMPLOYEE_API_CALL,
  ADD_EMPLOYEE_API_RESPONSE,
  GET_ALL_EXPENSE_API_CALL,
  ADD_EXPENSE_CATEGORY_API_CALL,
  ADD_EXPENSE_CATEGORY_API_RESPONSE,
  ADD_EXPENSE_SUB_CATEGORY_API_CALL,
  ADD_EXPENSE_SUB_CATEGORY_API_RESPONSE,
  GET_ALL_EXPENSE_CATEGORY_API_CALL,
  GET_ALL_EXPENSE_CATEGORY_API_RESPONSE,
  ADD_ALL_EXPENSE_API_CALL,
  GET_ALL_EXPENSE_SUBCATEGORY_API_CALL,
  GET_ALL_EXPENSE_SUBCATEGORY_API_RESPONSE,
  GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL,
  GET_ALL_EXPENSE_MAIN_CATEGORY_API_RESPONSE,
  ADD_ALL_EXPENSE_API_RESPONSE,
  GET_ALL_EXPENSES_SUB_CATEGORIES_API_CALL,
  GET_ALL_EXPENSES_SUB_CATEGORIES_API_RESPONSE,
  GET_EXPENSE_ALL_REPORT_API_CALL,
  GET_EXPENSE_ALL_REPORT_API_RESPONSE,
  GET_ALL_EXPENSE_API_RESPONSE

} from "../utils/Constant";
import {
  AddDesignation,
  GetAllEmployee,
  GetAllEmployeeDesignation,
  AddEmployeeCall,
  AddExpenseCategory,
  addExpenseSubCategory,
  GetExpenseCategory,
  AddExpense,
  getExpenseSubCategory,
  getexpenseMainCategory,
  GetAllExpensesSubCategories,
  getExpenseAllreport
} from "../Reducer/Action/ExpenseAction";

// expense category

function* getCategoryexpense() {
  const response = yield call(GetExpenseCategory);
  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: GET_ALL_EXPENSE_CATEGORY_API_RESPONSE,
          payload: response.data.data,
        });
      }
    }
  } catch (error) {}
}

function* addDesignationApiCall(data) {
  const response = yield call(AddDesignation, data.payload);

  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: ADD_DESIGNATION_API_REPONSE,
        payload: response.data.data,
      });
      yield put({ type: SUCCESS_CODE });
    } else {
      yield put({ type: ERROR_CODE, payload: response.data });
    }
  }
}

function* GetAllEmployeeApiCall() {
  const response = yield call(GetAllEmployee);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: GET_ALL_EMPLOYEE_API_RESPONSE,
        payload: response.data.data,
      });
    } else {
      // yield put({ type: ERROR_CODE, payload: response.data });
    }
  }
}

function* GetAllEmployeeDesignations() {
  const response = yield call(GetAllEmployeeDesignation);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: GET_ALL_EMPLOYEE_DESIGNATION_API_RESPONE,
        payload: response.data.data,
      });
    }
  }
}

function* AddEmployeeApiRequest(data) {
  const response = yield call(AddEmployeeCall, data.payload);

  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({ type: SUCCESS_CODE });
    } else {
      yield put({ type: ERROR_CODE, payload: response.data });
    }
  }
}

// Add expense data -----------------
function* AddExpenseData(data) {
  const response = yield call(AddExpense, data.payload);
  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put ({type: SUCCESS_CODE})
        yield put({
          type: ADD_ALL_EXPENSE_API_RESPONSE,
          payload: response.data.code,
        });
        console.log("payload",response.data);
      } else {
        yield put({ type: ERROR_CODE, payload: response.data });
      }
    }
  } catch (error) {}
}

function* GetExpenseReport() {
  const response = yield call (getExpenseAllreport)
  if(response.status === 200){
      if(response.data.code === 200){
        console.log("get expense",response.data)
          yield put({
            type: GET_ALL_EXPENSE_API_RESPONSE,
            payload: response.data.data,
          });
      }else{
        yield put ({type: ERROR_CODE, payload:response.data})
      }
  }
}

function* AddExpenseCategoryRequest(data) {
  const response = yield call(AddExpenseCategory, data.payload);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({ type: SUCCESS_CODE });
    } else {
      yield put({ type: ERROR_CODE, payload: response.data });
    }
  }
}

function* AddExpenseSubCategoryItem(data) {
  const response = yield call(addExpenseSubCategory, data.payload);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({ type: SUCCESS_CODE });
      yield put({ type: ADD_EXPENSE_SUB_CATEGORY_API_RESPONSE });
    } else {
      yield put({ type: ERROR_CODE, payload: response.data });
    }
  }
}

function* GetexpenseSubcategorycall(data) {
  const response = yield call(getExpenseSubCategory, data.data);
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({
        type: GET_ALL_EXPENSE_SUBCATEGORY_API_RESPONSE,
        payload: response.data.data,
      });
    }
  }
}

function* GetExpenseMainCategoryCall() {
  const response = yield call(getexpenseMainCategory);
  try {
    if (response.status === 200) {
      if (response.data.code === 200) {
        yield put({
          type: GET_ALL_EXPENSE_MAIN_CATEGORY_API_RESPONSE,
          payload: response.data.data,
        });
      }
    }
  } catch (error) {}
}

function* GetAllExpensesSubCategoryApiCall() {
  const response = yield call(GetAllExpensesSubCategories)
  if (response.status === 200) {
    if (response.data.code === 200) {
      yield put({type: GET_ALL_EXPENSES_SUB_CATEGORIES_API_RESPONSE, payload: response.data.data})
    }
  }
}

function* ExpenseSaga() {
  yield takeEvery(ADD_DESIGNATION_API_CALL, addDesignationApiCall);
  yield takeEvery(GET_ALL_EMPLOYEE_API_CALL, GetAllEmployeeApiCall);
  yield takeEvery(GET_ALL_EMPLOYEE_DESIGNATION_API_CALL, GetAllEmployeeDesignations);
  yield takeEvery(ADD_EMPLOYEE_API_CALL, AddEmployeeApiRequest);
  yield takeEvery(GET_ALL_EXPENSE_API_CALL, GetExpenseReport); // expense report
  yield takeEvery(ADD_EXPENSE_CATEGORY_API_CALL, AddExpenseCategoryRequest);
  yield takeEvery(ADD_EXPENSE_SUB_CATEGORY_API_CALL, AddExpenseSubCategoryItem);
  yield takeEvery(GET_ALL_EXPENSE_CATEGORY_API_CALL, getCategoryexpense); // expense category
  yield takeEvery(ADD_ALL_EXPENSE_API_CALL, AddExpenseData); // Add expense data
  yield takeEvery(GET_ALL_EXPENSE_SUBCATEGORY_API_CALL, GetexpenseSubcategorycall);
  yield takeEvery(GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL, GetExpenseMainCategoryCall);
  yield takeEvery(GET_ALL_EXPENSES_SUB_CATEGORIES_API_CALL, GetAllExpensesSubCategoryApiCall)

}

export default ExpenseSaga;
