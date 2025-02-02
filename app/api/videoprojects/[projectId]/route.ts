
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';



export async function GET(
  req: Request,
  { params }: any
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const projectId = params.projectId;
    
    // Get user from database
    const user = await prisma.user.findUnique({
      where: { clerkId }
    });

    console.log(user);

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Get all videos for the project
    const videos = await prisma.video.findMany({
      where: {
        projectId,
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(videos);
  } catch (error) {
    console.error('[VIDEOS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: any
) {
  try {
    const { userId: clerkId } = await auth();
    if (!clerkId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const projectId = params.projectId;
    const body = await req.json();
    const { taskId } = body;

    // Get user from database
    const user = await prisma.user.findUnique({
      where: {
        clerkId: clerkId
      }
    });

    if (!user) {
      return new NextResponse('User not found', { status: 404 });
    }

    // Update project
    const project = await prisma.project.update({
      where: {
        id: projectId,
        userId: user.id, // Ensure the project belongs to the user
      },
      data: {
       taskId
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('[PROJECTS_PATCH]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}