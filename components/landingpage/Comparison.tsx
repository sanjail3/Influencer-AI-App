import React from "react";
import { motion } from "framer-motion";

interface ComparisonCardProps {
  title: string;
  points: Array<{
    emoji: string;
    label: string;
    traditional: string;
    ai: string;
  }>;
  type: "traditional" | "ai";
}

const ComparisonCard: React.FC<ComparisonCardProps> = ({ title, points, type }) => {
  const bgColor = type === "traditional" ? "bg-gray-800" : "bg-green-800";
  const accentColor = type === "traditional" ? "text-red-400" : "text-green-400";
  const borderColor = type === "traditional" ? "border-red-400/30" : "border-green-400/30";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative p-8 rounded-3xl ${bgColor} border ${borderColor} 
      backdrop-blur-lg hover:scale-105 transition-transform duration-300 shadow-lg`}
    >
      <div className={`inline-block px-4 py-2 rounded-full text-lg ${accentColor} bg-white/10 mb-6`}>
        {title}
      </div>
      <ul className="space-y-6">
        {points.map((point, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-white/90"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{point.emoji}</span>
              <span className={`text-lg font-medium ${accentColor}`}>{point.label}</span>
            </div>
            <p className="text-base font-light ml-9">
              {type === "traditional" ? point.traditional : point.ai}
            </p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

const UGCComparison = () => {
  const comparisonPoints = [
    {
      emoji: "💰",
      label: "Cost",
      traditional: "Influencers charge $200–$5,000+ per video 😨",
      ai: "70% cheaper – AI generates unlimited ads 💸",
    },
    {
      emoji: "⏳",
      label: "Speed",
      traditional: "Takes weeks to negotiate, shoot & edit 🐢",
      ai: "Get ad-ready content in under 5 minutes ⚡",
    },
    {
      emoji: "🤯",
      label: "Creator Dependency",
      traditional: "Influencers cancel, delay, or fail to deliver 😞",
      ai: "AI works 24/7, no contracts, no delays ✅",
    },
    {
      emoji: "📊",
      label: "Engagement",
      traditional: "Dependent on creator reach & performance 🤷‍♂️",
      ai: "AI UGC boosts engagement by 35%+ 📢",
    },
    {
      emoji: "🔬",
      label: "A/B Testing",
      traditional: "Requires hiring multiple creators for variations 🏗️",
      ai: "Generate 10+ ad variations instantly 🚀",
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16 space-y-4"
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
          The Future of Content Creation
        </h1>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          <span className="text-red-400">Traditional UGC 🎥</span>
          <span className="text-white mx-4">vs</span>
          <span className="text-green-400">AI-Powered UGC 🤖</span>
        </h2>
      </motion.div>

      <div className="w-full max-w-7xl grid md:grid-cols-2 gap-8 px-4">
        <ComparisonCard title="Traditional UGC 🎥" points={comparisonPoints} type="traditional" />
        <ComparisonCard title="AI UGC 🤖" points={comparisonPoints} type="ai" />
      </div>
    </div>
  );
};

export default UGCComparison;
