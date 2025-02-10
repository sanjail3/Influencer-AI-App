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
import { RoughNotation } from "react-rough-notation";

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

  const getDisplayPrice = (plan: any) => {
    if (isAnnual) {
      const monthlyPrice = plan.price / 12; 
      return monthlyPrice;
    }
    return plan.price;
  };

  const order: Record<PlanName, number> = { starter: 1, professional: 2, enterprise: 3 };
  const displayPlans = plans.filter(plan => 
    isAnnual ? plan.interval === 'year' : plan.interval === 'month'
  ).sort((a, b) => {
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
    <section id="pricing" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            <RoughNotation type="highlight" show={true} color="#7719ff">
              Pricing
            </RoughNotation>
          </h2>
        </div>

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
                className="relative inline-flex items-center h-6 rounded-full w-11 bg-gray-200 dark:bg-gray-600"
              />
            </Label>
            <span className="ml-2 font-semibold text-gray-700 dark:text-gray-200">
              Annual billing <span className="text-landing_primary-500">🎉 Save 20%</span>
            </span>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {displayPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 ${
                plan.isPopular ? 'ring-2 ring-purple-500' : ''
              }`}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-50 rounded-2xl" />
              
              {plan.isPopular && (
                <motion.div
                  className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 py-1 px-3 rounded-bl-xl rounded-tr-xl flex items-center gap-2"
                  initial={{ x: 100 }}
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 100 }}
                >
                  <Sparkles className="text-white h-4 w-4" />
                  <span className="text-white font-semibold">Most Popular</span>
                </motion.div>
              )}
              
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name} {getPlanEmoji(index)}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
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
                  <span className="text-gray-500 dark:text-gray-400">
                    /{isAnnual ? 'year' : 'month'}
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-4 relative z-10">
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 relative z-10">
                <CheckoutButton
                  plan={plan}
                  isChangingPlans={false}
                  embed={false}
                  buttonname={plan.buttonText}
                  isPopular={plan.isPopular}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full py-6 text-lg font-semibold transition-all duration-200",
                    plan.isPopular 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:from-purple-600 hover:to-pink-600"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  {plan.buttonText} {plan.isPopular ? "⚡" : "→"}
                </CheckoutButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}