import { act } from "react-dom/test-utils";
import {
  GET_ALL_EMPLOYEE_API_RESPONSE,
  GET_ALL_EMPLOYEE_DESIGNATION_API_RESPONE,
  ADD_DESIGNATION_API_REPONSE,
  GET_ALL_EXPENSE_CATEGORY_API_RESPONSE,
  ADD_ALL_EXPENSE_API_CALL,
  GET_ALL_EXPENSE_API_RESPONSE,
  GET_ALL_EXPENSE_API_CALL,
  GET_ALL_EXPENSE_SUBCATEGORY_API_RESPONSE,
  GET_ALL_EXPENSE_MAIN_CATEGORY_API_RESPONSE,
  ADD_ALL_EXPENSE_API_RESPONSE,
  GET_ALL_EXPENSES_SUB_CATEGORIES_API_RESPONSE,
} from "../../utils/Constant";

const INITIAL_STATE = {
  employeeList: [],
  designationList: [],
  designation: null,
  expenseCategoryList: [],
  expenseSubcategoryList:  [],
  expenseMainList:  [],
  addExpenseList: [],
  allExpensesSubCategories: [],
  getexpenseList:[],
};

const ExpenseReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_EMPLOYEE_API_RESPONSE:
      return { ...state, employeeList: action.payload };

    case ADD_DESIGNATION_API_REPONSE:
      const tempArray = state.designationList;
      tempArray.push(action.payload);
      return {
        ...state,
        designation: action.payload,
        designationList: tempArray,
      };

    case GET_ALL_EMPLOYEE_DESIGNATION_API_RESPONE:
      return { ...state, designationList: action.payload.designations };

    case GET_ALL_EXPENSE_CATEGORY_API_RESPONSE:
      return { ...state, expenseCategoryList: action.payload };

    case GET_ALL_EXPENSE_SUBCATEGORY_API_RESPONSE:
      console.log("reducer",action.payload)
      return{...state, expenseSubcategoryList:action.payload};

    case GET_ALL_EXPENSE_MAIN_CATEGORY_API_RESPONSE:
      return { ...state, expenseMainList: action.payload };

    case GET_ALL_EXPENSES_SUB_CATEGORIES_API_RESPONSE:
      return { ...state, allExpensesSubCategories: action.payload }
      
    case ADD_ALL_EXPENSE_API_RESPONSE:
      return { ...state };

    case GET_ALL_EXPENSE_API_RESPONSE:
      return { ...state, getexpenseList: action.payload };
  }
  return state;
};

export default ExpenseReducer;
