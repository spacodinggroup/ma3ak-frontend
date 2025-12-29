import { api } from "./api";

export const getStudentDashboard = async () => {
    const res = await api.get("/student/dashboard");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentSubjects = async () => {
    const res = await api.get("/student/subjects");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const generateStudyPlan = async (payload) => {
    const res = await api.post("/student/generate-plan", payload);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentCourses = async () => {
    const res = await api.get("/student/courses");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const sendStudentMessage = async (message: string) => {
    try {
        const res = await api.post("/student/chat", { message });
        if (!res.data.success) throw new Error(res.data.message);

        const data = res.data.data;
        if (typeof data === 'object' && data !== null && 'reply' in data) {
            return { reply: String(data.reply) };
        }
        return { reply: "I received a response, but it was not in the expected format." };
    } catch (error) {
        console.error("Student Chat Error:", error);
        return { reply: "I'm sorry, I encountered an error connecting to your tutor. Please try again." };
    }
};

export const getStudentNotes = async () => {
    const res = await api.get("/student/notes");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentPlan = async () => {
    const res = await api.get("/student/plan");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentExams = async () => {
    const res = await api.get("/student/exams");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentPractice = async () => {
    const res = await api.get("/student/practice");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentProgress = async () => {
    const res = await api.get("/student/progress");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentSettings = async () => {
    const res = await api.get("/student/settings");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const updateStudentSettings = async (payload) => {
    const res = await api.put("/student/settings", payload);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const getStudentTimer = async () => {
    const res = await api.get("/student/timer");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const uploadStudentNote = async (fromData: FormData) => {
    const res = await api.post("/student/notes/upload", fromData);
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};