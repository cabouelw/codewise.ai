#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const BLOG_DIR = path.join(__dirname, '../src/content/blog');

const QUALITY_THRESHOLD = {
  minWords: 700,
  minDescriptionLength: 120,
  minTags: 2,
};

function countWords(content) {
  return content.split(/\s+/).filter(Boolean).length;
}

function hasStrongStructure(content) {
  const hasSectionHeading = /(^|\n)##\s+/.test(content);
  const hasList = /(^|\n)([-*]\s+|\d+\.\s+)/m.test(content);
  const hasCodeBlock = content.includes('```') || /(^|\n)~~~/.test(content);
  return hasSectionHeading && (hasList || hasCodeBlock);
}

function isStrongPost(data, content) {
  if (data && data.featured === true) {
    return true;
  }

  const wordCount = countWords(content);
  const description = typeof data.description === 'string' ? data.description.trim() : '';
  const tags = Array.isArray(data.tags) ? data.tags : [];

  return (
    wordCount >= QUALITY_THRESHOLD.minWords &&
    description.length >= QUALITY_THRESHOLD.minDescriptionLength &&
    tags.length >= QUALITY_THRESHOLD.minTags &&
    hasStrongStructure(content)
  );
}

function processPosts() {
  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));
  const updated = [];
  const reviewed = [];
  const noindexed = [];

  for (const file of files) {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const parsed = matter(raw);
    const { data, content } = parsed;

    const strong = isStrongPost(data, content);

    const nextData = { ...data };

    if (strong) {
      nextData.editorialReviewed = true;
      delete nextData.noindex;
      reviewed.push(file);
    } else {
      nextData.noindex = true;
      delete nextData.editorialReviewed;
      noindexed.push(file);
    }

    const changed = JSON.stringify(data) !== JSON.stringify(nextData);
    if (changed) {
      const next = matter.stringify(content, nextData);
      fs.writeFileSync(fullPath, next, 'utf8');
      updated.push(file);
    }
  }

  return { total: files.length, updated, reviewed, noindexed };
}

function main() {
  const result = processPosts();
  console.log('Quality tagging complete.');
  console.log(`Total posts: ${result.total}`);
  console.log(`Updated posts: ${result.updated.length}`);
  console.log(`Editorial reviewed: ${result.reviewed.length}`);
  console.log(`Noindex: ${result.noindexed.length}`);

  console.log('\nEditorial reviewed files:');
  result.reviewed.forEach((file) => console.log(`- ${file}`));

  console.log('\nNoindex files:');
  result.noindexed.forEach((file) => console.log(`- ${file}`));
}

main();
