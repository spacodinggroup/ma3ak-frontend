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

        // 1. Try extracting direct reply (most likely path)
        const directReply = res?.data?.reply;
        if (typeof directReply === 'string' && directReply.trim().length > 0) {
            return { reply: directReply };
        }

        // 2. Try extracting nested reply (legacy/data path)
        const nestedReply = res?.data?.data?.reply;
        if (typeof nestedReply === 'string' && nestedReply.trim().length > 0) {
            return { reply: nestedReply };
        }

        // 3. Fallback if structure is oddly successful but empty
        if (res?.status === 200) {
            console.warn("AI returned 200 but no recognized reply field:", res.data);
            return { reply: "I processed your request, but I couldn't generate a text response." };
        }

        return { reply: "I received a response, but it was not in the expected format." };

    } catch (error) {
        console.error("AI Generation Error (Swallowed):", error);
        // SAFELY swallow the error and return a friendly message
        return { reply: "I'm sorry, I'm having trouble connecting to my brain right now. Please try asking again in a moment." };
    }
};