import { AxiosConfig } from "../../Networking/AxiosConfig";

export const AddDesignation = (data) => {
  return AxiosConfig.post("/v2/employee/addDesignation", data);
};

export const GetAllEmployee = () => {
  return AxiosConfig.post("/v2/employee/getEmployees");
};
export const GetExpenseCategory = () => {
  return AxiosConfig.get("/v2/expense/getExpenseCategory");
};

export const GetAllEmployeeDesignation = () => {
  return AxiosConfig.get("/v2/employee/getDesignations");
};

export const AddEmployeeCall = (data) => {
  return AxiosConfig.post("/v2/employee/addEmployee", data);
};

export const AddExpenseCategory = (data) => {
  return AxiosConfig.post("/v2/expense/addExpenseCategory", data);
};

export const addExpenseSubCategory = (data) => {
  return AxiosConfig.post("/v2/expense/addExpenseSubCategory", data);
};

export const getexpenseMainCategory = () => {
  return AxiosConfig.post("/v2/expense/getAllExpenses");
};

export const getExpenseSubCategory = (id) => {
  return AxiosConfig.get(`v2/expense/getExpenseSubCategory/${id}`);
};

export const AddExpense = (data) => {
  return AxiosConfig.post("/v2/expense/addExpense",data);
};

export const GetAllExpensesSubCategories = () => {
  return AxiosConfig.get('/v2/expense/getAllSubCategories');
}

export const getExpenseAllreport = () =>{
  return AxiosConfig.post("/v2/expense/getExpenses")
}
