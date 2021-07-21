import axios from 'axios';

const axiosConfig = {
    // TODO: acá se coloca la url del servidor
    baseURL: "/"
}

const axiosInstance = axios.create(axiosConfig);

// axiosInstance.interceptors.request.use(
//     config => {
//         const token = window.accessToken ? window.accessToken : 'dummy-token';
//         config.headers['Authorization'] = `Bearer ${token}`;
//         return config;
//     },
//     error => {
//         Promise.reject(error);
//     }
// );


axiosInstance.interceptors.response.use(
    // proceso la respuesta para retornar directamente el objeto
    response => response.data,
    error => Promise.reject(error)
);

export default axiosInstance