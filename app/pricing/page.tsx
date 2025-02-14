"use client";

import { useState, useEffect } from "react";
import { Pricing } from "@/components/ui/pricing";
import { SubscriptionPlan } from "@prisma/client";
import { motion } from "framer-motion";
import { ArrowDown, Zap, Shield, Clock } from "lucide-react";
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

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const IntroSection = () => {
  const features: Feature[] = [
    {
      icon: <Zap className="w-6 h-6 text-purple-400" />,
      title: "Lightning Fast",
      description: "Experience blazing fast performance with our optimized platform"
    },
    {
      icon: <Shield className="w-6 h-6 text-purple-400" />,
      title: "Enterprise Security",
      description: "Bank-grade security to keep your data safe and protected"
    },
    {
      icon: <Clock className="w-6 h-6 text-purple-400" />,
      title: "24/7 Support",
      description: "Round-the-clock support to help you succeed"
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto text-center px-4"
    >
      <motion.h1 
        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 text-transparent bg-clip-text"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Supercharge Your Business
      </motion.h1>
      
      <motion.p 
        className="text-xl text-gray-300 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Choose the perfect plan that scales with your needs. No hidden fees, just pure value.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * (index + 1) }}
            className="p-6 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-100">{feature.title}</h3>
            <p className="text-gray-400">{feature.description}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="flex justify-center mb-8"
      >
        <ArrowDown className="w-8 h-8 text-purple-400 animate-bounce" />
      </motion.div>
    </motion.div>
  );
};

async function fetchSubscriptionPlans() {
  try {
    const response = await fetch('/api/subscription-plans');
    const plans = await response.json();

    // Group plans by interval
    const groupedPlans = plans.reduce((acc: Record<string, SubscriptionPlan[]>, plan: SubscriptionPlan) => {
      const interval = plan.interval;
      if (interval == null) return acc;
      if (!acc[interval]) {
        acc[interval] = [];
      }
      acc[interval].push(plan);
      return acc;
    }, {});

    return groupedPlans;
  } catch (error) {
    console.error('Error fetching subscription plans:', error);
    return { month: [], year: [] };
  }
}

function transformPlansToUIFormat(groupedPlans: { month: SubscriptionPlan[], year: SubscriptionPlan[] }): any[] {
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

  const transformPlan = (plan: SubscriptionPlan, interval: 'month' | 'year') => {
    const planKey = plan.name.toLowerCase() as keyof typeof planFeatureMap;
    const basePrice = parseFloat(plan.price);

    return {
      name: plan.productName.toUpperCase(),
      price: basePrice.toString(),
      period: `per ${interval}`,
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
      interval: interval,
      originalPlan: plan, // Keep reference to original plan for checkout
    };
  };

  const monthlyPlans = groupedPlans.month.map(plan => transformPlan(plan, 'month'));
  const yearlyPlans = groupedPlans.year.map(plan => transformPlan(plan, 'year'));

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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen overflow-y-auto pt-16 pb-10"
      style={{
        background: `radial-gradient(ellipse at top, rgba(129, 8, 172, 0.4), black)`,
      }}
    >
      <div className="space-y-12">
        <IntroSection />
        
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <Pricing
            plans={plans}
            title="Simple, Transparent Pricing"
            description="Choose the plan that works for you\nAll plans include access to our platform, lead generation tools, and dedicated support."
          />
        </div>
      </div>
    </div>
  );
}

export default PricingPage;