# 🚀 Codewise.ai - Smart AI Tools for Developers

A modern, full-featured AI tools platform built with **Next.js 15**, **Tailwind CSS v4**, and **OpenAI**. Features 4 functional AI tools with beautiful UI, real-time processing, and comprehensive SEO optimization.

## ✨ Features

### 🤖 AI-Powered Tools

- **Text Summarizer**: Condense long texts into concise summaries
- **AI Paraphraser**: Rewrite text while preserving meaning
- **Email Writer**: Generate professional emails from prompts
- **Code Explainer**: Understand code with detailed explanations

### 🎨 User Experience

- 🎨 **Modern Design**: Clean, futuristic interface with light/dark mode support
- 📱 **Mobile-First**: Responsive design that works on all devices
- ⚡ **Performance**: Built with Next.js 15 App Router and Edge Runtime
- 🌙 **Dark Mode**: Smooth theme switching with system preference detection
- 🎭 **Animations**: Beautiful Framer Motion animations
- 📝 **TypeScript**: Full type safety throughout the application
- 🎯 **Accessibility**: WCAG compliant with proper semantic HTML

### 🔧 Developer Features

- 🔍 **SEO Optimized**: Dynamic metadata, sitemap, robots.txt
- 🚀 **API Routes**: 4 functional API endpoints with OpenAI integration
- 📦 **Component Library**: Reusable tool components
- 🎨 **Toast Notifications**: User feedback with react-hot-toast
- 💾 **Usage Tracking**: localStorage-based tool usage counters
- 🔄 **Mock Mode**: Works without API key for development
- 📚 **Documentation**: Comprehensive guides for adding tools

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router & Edge Runtime
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **AI**: OpenAI API (GPT-4o-mini)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **SEO**: next-seo, next-sitemap
- **Content**: MDX with syntax highlighting
- **Fonts**: Inter & Poppins from Google Fonts
- **Deployment**: Optimized for Vercel

## 📁 Project Structure

```
codewise/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/             # About page
│   │   ├── blog/              # Blog pages
│   │   │   └── [slug]/        # Dynamic blog post pages
│   │   ├── contact/           # Contact page
│   │   ├── privacy-policy/    # Privacy policy page
│   │   ├── tools/             # Tools pages
│   │   │   └── [slug]/        # Dynamic tool pages
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Homepage
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable components
│   │   ├── BlogCard.tsx       # Blog post card
│   │   ├── CategoryCard.tsx   # Category card
│   │   ├── Footer.tsx         # Site footer
│   │   ├── Header.tsx         # Site header
│   │   ├── HeroSection.tsx    # Homepage hero
│   │   ├── ScrollToTop.tsx    # Scroll to top button
│   │   ├── SEO.tsx            # SEO component
│   │   ├── ToolCard.tsx       # Tool card
│   │   └── theme-provider.tsx # Theme context
│   └── lib/
│       └── data.ts            # Sample data
├── public/                    # Static assets
├── tailwind.config.ts         # Tailwind configuration
├── next-sitemap.config.js     # Sitemap configuration
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key (optional for development - get one at https://platform.openai.com)

### Quick Start

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd codewise
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables** (Optional)

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` and add your OpenAI API key:

   ```env
   OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

   ⚠️ **Note**: The app works without an API key using mock responses. See [ENV_SETUP.md](./ENV_SETUP.md) for details.

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
npm run build
npm start
```

