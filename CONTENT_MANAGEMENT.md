# Content Management Guide for codewise-ai.vercel.app

This guide explains how to add and manage content on codewise-ai.vercel.app, including blog posts and tools.

## 📝 Adding a New Blog Post

### Step 1: Create MDX File

1. Navigate to `src/content/blog/`
2. Create a new `.mdx` file (e.g., `my-new-post.mdx`)
3. The filename will become the URL slug (e.g., `codewise-ai.vercel.app/blog/my-new-post`)

### Step 2: Add Frontmatter

Start your MDX file with YAML frontmatter containing metadata:

```mdx
---
title: "Your Amazing Blog Post Title"
description: "A concise summary of your blog post (150-160 characters for SEO)"
date: "2025-01-15"
author: "Your Name"
image: "/images/blog/your-post-image.jpg"
tags: ["AI", "Development", "Tutorial"]
category: "Tutorials"
featured: true
---

# Your content starts here...
```

### Step 3: Write Content

Write your content in MDX (Markdown + JSX):

```mdx
## Introduction

Your introduction paragraph here...

### Key Points

- Point 1
- Point 2
- Point 3

## Code Examples

\`\`\`javascript
// Your code with syntax highlighting
function example() {
return "Hello, World!"
}
\`\`\`

### Inline Code

You can use `inline code` like this.

> **Tip:** Use blockquotes for important callouts!

## Conclusion

Wrap up your post...
```

### Frontmatter Fields Reference

| Field         | Type    | Required | Description                                             |
| ------------- | ------- | -------- | ------------------------------------------------------- |
| `title`       | string  | Yes      | The post title (appears in H1 and meta tags)            |
| `description` | string  | Yes      | Brief summary for SEO and previews                      |
| `date`        | string  | Yes      | Publication date (YYYY-MM-DD format)                    |
| `author`      | string  | Yes      | Author name                                             |
| `image`       | string  | Yes      | Featured image path (relative to public/)               |
| `tags`        | array   | Yes      | Array of relevant tags for categorization               |
| `category`    | string  | Yes      | Primary category (e.g., "Tutorials", "News", "Opinion") |
| `featured`    | boolean | No       | Set to `true` to feature this post                      |

### Best Practices for Blog Posts

1. **SEO-Friendly Titles**: Keep titles under 60 characters
2. **Meta Descriptions**: Write descriptions between 150-160 characters
3. **Images**: Use high-quality images (1200x630px recommended)
4. **Reading Time**: Will be calculated automatically based on word count
5. **Code Blocks**: Use triple backticks with language identifier for syntax highlighting
6. **Headings**: Use H2 (`##`) for main sections, H3 (`###`) for subsections
7. **Links**: Use descriptive anchor text for better accessibility

---

## 🛠️ Adding a New Tool

### Step 1: Edit tools.json

1. Open `src/data/tools.json`
2. Add a new tool object to the `tools` array

### Step 2: Tool Object Structure

```json
{
	"id": "unique-tool-id",
	"name": "Tool Name",
	"slug": "tool-name",
	"category": "Category Name",
	"description": "Short description (1-2 sentences)",
	"longDescription": "Detailed description explaining what the tool does, who it's for, and why it's useful. Can be multiple paragraphs.",
	"icon": "🔧",
	"aiBased": true,
	"url": "https://example.com",
	"pricing": "Free / Premium",
	"features": ["Feature 1", "Feature 2", "Feature 3"],
	"tags": ["tag1", "tag2", "tag3"],
	"image": "/images/tools/tool-name.jpg",
	"featured": false
}
```

### Tool Fields Reference

| Field             | Type    | Required | Description                                         |
| ----------------- | ------- | -------- | --------------------------------------------------- |
| `id`              | string  | Yes      | Unique identifier (use kebab-case)                  |
| `name`            | string  | Yes      | Tool display name                                   |
| `slug`            | string  | Yes      | URL-friendly name (should match id)                 |
| `category`        | string  | Yes      | Tool category (e.g., "AI Assistant", "Code Editor") |
| `description`     | string  | Yes      | Brief description for cards and previews            |
| `longDescription` | string  | Yes      | Detailed description for tool page                  |
| `icon`            | string  | Yes      | Emoji icon (displays on cards and pages)            |
| `aiBased`         | boolean | Yes      | Whether the tool uses AI/ML                         |
| `url`             | string  | Yes      | Official website URL                                |
| `pricing`         | string  | Yes      | Pricing model (e.g., "Free", "Freemium", "$10/mo")  |
| `features`        | array   | Yes      | List of key features (3-8 items recommended)        |
| `tags`            | array   | Yes      | Relevant tags for search and filtering              |
| `image`           | string  | Yes      | Tool screenshot or logo (1200x630px)                |
| `featured`        | boolean | Yes      | Show in featured section (set max 6)                |

### Example Tool Entry

