import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="text-2xl font-bold text-landing_primary-600 dark:text-landing_primary-400">
              Influencer AI
            </span>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Transform your SaaS marketing with AI-powered UGC content creation.
              Generate authentic, engaging ads that convert.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#features" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#solution" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Solution
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#about" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-base text-gray-400">
            &copy; 2024 Influencer AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Facebook className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Instagram className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Twitter className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="relative py-24 bg-landing_primary-600 dark:bg-landing_primary-900">
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
              href="#"
              className="inline-flex items-center px-8 py-3 border-2 border-white rounded-full text-base font-medium text-white hover:bg-white hover:text-landing_primary-600 transition-colors duration-200"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="#"
              className="inline-flex items-center px-8 py-3 border-2 border-transparent rounded-full text-base font-medium text-landing_primary-600 bg-white hover:bg-landing_primary-50 transition-colors duration-200"
            >
              Book a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
