import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllInvoiceRequest = () => {
    return AxiosConfig.post("/v2/invoice/getInvoices");
}

export const CreateInvoice = (data) => {
  return AxiosConfig.post("/v2/invoice/createInvoice", data);
};

export const UpdateDraftedInvoice = (data) => {
  console.log(data)
  return AxiosConfig.post('/v2/invoice/updateInvoice', data)
}

export const GenerateInvoicePdfApi = (invoiceId) => {
  if (invoiceId) {
    return AxiosConfig.get('/v2/pdf/generateInvoice', {
      params: {
        invoiceId: invoiceId
      }
    })
  }
  return null;
}

export const GetInvoiceDetails = (invoiceId) => {
  return AxiosConfig.post('v2/invoice/getInvoiceDetails', invoiceId)
}