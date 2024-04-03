import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Navbar from "./components/Navbar";
import Customer from "./components/customer/Customer";
import CustomerForm from "./components/customer/CustomerForm";
import Vendor from "./components/vendors/Vendors";
import Product from "./components/product/Product";
import Invoice from "./components/invoice/Invoice";
import Purchase from "./components/purchase/Purchase";
import NewPurchase from "./components/purchase/Index";
import NewInvoice from "./components/invoice/NewInvoice";
import Expense from "./components/expense/Expense";
import NewExpense from "./components/expense/NewExpense";
import { useSelector, useDispatch } from "react-redux";
import VendorForm from "./components/vendors/Vendorform";
import SupplierPay from "./components/payment/SupplierPay";
import Customerpay from "./components/payment/Customerpay";
import Payment from "./components/payment/Payment";
import Receipt from "./components/payment/Receipt";
import VendorDetails from "./components/vendors/VendorDetails";
import Viewinvoice from "./components/invoice/Viewinvoice";

import {
  KEY_IS_LOGGED_IN,
  KEY_USER_ID,
  storeToLocalStorage,
  getFromLocalStorage,
  UPDATE_USER_ID_LOCALLY,
  SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL,
  GET_LOGGED_USER_DETAILS_API_CALL,
} from "./utils/Constant";

import "./App.css";
import Employee from "./components/employee/Employee";
import CustomerDetails from "./components/customer/CustomerDetails";
import Report from "./components/Report/Report";
import Desgination from "./components/desgination/Desgination";
import ExpenseCategory from "./components/expenseCategory/ExpenseCategory";
import Vehicle from "./components/vehicle/Vehicle";
import SoaCustomer from "./components/Report/SoaCustomer";
import ProfitLoss from "./components/Report/ProfitLoss";
import SoaSuplier from "./components/Report/SoaSuplier";
import ViewPurchase from "./components/purchase/ViewPurchase";
import SOAcustomerList from "./components/Report/SOAcustomerList";
import SOAsupplierList from "./components/Report/SOAsupplierList";
import ProductView from "./components/Report/ProductView";
import NewVehicleInvoice from "./components/vehicle/NewVehicleInvoice";
import VehicleInvoice from "./components/vehicle/VehicleInvoice";
import DraftInvoice from "./components/draftInvoice/DraftInvoice";
import VehicleView from "./components/vehicle/VehicleView";
import ResetPassword from "./components/login/ResetPassword";


