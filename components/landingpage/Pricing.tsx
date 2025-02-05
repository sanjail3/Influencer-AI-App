import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { RoughNotation } from "react-rough-notation";
import { useState, useRef } from "react";
import confetti from "canvas-confetti";
import { formatPrice } from "@/lib/lemon-squeezy/utils";
import { CheckoutButton } from "../lemon-squeezy/CheckoutButton";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import NumberFlow from "@number-flow/react";
import { cn } from '@/lib/utils';

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

export function Pricing({ plans }: { plans: any[] }) {
  const [isAnnual, setIsAnnual] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const switchRef = useRef<HTMLButtonElement | null>(null);

  const handleToggle = (checked: any) => {
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

  const getAnnualPlan = (monthlyPlan: Plan) => {
    return plans.find(p => 
      p.interval === 'year' && 
      p.name.toLowerCase() === monthlyPlan.name.toLowerCase()
    );
  };

  const getDiscountedPrice = (monthlyPrice: number) => {
    const annualDiscount = 0.20; // 20% discount
    return monthlyPrice * (1 - annualDiscount);
  };

  const displayPlans = plans.filter(plan => plan.interval === 'month').map(plan => {
    if (isAnnual) {
      const annualPlan = getAnnualPlan(plan);
      return {
        ...plan,
        displayPrice: getDiscountedPrice(Number(plan.price)).toString(),
        checkoutPlan: annualPlan,
        interval: 'year'
      };
    }
    return {
      ...plan,
      displayPrice: plan.price,
      checkoutPlan: plan,
      interval: 'month'
    };
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
                className="relative"
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
                plan.isPopular ? 'ring-2 ring-landing_primary-500' : ''
              }`}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              {plan.isPopular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-landing_primary-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name} {getPlanEmoji(index)}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    <NumberFlow
                      value={Number(formatPrice(plan.displayPrice))}
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
                    /{plan.interval}
                  </span>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center">
                    <Check className="h-5 w-5 text-landing_primary-600 dark:text-landing_primary-400" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <CheckoutButton
                  plan={plan.checkoutPlan}
                  isChangingPlans={false}
                  embed={false}
                  buttonname={plan.buttonText}
                  isPopular={plan.isPopular}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-200",
                    plan.isPopular 
                      ? "bg-landing_primary-600 text-white hover:bg-landing_primary-700"
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