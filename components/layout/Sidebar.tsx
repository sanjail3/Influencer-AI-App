"use client";
import { UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  FolderKanban,
  Calendar,
  Coins,
  UserCircle,
  Settings,
  HelpCircle,
  Menu,
  Rocket
} from "lucide-react";
import { useState } from "react";

import { getUserCredits } from '@/lib/database/user'

const sidebarItems = [
  {
    title: "Projects",
    icon: FolderKanban,
    href: "/projects",
  },
  {
    title: "Social Schedule",
    icon: Calendar,
    href: "/schedule",
  },
  {
    title: "Credits",
    icon: Coins,
    href: "/credits",
    badge: "23",
  },
  {
    title: "Profile",
    icon: UserCircle,
    href: "/profile",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "/help",
  },
];

export  function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  // const credits = await getUserCredits()

  // useEffect(() => {
  //   const updateCredits = async () => {
  //     try {
  //       const response = await fetch('/api/credits')
  //       const data = await response.json()
  //       setCredits(data.credits)
  //     } catch (error) {
  //       console.error('Failed to fetch credits:', error)
  //     }
  //   }

  //   // Update credits every minute
  //   const interval = setInterval(updateCredits, 60000)
  //   return () => clearInterval(interval)
  // }, [])

  return (
    <div
      className={cn(
        "flex flex-col h-screen fixed left-0 top-0 bottom-0 bg-gradient-to-b from-purple-950/50 via-black/50 to-black/50 border-r border-purple-800/20 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Rocket className="h-6 w-6 text-purple-600" />
            <span className="text-2xl font-bold bg-gradient-to-r from-[#d550ac] to-[#7773FA] text-transparent bg-clip-text">
            Influencer AI
          </span>
          </div>
        
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-purple-300 hover:text-white hover:bg-purple-900/50"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 py-8">
        {sidebarItems.map((item) => (
          <Button
            key={item.title}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 p-3 mb-2 text-purple-300 hover:text-white hover:bg-purple-900/50 relative group",
              collapsed && "justify-center"
            )}
          >
            <item.icon className="h-5 w-5" />
            {!collapsed && <span>{item.title}</span>}
            {item.badge && !collapsed && (
              <span className="absolute right-3 bg-gradient-to-r from-[#d550ac] to-[#7773FA] px-2 py-0.5 rounded-full text-xs">
                {item.badge}
              </span>
            )}
            {collapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-purple-900 rounded-md text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                {item.title}
              </div>
            )}
          </Button>
        ))}
      </div>

      {/* User Profile Button */}
      <div className="p-4 border-t border-purple-800/20">
        <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-2")}>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10"
              }
            }}
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-purple-300 truncate">
                Profile
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}