import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
 
export const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("Ma3ak_ai_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401 responses by logging out
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token is invalid or expired, logout
            localStorage.removeItem("Ma3ak_ai_user");
            localStorage.removeItem("Ma3ak_ai_token");
            window.location.href = "/login"; // Redirect to login
        }
        return Promise.reject(error);
    }
);