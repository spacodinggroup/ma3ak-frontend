import { api } from "./api";

export const getFounderDashboard = async () => {
    const res = await api.get("/founder/dashboard");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderMetrics = async () => {
    const res = await api.get("/founder/metrics");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderMilestones = async () => {
    const res = await api.get("/founder/milestones");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderOKRs = async () => {
    const res = await api.get("/founder/okrs");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderPitch = async () => {
    const res = await api.get("/founder/pitch");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderRoadmap = async () => {
    const res = await api.get("/founder/roadmap");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderSettings = async () => {
    const res = await api.get("/founder/settings");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const updateFounderSettings = async (payload) => {
    const res = await api.put("/founder/settings", payload);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderTeam = async () => {
    const res = await api.get("/founder/team");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderTech = async () => {
    const res = await api.get("/founder/tech");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getFounderValidate = async () => {
    const res = await api.get("/founder/validate");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};