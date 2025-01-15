"use client";

import { Rocket } from "lucide-react";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreatePageHeaderProps {
  title: string;
  subtitle: string;
}

export function CreatePageHeader({ title, subtitle }: CreatePageHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex px-4 gap-2">
            <Rocket className="h-10 w-10 text-purple-600" />
            <span className="text-3xl font-bold bg-gradient-to-r from-[#d550ac] to-[#7773FA] text-transparent bg-clip-text">
            Influencer AI
          </span>
      </div>
     
      <div className="flex items-center gap-5">
        <span className="text-purple-200 font-bold text-xl">10 credits</span>
        <Button
            className={cn(
              "bg-gradient-to-r from-[#d550ac] to-[#7773FA] hover:opacity-90 transition-all",
              "flex items-center gap-2 px-6 py-2 rounded-full font-medium text-white"
            )}
          >
            <Sparkles className="w-4 h-4" />
            Upgrade to Pro
          </Button>
      </div>
    </div>
  );
}