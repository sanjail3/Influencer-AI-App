// import { motion } from 'framer-motion';
// import { Clock, DollarSign, Sparkles, Target } from 'lucide-react';

// const benefits = [
//   {
//     title: 'Save Time',
//     description: 'Create UGC content in minutes instead of weeks',
//     icon: Clock,
//   },
//   {
//     title: 'Increase ROI',
//     description: 'Higher conversion rates with authentic content',
//     icon: DollarSign,
//   },
//   {
//     title: 'AI-Powered',
//     description: 'Leverage advanced AI for content creation',
//     icon: Sparkles,
//   },
//   {
//     title: 'Better Targeting',
//     description: 'Reach your ideal customers effectively',
//     icon: Target,
//   },
// ];

// export function Benefits() {
//   return (
//     <section id="benefits" className="py-24 bg-white dark:bg-gray-900">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.5 }}
//           className="text-center"
//         >
//           <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
//             Benefits
//           </h2>
//           <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
//             Why choose our AI-powered UGC platform
//           </p>
//         </motion.div>

//         <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {benefits.map((benefit, index) => (
//             <motion.div
//               key={benefit.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
//             >
//               <div className="absolute top-6 left-6">
//                 <benefit.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
//               </div>
//               <div className="mt-8">
//                 <h3 className="text-lg font-medium text-gray-900 dark:text-white">
//                   {benefit.title}
//                 </h3>
//                 <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
//                   {benefit.description}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import { Clock, LineChart, Brain, Target } from "lucide-react";
import { RoughNotation } from "react-rough-notation";

export function Benefits() {
  return (
    
    
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-7xl mx-auto w-full">
      
      <WobbleCard
        containerClassName="col-span-1 h-full bg-pink-800 min-h-[400px]"
        className="relative overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <Clock className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-left text-balance text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white dark:text-white">
              Save Time
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200 dark:text-neutral-200">
              Create UGC content in minutes instead of weeks
            </p>
          </div>
        </div>
        <Image
          src="../public/time.png"
          width={300}
          height={200}
          alt="Time saving illustration"
          className="absolute -right-10 -bottom-10 object-contain rounded-2xl opacity-60"
        />
      </WobbleCard>

      <WobbleCard
        containerClassName="col-span-1 bg-purple-800 min-h-[400px]"
        className="relative overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <LineChart className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-left text-balance text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white dark:text-white">
              Increase ROI
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200 dark:text-neutral-200">
              Higher conversion rates with authentic content
            </p>
          </div>
        </div>
        <Image
          src="/public/roi.png"
          width={300}
          height={200}
          alt="ROI growth illustration"
          className="absolute -right-10 -bottom-10 object-contain rounded-2xl opacity-60"
        />
      </WobbleCard>

      <WobbleCard
        containerClassName="col-span-1 bg-indigo-800 min-h-[400px]"
        className="relative overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <Brain className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-left text-balance text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white dark:text-white">
              AI-Powered
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200 dark:text-neutral-200">
              Leverage advanced AI for content creation
            </p>
          </div>
        </div>
        <Image
          src="/api/placeholder/300/200"
          width={300}
          height={200}
          alt="AI technology illustration"
          className="absolute -right-10 -bottom-10 object-contain rounded-2xl opacity-60"
        />
      </WobbleCard>

      <WobbleCard
        containerClassName="col-span-1 bg-violet-800 min-h-[400px]"
        className="relative overflow-hidden"
      >
        <div className="flex items-start gap-4">
          <Target className="w-8 h-8 text-white" />
          <div>
            <h2 className="text-left text-balance text-xl lg:text-2xl font-semibold tracking-[-0.015em] text-white dark:text-white">
              Better Targeting
            </h2>
            <p className="mt-4 text-left text-base/6 text-neutral-200 dark:text-neutral-200">
              Reach your ideal customers effectively
            </p>
          </div>
        </div>
        <Image
          src="/api/placeholder/300/200"
          width={300}
          height={200}
          alt="Target audience illustration"
          className="absolute -right-10 -bottom-10 object-contain rounded-2xl opacity-60"
        />
      </WobbleCard>
    </div>
  );
}