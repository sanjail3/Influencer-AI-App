// app/api/subscription-plans/route.ts
import { prisma } from '@/lib/db';
import { syncPlans } from '@/lib/lemon-squeezy/actions';
import { SubscriptionPlan } from '@prisma/client';
import { NextResponse } from 'next/server';



export async function GET() {
  try {
    

    let allPlans: SubscriptionPlan[] =
        await prisma.subscriptionPlan.findMany();

    
    if (!allPlans.length) {
        allPlans = await syncPlans();
    }

    // if (!allPlans.length) {
    //     return <p>No plans available.</p>;
    // }
    return NextResponse.json(allPlans);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    );
  }
}