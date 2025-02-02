"use client";

import { Rocket, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface CreatePageHeaderProps {
  title: string;
  subtitle: string;
}

export function CreatePageHeader({ title, subtitle}: CreatePageHeaderProps) {
  const [credits, setCredits] = useState(0);
  const router = useRouter();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetch('/api/user/credits');
        if (!response.ok) throw new Error('Failed to fetch user data');
        const data = await response.json();
        setCredits(data.current);
      } catch (error) {
        console.error('Error fetching credits:', error);
      }
    };

    fetchCredits();
  }, []);

  const handleLogoClick = () => {
    router.push(`${appUrl}/dashboard`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-8 p-4 w-full">
      <div 
        onClick={handleLogoClick}
        className="flex items-center gap-2 cursor-pointer transform hover:scale-105 transition-transform duration-200"
      >
        <Rocket className="h-8 w-8 sm:h-10 sm:w-10 text-purple-600" />
        <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-400 to-purple-400 text-transparent bg-clip-text whitespace-nowrap">
          Influencer AI
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
        <span className="text-purple-200 font-bold text-lg sm:text-xl">
          {credits} credits
        </span>
        <Button
          className={cn(
            "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400",
            "flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full font-medium text-white",
            "transform hover:scale-105 transition-all duration-300",
            "shadow-lg hover:shadow-purple-500/20",
            "w-full sm:w-auto"
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span className="whitespace-nowrap">Upgrade to Pro</span>
        </Button>
      </div>
    </div>
  );
}