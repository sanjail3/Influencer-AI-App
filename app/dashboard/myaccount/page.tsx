import Subscriptions from '@/components/lemon-squeezy/Subscriptions';
import { prisma } from '@/lib/db';
import { getUserSubscriptions, syncPlans } from '@/lib/lemon-squeezy/actions';
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Loader2 } from "lucide-react";
import "../globals.css";
import { Suspense } from 'react';

function LoadingSubscriptions() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
      <p className="text-gray-500 dark:text-gray-400">Loading your subscriptions...</p>
    </div>
  );
}

async function SubscriptionsContent() {
  const userSubscriptions = await getUserSubscriptions();
  let allPlans = await prisma.subscriptionPlan.findMany();

  if (!allPlans.length) {
    allPlans = await syncPlans();
  }

  // Show active subscriptions first, then paused, then canceled
  const sortedSubscriptions = userSubscriptions.sort((a, b) => {
    if (a.status === 'active' && b.status !== 'active') {
      return -1;
    }
    if (a.status === 'paused' && b.status === 'cancelled') {
      return -1;
    }
    return 0;
  });

  return (
    <Subscriptions 
      userSubscriptions={sortedSubscriptions} 
      allPlans={allPlans} 
    />
  );
}

export default function MyAccount() {
  return (
    <DashboardLayout>
      <Suspense fallback={<LoadingSubscriptions />}>
        <SubscriptionsContent />
      </Suspense>
    </DashboardLayout>
  );
}