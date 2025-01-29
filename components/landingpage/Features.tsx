import { motion } from 'framer-motion';
import { Sparkles, Target, Zap } from 'lucide-react';
import {InfluencerFeatures} from './InfluencerFeatures';


const features = [
  {
    title: 'AI-Powered Creation',
    description: 'Generate authentic UGC content in minutes using advanced AI technology',
    icon: Sparkles,
  },
  {
    title: 'High Conversion Focus',
    description: 'Create ads that resonate with your audience and drive real results',
    icon: Target,
  },
  {
    title: 'Quick Turnaround',
    description: 'Get your UGC ads ready in hours, not weeks',
    icon: Zap,
  },
];

export function Features() {
  return (
    // <section id="features" className="py-24 bg-white dark:bg-gray-900">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       whileInView={{ opacity: 1 }}
    //       viewport={{ once: true }}
    //       transition={{ duration: 0.5 }}
    //       className="text-center"
    //     >
    //       <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
    //         Key Features
    //       </h2>
    //       <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
    //         Everything you need to create converting UGC ads
    //       </p>
    //     </motion.div>

    //     <div className="mt-20">
    //       <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
    //         {features.map((feature, index) => (
    //           <motion.div
    //             key={feature.title}
    //             initial={{ opacity: 0, y: 20 }}
    //             whileInView={{ opacity: 1, y: 0 }}
    //             viewport={{ once: true }}
    //             transition={{ duration: 0.5, delay: index * 0.2 }}
    //             className="relative"
    //           >
    //             <div className="absolute h-12 w-12 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
    //               <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
    //             </div>
    //             <div className="ml-16">
    //               <h3 className="text-xl font-medium text-gray-900 dark:text-white">
    //                 {feature.title}
    //               </h3>
    //               <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
    //                 {feature.description}
    //               </p>
    //             </div>
    //           </motion.div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <div className="min-h-screen w-full">
      <div className="">
        <InfluencerFeatures/>
      </div>
    </div>
  );
}