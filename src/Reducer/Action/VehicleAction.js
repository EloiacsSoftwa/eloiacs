import { AxiosConfig } from "../../Networking/AxiosConfig";

export const addVehicle = (data) => {
    return AxiosConfig.post('/v2/vehicle/addVehicle', data)
}
export const GetAllVehicle = () => {
    return AxiosConfig.post('/v2/vehicle/getVehicles')
}
export const GetVehicleInvoiceList = (data) => {
    return AxiosConfig.post('/v2/income/getIncomeInvoices', data)
}
export const CreateVehicleInvoice = (data) => {
    return AxiosConfig.post('/v2/income/addIncome', data)
}

export const GetVehicleInvoiceDetails = (incomeOrderId) => {
    return AxiosConfig.post('/v2/income/getInvoiceDetails', incomeOrderId)
}