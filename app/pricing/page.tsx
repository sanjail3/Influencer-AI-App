"use client";

import { useState, useEffect } from "react";
import { Pricing } from "@/components/ui/pricing";
import { SubscriptionPlan } from "@prisma/client";
import "./globals.css";

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
    const response = await fetch('/api/subscription-plans'); // Fetch plans from the API
    const plans = await response.json();

    console.log(plans);

    // Group plans by interval
    const groupedPlans = plans.reduce((acc: Record<string, SubscriptionPlan[]>, plan: SubscriptionPlan) => {
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
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    professional: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    enterprise: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
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
        ? "Contact Sales" 
        : "Get Started",
      href: plan.name === "Enterprise" ? "/contact" : "/sign-up",
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
        ? "Contact Sales" 
        : "Get Started",
      href: plan.name === "Enterprise" ? "/contact" : "/sign-up",
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
      className="h-[800px] overflow-y-auto"
      style={{
        background: `radial-gradient(ellipse at top, rgba(129, 8, 172, 0.4), black)`,
      }}
    >
      <Pricing
        plans={plans}
        title="Simple, Transparent Pricing"
        description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
      />
    </div>
  );
}

export default PricingPage;