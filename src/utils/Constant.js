import CryptoJS from "crypto-js";

export const LOGIN_API_CALL = 'Login-API-Call'
export const LOGIN_API_RESPONSE = 'Login-API-Response'
export const REGISTER_API_CALL = 'Register-Api-Call'
export const REGISTER_API_RESPONSE = 'Register-Api-Response'
export const ERROR_TYPE = 'ERROR'
export const ERROR_MESSAGE = 'ERROR-MESSAGE'
export const CLEAR_ERROR_MESSAGE = 'CLEAR-ERROR-MESSAGE'
export const GET_ALL_CUSTOMERS_API_CALL = 'Get-All-Customers'
export const GET_ALL_CUSTOMERS_API_RESPONSE = 'Get-All-Customers-response'
export const MASTER_API_CALL = 'Get-Master-API-call'
export const MASTER_API_RESPONSE = 'Get-Master-API-response'
export const CREATE_CUSTOMER_API_CALL = 'Create-Customer-Call'
export const CREATE_CUSTOMER_API_RESPONSE = 'Create-Customer-Api-Response'
export const GET_ALL_PRODUCTS_API_CALL = 'Get-All-Products'
export const GET_ALL_PRODUCTS_RESPONSE = 'Get-All-Rroducts-Response'
export const ADD_PRODUCT_API_CALL = 'Add_Product_Api_call'
export const ADD_PRODUCT_API_RESPONSE = 'Add_Product_Api_response'
export const PRODUCT_ERROR = 'Eroduct-Error'
export const CLEAR_PRODUCT_ERROR = 'Clear-Product-Error'
export const UPDATE_USER_ID_LOCALLY = 'Update_User_id_Locally'
export const SEARCH_CUSTOMER_API_CALL = 'Search_Customer_API_Call'
export const SEARCH_CUSTOMER_API_RESPONSE = 'Search_Customer_API_Response'
export const SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL = 'Search-Customer-By-Id-Call'
export const SEARCH_CUSTOMER_BY_CUSTOMERS_ID_RESPONSE = 'Search-Customers-By-Id-Response'
export const GET_LOGGED_USER_DETAILS_API_CALL = 'Get_Logged_User_details'
export const GET_LOGGED_USER_DETAILS_RESPONSE = 'Get-Loggedin-User-Response'
export const GET_ALL_PURCHASE_ORDER_API_CALL = 'Get-All-Purchase-Order-call'
export const GET_ALL_PURCHASE_ORDER_API_RESPONSE = 'Get-All-Purchase-Order-Response'
export const CREATE_PURCHASE_ORDER_API_CALL = 'Create-Purchase-Order-Api-Call'
export const CREATE_PURCHASE_ORDER_API_RESPONSE = 'Create-Purchase-Order-Api-Response'
export const ADD_CUSTOMER_BANK_DETAILS_API_CALL = 'Add-Customer-Bank-details-api-call'
export const ADD_CUSTOMER_BANK_DETAILS_API_RESPONSE = 'Add-Customer-Bank-Details-Api-Response'
export const ADD_CUSTOMR_ADDRESS_API_CALL = 'Add-Customer-Address-Api-Call';
export const ADD_CUSTOMER_ADDRESS_API_RESPONSE = 'Add-Customer-Address-Api-Response'
export const UPDATE_CUSTOMER_STATUS_CODE = 'Update-Customer-Status-Code'
export const RESET_PURCHASE_ORDERS_ARRAY = 'Reset-Purchase-Order-Array'
export const USER_ACCOUNT_LOGOUT = 'User-Account-logout';
export const GET_ALL_INVOICE_API_CALL = 'Get-All-Invoice-Api-Call'
export const GET_ALL_INVOICE_API_RESPONSE = 'Get-All-Invoice-Api-Response'
export const CREATE_INVOICE_API_CALL = 'Create-Invoice-Api-call'
export const CREATE_INVOICE_API_RESPONSE = 'Create-Invoice-Api-Response'
export const RESET_INVOICE_ARRAY = 'Reset-Invoice-Array';
export const GENERATE_INVOICE_PDF_API_CALL = 'Generate-pdf-Invoice-Api-Call'
export const GENERATE_INVOICE_PDF_API_RESPONSE = 'Generate-pdf-Invoice-Api-Response'
export const GET_ALL_RECEIPT_API_CALL = 'Get-All-Receipt-Api-Call'
export const GET_ALL_RECEIPT_API_RESPONSE = 'Get-All-Receipt-Response-call'
export const GET_PAYMENT_SUMMARY_API_CALL = 'Get-Payment-Summary-Api-Call'
export const GET_PAYMENT_SUMMARY_API_RESPONSE = 'Get-Payment-Summary-Api-Response'
export const ADD_CUSTOMER_PAYMENT_API_CALL = 'Add-Customer-Payment-Api-Call'
export const ADD_CUSTOMER_PAYMENT_API_RESPONSE = 'Add-Customer-Payment-Api-Response'
export const GET_ALL_PAYMENTS_API_CALL = 'Get-All-Payments-Api-Call'
export const GET_ALL_PAYMENTS_API_RESPONSE = 'Get-All-Payments-Api-Response'
export const ADD_SUPPLIER_PAYMENT_API_CALL = 'Add-Supplier-Payment-Api-Call'
export const ADD_SUPPLIER_PAYMENT_API_RESPONSE = 'Add-Supplier-Payment-Api-Response'
export const GENERATE_PURCHASE_ORDER_PDF_API_CALL = 'Generate-Purchase-order-PDF-Api-Call'
export const GENERATE_PURCHASE_ORDER_PDF_API_RESPONSE = 'Generate-Purchase-Order-PDF-API-Response'
export const CUSTOMER_INVOICE_SUMMARY_API_CALL = 'Customer-Invoice-Summary-Api-Call'
export const CUSTOMER_INVOICE_SUMMARY_API_RESPONSE = 'Customer-Invoice-Summary-Api-Response'
export const GET_ALL_ORDERS_SUMMARY_API_CALL = 'Get-All-Orders-Summary-API-Call'
export const GET_ALL_ORDERS_SUMMARY_API_RESPONSE = 'Get-All-Orders-Summary-API-Response'
export const GET_SUPPLIER_PAYMENT_REPORT_API_CALL = 'Get-All-Payment-Summary-Api-Call'
export const GET_SUPPLIER_PAYMENT_REPORT_API_REPONSE = 'Get-All-Payment-Summary-Api-Response'
export const GET_PRODUCT_TYPE_SUMMARY_REPORT_API_CALL = 'Get-Product-Type-Based-Summary-Report-call'
export const GET_PRODUCT_TYPE_SUMMARY_REPORT_API_REPOSNE = 'Get-Product-Type-Based-Summary-Report-Respone'
export const ADD_DESIGNATION_API_CALL = 'Add-Designation-Api-Call'
export const ADD_DESIGNATION_API_REPONSE = 'Add-Designation-Api-Response'
export const GET_ALL_EMPLOYEE_API_CALL = 'Get-All-Employee-Api-Call'
export const GET_ALL_EMPLOYEE_API_RESPONSE = 'Get-All-Employee-Api-Response'
export const GET_ALL_EMPLOYEE_DESIGNATION_API_CALL = 'Get-All-Employee-Designation-Api-Call'
export const GET_ALL_EMPLOYEE_DESIGNATION_API_RESPONE = 'Get-All-Employee-Designation-Api-Response'
export const ADD_EMPLOYEE_API_CALL = 'Add-Employee-Api-Call'
export const ADD_EMPLOYEE_API_RESPONSE = 'Add-Employee-Api-Response'
export const GET_ALL_EXPENSE_API_CALL = 'Get-All-Expense-Api-Call'
export const GET_ALL_EXPENSE_API_RESPONSE ='Get-All-Expense-Api-Response'
export const ADD_EXPENSE_CATEGORY_API_CALL  = 'Add-Expense-Category-Api-Call'
export const ADD_EXPENSE_CATEGORY_API_RESPONSE = 'Add-Expense-Category-Api-Response'
export const ADD_EXPENSE_SUB_CATEGORY_API_CALL = 'Add-Expense-Sub-Category-Api-Call'
export const ADD_EXPENSE_SUB_CATEGORY_API_RESPONSE = 'Add-Expense-Sub-Category-Api-Response'
export const GET_INVOICE_DETAILS_API_CALL = 'Get-Invoice-Details-API-Call'
export const GET_INVOICE_DETAILS_API_RESPONSE = 'Get-Invoice-Details-Api-Response'
export const GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_CALL = 'Get-Invoices-Based-On-Product-Types-Api-Call'
export const GET_INVOICES_BASED_ON_PRODUCT_TYPES_API_RESPONSE = 'Get-Invoices-Based-On-Product-Types-Api-Response'
export const GET_ALL_EXPENSES_SUB_CATEGORIES_API_CALL = 'Get-All-Expenses-Sub-Categories-Api-Call' //it fetch all the sub categories
export const GET_ALL_EXPENSES_SUB_CATEGORIES_API_RESPONSE = 'Get-All-Expenses-Sub-Categories-Api-Response'

