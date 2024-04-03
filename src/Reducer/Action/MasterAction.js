import { AxiosConfig } from "../../Networking/AxiosConfig"

export const MasterApiCall = () => {
    return AxiosConfig.get('/v2/common/getmaster')
}