import axios from 'axios';
import { getAuth } from 'firebase/auth';

const axiosInstance = axios.create({
    baseURL: "https://a11server-iota.vercel.app/api",
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