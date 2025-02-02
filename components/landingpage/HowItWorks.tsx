'use client';
import React, { useState, useEffect } from 'react';
import { Globe, Code2, UserSquare2, Video, ArrowRight, Play } from 'lucide-react';
import { RoughNotation } from 'react-rough-notation';

const HowItWorks = () => {
  const [activeCard, setActiveCard] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e:any) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const steps = [
    {
      icon: Globe,
      title: "Upload URL",
      description: "Simply paste your website URL and watch as our AI instantly analyzes your content",
      colors: {
        primary: "from-blue-400 via-blue-500 to-blue-600 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800",
        secondary: "text-blue-600 dark:text-blue-400",
        hover: "hover:bg-blue-50 dark:hover:bg-blue-900/20"
      },
      bgShape: "M10 10C50 20 80 90 120 90C160 90 190 20 230 10C270 0 300 20 340 20C380 20 410 0 450 0"
    },
    {
      icon: Code2,
      title: "Generate Script",
      description: "Our AI crafts the perfect script based on your content, ready for customization",
      colors: {
        primary: "from-purple-400 via-purple-500 to-purple-600 dark:from-purple-600 dark:via-purple-700 dark:to-purple-800",
        secondary: "text-purple-600 dark:text-purple-400",
        hover: "hover:bg-purple-50 dark:hover:bg-purple-900/20"
      },
      bgShape: "M10 50C50 40 80 10 120 10C160 10 190 80 230 90C270 100 300 80 340 80C380 80 410 100 450 100"
    },
    {
      icon: UserSquare2,
      title: "Choose Actor",
      description: "Select from our diverse range of AI presenters to match your brand",
      colors: {
        primary: "from-indigo-400 via-indigo-500 to-indigo-600 dark:from-indigo-600 dark:via-indigo-700 dark:to-indigo-800",
        secondary: "text-indigo-600 dark:text-indigo-400",
        hover: "hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
      },
      bgShape: "M10 90C50 80 80 20 120 20C160 20 190 70 230 80C270 90 300 70 340 70C380 70 410 90 450 90"
    },
    {
      icon: Video,
      title: "Get Video",
      description: "Receive your professionally generated video in minutes, ready to share",
      colors: {
        primary: "from-violet-400 via-violet-500 to-violet-600 dark:from-violet-600 dark:via-violet-700 dark:to-violet-800",
        secondary: "text-violet-600 dark:text-violet-400",
        hover: "hover:bg-violet-50 dark:hover:bg-violet-900/20"
      },
      bgShape: "M10 30C50 20 80 60 120 60C160 60 190 30 230 20C270 10 300 30 340 30C380 30 410 10 450 10"
    }
  ];

  const Card = ({ step, index }: { step: any, index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const rotateX = isHovered ? (mousePosition.y - 0.5) * 20 : 0;
    const rotateY = isHovered ? (mousePosition.x - 0.5) * 20 : 0;

    return (
      <div
        className="relative group perspective-1000"
        onMouseEnter={() => {
          setIsHovered(true);
          setActiveCard(index);
        }}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
      >
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${step.colors.primary} opacity-10 transition-all duration-500 animate-pulse`}>
          <svg viewBox="0 0 460 200" className="w-full h-full">
            <path d={step.bgShape} className="fill-current" />
          </svg>
        </div>

        <div
          className="relative transform-gpu transition-all duration-300 ease-out"
          style={{
            transform: `
              rotateX(${rotateX}deg)
              rotateY(${rotateY}deg)
              ${isHovered ? 'scale(1.05)' : 'scale(1)'}
            `,
          }}
        >
          <div className={`p-6 rounded-2xl backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 border-gray-100 dark:border-gray-800 shadow-xl border h-full transition-all duration-300 ${step.colors.hover}`}>
            <div className={`absolute -top-4 -left-4 w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-gray-800 shadow-lg border-2 ${
              index === activeCard ? 
                `border-current ${step.colors.secondary} animate-bounce` : 
                'border-gray-200 dark:border-gray-700'
            }`}>
              <span className={`text-sm font-bold ${step.colors.secondary}`}>
                {index + 1}
              </span>
            </div>

            <div className="mb-4 relative">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${step.colors.primary} flex items-center justify-center transform transition-all duration-500 ${
                isHovered ? 'scale-110 rotate-12' : ''
              }`}>
                <step.icon className={`w-6 h-6 text-white transition-transform duration-300 ${
                  isHovered ? 'animate-bounce' : ''
                }`} />
              </div>
            </div>

            <h3 className={`text-xl font-bold mb-2 transition-all duration-300 text-gray-900 dark:text-white ${
              isHovered ? 'translate-x-2' : ''
            }`}>
              {step.title}
            </h3>
            <p className={`text-sm transition-all duration-300 text-gray-600 dark:text-gray-400 ${
              isHovered ? 'translate-x-2' : ''
            }`}>
              {step.description}
            </p>

            <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              <button className={`p-2 rounded-full bg-gradient-to-r ${step.colors.primary} text-white transform transition-all hover:scale-110`}>
                <Play className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {index < steps.length - 1 && (
          <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
            <ArrowRight className={`w-6 h-6 text-gray-400 dark:text-gray-600 ${
              activeCard === index ? 'animate-bounce-x' : ''
            }`} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full py-16 px-4 transition-colors duration-300 bg-gray-50 dark:bg-gray-950">
      <div className="max-w-6xl mx-auto">
      <div className="flex flex-col items-center justify-center text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          <RoughNotation type="highlight" show={true} color="#7719ff">
           How It Works
          </RoughNotation>
          </h2>
        </div>
        <p className="text-center mb-16 text-lg text-gray-600 dark:text-gray-400">
          Four simple steps to create your professional AI video
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index: number) => (
            <Card key={index} step={step} index={index} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="group relative px-8 py-4 rounded-full font-bold text-white overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 dark:from-purple-600 dark:via-purple-700 dark:to-blue-800 transition-all duration-300 group-hover:scale-110" />
            <span className="relative flex items-center justify-center gap-2">
              Get Started Now
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(10px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default HowItWorks;