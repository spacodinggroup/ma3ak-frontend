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

export const saveStudentSubjects = async (subjects: string[]) => {
    const payload = { subjects: Array.isArray(subjects) ? subjects : [] };

    try {
        const res = await api.post("/student/subjects", payload);
        if (!res.data?.success) throw new Error(res.data?.message || "Failed to save subjects");
        return res.data.data;
    } catch (error: any) {
        const status = error?.response?.status;
        if (status === 404 || status === 405) {
            try {
                const res = await api.put("/student/subjects", payload);
                if (!res.data?.success) throw new Error(res.data?.message || "Failed to save subjects");
                return res.data.data;
            } catch (putError: any) {
                const putStatus = putError?.response?.status;
                if (putStatus === 404 || putStatus === 405) {
                    const res = await api.post("/student/save-subjects", payload);
                    if (!res.data?.success) throw new Error(res.data?.message || "Failed to save subjects");
                    return res.data.data;
                }
                throw putError;
            }
        }
        throw error;
    }
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

    } catch (error: any) {
        console.error("Student Chat Error:", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status
        });
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

export const submitStudentExamAttempt = async (payload: any) => {
    try {
        const res = await api.post("/student/exams/attempt", payload);
        return res.data;
    } catch (error: any) {
        const status = error?.response?.status;
        if (status === 404 || status === 405) return { success: false };
        return { success: false };
    }
};

export const getStudentPractice = async () => {
    const res = await api.get("/student/practice");
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};

export const submitStudentPracticeAttempt = async (payload: any) => {
    try {
        const res = await api.post("/student/practice/attempt", payload);
        return res.data;
    } catch (error: any) {
        const status = error?.response?.status;
        if (status === 404 || status === 405) return { success: false };
        return { success: false };
    }
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

// AI Study Plan Generation
export interface StudyPlanItem {
    subject: string;
    date: string;
    tasks: string[];
}

export const generateAIStudyPlan = async (payload: { subjects: string[] }) => {
    try {
        const res = await api.post("/ai/study-plan", { subjects: payload.subjects });

        const data = res.data;

        // Safe parsing of study plan array
        const studyPlan = Array.isArray(data?.studyPlan)
            ? data.studyPlan
            : Array.isArray(data?.data?.studyPlan)
                ? data.data.studyPlan
                : [];

        return { studyPlan };

    } catch (error: any) {
        console.error("AI Study Plan Error:", {
            message: error?.message,
            response: error?.response?.data,
            status: error?.response?.status
        });
        return { studyPlan: [] };
    }
};