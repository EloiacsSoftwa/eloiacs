import { all } from "redux-saga/effects";
import LoginSaga from "./LoginSaga";
import CustomersSaga from "./CustomersSaga";
import MasterSaga from "./MasterSaga";
import ProductSaga from "./ProductSaga";
import PurchaseOrderSaga from "./PurchaseOrderSaga";
import InvoiceSaga from "./InvoiceSaga";
import ReceiptSaga from "./ReceiptSaga";
import PaymentSaga from './PaymentSaga'
import ReportSaga from "./ReportSaga";
import ExpenseSaga from "./ExpenseSaga";
import Vehiclesaga from "./VehicleSaga";

function* RootSaga() {
    yield all([
        LoginSaga(),
        CustomersSaga(),
        MasterSaga(),
        ProductSaga(),
        PurchaseOrderSaga(),
        InvoiceSaga(),
        ReceiptSaga(),
        PaymentSaga(),
        ReportSaga(),
        ExpenseSaga(),
        Vehiclesaga()
    ])
}

export default RootSaga;