import { Menu, X, LayoutDashboard } from 'lucide-react';
import { Rocket, Sparkles } from "lucide-react";
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { UserButton, useUser } from "@clerk/nextjs";
import Link from 'next/link';
import Image from 'next/image';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isSignedIn } = useUser();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div
        className={`mx-4 sm:mx-6 lg:mx-8 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 dark:bg-gray-900/90 shadow-lg backdrop-blur-sm rounded-full'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
                <Rocket className="h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 md:h-10 md:w-10 text-purple-600 dark:text-purple-400" />
                <span className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-landing_primary-500 to-landing_primary-700 dark:from-landing_primary-400 dark:to-landing_primary-600 bg-clip-text text-transparent whitespace-nowrap">
                  Influencer AI
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <a href="#features" className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">Features</a>
                <a href="#pricing" className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">Pricing</a>
                <a href="#benefits" className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">Benefits</a>
                <a href="#howitworks" className="text-base sm:text-lg lg:text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">How it works</a>
                <div className="border border-gray-200 dark:border-gray-700 rounded-full p-1">
                  <ThemeToggle />
                </div>
                {isSignedIn ? (
                  <div className="flex items-center space-x-4">
                    <Link
                      href="/dashboard"
                      className="inline-flex items-center px-6 py-2.5 space-x-2 border border-transparent text-lg font-medium rounded-full text-white bg-landing_primary-600 hover:bg-landing_primary-700 dark:bg-landing_primary-600 dark:hover:bg-landing_primary-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                    >
                      <LayoutDashboard className="w-5 h-5" />
                      <span>Dashboard</span>
                    </Link>
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "w-10 h-10 rounded-full ring-2 ring-landing_primary-500 dark:ring-landing_primary-400",
                          userButtonPopoverCard: "dark:bg-gray-900 dark:border-gray-800",
                          userButtonPopoverText: "dark:text-gray-200",
                          userButtonPopoverActionButton: "dark:hover:bg-gray-800",
                          userButtonPopoverActionButtonText: "dark:text-gray-200",
                        }
                      }}
                      afterSignOutUrl="/"
                    />
                  </div>
                ) : (
                  <a
                    href="/sign-up"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-lg font-medium rounded-full text-white bg-landing_primary-600 hover:bg-landing_primary-700 dark:bg-landing_primary-600 dark:hover:bg-landing_primary-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                  >
                    Get Started
                  </a>
                )}
              </div>
            </div>
            <div className="md:hidden flex items-center space-x-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-full p-1">
                <ThemeToggle />
              </div>
              {isSignedIn && (
                <>
                  <Link
                    href="/dashboard"
                    className="p-2 rounded-full text-landing_primary-600 hover:bg-landing_primary-50 dark:text-landing_primary-400 dark:hover:bg-landing_primary-900/20 transition-colors"
                  >
                    <LayoutDashboard className="w-6 h-6" />
                  </Link>
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 rounded-full ring-2 ring-landing_primary-500 dark:ring-landing_primary-400",
                        userButtonPopoverCard: "dark:bg-gray-900 dark:border-gray-800",
                        userButtonPopoverText: "dark:text-gray-200",
                        userButtonPopoverActionButton: "dark:hover:bg-gray-800",
                        userButtonPopoverActionButtonText: "dark:text-gray-200",
                      }
                    }}
                    afterSignOutUrl="/"
                  />
                </>
              )}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-800"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full">
          <div className="mx-4 mt-2 rounded-2xl bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm p-6">
            <div className="space-y-4">
              <a href="#features" className="block text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">Features</a>
              <a href="#pricing" className="block text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">Pricing</a>
              <a href="#benefits" className="block text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">Benefits</a>
              <a href="#howitworks" className="block text-xl font-medium text-gray-800 hover:text-landing_primary-600 dark:text-gray-100 dark:hover:text-landing_primary-400 transition-colors">How It Works</a>
              {!isSignedIn && (
                <a
                  href="/sign-up"
                  className="block px-6 py-3 rounded-full text-center text-lg font-medium text-white bg-landing_primary-600 hover:bg-landing_primary-700 dark:bg-landing_primary-600 dark:hover:bg-landing_primary-700 transition-all duration-200 hover:scale-105"
                >
                  Get Started
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}