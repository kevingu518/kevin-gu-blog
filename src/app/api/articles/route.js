import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
export async function POST(request) {
    const { title, content, slug } = await request.json();
  
    try {
      const article = await prisma.article.create({
        data: { title, content, slug },
      });
      return new Response(JSON.stringify(article), { status: 201 });
    } catch (error) {
      console.error('Error creating article:', error);
      return new Response('Error creating article', { status: 500 });
    }
  }