export const GET_PURCHASE_ORDER_DETAILS_API_CALL = 'Get-Purchase-Order-Details-API-Call'
export const GET_PURCHASE_ORDER_DETAILS_API_RESPONSE = 'Get-Purchase-Order-Details-API-Response'
export const UPDATE_DRAFTED_INVOICE_API_CALL = 'Update-Drafted-Invoice-Api-Call'
export const UPDATE_DRAFTED_INVOICE_API_RESPONSE = 'Update-Drafted-Invoice-Api-Response'

// vehicle add
export const ADD_VEHICLE_API_CALL = 'Add-Vehicle-Expense-Api-Call'
export const ADD_VEHICLE_API_RESPONSE = 'Add-Vehicle-Expense-Api-Response'
export const GET_VEHICLE_API_RESPONSE = 'Get-Vehicle-Expense-Api-Response'
export const GET_VEHICLE_API_CALL = 'Get-Vehicle-Expense-Api-Call'
//vehicle invoice
export const GET_ALL_VEHICLE_INVOICE_API_CALL = 'Get-All-Vehicle-Invoice-API-Call'
export const GET_ALL_VEHICLE_INVOICE_API_RESPONSE = 'Get-All-Vehicle-Invoice-API-Response'
export const CREATE_VEHICLE_INVOICE_API_CALL = 'Create-Vehicle-Invoice-API-Call'
export const CREATE_VEHICLE_INVOICE_API_RESPONSE = 'Create-Vehicle-Invoice-API-Response'
export const GET_VEHICLE_INVOICE_DETAILS_API_RESPONSE = 'Create-Vehicle-Invoice-Details-API-Response'
export const GET_VEHICLE_INVOICE_DETAILS_API_CALL = 'Create-Vehicle-Invoice-Details-API-Call'

