import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllPurchaseOrder = () => {
    return AxiosConfig.post('/v2/purchaseOrder/getPurchaseOrders');
}

export const CreatePurchaseOrder = (data) => {
    return AxiosConfig.post('/v2/purchaseOrder/createPurchaseOrder', data)
}

export const generatePoPDF = (data) => {
    const params = JSON.stringify({purchaseOrderId: data})
    return AxiosConfig.post('/v2/pdf/generatePOPdf', {
        requestOrderId: data.payload
    })
}

export const GetPurchaseOrderDetails = (purchaseId) => {
    return AxiosConfig.post('/v2/purchaseOrder/getPurchaseOrderDetails', purchaseId)
}