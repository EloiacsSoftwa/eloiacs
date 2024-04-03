import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetPaymentSummaryApiCall = (data) => {
    
    return AxiosConfig.post('/v2/payment/getPaymentSummary', {
       customerId: data.customerId
    })
}


export const AddCustomerPayment = (data) => {
    return AxiosConfig.post('/v2/payment/addReceipt', data)
}

export const GetAllPayments = (data) => {
    return AxiosConfig.post('/v2/payment/getAllPayments',data)
}

export const AddSupplierPayment = (data) => {
    return AxiosConfig.post('/v2/payment/addPayment', data)
}

export const GenerateSupplierPdf = (data) => {
    return AxiosConfig.post('/v2/pdf/generateBill', {
        requestId: data
    })
}