// expense get
export const GET_ALL_EXPENSE_CATEGORY_API_CALL = 'Get-Expense-Category-Api-Call'
export const GET_ALL_EXPENSE_CATEGORY_API_RESPONSE = 'Get-Expense-Category-Api-Response'
export const GET_ALL_EXPENSE_MAIN_CATEGORY_API_CALL = 'Get-Expense-Main-Category-Api-Call'  // main category expense
export const GET_ALL_EXPENSE_MAIN_CATEGORY_API_RESPONSE = 'Get-Expense-Main-Category-Api-Response'  // main category expense response
export const GET_ALL_EXPENSE_SUBCATEGORY_API_CALL = 'Get-All-Expense-SubCategory-Api-Call'
export const GET_ALL_EXPENSE_SUBCATEGORY_API_RESPONSE = 'Get-All-Expense-SubCategory-Api-Response'

export const GET_EXPENSE_ALL_REPORT_API_CALL = 'Get-Expense-All-Report-Api-Call'
export const GET_EXPENSE_ALL_REPORT_API_RESPONSE = 'Get-Expense-All-Report-Api-Response'

// expense add 
export const ADD_ALL_EXPENSE_API_CALL = 'Add-All-Expense-Api-Call'
export const ADD_ALL_EXPENSE_API_RESPONSE = 'Add-All-Expense-Api-Response'

