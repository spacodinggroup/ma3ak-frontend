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

interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}

export const sendStudentMessage = async (messages: Message[]) => {
    try {
        const res = await api.post("/student/chat", { messages });

        const data = res.data;

        // SAFE AI RESPONSE PARSING (Strict Hierarchy)
        const reply =
            typeof data?.reply === "string" ? data.reply
                : typeof data?.message === "string" ? data.message
                    : typeof data?.data?.reply === "string" ? data.data.reply
                        : "The AI is temporarily unavailable.";

        return { reply };

    } catch (error) {
        console.error("Student Chat Error (Swallowed):", error);
        return { reply: "The AI is temporarily unavailable." };
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