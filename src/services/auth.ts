import { api } from "./api";

export const LoginRequest = (email: string, password: string) => {
    return api.post("/auth/login", { email, password }).then(res => {
        if (!res.data.success) throw new Error(res.data.message);
        return res.data.data;
    });
};

export const registerRequest = (payload: any) => {
    return api.post("/auth/register", payload).then(res => {
        if (!res.data.success) throw new Error(res.data.message);
        return res.data.data;
    });
};