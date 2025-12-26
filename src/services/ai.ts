import { Provider } from "@radix-ui/react-toast";
import { api } from "./api";

export const generateAI = async (payload: {
    tool:string;
    prompt: string;
    provider?: "OPENAI" | "GROK";
}) => {
    const res = await api.post("/ai/generate", {
        provider: payload.provider || "OPENAI",
        tool: payload.tool,
        prompt: payload.prompt,
    });
    if (!res.data.success) throw new Error(res.data.message);
    return res.data.data;
};