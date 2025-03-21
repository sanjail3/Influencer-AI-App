// app/api/videos/route.ts
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';


export async function POST(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const { projectId, title, description, blobUrl, status } = body;

   

    const user = await prisma.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    

 
    const video = await prisma.video.create({
      data: {
        title,
        description,
        blobUrl,
        status,
        user: { connect: { id: user.id } },
        project: { connect: { id: projectId } }
      }
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('[VIDEOS_POST]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}


export async function PATCH(req: Request) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await req.json();
    const {videoId, projectId, status,blobUrl } = body;

   

    const user = await prisma.user.findUnique({
      where: { clerkId }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { credits: { decrement: 5 } }
    });

    if (!projectId) {
       return new NextResponse('User not found', { status: 404 });
  }

    const video = await prisma.video.update({
      where: { id: videoId }, 
      data: {
        status,
        blobUrl
      }
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error('[VIDEOS_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
