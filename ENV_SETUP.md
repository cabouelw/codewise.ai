# 🔧 Environment Setup Guide

## Overview

This guide explains how to configure your environment variables for the Codewise.ai AI Tools Platform.

---

## Required Environment Variables

### 1. OpenAI API Key (Required for AI Features)

To enable the AI-powered tools (Summarizer, Paraphraser, Email Writer, Code Explainer), you need an OpenAI API key.

#### Getting Your OpenAI API Key:

1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Click **"Create new secret key"**
5. Copy the generated key (it will only be shown once!)

#### Setting Up the API Key:

1. Create a `.env.local` file in the root directory of the project:

```bash
touch .env.local
```

2. Add your OpenAI API key:

```env
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

⚠️ **Important**: Never commit your `.env.local` file to version control! It's already included in `.gitignore`.

---

### 2. Site URL (For Production)

Set your production site URL for proper SEO and sitemap generation.

```env
SITE_URL=https://codewise.ai
```

---

## Environment Variables Reference

| Variable         | Required              | Default               | Description                      |
| ---------------- | --------------------- | --------------------- | -------------------------------- |
| `OPENAI_API_KEY` | Yes (for AI features) | -                     | Your OpenAI API key for AI tools |
| `SITE_URL`       | No                    | `https://codewise.ai` | Your production site URL         |

---

## Development Without OpenAI API Key

The application includes mock responses for development purposes. If you don't have an OpenAI API key:

✅ **What works:**

- All UI components and navigation
- Form submissions
- Mock AI responses with placeholder text
- All animations and interactions

⚠️ **What doesn't work:**

- Real AI-generated content
- Accurate summarization, paraphrasing, etc.

The app will show a warning badge "⚠️ Mock Response" when using mock data.

---

## Testing Your Setup

### 1. Check if API Key is Loaded

Create a test file or check the console:

```typescript
console.log("API Key loaded:", !!process.env.OPENAI_API_KEY)
```

### 2. Test an API Route

Try accessing any tool (e.g., Summarizer) and check:

- If the tool returns a real AI response, your key is working ✅
- If you see "⚠️ Mock Response", your key is not configured

### 3. Check API Route Logs

API routes log when using mock responses:

```
⚠️  OpenAI API key not configured. Returning mock response.
```

---

## Production Deployment

### Vercel

1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add `OPENAI_API_KEY` with your key
4. Add `SITE_URL` with your production URL
5. Redeploy your application

### Other Platforms

Set environment variables according to your platform's documentation:

- **Netlify**: Site settings → Environment variables
- **Railway**: Project settings → Variables
- **Heroku**: Settings → Config Vars
- **DigitalOcean**: App settings → Environment

---

## Security Best Practices

### ✅ DO:

- Store API keys in environment variables
- Use `.env.local` for local development
- Add `.env.local` to `.gitignore`
- Rotate API keys periodically
- Use separate keys for development and production
- Monitor API usage on OpenAI dashboard

### ❌ DON'T:

- Hardcode API keys in your code
- Commit API keys to version control
- Share API keys publicly
- Use production keys in development
- Expose API keys in client-side code

---

## Troubleshooting

### Issue: "OpenAI API Error: 401 Unauthorized"

**Solution:**

- Check if your API key is correct
- Ensure no extra spaces in `.env.local`
- Restart your development server after adding the key

### Issue: "OpenAI API Error: 429 Rate Limit"

**Solution:**

- You've exceeded your OpenAI API quota
- Check your usage on the OpenAI dashboard
- Upgrade your OpenAI plan or wait for quota reset

### Issue: Mock responses always show up

**Solution:**

- Verify `.env.local` exists in the root directory
- Check that the variable name is exactly `OPENAI_API_KEY`
- Restart your development server: `npm run dev`

### Issue: API routes returning errors

**Solution:**

- Check the terminal/console for detailed error messages
- Verify your OpenAI account has available credits
- Test your API key with a simple curl request:

```bash
curl https://api.openai.com/v1/models \
  -H "Authorization: Bearer $OPENAI_API_KEY"
```

---

## Cost Estimation

Based on OpenAI pricing (as of 2024):

| Tool            | Model       | Approximate Cost    |
| --------------- | ----------- | ------------------- |
| Text Summarizer | gpt-4o-mini | ~$0.001 per request |
| Paraphraser     | gpt-4o-mini | ~$0.001 per request |
| Email Writer    | gpt-4o-mini | ~$0.002 per request |
| Code Explainer  | gpt-4o-mini | ~$0.002 per request |

💡 **Tip**: Start with the `gpt-4o-mini` model (already configured) for cost-effective development. Upgrade to `gpt-4` for better quality if needed.

---

## Support

For more help:

- OpenAI API Documentation: https://platform.openai.com/docs
- Next.js Environment Variables: https://nextjs.org/docs/app/building-your-application/configuring/environment-variables
- Codewise.ai GitHub Issues: (Add your repository URL)

---

✨ **Happy coding!**