function App() {
  const state = useSelector((state) => state);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(state)

  const dispatch = useDispatch();

  const getValuesFromLocalStorage = async () => {
    const isLogged = await getFromLocalStorage(KEY_IS_LOGGED_IN);
    const userId = await getFromLocalStorage(KEY_USER_ID);

    console.log(isLogged)
    if (isLogged === 'true') {
      setIsLoggedIn(true)
      dispatch({
        type: UPDATE_USER_ID_LOCALLY,
        payload: parseInt(getFromLocalStorage(KEY_USER_ID)),
      });
      dispatch({
        type: GET_LOGGED_USER_DETAILS_API_CALL,
        data: { id: userId },
      });
      // dispatch({type: SEARCH_CUSTOMER_BY_CUSTOMERS_ID_CALL, data: {id: getFromLocalStorage(KEY_USER_ID)}})
    }
    else {
      setIsLoggedIn(false)
    }
  }

  useEffect(() => {
    getValuesFromLocalStorage();
  }, []);

  useEffect(() => {
    if (state.users.isLoggedIn) {
      storeToLocalStorage(KEY_IS_LOGGED_IN, true);
      storeToLocalStorage(KEY_USER_ID, state.users.loginId);
    }
    else {
      setIsLoggedIn(false)
    }
    
  }, [state.users.isLoggedIn]);

  return (
    <BrowserRouter>
      {state.users.isLoggedIn || isLoggedIn ? (
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Customer />
              </>
            }
          />
          <Route
            path="/SoaCustomer"
            element={
              <>
                <Navbar />
                <SoaCustomer />
              </>
            }
          />
          <Route
            path="/ProfitLoss"
            element={
              <>
                <Navbar />
                <ProfitLoss />
              </>
            }
          />
          <Route
            path="/SoaSuplier"
            element={
              <>
                <Navbar />
                <SoaSuplier />
              </>
            }
          />
          <Route
            path="/CustomerForm"
            element={
              <>
                <Navbar />
                <CustomerForm />
              </>
            }
          />
          <Route
            path="/customer-details"
            element={
              <>
                <Navbar />
                <CustomerDetails />
              </>
            }
          />

          <Route
            path="/vendor-details"
            element={
              <>
                <Navbar />
                <VendorDetails />
              </>
            }
          />

          <Route
            path="/Purchase"
            element={
              <>
                <Navbar />
                <Purchase />
              </>
            }
          />
          <Route
            path="/CustomerForm"
            element={
              <>
                <Navbar />
                <CustomerForm />
              </>
            }
          />
          <Route
            path="/Vendor"
            element={
              <>
                <Navbar />
                <Vendor />
              </>
            }
          />
          <Route
            path="/Expense"
            element={
              <>
                <Navbar />
                <Expense />
              </>
            }
          />
          <Route
            path="/NewExpense"
            element={
              <>
                <Navbar />
                <NewExpense />
              </>
            }
          />
          <Route
            path="/Vendor"
            element={
              <>
                <Navbar />
                <Vendor />
              </>
            }
          />
          <Route
            path="/Product"
            element={
              <>
                <Navbar />
                <Product />
              </>
            }
          />
          <Route
            path="/Purchase"
            element={
              <>
                <Navbar />
                <Purchase />
              </>
            }
          />

          <Route
            path="/Purchaseorder"
            element={
              <>
                <Navbar />
                <NewPurchase />
              </>
            }
          />

          <Route
            path="/Invoice"
            element={
              <>
                <Navbar /> <Invoice />
              </>
            }
          />

          <Route
            path="/NewInvoice"
            element={
              <>
                <Navbar /> <NewInvoice />{" "}
              </>
            }
          />
          <Route
            path="/VendorForm"
            element={
              <>
                <Navbar /> <VendorForm />
              </>
            }
          />
          <Route
            path="/Customerpay"
            element={
              <>
                <Navbar />
                <Customerpay />
              </>
            }
          />
          <Route
            path="/SupplierPay"
            element={
              <>
                <Navbar />
                <SupplierPay />
              </>
            }
          />
          <Route
            path="/Receipt"
            element={
              <>
                <Navbar />
                <Receipt />
              </>
            }
          />
          <Route
            path="/Payment"
            element={
              <>
                <Navbar />
                <Payment />
              </>
            }
          />

          <Route
            path="/Employee"
            element={
              <>
                <Navbar /> <Employee />
              </>
            }
          />
          <Route
            path="/Desgination"
            element={
              <>
                <Navbar /> <Desgination />
              </>
            }
          />
          <Route
            path="/ExpenseCategory"
            element={
              <>
                <Navbar />
                <ExpenseCategory />
              </>
            }
          />
          <Route
            path="/Vehicle"
            element={
              <>
                <Navbar />
                <Vehicle />{" "}
              </>
            }
          />
          <Route
            path="/VehicleInvoice"
            element={
              <>
                <Navbar />
                <VehicleInvoice />
              </>
            }
          />
          <Route
            path="/New-VehicleInvoice"
            element={
              <>
                <Navbar />
                <NewVehicleInvoice />
              </>
            }
          />
          <Route
            path="/view-invoice"
            element={
              <>
                <Navbar />
                <Viewinvoice />{" "}
              </>
            }
          />
          <Route
            path="/view-purchase"
            element={
              <>
                <Navbar />
                <ViewPurchase />
              </>
            }
          />
          <Route
            path="/Report"
            element={
              <>
                <Navbar /> <Report />
              </>
            }
          />
          <Route
            path="/SOAcustomerList"
            element={
              <>
                <Navbar />
                <SOAcustomerList />
              </>
            }
          />
          <Route
            path="/SOAsupplierList"
            element={
              <>
                <Navbar />
                <SOAsupplierList />
              </>
            }
          />
          <Route
            path="/ProductView"
            element={
              <>
                <Navbar />
                <ProductView />
              </>
            }
          />
          <Route path="/draftInvoice" element={<> <Navbar /> <DraftInvoice /> </>} />
          <Route path="/viewVehicleInvoice" element={<><Navbar/> <VehicleView /></>} />
          <Route path="/ResetPassword" element={<><ResetPassword /></>} />
          {/* <Route
            path="/*"
            element={
              <>
                <Navbar /> <Customer />
              </>
            }
          /> */}
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="*" element={<Navigate to='/' replace />}/>
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
