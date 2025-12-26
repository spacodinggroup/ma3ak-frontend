import { api } from "./api";

export const getStudentStats = async () => {
    const res = await api.get("/user/stats");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};