# 📚 API Documentation

## Overview

This document describes the API endpoints for the Codewise.ai AI Tools Platform.

**Base URL**: `https://codewise.ai` (Production) or `http://localhost:3000` (Development)

All API endpoints are located under `/api/` and use the Edge Runtime for optimal performance.

---

## Authentication

Currently, the API endpoints do not require user authentication. They use server-side OpenAI API key authentication configured via environment variables.

⚠️ **Note**: In production, consider implementing rate limiting and API key authentication for public APIs.

---

## Common Response Format

### Success Response

```json
{
	"result": "...",
	"metadata": {
		/* tool-specific metadata */
	},
	"tokensUsed": 150,
	"mock": false
}
```

### Error Response

```json
{
	"error": "Error message describing what went wrong"
}
```

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request (validation error)
- `401`: Unauthorized (OpenAI API key issue)
- `429`: Rate Limit Exceeded
- `500`: Internal Server Error

---

## API Endpoints

### 1. Text Summarizer

**POST** `/api/summarize`

Condense long texts into concise summaries.

#### Request Body

```json
{
	"text": "Your long text here...",
	"length": "medium" // "short" | "medium" | "long"
}
```

#### Parameters

| Parameter | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| `text`    | string | Yes      | Text to summarize (50-10,000 chars) |
| `length`  | string | No       | Summary length (default: "medium")  |

#### Response

```json
{
	"summary": "Summarized text...",
	"originalLength": 1500,
	"summaryLength": 300,
	"compressionRatio": 20,
	"tokensUsed": 250,
	"mock": false
}
```

#### Example

```bash
curl -X POST http://localhost:3000/api/summarize \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Long article text here...",
    "length": "short"
  }'
```

#### Error Examples

```json
// Empty text
{
  "error": "Text is required and must be a string"
}

// Text too short
{
  "error": "Text must be at least 50 characters long"
}

// Text too long
{
  "error": "Text must be less than 10,000 characters"
}
```

---

### 2. AI Paraphraser

**POST** `/api/paraphrase`

Rewrite text while preserving meaning.

#### Request Body

```json
{
	"text": "Text to paraphrase...",
	"style": "professional" // "professional" | "casual" | "creative" | "simple" | "academic"
}
```

#### Parameters

| Parameter | Type   | Required | Description                             |
| --------- | ------ | -------- | --------------------------------------- |
| `text`    | string | Yes      | Text to paraphrase (10-5,000 chars)     |
| `style`   | string | No       | Writing style (default: "professional") |

#### Response

```json
{
	"paraphrase": "Rewritten text...",
	"style": "professional",
	"originalLength": 150,
	"newLength": 165,
	"tokensUsed": 200,
	"mock": false
}
```

#### Example

```bash
curl -X POST http://localhost:3000/api/paraphrase \
  -H "Content-Type: application/json" \
  -d '{
    "text": "The quick brown fox jumps over the lazy dog.",
    "style": "creative"
  }'
```

---

### 3. AI Email Writer

**POST** `/api/email-writer`

Generate professional emails from simple prompts.

#### Request Body

```json
{
	"prompt": "Request a meeting with client...",
	"tone": "professional", // "professional" | "friendly" | "formal" | "casual" | "persuasive"
	"type": "request" // "general" | "followup" | "introduction" | "request" | "thankyou" | "apology"
}
```

#### Parameters

| Parameter | Type   | Required | Description                          |
| --------- | ------ | -------- | ------------------------------------ |
| `prompt`  | string | Yes      | Email description (5-500 chars)      |
| `tone`    | string | No       | Email tone (default: "professional") |
| `type`    | string | No       | Email type (default: "general")      |

#### Response

```json
{
	"email": "Full email body...",
	"subject": "Email subject line",
	"tone": "professional",
	"type": "request",
	"wordCount": 125,
	"tokensUsed": 300,
	"mock": false
}
```

#### Example

```bash
curl -X POST http://localhost:3000/api/email-writer \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Thank the client for their business and ask for a referral",
    "tone": "friendly",
    "type": "thankyou"
  }'
```

---

### 4. AI Code Explainer

**POST** `/api/code-explainer`

Understand code snippets with detailed explanations.

#### Request Body

```json
{
	"code": "function example() { ... }",
	"language": "javascript", // "auto" | "javascript" | "python" | "java" | etc.
	"level": "beginner" // "beginner" | "intermediate" | "advanced"
}
```

#### Parameters

| Parameter  | Type   | Required | Description                             |
| ---------- | ------ | -------- | --------------------------------------- |
| `code`     | string | Yes      | Code to explain (5-5,000 chars)         |
| `language` | string | No       | Programming language (default: "auto")  |
| `level`    | string | No       | Explanation level (default: "beginner") |

#### Response

```json
{
	"explanation": "Full explanation with sections...",
	"detectedLanguage": "JavaScript",
	"complexity": "O(n)",
	"keyPoints": ["Point 1", "Point 2", "Point 3"],
	"level": "beginner",
	"codeLength": 250,
	"tokensUsed": 400,
	"mock": false
}
```

