'use client';
import React, { useRef, useEffect, useState } from 'react';
import { AnimatedBeam, Circle } from '@/components/ui/beam';
import { Card } from '@/components/ui/card';
import { Play, Video, Volume2 } from 'lucide-react';

const FlowDiagram = () => {
  const containerRef = useRef(null);
  const scriptRef = useRef(null);
  const actorRef = useRef(null);
  const videoRef = useRef(null);
  const processingRef = useRef(null);
  const outputRef = useRef(null);

  const scriptContent = `choose the KUBI SU7.
First its 580W motor and 45 kPa
suction make it perfect for
tackling pet hair and dust.
Second enjoy 70 minutes of
runtime with Smart Dust
Detection for efficient
cleaning.
And third with a 1 3L dustbin
and LED touchscreen it's
designed for your convenience.`;

  const [typedScript, setTypedScript] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typing animation for script
  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < scriptContent.length) {
        setTypedScript((prev) => prev + scriptContent[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 30); // Adjust typing speed here

    return () => clearInterval(typingInterval);
  }, [scriptContent]);

  return (
    <div className="hidden md:block transition-colors duration-200">
      <div
        className="relative w-full max-w-7xl mx-auto p-4 md:p-8 lg:p-12"
        ref={containerRef}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,auto,1fr] gap-8 lg:gap-16 w-full items-center">
          {/* Left Column - Inputs */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Script Card */}
            <div className="relative transform hover:scale-102 transition-transform duration-200">
              <Card className="bg-white dark:bg-gray-800 border-2 border-landing_primary-500/20 dark:border-landing_primary-400/30 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-2 p-3 md:p-4 border-b border-gray-200 dark:border-gray-700">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-landing_primary-500 dark:text-landing_primary-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">Script</span>
                </div>
                <div className="h-36 md:h-48 p-3 md:p-4 font-mono text-xs md:text-sm space-y-1 md:space-y-2 overflow-auto h-36 md:h-48 p-3 md:p-4 font-mono text-xs md:text-sm space-y-1 md:space-y-2 overflow-auto bg-gray-50 dark:bg-gray-900/30 text-gray-800 dark:text-gray-200">
                <div className="whitespace-pre-wrap break-words">
                    {typedScript.split('\n').map((line, lineIndex) => (
                      <div 
                        key={lineIndex} 
                        className="opacity-0 animate-fade-in"
                        style={{ 
                          animationDelay: `${(lineIndex * 20) * 30}ms`,
                          color: 'inherit'
                        }}
                      >
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${lineIndex}-${charIndex}`}
                            className="opacity-0 animate-fade-in inline-block"
                            style={{ 
                              animationDelay: `${(lineIndex * 20 + charIndex) * 30}ms`,
                              color: 'inherit'
                            }}
                          >
                            {char}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-3 md:p-4 border-t border-gray-200 dark:border-gray-700 flex items-center gap-2 text-landing_primary-500 dark:text-landing_primary-400">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-landing_primary-500 dark:bg-landing_primary-400" />
                  <span className="text-xs font-medium">AI is writing script...</span>
                </div>
              </Card>
              <div ref={scriptRef} className="absolute right-0 top-1/2 w-4 h-4" />
            </div>

            {/* Creator Card */}
            <div className="relative transform hover:scale-102 transition-transform duration-200">
              <Card className="bg-white dark:bg-gray-800 border-2 border-landing_primary-500/20 dark:border-landing_primary-400/30 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-landing_primary-400 to-landing_primary-600 dark:from-landing_primary-500 dark:to-landing_primary-700 flex items-center justify-center text-white font-medium">
                    R
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">Rebeca</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Young Woman.</div>
                  </div>
                  <button className="h-8 w-8 rounded-full bg-landing_primary-500/10 dark:bg-landing_primary-400/20 flex items-center justify-center hover:bg-landing_primary-500/20 dark:hover:bg-landing_primary-400/30 transition-colors duration-200">
                    <Play className="w-4 h-4 text-landing_primary-500 dark:text-landing_primary-400" />
                  </button>
                </div>
              </Card>
              <div ref={actorRef} className="absolute right-0 top-1/2 w-4 h-4" />
            </div>

            {/* Video Card */}
            <div className="relative transform hover:scale-102 transition-transform duration-200">
              <Card className="bg-white dark:bg-gray-800 border-2 border-landing_primary-500/20 dark:border-landing_primary-400/30 shadow-lg hover:shadow-xl transition-shadow duration-200">
                <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-landing_primary-500 to-landing_primary-600 dark:from-landing_primary-600 dark:to-landing_primary-700 flex items-center justify-center">
                    <Video className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm md:text-base text-gray-900 dark:text-gray-100">Product Showcase</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">4K, 60FPS, Commercial</div>
                  </div>
                  <Volume2 className="w-4 h-4 text-landing_primary-500 dark:text-landing_primary-400 mr-2" />
                  <button className="h-8 w-8 rounded-full bg-landing_primary-500/10 dark:bg-landing_primary-400/20 flex items-center justify-center hover:bg-landing_primary-500/20 dark:hover:bg-landing_primary-400/30 transition-colors duration-200">
                    <Play className="w-4 h-4 text-landing_primary-500 dark:text-landing_primary-400" />
                  </button>
                </div>
              </Card>
              <div ref={videoRef} className="absolute right-0 top-1/2 w-4 h-4" />
            </div>
          </div>

          {/* Center - Processing Circle */}
          <div className="flex items-center justify-center py-8 lg:py-0">
            <Circle ref={processingRef} className="h-24 w-24 md:h-32 md:w-32 bg-gradient-to-br from-landing_primary-500 via-landing_primary-600 to-landing_primary-700 dark:from-landing_primary-600 dark:via-landing_primary-700 dark:to-landing_primary-800 p-4 md:p-6 transform hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-10 h-10 md:w-12 md:h-12 text-white animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            </Circle>
          </div>

          {/* Right - Output Video */}
          <div ref={outputRef} className="relative w-full max-w-xs mx-auto lg:max-w-sm transform hover:scale-102 transition-transform duration-200">
            <Card className="aspect-[9/16] rounded-2xl md:rounded-[2rem] overflow-hidden border-2 border-landing_primary-500/20 dark:border-landing_primary-400/30 shadow-xl hover:shadow-2xl transition-shadow duration-200">
              <div className="relative w-full h-full bg-gradient-to-b from-landing_primary-500/10 dark:from-landing_primary-400/5 to-landing_primary-500/30 dark:to-landing_primary-400/20">
                <img 
                  src="/api/placeholder/400/720" 
                  alt="Video Output" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-between p-3 md:p-4 bg-gradient-to-b from-black/20 via-transparent to-black/60">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-full px-2 md:px-3 py-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-xs text-white font-medium">LIVE</span>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm rounded-full px-2 md:px-3 py-1">
                      <span className="text-xs text-white font-medium">1:00</span>
                    </div>
                  </div>
                  <div className="space-y-3 md:space-y-4">
                    <div className="text-xl md:text-2xl font-bold text-white text-shadow">
                      LOOKING FOR A
                    </div>
                    <div className="flex items-center gap-3 md:gap-4">
                      <button className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-gradient-to-r from-landing_primary-500 to-landing_primary-600 dark:from-landing_primary-600 dark:to-landing_primary-700 flex items-center justify-center hover:opacity-90 transition-opacity duration-200">
                        <Play className="w-4 h-4 md:w-5 md:h-5 text-white" />
                      </button>
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-gradient-to-r from-landing_primary-500 to-landing_primary-600 dark:from-landing_primary-600 dark:to-landing_primary-700 rounded-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            <div ref={outputRef} className="absolute left-0 top-1/2 w-4 h-4" />
          </div>
        </div>

        {/* Animated Beams */}
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={scriptRef}
          toRef={processingRef}
          dotted={false}
          dotSpacing={8}
          pathWidth={2}
          gradientStartColor="var(--landing-primary-500)"
          gradientStopColor="var(--landing-primary-600)"
          delay={isTypingComplete ? 0.5 : 0} // Start after typing completes
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={actorRef}
          toRef={processingRef}
          dotted={false}
          dotSpacing={4}
          pathWidth={2}
          gradientStartColor="var(--landing-primary-500)"
          gradientStopColor="var(--landing-primary-600)"
          delay={isTypingComplete ? 1 : 0} // Start after typing completes
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={videoRef}
          toRef={processingRef}
          dotted={false}
          dotSpacing={8}
          pathWidth={2}
          gradientStartColor="var(--landing-primary-500)"
          gradientStopColor="var(--landing-primary-600)"
          delay={isTypingComplete ? 1.5 : 0} // Start after typing completes
        />
        <AnimatedBeam
          containerRef={containerRef}
          fromRef={processingRef}
          toRef={outputRef}
          dotted={false}
          dotSpacing={8}
          pathWidth={2}
          gradientStartColor="var(--landing-primary-500)"
          gradientStopColor="var(--landing-primary-600)"
          delay={isTypingComplete ? 2 : 0} // Start after typing completes
        />
      </div>
    </div>
  );
};

export default FlowDiagram;