import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllCustomerInvoiceSummaryApiCall = () => {
    return AxiosConfig.post('/v2/reports/customerStatements');
}

export const GetAllSummaryApiCall = () => {
    return AxiosConfig.post('/v2/reports/getAllOrderSummary');
}

export const GetAllSupplierPaymentReportCall = () => {
    return AxiosConfig.post('/v2/reports/supplierStatements')
}

export const GetProductTypeBasedSummaryreports = () => {
    return AxiosConfig.post("/v2/reports/getAllProductTypeSummary")
}

export const GetInvoicesBasedOnProductTypes = (data) => {
    return AxiosConfig.post('/v2/reports/getReportsBasedOnProductType', data)
}

export const GetSoaCustomer = (requestId) => {
    return AxiosConfig.post('/v2/reports/customerSummary', requestId);
};

export const GetSoaSupplier = (requestId) =>{
    return AxiosConfig.post('/v2/reports/supplierSummary',requestId)
}
export const pdfViewsoacustomer = (data) =>{
    return AxiosConfig.post('/v2/pdf/getCustomerSummary',data)
}
export const GenerateSupplierSummaryPDF = (data) => {
    return AxiosConfig.post('/v2/pdf/getSupplierSummary', data)
}