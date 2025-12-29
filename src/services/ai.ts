import { Provider } from "@radix-ui/react-toast";
import { api } from "./api";

export const generateAI = async (payload: {
    tool: string;
    prompt: string;
    // provider is optional, backend handles default
    provider?: "OPENAI" | "GROK";
}) => {
    try {
        // Changed endpoint to /ai/chat to match requirements
        // Sending 'message' instead of 'prompt'
        const res = await api.post("/ai/chat", {
            message: payload.prompt,
            // Pass other metadata if needed by backend, e.g. tool/provider
            // keeping them just in case backend uses them for context
            tool: payload.tool,
            provider: payload.provider || "OPENAI"
        });

        const data = res.data;

        // 1. SAFE AI RESPONSE PARSING (Strict Hierarchy)
        const reply =
            typeof data?.reply === "string" ? data.reply
                : typeof data?.message === "string" ? data.message
                    : typeof data?.data?.reply === "string" ? data.data.reply
                        : "The AI is temporarily unavailable.";

        return { reply };

    } catch (error) {
        console.error("AI Generation Error (Swallowed):", error);
        // SAFELY swallow the error and return a friendly message
        return { reply: "The AI is temporarily unavailable." };
    }
};