#### Example

```bash
curl -X POST http://localhost:3000/api/code-explainer \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const arr = [1,2,3].map(x => x * 2);",
    "language": "javascript",
    "level": "intermediate"
  }'
```

---

## Rate Limiting

### Current Implementation

No rate limiting is currently implemented. For production, consider:

- User-based rate limiting
- IP-based rate limiting
- API key authentication
- Usage quotas

### Recommended Limits

```typescript
// Example with next-rate-limit
const limiter = rateLimit({
	interval: 60 * 1000, // 1 minute
	uniqueTokenPerInterval: 500,
})

// In your API route:
await limiter.check(10, "CACHE_TOKEN") // 10 requests per minute
```

---

## Error Handling

### OpenAI API Errors

#### 401 Unauthorized

```json
{
	"error": "OpenAI API Error: Incorrect API key provided"
}
```

**Solution**: Check your `OPENAI_API_KEY` environment variable.

#### 429 Rate Limit

```json
{
	"error": "OpenAI API Error: Rate limit exceeded"
}
```

**Solution**: Wait or upgrade your OpenAI plan.

#### 503 Service Unavailable

```json
{
	"error": "OpenAI API Error: The server is overloaded"
}
```

**Solution**: Retry with exponential backoff.

---

## Mock Mode

When `OPENAI_API_KEY` is not configured, the API returns mock responses for development.

### Identifying Mock Responses

```json
{
	"result": "...",
	"mock": true // This flag indicates a mock response
}
```

### Mock Response Characteristics

- Instant response (no API delay)
- Simplified/placeholder content
- Always includes `"mock": true` flag
- Logs warning in server console

---

## Best Practices

### 1. Input Validation

Always validate user input before sending to API:

```typescript
// Client-side validation
if (text.length < 50) {
	toast.error("Text must be at least 50 characters")
	return
}

if (text.length > 10000) {
	toast.error("Text too long (max 10,000 characters)")
	return
}
```

### 2. Error Handling

```typescript
try {
	const response = await fetch("/api/summarize", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ text }),
	})

	const data = await response.json()

	if (!response.ok) {
		throw new Error(data.error || "Request failed")
	}

	// Handle success
} catch (error) {
	// Handle error
	console.error(error)
}
```

### 3. Loading States

```typescript
const [isLoading, setIsLoading] = useState(false)

const handleSubmit = async () => {
	setIsLoading(true)
	try {
		// API call
	} finally {
		setIsLoading(false)
	}
}
```

### 4. User Feedback

```typescript
import toast from "react-hot-toast"

// Success
toast.success("Text summarized successfully!")

// Error
toast.error("Failed to summarize text")

// Warning (for mock responses)
toast("Using mock response", { icon: "⚠️" })
```

---

## Testing

### Unit Testing API Routes

```typescript
import { POST } from "@/app/api/summarize/route"

describe("POST /api/summarize", () => {
	it("should summarize text", async () => {
		const request = new Request("http://localhost:3000/api/summarize", {
			method: "POST",
			body: JSON.stringify({
				text: "Long text here...",
				length: "short",
			}),
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(200)
		expect(data.summary).toBeDefined()
	})

	it("should return error for invalid input", async () => {
		const request = new Request("http://localhost:3000/api/summarize", {
			method: "POST",
			body: JSON.stringify({ text: "Too short" }),
		})

		const response = await POST(request)
		const data = await response.json()

		expect(response.status).toBe(400)
		expect(data.error).toBeDefined()
	})
})
```

### Integration Testing

```typescript
// Test with real API (requires OpenAI API key)
test("Summarize with real API", async () => {
	const response = await fetch("http://localhost:3000/api/summarize", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			text: "Your long test text here...",
			length: "medium",
		}),
	})

	expect(response.status).toBe(200)
	const data = await response.json()
	expect(data.mock).toBe(false)
	expect(data.summary).toBeDefined()
})
```

---

## TypeScript Types

### Request Types

```typescript
// Summarizer
interface SummarizeRequest {
	text: string
	length?: "short" | "medium" | "long"
}

// Paraphraser
interface ParaphraseRequest {
	text: string
	style?: "professional" | "casual" | "creative" | "simple" | "academic"
}

// Email Writer
interface EmailWriterRequest {
	prompt: string
	tone?: "professional" | "friendly" | "formal" | "casual" | "persuasive"
	type?: "general" | "followup" | "introduction" | "request" | "thankyou" | "apology"
}

// Code Explainer
interface CodeExplainerRequest {
	code: string
	language?: string
	level?: "beginner" | "intermediate" | "advanced"
}
```

### Response Types

```typescript
interface SummarizeResponse {
	summary: string
	originalLength: number
	summaryLength: number
	compressionRatio: number
	tokensUsed?: number
	mock?: boolean
}

interface ErrorResponse {
	error: string
}
```

---

## Support

For API issues or questions:

- Check server logs for detailed error messages
- Verify environment variables are configured
- Test with mock mode first
- Review OpenAI API status: https://status.openai.com/

---

✨ **Happy integrating!**
