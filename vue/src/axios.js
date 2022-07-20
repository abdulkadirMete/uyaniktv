import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${sessionStorage.getItem("TOKEN")}`;
    return config;
});

// axiosClient.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response.status === 401) {
//             sessionStorage.removeItem("TOKEN");
//             router.push({ name: "Login" });
//         } else if (error.response.status === 404) {
//             //there isn't a user
//         }
//         throw error;
//     }
// );

export default axiosClient;
