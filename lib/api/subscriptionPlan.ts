// app/api/subscription-plans/route.ts
import { prisma } from '@/lib/db';
import { syncPlans } from '@/lib/lemon-squeezy/actions';
import { SubscriptionPlan } from '@prisma/client';
import { NextResponse } from 'next/server';



export async function get_subscription_plans() {
    try {
      console.log("inside subscription plans...");
  
      let allPlans: SubscriptionPlan[] = await prisma.subscriptionPlan.findMany();
      console.log("allPlans");
      console.log(allPlans);
  
      // If there are no plans in the database, sync them from Lemon Squeezy.
    //   if (!allPlans.length) {
    //       allPlans = await syncPlans();
    //   }
  
      console.log(allPlans);
      return allPlans;
    } catch (error) {
       return [];
    }
  }