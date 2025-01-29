import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { RoughNotation } from "react-rough-notation";


const plans = [
  {
    name: 'Starter',
    price: '49',
    description: 'Perfect for small SaaS companies',
    features: [
      '50 UGC videos per month',
      'Basic AI customization',
      'Export in 1080p',
      'Email support',
      '2 team members',
    ],
  },
  {
    name: 'Professional',
    price: '99',
    description: 'Best for growing businesses',
    features: [
      '200 UGC videos per month',
      'Advanced AI customization',
      'Export in 4K',
      'Priority support',
      '5 team members',
      'Custom branding',
      'Analytics dashboard',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '299',
    description: 'For large scale operations',
    features: [
      'Unlimited UGC videos',
      'Custom AI training',
      'Export in 4K + RAW',
      '24/7 dedicated support',
      'Unlimited team members',
      'White-label solution',
      'Advanced analytics',
      'API access',
    ],
  },
];

export function Pricing() {
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

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 ${
                plan.popular ? 'ring-2 ring-landing_primary-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-landing_primary-600 px-4 py-1 text-sm font-semibold text-white">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  {plan.description}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${plan.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>
              </div>
              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-landing_primary-600 dark:text-landing_primary-400" />
                    <span className="ml-3 text-gray-600 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <a
                  href="#"
                  className={`block w-full rounded-full px-6 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                    plan.popular
                      ? 'bg-landing_primary-600 text-white hover:bg-landing_primary-700'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  Get Started
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}