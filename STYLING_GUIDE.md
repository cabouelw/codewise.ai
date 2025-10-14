# Markdown & Code Styling Guide

## 🎨 Overview

Your blog posts now feature **beautiful Tailwind Typography styling** with **stunning code block highlighting** powered by Prism.js. Every element has been carefully designed for optimal readability and visual appeal.

---

## ✨ Features Implemented

### 1. **Tailwind Typography Integration**

- Clean, readable typography with optimal line heights
- Properly spaced headings with visual hierarchy
- Styled lists, blockquotes, and tables
- Responsive font sizes that scale beautifully
- Professional prose styling

### 2. **Prism.js Code Highlighting**

- Beautiful syntax highlighting with 20+ colors
- Dark theme with gradient background
- Language badges on code blocks
- Copy-to-clipboard buttons
- Smooth hover effects
- Line number support (optional)
- Scrollbar styling

### 3. **Enhanced Components**

- External link indicators with icons
- Blockquotes with decorative elements
- Hover effects on tables
- Image captions and shadows
- Styled inline code
- Heading anchor scrolling

---

## 🎯 Supported Languages

The syntax highlighting supports all major programming languages:

- **JavaScript** / TypeScript
- **Python**
- **Bash** / Shell
- **JSON**
- **HTML** / CSS
- **React** / JSX
- **Markdown**
- **SQL**
- **And many more...**

---

## 📝 Markdown Elements

### Headings

All headings have proper hierarchy and spacing:

```markdown
# H1 - Main Title (with bottom border)

## H2 - Section Heading (with bottom border)

### H3 - Subsection

#### H4 - Sub-subsection

##### H5 - Minor heading

###### H6 - Smallest heading
```

**Styling Features:**

- Scroll margin for anchor links
- Bottom borders on H1 and H2
- Bold font weights
- Optimized spacing

---

### Paragraphs

```markdown
This is a regular paragraph with optimized line height for readability.
```

**Features:**

