import { AxiosConfig } from "../../Networking/AxiosConfig";

export const GetAllProducts = () => {
    return AxiosConfig.post('v2/products/getProducts')
}

export const AddProducts = (bodyData) => {
    return AxiosConfig.post('v2/products/addProduct', bodyData)
}