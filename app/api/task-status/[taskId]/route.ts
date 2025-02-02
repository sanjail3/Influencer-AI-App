// pages/api/task-status/[taskId].ts
import { NextApiRequest, NextApiResponse } from 'next';

// app/api/task-status/[taskId]/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET(
  req: Request,
  { params }: any
) {
  try {
    const taskId = params.taskId;

    const taskStatus = await fetch(
      `${process.env.API_URL}/api/task-status/${taskId}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await taskStatus.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('[TASK_STATUS_GET]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}


// export async function GET(
//   req: Request,
//   { params }: any
// ) {
//   try {
    
//     const taskId= params.taskId;
    
    

    

    

//     return NextResponse.json(videos);
//   } catch (error) {
//     console.error(error, error);
//     return new NextResponse('Internal Error', { status: 500 });
//   }
// }