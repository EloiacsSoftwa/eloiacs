import axios from "axios";

const AxiosConfig = axios.create({
        baseURL: 'https://admin.llca.in/', 
        headers: {
            "Content-Type": "application/json",
        }
    })

export {AxiosConfig};
