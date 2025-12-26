import { api } from "./api";

export const getBusinessDashboard = async () => {
    const res = await api.get("/business/dashboard");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessAnalytics = async () => {
    const res = await api.get("/business/analytics");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessCalendar = async () => {
    const res = await api.get("/business/calendar");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessContent = async () => {
    const res = await api.get("/business/content");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessCustomers = async () => {
    const res = await api.get("/business/customers");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessGoals = async () => {
    const res = await api.get("/business/goals");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessMarketing = async () => {
    const res = await api.get("/business/marketing");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessReports = async () => {
    const res = await api.get("/business/reports");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessSales = async () => {
    const res = await api.get("/business/sales");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getBusinessSettings = async () => {
    const res = await api.get("/business/settings");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const updateBusinessSettings = async (payload) => {
    const res = await api.put("/business/settings", payload);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};