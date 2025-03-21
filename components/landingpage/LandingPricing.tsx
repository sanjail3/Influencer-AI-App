"use client";

import { useState, useEffect } from "react";
import { Pricing } from "@/components/landingpage/Pricing";
import { SubscriptionPlan } from "@prisma/client";
import { get_subscription_plans } from "@/lib/api/subscriptionPlan";


interface PricingPlan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  period: string;
  features: string[];
  description: string;
  buttonText: string;
  href: string;
  isPopular: boolean;
  monthlyVariantId: number;
  yearlyVariantId: number;
}

// Fetch subscription plans from the API
async function fetchSubscriptionPlans() {
  try {
    console.log("Fetching subscription plans...");
    
    const response = await fetch('/api/subscription-plans'); // Fetch plans from the API
    const allPlans = await response.json();

    console.log(allPlans);

    // Group plans by interval
    const groupedPlans = allPlans.reduce((acc: Record<string, SubscriptionPlan[]>, plan: SubscriptionPlan) => {
      const interval = plan.interval;
      if (interval == null) return acc; // Skip if interval is null or undefined
      if (!acc[interval]) {
        acc[interval] = [];
      }
      acc[interval].push(plan);
      return acc;
    }, {});

    console.log(groupedPlans);

    return groupedPlans;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return { month: [], year: [] }; // Return empty groups if there's an error
  }
}

// Helper function to transform database plans to UI format
function transformPlansToUIFormat(groupedPlans: { month: SubscriptionPlan[], year: SubscriptionPlan[] }): PricingPlan[] {
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

  // Transform monthly plans
  const monthlyPlans = groupedPlans.month.map((plan): any => {
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
  });

  // Transform yearly plans
  const yearlyPlans = groupedPlans.year.map((plan) => {
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
  });

  console.log(monthlyPlans, yearlyPlans);

  return [...monthlyPlans, ...yearlyPlans];
}

function PricingPage() {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlans() {
      try {
        const groupedPlans = await fetchSubscriptionPlans();
        console.log(groupedPlans);
        if (!groupedPlans) return;
        const transformedPlans = transformPlansToUIFormat(groupedPlans);
        console.log(transformedPlans);
        setPlans(transformedPlans);
      } catch (err) {
        setError("Failed to load subscription plans");
      } finally {
        setLoading(false);
      }
    }

    loadPlans();
  }, []);

  if (loading) {
    return <div className="h-[800px] flex items-center justify-center">Loading...</div>;
  }

  if (error) {
    return <div className="h-[800px] flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div 
      
    >
      <Pricing
        plans={plans}
      />
    </div>
  );
}

export default PricingPage;