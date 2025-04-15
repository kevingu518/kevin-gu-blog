'use client';

import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useRouter } from 'next/navigation';

export default function NewArticlePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-'); // 簡單生成 slug
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, slug }),
    });

    if (response.ok) {
      router.push('/articles');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">新增文章</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">標題</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">內容</label>
          <MDEditor value={content} onChange={setContent} height={400} />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          儲存
        </button>
      </form>
    </div>
  );
}