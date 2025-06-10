import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/services",
})

axiosInstance.interceptors.request.use(async (config) => {
    const auth = getAuth();
    const user = auth.currentUser;


    if(user){
        const token = user.accessToken;
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default axiosInstance