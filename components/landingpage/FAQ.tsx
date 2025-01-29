import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How does the AI generate UGC content?",
    answer: "Our AI analyzes your SaaS product, target audience, and marketing goals to create authentic, engaging UGC scripts that resonate with your audience."
  },
  {
    question: "What types of UGC can I create?",
    answer: "You can create various types of UGC including product demonstrations, testimonials, tutorials, and feature highlights tailored for different social media platforms."
  },
  {
    question: "How long does it take to generate content?",
    answer: "Most UGC content can be generated within minutes, and you can customize and export it immediately for your campaigns."
  },
  {
    question: "Can I customize the generated content?",
    answer: "Yes, you have full control to edit, customize, and brand the generated content to match your company's voice and style."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Everything you need to know about our platform
          </p>
        </motion.div>

        <div className="mt-12 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="mt-4"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex justify-between w-full px-4 py-4 text-left bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-b-lg mt-1">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}