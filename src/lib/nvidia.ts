type NvidiaMessage = {
	role: "system" | "user" | "assistant"
	content: string
}

type NvidiaChatCompletionRequest = {
	model: string
	messages: NvidiaMessage[]
	max_tokens?: number
	temperature?: number
	top_p?: number
	[key: string]: unknown
}

type NvidiaChatCompletionResponse = {
	choices: Array<{
		message?: {
			content?: string
		}
	}>
	usage?: {
		prompt_tokens?: number
		completion_tokens?: number
		total_tokens?: number
	}
	[key: string]: unknown
}

function createNvidiaApiError(status: number, body: string) {
	return new Error(`NVIDIA API Error (${status}): ${body}`)
}

class NvidiaClient {
	private readonly baseURL = "https://integrate.api.nvidia.com/v1"
	private readonly apiKey: string

	constructor(apiKey: string) {
		this.apiKey = apiKey
	}

	chat = {
		completions: {
			create: async (payload: NvidiaChatCompletionRequest): Promise<NvidiaChatCompletionResponse> => {
				const response = await fetch(`${this.baseURL}/chat/completions`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.apiKey}`,
					},
					body: JSON.stringify(payload),
				})

				if (!response.ok) {
					const errorBody = await response.text()
					throw createNvidiaApiError(response.status, errorBody)
				}

				return (await response.json()) as NvidiaChatCompletionResponse
			},
		},
	}
}

export function createNvidiaClient() {
	const apiKey = process.env.NVIDIA_API_KEY
	if (!apiKey) return null

	return new NvidiaClient(apiKey)
}

export const NVIDIA_MODEL = "nvidia/nemotron-3-ultra-550b-a55b"

export const defaultParams = {
	temperature: 0.7,
	top_p: 0.95,
	max_tokens: 4096,
}