- 1.75 line height
- 1.25em spacing between paragraphs
- Clean gray color (#334155)

---

### Links

```markdown
[Regular link](https://example.com)
[External link](https://github.com) ← Shows external icon
```

**Features:**

- Blue color (#3b82f6)
- Underline with custom offset
- Hover effects
- External link indicator icon
- Font weight: 500

---

### Lists

```markdown
**Unordered:**

- Item one
- Item two
  - Nested item

**Ordered:**

1. First item
2. Second item
3. Third item
```

**Features:**

- Proper indentation
- Colored markers
- Vertical spacing
- Support for nested lists

---

### Blockquotes

```markdown
> This is an important quote or callout.
> It can span multiple lines.
```

**Features:**

- Blue left border (4px)
- Gradient background
- Decorative quote bubble
- Italic text
- Rounded corners
- Shadow effect

---

### Code Blocks

````markdown
```javascript
// Beautiful syntax highlighting!
function greet(name) {
	console.log(`Hello, ${name}!`)
}

greet("World")
```
````

**Features:**

- ✅ Syntax highlighting with 20+ colors
- ✅ Dark gradient background
- ✅ Language badge (top-right)
- ✅ Copy button (top-right)
- ✅ Line numbers (optional)
- ✅ Smooth scrollbar
- ✅ Box shadow
- ✅ Rounded corners

**Color Scheme:**

- Comments: `#64748b` (gray, italic)
- Strings: `#86efac` (green)
- Keywords: `#c084fc` (purple)
- Functions: `#fbbf24` (yellow)
- Numbers: `#f472b6` (pink)
- Operators: `#60a5fa` (blue)
- Variables: `#fb923c` (orange)

---

### Inline Code

```markdown
Use `inline code` for commands like `npm install`.
```

**Features:**

- Pink color (`#ec4899`)
- Light pink background
- Border with matching color
- Rounded corners
- Monospace font (Fira Code)

---

### Tables

```markdown
| Feature | Status | Notes               |
| ------- | ------ | ------------------- |
| MDX     | ✅     | Fully supported     |
| Prism   | ✅     | Syntax highlighting |
| Copy    | ✅     | One-click copy      |
```

**Features:**

- Hover effects on rows
- Header styling
- Border styling
- Shadow effect
- Rounded corners
- Responsive overflow scroll

---

### Images

```markdown
![Alt text](/images/example.jpg)
```

**Features:**

- Rounded corners (0.75rem)
- Box shadow
- Lazy loading
- Figure captions (from alt text)
- Responsive sizing
- Border styling

---

### Horizontal Rules

```markdown
---
```

**Features:**

- 2px border
- Gray color
- 3em spacing above/below

---

## 🎨 Color Palette

### Typography Colors

- **Headings**: `#0f172a` (slate-900)
- **Body**: `#334155` (slate-700)
- **Muted**: `#64748b` (slate-500)
- **Links**: `#3b82f6` (blue-500)

### Code Block Colors

- **Background**: Gradient from `#1e293b` to `#0f172a`
- **Text**: `#e4e4e7` (zinc-200)
- **Comments**: `#64748b` (slate-500)
- **Strings**: `#86efac` (green-300)
- **Keywords**: `#c084fc` (purple-400)
- **Functions**: `#fbbf24` (amber-400)
- **Numbers**: `#f472b6` (pink-400)

### UI Elements

- **Blockquote Border**: `#3b82f6` (blue-500)
- **Blockquote BG**: `#eff6ff` (blue-50)
- **Inline Code**: `#ec4899` on `#fdf2f8` (pink)
- **Table Header**: `#f1f5f9` (slate-100)

---

## 💡 Best Practices

### 1. **Code Examples**

Always specify the language for proper highlighting:

````markdown
```javascript ← Specify language
const example = true
```
````

### 2. **Blockquotes**

Use for important callouts and quotes:

```markdown
> **Tip:** This is a helpful tip for readers!
```

### 3. **Headings**

Follow proper hierarchy (don't skip levels):

```markdown
## Main Section

### Subsection

#### Detail

❌ Don't:

## Main Section

#### Detail (skipped H3)
```

### 4. **Links**

Write descriptive anchor text:

```markdown
✅ Check out the [complete MDX documentation](https://mdxjs.com)
❌ Click [here](https://mdxjs.com) for docs
```

### 5. **Lists**

Use consistent formatting:

```markdown
- Start with capital letter
- End without period (for short items)
- Use periods for complete sentences.
```

### 6. **Images**

Always include descriptive alt text:

```markdown
![Screenshot of the dashboard showing analytics](image.jpg)
```

---

## 🔧 Customization

### Modify Color Scheme

Edit `/src/app/globals.css` and update the token colors:

```css
.token.keyword {
	color: #c084fc; /* Change this color */
}
```

### Adjust Typography

Edit the prose styles in `globals.css`:

```css
.prose :where(p):not(:where([class~="not-prose"] *)) {
	font-size: 1.125rem; /* Adjust size */
	line-height: 1.75; /* Adjust spacing */
}
```

### Custom Components

Add more custom components in `MarkdownRenderer.tsx`:

```typescript
const components = {
	// Your custom component
	YourComponent: (props: any) => <div className="your-custom-styles">{props.children}</div>,
	// ... rest
}
```

---

## 📦 Installed Packages

These packages power the styling:

```json
{
	"@tailwindcss/typography": "^0.5.19",
	"rehype-prism-plus": "^2.0.1",
	"remark-gfm": "^4.0.1"
}
```

---

## ✅ Features Summary

| Feature                   | Status | Description                   |
| ------------------------- | ------ | ----------------------------- |
| Tailwind Typography       | ✅     | Professional prose styling    |
| Prism Syntax Highlighting | ✅     | 20+ language support          |
| Copy Code Button          | ✅     | One-click copy functionality  |
| Language Badges           | ✅     | Auto-detection and display    |
| External Link Icons       | ✅     | Automatic external indicators |
| Blockquote Styling        | ✅     | Beautiful callout boxes       |
| Table Hover Effects       | ✅     | Interactive tables            |
| Image Captions            | ✅     | Auto-generated from alt text  |
| Responsive Design         | ✅     | Mobile-friendly styling       |
| Dark Code Theme           | ✅     | Easy on the eyes              |
| Custom Scrollbars         | ✅     | Styled code block scrolling   |
| Smooth Animations         | ✅     | Copy button feedback          |

---

## 🎬 Examples in Action

### JavaScript Example

```javascript
// Beautiful syntax highlighting
import React, { useState } from "react"

function Counter() {
	const [count, setCount] = useState(0)

	return (
		<div>
			<p>Count: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	)
}
```

### Python Example

```python
# Clean, readable code
def fibonacci(n):
    """Generate Fibonacci sequence"""
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Calculate the 10th number
result = fibonacci(10)
print(f"Result: {result}")
```

### Bash Example

```bash
# Terminal commands are highlighted too
npm install next-mdx-remote
npm run build
npm start
```

---

## 🚀 Performance

All styling is optimized for performance:

- **CSS-based**: No JavaScript for styling
- **No Runtime Cost**: Prism processes at build time
- **Optimized Bundle**: Tree-shaken code
- **Fast Rendering**: Efficient CSS selectors
- **Cached Assets**: Static CSS files

---

## 🎯 Accessibility

Styling includes accessibility features:

- ✅ High contrast ratios (WCAG AA compliant)
- ✅ Focus indicators on interactive elements
- ✅ Semantic HTML structure
- ✅ Screen reader friendly
- ✅ Keyboard navigation support
- ✅ Sufficient font sizes

---

## 📱 Responsive Design

All elements are responsive:

- **Mobile**: Optimized font sizes and spacing
- **Tablet**: Comfortable reading experience
- **Desktop**: Full-width prose with max-width
- **Code Blocks**: Horizontal scroll on overflow
- **Tables**: Responsive overflow containers

---

## 🔍 Browser Support

Styling works in all modern browsers:

- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🎉 Quick Reference

### Most Used Styles

````markdown
# Heading → Bold, large, bottom border

**Bold text** → Heavy font weight
_Italic text_ → Slanted text
`inline code` → Pink background, monospace
[Link](url) → Blue, underlined

> Quote → Blue border, gradient background

```language
Code block → Syntax highlighted
```
````

| Table | → Hover effects, styled headers
![Image](url) → Rounded, shadow, caption

```

---

## 💬 Tips & Tricks

1. **Use Language Tags**: Always specify language for code blocks
2. **Descriptive Alt Text**: Improves SEO and accessibility
3. **Break Long Code**: Split into smaller, focused examples
4. **Highlight Key Points**: Use blockquotes for important info
5. **Test Responsively**: Check on mobile devices
6. **Consistent Formatting**: Follow markdown best practices

---

## 📚 Resources

- [Tailwind Typography Docs](https://tailwindcss.com/docs/typography-plugin)
- [Prism.js Documentation](https://prismjs.com/)
- [MDX Documentation](https://mdxjs.com/)
- [Markdown Guide](https://www.markdownguide.org/)

---

**Your blog posts now look amazing! 🎨✨**

*Last Updated: October 2025*
```
