import OpenAI from "openai"

export function createNvidiaClient() {
	const apiKey = process.env.NVIDIA_API_KEY
	if (!apiKey) return null

	return new OpenAI({
		apiKey,
		baseURL: "https://integrate.api.nvidia.com/v1",
	})
}

export const NVIDIA_MODEL = "nvidia/nemotron-3-ultra-550b-a55b"

export const defaultParams = {
	temperature: 0.7,
	top_p: 0.95,
	max_tokens: 4096,
}
