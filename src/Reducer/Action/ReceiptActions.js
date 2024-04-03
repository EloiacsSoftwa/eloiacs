import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllReceipt = (data) => {
    return AxiosConfig.post('/v2/payment/getAllReceipts',data)
}

export const GenerateRecepitPdf = (data) => {
    return AxiosConfig.post('/v2/pdf/generateReceipt', {
        requestId: data
    })
}