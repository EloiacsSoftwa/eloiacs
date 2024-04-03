import { AxiosConfig } from "../../Networking/AxiosConfig";

export const Login = (bodyData) => {
    return AxiosConfig.post('/v2/account/login', bodyData)
}   

export const Register = (paramsData) => {
    return AxiosConfig.post('/v2/account/register', '', {
        params: paramsData
    })
}

export const SearchCustomersById = (id) => {
    return AxiosConfig.get(`v2/customer/getCustomerDetails/${id}`)
}

export const GetLoggedUserDetails = (id) => {
    return AxiosConfig.get(`v2/getUserDetails/${id}`)
}

export const ResetPassword = (data) => {
    return AxiosConfig.post('v2/account/reset-password', data)
}