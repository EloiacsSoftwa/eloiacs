import { combineReducers } from "redux";
import UserReducer from './UserReducer';
import CustomersReducer  from "./CustomersReducer";
import ProductReducer from "./ProductReducer";
import MasterReducer from "./MasterReducer";
import PurchaseOrderReducer from "./PurchaseOrderReducer";
import InvoiceReducer from "./InvoiceReducer";
import ReceiptReducer from "./ReceiptReducer";
import PaymentReducer from './PaymentReducer';
import CommonReducer from "./CommonReducer";
import ReportReducer from './ReportReducer';
import ExpenseReducer from "./ExpenseReducer";
import VehicleReducer from "./VechicleReducer";

const RootReducer = combineReducers({
    users: UserReducer,
    customers: CustomersReducer,
    masterData: MasterReducer,
    productsData: ProductReducer,
    purchaseOrder: PurchaseOrderReducer,
    invoice: InvoiceReducer,
    receipt: ReceiptReducer,
    payment: PaymentReducer,
    commonReducer: CommonReducer,
    report: ReportReducer,
    expense: ExpenseReducer,
    Vehicle: VehicleReducer 
})

export default RootReducer;