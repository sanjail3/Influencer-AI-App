"use client";

import { useEffect } from 'react';

import { Navbar } from '@/components/landingpage/Navbar';
import { Hero } from '@/components/landingpage/Hero';
import { Features } from '@/components/landingpage/Features';
import { Benefits } from '@/components/landingpage/Benefits';
import HowItWorks  from '@/components/landingpage/HowItWorks';
import PricingPage  from '@/components/landingpage/LandingPricing';
import {TestimonialsPage}  from '@/components/landingpage/Testimonials';
import { FAQ } from '@/components/landingpage/FAQ';
import { CTA } from '@/components/landingpage/CTA';
import { Footer } from '@/components/landingpage/Footer';
import FlowDiagram from '@/components/landingpage/Flow';
import UGCComparison from '@components/landingpage/Comparison';



function App() {
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <Navbar />
      <div className='h-10'></div>
      <Hero />
      <Features />
      <UGCComparison />
      <Benefits />
      <HowItWorks />
      <FlowDiagram />
      <PricingPage />
      <TestimonialsPage />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;