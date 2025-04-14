'use client';

import { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import './article.scss';

export default function Page({ params }) {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${params.slug}`);
        const data = await res.json();
        if (res.ok) {
          setArticle(data);
        } else {
          setArticle({ title: '文章未找到', content: '# 文章未找到\n請檢查 URL。' });
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        setArticle({ title: '錯誤', content: '# 伺服器錯誤\n請稍後再試。' });
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [params.slug]);

  if (loading) {
    return <div>載入中...</div>;
  }
  return (
    <div className="article-container">
      <h1>{article.title}</h1>
      <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{article.content}</ReactMarkdown>
    </div>
  );
}