"use client";

import React, { useState, useRef } from "react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import NumberFlow from "@number-flow/react";
import { formatPrice } from "@/lib/lemon-squeezy/utils";
import { CheckoutButton } from "../lemon-squeezy/CheckoutButton";

type PlanName = 'starter' | 'professional' | 'enterprise';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  features: string[];
  description: string;
  buttonText: string;
  isPopular?: boolean;
}

export function Pricing({
  plans,
  title = "✨ Choose Your Perfect Plan ✨",
  description = "Unlock amazing features that help you grow! 🚀\nAll plans include our award-winning support and powerful tools.",
}: {
  plans: any[];
  title?: string;
  description?: string;
}) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const switchRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = (checked: boolean) => {
    setIsAnnual(checked);
    if (checked && switchRef.current) {
      const rect = switchRef.current.getBoundingClientRect();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          x: rect.left / window.innerWidth + rect.width / (2 * window.innerWidth),
          y: rect.top / window.innerHeight + rect.height / (2 * window.innerHeight),
        },
        colors: ['#FF3E9D', '#7E52FF', '#E4FF3E', '#3EFFED'],
        startVelocity: 45,
      });
    }
  };

  // Calculate the display price for annual plans
  const getDisplayPrice = (plan: any) => {
    if (isAnnual) {
      const monthlyPrice = plan.price / 12; 
      return monthlyPrice;
    }
    return plan.price;
  };

  // Filter plans based on the selected billing interval
  const order: Record<PlanName, number> = { starter: 1, professional: 2, enterprise: 3 };
  const displayPlans = plans.filter(plan => 
    isAnnual ? plan.interval === 'year' : plan.interval === 'month'
  ).sort((a, b) => {
    // Sort plans to maintain consistent order: starter, professional, enterprise
    return order[a.name.toLowerCase() as PlanName] - order[b.name.toLowerCase() as PlanName];
  });

  const getPlanEmoji = (index: number) => {
    switch (index) {
      case 0: return "🌟";
      case 1: return "⭐";
      case 2: return "💎";
      default: return "✨";
    }
  };

  return (
    <div className="container py-20 relative">
      <div className="absolute inset-0" />
      
      <motion.div 
        className="text-center space-y-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
          {title}
        </h2>
        <p className="text-gray-300 text-lg whitespace-pre-line">
          {description}
        </p>
      </motion.div>

      <div className="flex justify-center mb-10 items-center space-x-4">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
        >
          <Label>
            <Switch
              ref={switchRef}
              checked={isAnnual}
              onCheckedChange={handleToggle}
              className="relative"
            />
          </Label>
          <span className="ml-2 font-semibold text-gray-200">
            Annual billing <span className="text-purple-400">🎉 Save 20%</span>
          </span>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
        {displayPlans.map((plan, index) => (
          <motion.div
            key={plan.id || index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 0 20px rgba(147, 51, 234, 0.3)"
            }}
            onHoverStart={() => setHoveredCard(index)}
            onHoverEnd={() => setHoveredCard(null)}
            className={cn(
              "rounded-2xl p-6 backdrop-blur-sm relative overflow-hidden",
              plan.isPopular ? "border-2 border-purple-500" : "border border-gray-800",
              "bg-gradient-to-b from-gray-900/90 to-gray-950/90"
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-50" />
            
            {plan.isPopular && (
              <motion.div
                className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 100 }}
              >
                <Sparkles className="text-white h-4 w-4" />
                <span className="text-white ml-1 font-semibold">Most Popular</span>
              </motion.div>
            )}

            <div className="relative z-10">
              <p className="text-xl font-semibold text-gray-200 mb-2">
                {plan.name} {getPlanEmoji(index)}
              </p>
              
              <motion.div 
                className="mt-4"
                animate={{ scale: hoveredCard === index ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-5xl font-bold text-white">
                  <NumberFlow
                    value={Number(formatPrice(getDisplayPrice(plan)))}
                    format={{
                      style: "currency",
                      currency: "USD",
                      minimumFractionDigits: 0,
                    }}
                    transformTiming={{ duration: 500 }}
                    className="font-variant-numeric: tabular-nums"
                  />
                </span>
                <span className="text-gray-400 ml-2">
                  /month
                </span>
                {isAnnual && (
                  <div className="text-sm text-gray-400 mt-1">
                    billed annually
                  </div>
                )}
              </motion.div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature: string, idx: number) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-purple-400 mt-1" />
                    <span className="text-gray-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <motion.div 
                className="mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <CheckoutButton
                  plan={plan}
                  isChangingPlans={false}
                  embed={false}
                  buttonname={plan.buttonText}
                  isPopular={plan.isPopular}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full py-6 text-lg font-semibold",
                    plan.isPopular 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
                      : "bg-gray-800/50 text-gray-200 border-gray-700 hover:bg-gray-700/50"
                  )}
                >
                  {plan.buttonText} {plan.isPopular ? "⚡" : "→"}
                </CheckoutButton>
              </motion.div>

              <p className="mt-4 text-sm text-gray-400">
                {plan.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}