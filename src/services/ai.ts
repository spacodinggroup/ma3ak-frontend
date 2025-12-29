import { Provider } from "@radix-ui/react-toast";
import { api } from "./api";

export const generateAI = async (payload: {
    tool: string;
    prompt: string;
    provider?: "OPENAI" | "GROK";
}) => {
    try {
        const res = await api.post("/ai/generate", {
            provider: payload.provider || "OPENAI",
            tool: payload.tool,
            prompt: payload.prompt,
        });

        if (!res.data.success) throw new Error(res.data.message);

        const data = res.data.data;
        // Ensure data is an object and has a reply property
        if (typeof data === 'object' && data !== null && 'reply' in data) {
            return { reply: String(data.reply) };
        }

        // Fallback if data structure is unexpected but request succeeded
        return { reply: "I received a response, but it was not in the expected format." };
    } catch (error) {
        console.error("AI Generation Error:", error);
        return { reply: "I'm sorry, I encountered an error determining the response. Please try again." };
    }
};