```json
{
	"id": "github-copilot",
	"name": "GitHub Copilot",
	"slug": "github-copilot",
	"category": "AI Assistant",
	"description": "AI-powered code completion that suggests entire lines or blocks of code as you type.",
	"longDescription": "GitHub Copilot is an AI pair programmer that helps you write code faster. It draws context from your code and comments, suggesting whole lines or entire functions. Trained on billions of lines of public code, Copilot supports dozens of languages and frameworks.",
	"icon": "🤖",
	"aiBased": true,
	"url": "https://github.com/features/copilot",
	"pricing": "Free for students / $10/mo",
	"features": [
		"Context-aware code suggestions",
		"Multi-language support",
		"Learns your coding style",
		"Integrated with VS Code and IDEs"
	],
	"tags": ["AI", "autocomplete", "productivity", "coding-assistant"],
	"image": "/images/tools/github-copilot.jpg",
	"featured": true
}
```

---

## 🎨 Adding Images

### Blog Post Images

1. Place images in `public/images/blog/`
2. Reference in frontmatter: `image: "/images/blog/my-image.jpg"`
3. Recommended size: 1200x630px (16:9 aspect ratio)
4. Optimize images before upload (use tools like TinyPNG)

### Tool Images

1. Place images in `public/images/tools/`
2. Reference in tools.json: `"image": "/images/tools/tool-name.jpg"`
3. Recommended size: 1200x630px
4. Use high-quality screenshots or official logos

---

## 🔧 Development Workflow

### Running the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to preview your changes.

### Building for Production

```bash
npm run build
```

This will:

1. Build the Next.js application
2. Generate static pages for all blog posts and tools
3. Create `sitemap.xml` and `robots.txt` automatically

### Testing Your Changes

1. **Blog Post**: Navigate to `http://localhost:3000/blog/your-slug`
2. **Tool**: Navigate to `http://localhost:3000/tools/your-slug`
3. **Check SEO**: Use browser dev tools to inspect meta tags

---

## 📊 SEO Best Practices

### Automatic SEO Features

The site automatically generates:

- ✅ Meta titles and descriptions
- ✅ Open Graph tags (for social media sharing)
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Structured data
- ✅ Sitemap.xml
- ✅ Robots.txt

### Manual SEO Optimization

1. **Titles**: Keep under 60 characters
2. **Descriptions**: 150-160 characters
3. **Images**: Include descriptive alt text
4. **URLs**: Use clear, descriptive slugs
5. **Keywords**: Include in title, description, and tags
6. **Internal Links**: Link to related content

---

## 🚀 Publishing Workflow

### Before Publishing

- [ ] Check all frontmatter fields are filled
- [ ] Verify images load correctly
- [ ] Test links are working
- [ ] Preview on mobile and desktop
- [ ] Run spell check
- [ ] Verify code examples work

### Publishing Steps

1. Commit your changes to Git
2. Push to your repository
3. Deploy (automatic with Vercel/Netlify)
4. Verify live site

### After Publishing

- Share on social media (use ShareButtons component)
- Monitor analytics for traffic
- Respond to comments/feedback
- Update content if needed

---

## 🧩 Advanced Features

### Syntax Highlighting

Code blocks automatically get syntax highlighting:

\`\`\`javascript
// JavaScript example
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

\`\`\`python

# Python example

def greet():
print("Hello, World!")
\`\`\`

Supported languages: JavaScript, TypeScript, Python, Bash, JSON, Markdown, and more.

### Markdown Features

- **Bold text**: `**bold**`
- _Italic text_: `*italic*`
- `Inline code`: `` `code` ``
- Links: `[text](url)`
- Images: `![alt](url)`
- Lists: Use `-` or `1.`
- Blockquotes: Use `>`
- Tables: Use pipe syntax

### Related Content

Related posts and tools are automatically generated based on:

- Matching categories (+5 points for tools, +3 for posts)
- Shared tags (+1 point per tag)
- AI-based status for tools (+2 points)

---

## 🆘 Troubleshooting

### Blog Post Not Showing

1. Check filename ends with `.mdx`
2. Verify frontmatter is valid YAML
3. Ensure all required fields are present
4. Check for MDX syntax errors
5. Restart dev server: `Ctrl+C` then `npm run dev`

### Tool Not Appearing

1. Verify JSON syntax is valid (no trailing commas)
2. Check all required fields are present
3. Ensure slug is unique
4. Verify image path is correct
5. Restart dev server

### Images Not Loading

1. Check file path starts with `/`
2. Verify image exists in `public/` directory
3. Check file extension matches actual file
4. Try clearing browser cache
5. Check image file permissions

### Build Errors

1. Run `npm run lint` to check for errors
2. Verify all imports are correct
3. Check for TypeScript type errors
4. Ensure all required packages are installed
5. Delete `.next` folder and rebuild

---

## 📚 Additional Resources

- [MDX Documentation](https://mdxjs.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

---

## 📞 Need Help?

If you encounter issues:

1. Check this guide first
2. Review the example blog posts and tools
3. Consult the Next.js and MDX documentation
4. Check browser console for errors
5. Verify your Node.js version is 18.17 or higher

---

_Last Updated: January 2025_
