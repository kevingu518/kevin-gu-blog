import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request, { params }) {
  // 直接解構 params，因為在 API Route 中它不是 Promise
  const { slug } = params;

  try {
    const article = await prisma.article.findUnique({
      where: { slug },
    });

    if (!article) {
      return NextResponse.json({ error: '文章未找到' }, { status: 404 });
    }

    return NextResponse.json(article);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: '伺服器錯誤' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