The build process automatically generates sitemap.xml and robots.txt.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production (includes sitemap generation)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postbuild` - Generate sitemap (runs automatically after build)

## 🤖 AI Tools

### 1. Text Summarizer (`/tools/summarizer`)

- **Purpose**: Condense long texts into concise summaries
- **Input**: Text (50-10,000 characters)
- **Options**: Short, Medium, or Long summaries
- **API**: `POST /api/summarize`

### 2. AI Paraphraser (`/tools/paraphraser`)

- **Purpose**: Rewrite text while preserving meaning
- **Input**: Text (10-5,000 characters)
- **Styles**: Professional, Casual, Creative, Simple, Academic
- **API**: `POST /api/paraphrase`

### 3. AI Email Writer (`/tools/email-writer`)

- **Purpose**: Generate professional emails from prompts
- **Input**: Prompt (5-500 characters)
- **Types**: General, Follow-up, Introduction, Request, Thank You, Apology
- **Tones**: Professional, Friendly, Formal, Casual, Persuasive
- **API**: `POST /api/email-writer`

### 4. AI Code Explainer (`/tools/code-explainer`)

- **Purpose**: Understand code with detailed explanations
- **Input**: Code snippet (5-5,000 characters)
- **Languages**: Auto-detect, JavaScript, Python, Java, C++, Go, Rust, etc.
- **Levels**: Beginner, Intermediate, Advanced
- **API**: `POST /api/code-explainer`

All tools include:

- ✨ Real-time AI processing
- 📋 Copy to clipboard
- 🔗 Share functionality
- 💾 Usage tracking
- 🎯 Mock mode for development
- 📊 Metadata (word count, compression ratio, etc.)

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation.

## 🎨 Design System

### Colors

- **Primary**: Sky Blue (#0EA5E9)
- **Dark**: Slate shades for dark mode
- **Light**: Clean whites and grays

### Typography

- **Body**: Inter font family
- **Display**: Poppins for headings and emphasis

### Components

- **Cards**: Consistent card design with hover effects
- **Buttons**: Primary, secondary, and ghost variants
- **Forms**: Accessible form controls
- **Navigation**: Sticky header with mobile drawer

## 📖 Pages Overview

### Homepage (`/`)

- Hero section with call-to-action
- Featured tools grid
- Category cards
- Latest blog posts
- Newsletter signup

### Tools (`/tools`)

- Searchable and filterable tool listing
- Tool categories
- Pagination support
- Individual tool pages (`/tools/[slug]`)

### Blog (`/blog`)

- Article listing with categories
- Featured posts
- Individual blog posts (`/blog/[slug]`)
- Reading time and metadata

### About (`/about`)

- Company mission and values
- Team information
- Contact call-to-action

### Contact (`/contact`)

- Contact form
- Multiple contact methods
- FAQ section

### Privacy Policy (`/privacy-policy`)

- Comprehensive privacy policy
- GDPR/CCPA compliance ready

## � Documentation

Comprehensive guides are available:

- **[ENV_SETUP.md](./ENV_SETUP.md)** - Environment variable configuration, API key setup, troubleshooting
- **[ADDING_NEW_TOOLS.md](./ADDING_NEW_TOOLS.md)** - Step-by-step guide to create new AI tools
- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - Complete API reference with examples

## �🔧 Customization

### Adding New Tools

See [ADDING_NEW_TOOLS.md](./ADDING_NEW_TOOLS.md) for a complete guide. Quick overview:

1. Create API route in `/src/app/api/[tool-name]/route.ts`
2. Create tool page in `/src/app/tools/[tool-name]/page.tsx`
3. Add SEO metadata in `/src/lib/seo.ts`
4. Update tools array in `/src/app/tools/page.tsx`
5. Create layout.tsx for metadata
6. Test and deploy

### Styling

- Modify `tailwind.config.ts` for design system changes
- Update `src/app/globals.css` for global styles
- Component-specific styles are in respective component files

### Content Management

Currently uses static data in `src/lib/data.ts`. For a production app, consider:

- Headless CMS (Contentful, Strapi, Sanity)
- Markdown files with frontmatter
- Database integration (Prisma + PostgreSQL)

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables if needed
4. Deploy!

### Other Platforms

The app is a standard Next.js application and can be deployed to:

- Netlify
- Railway
- AWS Amplify
- Docker containers

## ⚡ Performance

- **Lighthouse Score**: Optimized for 95+ scores
- **Image Optimization**: Next.js Image component
- **Bundle Splitting**: Automatic code splitting
- **Font Loading**: Optimized Google Fonts loading
- **CSS**: Purged and minimized Tailwind CSS

## 🔍 SEO Features

- Meta tags for all pages
- OpenGraph and Twitter Card support
- Structured data (JSON-LD)
- Sitemap generation
- Robots.txt
- Canonical URLs

## 🎯 Future Enhancements

- [ ] User authentication
- [ ] Tool favorites system
- [ ] Search with Algolia/ElasticSearch
- [ ] Analytics integration
- [ ] Newsletter subscription
- [ ] Tool submission form
- [ ] User reviews and ratings
- [ ] API integration for real-time data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support, email hello@codewise.ai or create an issue in the repository.

---

Built with ❤️ using Next.js and Tailwind CSS
# codewise.ai
