import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative py-24 bg-landing_primary-600 dark:bg-landing_primary-600">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full bg-gradient-to-br from-landing_primary-500/30 to-landing_primary-700/30" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Ready to Transform Your SaaS Marketing?
          </h2>
          <p className="mt-4 text-xl text-landing_primary-100">
            Join thousands of businesses creating authentic UGC content with AI
          </p>
          <div className="mt-8 flex justify-center space-x-4">
            <a
              href="/sign-up"
              className="inline-flex items-center px-8 py-3 border-2 border-white rounded-full text-base font-medium text-white hover:bg-white hover:text-landing_primary-600 transition-colors duration-200"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
           
          </div>
        </motion.div>
      </div>
    </section>
  );
}
