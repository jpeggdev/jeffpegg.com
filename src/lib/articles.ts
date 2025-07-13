import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string;
  status: 'draft' | 'published';
  readTime: number;
};

const articlesDirectory = path.join(process.cwd(), 'src/content/articles');

export function getAllArticles(): Article[] {
  const fileNames = fs.readdirSync(articlesDirectory);
  const articles: Article[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith('.md')) continue;
    
    const filePath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const id = fileName.replace(/\.md$/, '');
    
    articles.push({
      id,
      title: data.title || '',
      excerpt: data.excerpt || '',
      content,
      tags: data.tags || [],
      publishedAt: data.publishedAt || '',
      status: data.status || 'draft',
      readTime: data.readTime || 0,
    });
  }

  return articles;
}

export function getPublishedArticles(): Article[] {
  return getAllArticles()
    .filter(article => article.status === 'published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getArticleById(id: string): Article | undefined {
  return getAllArticles().find(article => article.id === id);
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter(article => 
    article.status === 'published' && 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}