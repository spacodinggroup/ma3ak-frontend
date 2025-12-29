import { api } from "./api";

interface Message {
    role: "system" | "user" | "assistant";
    content: string;
}

export const generateAI = async (payload: {
    messages: Message[];
    provider?: "OPENAI" | "GROK";
}) => {
    try {
        // Send messages array to backend
        const res = await api.post("/ai/chat", {
            messages: payload.messages,
            provider: payload.provider || "OPENAI"
        });

        const data = res.data;

        // SAFE AI RESPONSE PARSING (Strict Hierarchy)
        const reply =
            typeof data?.reply === "string" ? data.reply
                : typeof data?.message === "string" ? data.message
                    : typeof data?.data?.reply === "string" ? data.data.reply
                        : "The AI is temporarily unavailable.";

        return { reply };

    } catch (error) {
        console.error("AI Generation Error (Swallowed):", error);
        return { reply: "The AI is temporarily unavailable." };
    }
};