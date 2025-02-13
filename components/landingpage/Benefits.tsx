"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import { Clock, LineChart, Brain, Target } from "lucide-react";

export function Benefits() {
  const benefits = [
    {
   
      iconColor: "text-pink-400",
      color: "bg-pink-800",
      title: "🔥 More Testing, More Wins ",
      description: "Create multiple variations for A/B testing without extra cost.",
      highlightDesc: ["AI", "human-like", "creators"],
      image: "/speed.png",
      altText: "AI Avatar Creation Illustration"
    },
    {

      iconColor: "text-purple-400",
      color: "bg-purple-800",
      title: "Higher Conversion Rates",
      description: "AI-generated UGC ads increase ad engagement by 35%.",
      highlightDesc: [ "engagement","35%"],
      image: "/roi.png",
      altText: "Conversion Rate Boost Illustration"
    },
    {
   
      iconColor: "text-indigo-400",
      color: "bg-indigo-800",
      title: "⏳ Save Weeks of Research & Outreach",
      description: "Just paste your website link, and our AI writes the script, generates the video, and delivers ad-ready content.",
      highlightDesc: [ "ad-ready"],
      image: "/time.png",
      altText: "AI Content Creation Illustration"
    },
    {
  
      iconColor: "text-violet-400",
      color: "bg-violet-800",
      title: "Lower Customer Acquisition Cost",
  
      description: "Reduce customer acquisition costs by 40% using AI avatars.",
      highlightDesc: ["40%", "AI", "avatars"],
      image: "/cost.png",
      altText: "Cost Reduction Illustration"
    }
  ];

  const highlightWord = (text: string, highlightWords: string[]) => {
    const regex = new RegExp(`(${highlightWords.join('|')})`, 'gi');
    return text.split(regex).map((part, index) => 
      highlightWords.some(word => word.toLowerCase() === part.toLowerCase()) 
        ? <span key={index} className="bg-yellow-300 text-black px-1 rounded-md font-bold">{part}</span>
        : part
    );
  };

  return (
    <section id="benefits">
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Maximize <span className="text-indigo-600">ROI</span>, Minimize <span className="text-pink-600">Effort</span>
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Let AI Do the Heavy Lifting for Your UGC Ads
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {benefits.map((benefit, index) => (
          <WobbleCard
            key={benefit.title}
            containerClassName={`${benefit.color} min-h-[400px] w-full`}
            className="relative p-6 flex flex-col justify-between"
          >
            <div className="flex items-start gap-4 mb-4">
              
              <div>
                <h3 className="text-xl lg:text-2xl font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-base text-neutral-200">
                  {highlightWord(benefit.description, benefit.highlightDesc)}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-end flex-grow">
              <Image
                src={benefit.image}
                width={300}
                height={200}
                alt={benefit.altText}
                className="max-w-full h-auto object-contain"
              />
            </div>
          </WobbleCard>
        ))}
      </div>
    </div>
    </section>
  
  );
}