//Supplier pdf
export const GENERATE_SUPPLIER_PAYMENT_PDF_API_CALL = 'Generate-Supplier-Payment-PDF-API-Call'
export const GENERATE_SUPPLIER_PAYMENT_PDF_API_RESPONSE = 'Generate-Supplier-Payment-PDF-API-Response'
export const GENERATE_RECEIPT_PDF_API_CALL = 'Generate-Receipt-PDF-API-Call'
export const GENERATE_RECEIPT_PDF_API_RESPONSE = 'Generate-Receipt-PDF-API-Response'

// soa report
export const SOA_CUSTOMER_REPORT_API_CALL = 'Get-Soa-Customer-Report-API-Call'
export const SOA_CUSTOMER_REPORT_API_RESPONSE = 'Get-Soa-Customer-Report-API-Response'
export const SOA_SUPPLIER_REPORT_API_CALL = 'Get-Soa-Supplier-Report-API-Call'
export const SOA_SUPPLIER_REPORT_API_RESPONSE = 'Get-Soa-Supplier-Report-API-Response'

// soa pdf view
export const PDF_VIEW_CUSTOMER_API_CALL = "Pdf-View-Customer-Api-Call"
export const PDF_VIEW_CUSTOMER_API_RESPONSE = "Pdf-View-Customer-Api-Response"

//supplier pdf
export const GENERATE_SUPPLIER_SUMMARY_PDF_API_CALL = 'Generate-Supplier-Summary-PDF-API-Call'
export const GENERATE_SUPPLIER_SUMMARY_PDF_API_RESPONSE = 'Generate-Supplier-Summary-PDF-API-Response'


export const RESET_CUSTOMER_LISTS = 'Reset-Customer-List'

export const RESET_VALUES = 'RESET_VALUES'
export const ERROR_CODE = 'Error-Code'
export const ERROR_CODE_RESET = 150
export const ERROR_CODE_FAILURE = 180
export const SUCCESS_CODE_NO = 100
export const SUCCESS_CODE = 'SUCCESS-CODE'

export const RESET_INVOICE_CODE = 'Reset-Invoice-Code'
export const RESET_CODE = 'Reset-Status-Code'


export const KEY_IS_LOGGED_IN = "loggedIn"
export const KEY_USER_ID = "userId"
export const KEY_ROLE_ID = 'uerRoleId'
export const KEY_Role_NAME = 'userRoleName'

//Reset Password
export const RESET_PASSWORD_API_RESPONSE = 'Reset-Password-API-Response'
export const RESET_PASSWORD_API_CALL = 'Reset-Password-API-Call'


export const storeToLocalStorage = (key, inputText) => {

    const excryptedText = CryptoJS.AES.encrypt(inputText.toString(), 'h&t').toString();

    localStorage.setItem(key, excryptedText.toString())
}

export const getFromLocalStorage = (key) => {
    
    const localStorageItem = localStorage.getItem(key) || null;
    
    if (localStorageItem) {
        const decryptedData = CryptoJS.AES.decrypt(localStorageItem, 'h&t');
        const decryptedString = decryptedData.toString(CryptoJS.enc.Utf8);
        return decryptedString;
    }

    

    return null;
}