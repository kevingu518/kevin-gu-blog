import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter'
import rehypeHighlight from 'rehype-highlight';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

import { PrismaClient } from '@prisma/client';


import 'highlight.js/styles/github.css';
import './article.scss';

const prisma = new PrismaClient();


export default async function Page({ params }) {
  if (!params || !params.slug) {
    return <div>Invalid article slug</div>;
  }

  const article = await prisma.article.findUnique({
    where: { slug: params.slug },
  }).catch((error) => {
    console.error('Database error:', error);
    return null;
  }).finally(() => prisma.$disconnect());

  const displayArticle = article || {
    title: '文章未找到',
    content: '# 文章未找到\n請檢查 URL。',
  };

  // console.log('Rendering content:', displayArticle.content);
  return (
    <div className="article-container prose prose-pre:bg-gray-100 prose-code:bg-gray-100 prose-code:before:content-none prose-code:after:content-none max-w-none">
      <ReactMarkdown  rehypePlugins={[rehypeHighlight]}>{displayArticle.content.trim()}</ReactMarkdown>
    </div>
  );
}