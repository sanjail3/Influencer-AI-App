"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { FeaturedProducts } from "@/components/dashboard/FeaturedProducts";
import { PopularTools } from "@/components/dashboard/PopularTools";
import { Button } from "@/components/ui/button";
import  CurvedDashboardHero  from "@/components/dashboard/CurvyDashboardHero";

import { navLinks } from "@/constants"

import Image from "next/image"
import Link from "next/link"

export default function Dashboard() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black text-white">
      <Sidebar />
    
      
      
      <div className="ml-64">
        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <CurvedDashboardHero />
          <FeaturedProducts />
          <PopularTools />
        </main>
      </div>
    </div>
  );
}