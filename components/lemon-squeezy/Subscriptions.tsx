import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChangePlansButton } from './ChangePlansButton';
import { SubscriptionActions } from './SubscriptionsActions';
import { formatPrice, isValidSubscription } from '@/lib/lemon-squeezy/utils';
import { formatDateShort } from '@/lib/format';
import { SubscriptionPlan, UserSubscription } from '@prisma/client';
import { Pricing } from '@/components/ui/pricing';

const Subscriptions = ({ allPlans, userSubscriptions }: { allPlans: SubscriptionPlan[], userSubscriptions: UserSubscription[] }) => {
  const hasActiveSubscription = userSubscriptions.some((s) => isValidSubscription(s.status));

  const transformPlansToUIFormat = (dbPlans: SubscriptionPlan[]) => {
    const planFeatureMap = {
      starter: [
        "Up to 10 videos Monthly",
        "Basic analytics",
        "48-hour support response time",
        "Community support",
      ],
      professional: [
        "Upto 25 videos Monthly",
        "Advanced analytics",
        "24-hour support response time",
        "Priority support",
        "Team collaboration",
        "Custom integrations",
      ],
      enterprise: [
        "Upto 50 videos Monthly",
        "Everything in Professional",
        "Custom solutions",
        "1-hour support response time",
        "Regular Update of New Avatar"
       
      ],
    };
  
    // Group plans by interval
    const groupedPlans = dbPlans.reduce((acc, plan) => {
      const interval = plan.interval;
      if (interval == null) return acc; // Skip if interval is null or undefined
      if (!acc[interval]) {
        acc[interval] = [];
      }
      acc[interval].push(plan);
      return acc;
    }, {} as { [key: string]: SubscriptionPlan[] });

    // Transform monthly plans
    const monthlyPlans = groupedPlans.month?.map((plan) => {
      const planKey = plan.name.toLowerCase() as keyof typeof planFeatureMap;
      const basePrice = parseFloat(plan.price);

      return {
        name: plan.productName.toUpperCase(),
        price: basePrice.toString(),
        period: "per month",
        features: planFeatureMap[planKey] || [],
        description: plan.name === "professional" 
          ? "Ideal for growing teams and businesses"
          : plan.name === "enterprise"
            ? "For large organizations with specific needs"
            : "Perfect for individuals and small projects",
        buttonText: plan.name === "enterprise" 
          ? "Get Started" 
          : "Get Started",
       
        isPopular: plan.name === "professional",
        variantId: plan.variantId,
        interval: plan.interval,
      };
    }) || [];

    // Transform yearly plans
    const yearlyPlans = groupedPlans.year?.map((plan) => {
      const planKey = plan.name.toLowerCase() as keyof typeof planFeatureMap;
      const basePrice = parseFloat(plan.price);

      return {
        name: plan.productName.toUpperCase(),
        price: basePrice.toString(),
        period: "per year",
        features: planFeatureMap[planKey] || [],
        description: plan.name === "professional" 
          ? "Ideal for growing teams and businesses"
          : plan.name === "enterprise"
            ? "For large organizations with specific needs"
            : "Perfect for individuals and small projects",
        buttonText: plan.name === "enterprise" 
          ? "Get Started" 
          : "Get Started",
       
        isPopular: plan.name === "professional",
        variantId: plan.variantId,
        interval: plan.interval,
      };
    }) || [];

    return [...monthlyPlans, ...yearlyPlans];
  };

  const transformedPlans = transformPlansToUIFormat(allPlans);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        {/* Welcome Section - Only show if user has an active subscription */}
        {hasActiveSubscription && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent mb-2">
              ✨ Subscription Dashboard
            </h1>
            <p className="text-gray-300">Manage your plan and billing details</p>
          </div>
        )}

        {!hasActiveSubscription && (
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-100 mb-4 text-center">
              <span>🌟</span> You do not have an active subscription
            </h3>
            <Pricing
              plans={transformedPlans}
            />
          </div>
        )}

        {hasActiveSubscription && (
          <Card className="bg-black/50 border border-purple-500/30 backdrop-blur-sm shadow-xl">
            <CardHeader>
              <div className="flex items-center gap-2">
                <span className="text-2xl">💳</span>
                <CardTitle className="text-gray-100">Billing</CardTitle>
              </div>
              <CardDescription className="text-gray-300">
                Your subscription details and plan management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                {userSubscriptions.map((subscription) => {
                  const plan = allPlans.find((p) => p.id === subscription.planId);
                  if (!plan) return null;

                  return (
                    <Card key={subscription.id} className="bg-purple-900/20 border-purple-500/20 hover:border-purple-500/40 transition-all">
                      <CardHeader className="grid gap-2">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">📊</span>
                            <CardTitle className="text-gray-100">
                              {plan?.productName} {plan?.name}
                            </CardTitle>
                            <SubscriptionStatusBadge subscription={subscription} />
                          </div>
                          <div className="flex gap-2">
                            {isValidSubscription(subscription.status) && (
                              <ChangePlansButton
                                allPlans={allPlans}
                                userSubscriptions={userSubscriptions}
                              />
                            )}
                            <SubscriptionActions userSubscription={subscription} />
                          </div>
                        </div>
                        <CardDescription>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                            <SubscriptionPriceInfo
                              subscription={subscription}
                              plan={plan}
                            />
                            <SubscriptionDateInfo subscription={subscription} />
                          </div>
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

type PlanStatus = 'active' | 'cancelled' | 'expired' | 'past_due' | 'on_trial' | 'unpaid' | 'paused';

const statusMessages: { [key in PlanStatus]: string } = {
  active: 'Active',
  cancelled: 'Cancelled',
  expired: 'Expired',
  past_due: 'Past Due',
  on_trial: 'On Trial',
  unpaid: 'Unpaid',
  paused: 'Paused',
};

const SubscriptionStatusBadge = ({ subscription }: { subscription: UserSubscription }) => {
  const statusStyles = {
    active: 'bg-green-500/20 text-green-300 border-green-500/30',
    cancelled: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
    expired: 'bg-red-500/20 text-red-300 border-red-500/30',
    past_due: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    on_trial: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    unpaid: 'bg-red-500/20 text-red-300 border-red-500/30',
    paused: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
  };

  const status: PlanStatus = subscription?.isPaused ? 'paused' : subscription?.status as PlanStatus;
  const label = statusMessages[status];

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${statusStyles[status]}`}>
      {label}
    </span>
  );
};

const SubscriptionPriceInfo = ({ subscription, plan }: { subscription: UserSubscription, plan: SubscriptionPlan }) => {
  if (subscription?.endsAt) return null;

  let price = formatPrice(subscription?.price);
  const interval = plan?.intervalCount && plan?.intervalCount !== 1
    ? `every ${plan?.intervalCount} ${plan?.interval}`
    : `every ${plan?.interval}`;

  return <span className="text-gray-300">{`${price} ${interval}`}</span>;
};

const SubscriptionDateInfo = ({ subscription }: { subscription: UserSubscription }) => {
  const now = new Date();
  const trialEndDate = subscription?.trialEndsAt ? new Date(subscription?.trialEndsAt) : null;
  const endsAtDate = subscription?.endsAt ? new Date(subscription?.endsAt) : null;

  if (!subscription?.trialEndsAt && !subscription?.renewsAt) return null;

  let message;
  if (trialEndDate && trialEndDate > now) {
    message = `Ends on ${trialEndDate ? formatDateShort(trialEndDate) : 'N/A'}`;
  } else if (endsAtDate && subscription?.endsAt) {
    message = endsAtDate < now
      ? `Expired on ${endsAtDate ? formatDateShort(endsAtDate) : 'N/A'}`
      : `Expires on ${endsAtDate ? formatDateShort(endsAtDate) : 'N/A'}`;
  } else {
    message = 'No expiration date available';
  }

  return <span className="text-gray-300">{message}</span>;
};

export default Subscriptions;