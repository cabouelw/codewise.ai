#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');

// Load environment variables from .env file
require('dotenv').config({ path: path.join(__dirname, '../.env') });

/**
 * Automated Daily Blog Generator
 * Generates SEO-optimized blog posts using AI and saves them as MDX files
 */

// Configuration
const AI_API_ENDPOINT = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const BLOG_IMAGES_DIR = path.join(__dirname, '../public/images/blog');

// Topics for blog generation (you can customize this)
const TOPICS = [
  'AI development tools and best practices',
  'productivity tips for developers',
  'latest trends in web development',
  'software engineering best practices',
  'machine learning for beginners',
  'cloud computing and DevOps',
  'API design and architecture',
  'frontend frameworks comparison',
  'backend optimization techniques',
  'developer career growth tips'
];

/**
 * Make HTTP request to AI API
 */
function callAIAPI(prompt) {
  return new Promise((resolve, reject) => {
    const url = new URL(AI_API_ENDPOINT);
    const payload = JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a professional technical writer and blogger. Write comprehensive, well-structured blog posts in markdown format with proper headings, paragraphs, and formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          try {
            const response = JSON.parse(data);
            resolve(response);
          } catch (e) {
            reject(new Error(`Failed to parse AI response: ${e.message}`));
          }
        } else {
          reject(new Error(`AI API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (error) => {
      reject(new Error(`AI API request failed: ${error.message}`));
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Generate a slug from title
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

/**
 * Extract title from blog content
 * Looks for first heading or uses first sentence
 */
function extractTitle(content) {
  // Try to find # heading
  const headingMatch = content.match(/^#\s+(.+)$/m);
  if (headingMatch) {
    return headingMatch[1].trim();
  }

  // Try to find first sentence
  const firstSentence = content.split('\n\n')[0].split('.')[0];
  if (firstSentence && firstSentence.length > 10 && firstSentence.length < 100) {
    return firstSentence.trim();
  }

  // Fallback
  return 'Daily Tech Insights';
}

/**
 * Extract description from blog content
 * Uses first paragraph or first few sentences
 */
function extractDescription(content) {
  // Remove markdown headings
  const cleanContent = content.replace(/^#+\s+.+$/gm, '').trim();

  // Get first paragraph
  const firstParagraph = cleanContent.split('\n\n')[0];

  // Get first 2-3 sentences, max 160 chars
  const sentences = firstParagraph.split(/\.\s+/);
  let description = sentences[0];

  for (let i = 1; i < sentences.length && description.length < 140; i++) {
    description += '. ' + sentences[i];
  }

  // Ensure it ends with period and is within SEO limits
  description = description.trim();
  if (!description.endsWith('.')) {
    description += '.';
  }

  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }

  return description;
}

/**
 * Generate SVG image for blog post
 */
function generateBlogImageSVG(title, category = 'Development') {
  // Gradient colors based on category
  const gradients = {
    Development: { start: '#667eea', end: '#764ba2', accent: '#f093fb' },
    Tutorial: { start: '#4facfe', end: '#00f2fe', accent: '#43e97b' },
    AI: { start: '#fa709a', end: '#fee140', accent: '#30cfd0' },
    Technology: { start: '#a8edea', end: '#fed6e3', accent: '#667eea' },
    'Best Practices': { start: '#ff9a9e', end: '#fecfef', accent: '#ffecd2' },
  };

  const colors = gradients[category] || gradients.Development;

  // Split title into lines (max 50 chars per line)
  const words = title.split(' ');
  const lines = [];
  let currentLine = '';

  words.forEach((word) => {
    if ((currentLine + word).length > 50) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  });
  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  // Limit to 3 lines
  const displayLines = lines.slice(0, 3);
  if (lines.length > 3) {
    displayLines[2] = displayLines[2].substring(0, 47) + '...';
  }

  // Calculate vertical positioning
  const lineHeight = 80;
  const startY = 300 - (displayLines.length * lineHeight) / 2;

  // Generate text elements
  const textElements = displayLines
    .map((line, index) => {
      const y = startY + index * lineHeight;
      const escaped = line
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
      return `      <text x="50%" y="${y}" class="title-text">${escaped}</text>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${colors.start};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${colors.end};stop-opacity:1" />
    </linearGradient>
    
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:${colors.accent};stop-opacity:0.3" />
      <stop offset="100%" style="stop-color:${colors.accent};stop-opacity:0" />
    </linearGradient>
    
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <style>
      .title-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 64px;
        font-weight: 800;
        fill: white;
        text-anchor: middle;
        letter-spacing: -0.02em;
        filter: url(#glow);
      }
      
      .category-badge {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 24px;
        font-weight: 600;
        fill: white;
        text-anchor: middle;
        opacity: 0.9;
      }
      
      .logo-text {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        font-size: 32px;
        font-weight: 700;
        fill: white;
        opacity: 0.95;
      }
      
      .decorative-circle {
        opacity: 0.1;
      }
    </style>
  </defs>
  
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Decorative elements -->
  <circle cx="100" cy="100" r="150" class="decorative-circle" fill="white"/>
  <circle cx="1100" cy="530" r="200" class="decorative-circle" fill="white"/>
  <rect x="0" y="0" width="1200" height="8" fill="url(#accentGradient)"/>
  
  <!-- Category badge -->
  <rect x="500" y="80" width="${category.length * 16 + 40}" height="50" rx="25" fill="rgba(255,255,255,0.2)"/>
  <text x="600" y="114" class="category-badge">${category.replace(/[<>&"']/g, '')}</text>
  
  <!-- Title -->
  <g>
${textElements}
  </g>
  
  <!-- Logo/Branding -->
  <g transform="translate(50, 550)">
    <rect width="180" height="60" rx="30" fill="rgba(255,255,255,0.15)"/>
    <text x="90" y="42" class="logo-text" text-anchor="middle">CodeWise AI</text>
  </g>
  
  <!-- Decorative line -->
  <line x1="50" y1="500" x2="350" y2="500" stroke="rgba(255,255,255,0.3)" stroke-width="3" stroke-linecap="round"/>
</svg>`;
}

/**
 * Save blog image SVG
 */
function saveBlogImage(title, slug) {
  try {
    // Ensure images directory exists
    if (!fs.existsSync(BLOG_IMAGES_DIR)) {
      fs.mkdirSync(BLOG_IMAGES_DIR, { recursive: true });
    }

    const svgContent = generateBlogImageSVG(title, 'Development');
    const imageFilename = `${slug}.svg`;
    const imagePath = path.join(BLOG_IMAGES_DIR, imageFilename);

    fs.writeFileSync(imagePath, svgContent);
    console.log(`🖼️  Generated image: ${imageFilename}`);

    return `/images/blog/${imageFilename}`;
  } catch (error) {
    console.error('❌ Failed to generate image:', error.message);
    return '/images/blog/default-blog.svg'; // Fallback
  }
}

/**
 * Generate blog post content using AI
 */
async function generateBlogContent() {
  // Select random topic
  const topic = TOPICS[Math.floor(Math.random() * TOPICS.length)];

  const prompt = `Write a comprehensive, SEO-optimized blog post about "${topic}".

Requirements:
- 800-1000 words
- Include an engaging title as the first line (use # heading)
- Write in a professional but conversational tone
- Include practical examples and actionable tips
- Use markdown formatting with headers (##, ###), bullet points, and code blocks where appropriate
- Focus on providing real value to developers
- End with a brief conclusion
- Make it informative and engaging

Write the complete blog post:`;

  console.log(`🤖 Generating blog post about: ${topic}`);

  try {
    const response = await callAIAPI(prompt);

    // Extract content from OpenAI response
    let content = '';
    if (response.choices && response.choices[0] && response.choices[0].message) {
      content = response.choices[0].message.content;
    } else if (response.choices && response.choices[0] && response.choices[0].text) {
      content = response.choices[0].text;
    } else if (response.text) {
      content = response.text;
    } else if (response.content) {
      content = response.content;
    } else if (typeof response === 'string') {
      content = response;
    } else {
      throw new Error('Unexpected AI API response format');
    }

    return content.trim();
  } catch (error) {
    console.error('❌ Failed to generate blog content:', error.message);
    throw error;
  }
}

/**
 * Save blog post as MDX file
 */
function saveBlogPost(content) {
  const date = new Date();
  const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD

  // Extract title and description
  const title = extractTitle(content);
  const description = extractDescription(content);
  const slug = generateSlug(title);

  // Create filename without date
  const filename = `${slug}.mdx`;
  const filepath = path.join(BLOG_DIR, filename);

  // Check if file already exists
  if (fs.existsSync(filepath)) {
    console.log(`⚠️  Blog post already exists for today: ${filename}`);
    return { exists: true, filepath: null };
  }

  // Generate blog image
  const imagePath = saveBlogImage(title, slug);

  // Create frontmatter
  const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
description: "${description.replace(/"/g, '\\"')}"
date: "${dateString}"
author: "CodeWise AI Team"
image: "${imagePath}"
tags: ["AI", "Development", "Tutorial", "Best Practices"]
category: "Tutorials"
featured: false
readingTime: "8 min read"
---

`;

  // Remove title from content if it starts with # (since it's in frontmatter)
  let bodyContent = content.replace(/^#\s+.+$/m, '').trim();

  // Combine frontmatter and content
  const fullContent = frontmatter + bodyContent;

  // Ensure blog directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  // Write file
  fs.writeFileSync(filepath, fullContent, 'utf8');

  console.log(`✅ Blog post created: ${filename}`);
  console.log(`📝 Title: ${title}`);
  console.log(`📍 Path: ${filepath}`);

  return { exists: false, filepath, filename, title, description };
}

/**
 * Main execution function
 */
async function main() {
  console.log('🚀 Starting automated blog generation...\n');

  // Validate API key
  if (!OPENAI_API_KEY) {
    console.error('❌ Error: OPENAI_API_KEY environment variable is not set');
    console.error('Please set your OpenAI API key in .env file');
    process.exit(1);
  }

  try {
    // Generate blog content
    const content = await generateBlogContent();

    if (!content) {
      throw new Error('No content generated');
    }

    console.log(`\n📄 Generated ${content.length} characters of content\n`);

    // Save blog post
    const result = saveBlogPost(content);

    if (result.exists) {
      console.log('\n✨ No new blog post needed - one already exists for today');
      process.exit(0);
    }

    console.log('\n✨ Blog generation completed successfully!');
    console.log(`\n📢 New blog post ready to be published: ${result.filename}`);

  } catch (error) {
    console.error('\n❌ Error during blog generation:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { generateBlogContent, saveBlogPost, extractTitle, extractDescription };
