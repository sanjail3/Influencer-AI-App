import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
            <div className="flex items-center">
              <a href="#" className="flex items-center space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-landing_primary-600 dark:text-landing_primary-400">
                  Influencer AI
                </span>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-6">
                <a href="#features" className="nav-link">
                  Features
                </a>
                <a href="#pricing" className="nav-link">
                  Pricing
                </a>
                <a href="#solution" className="nav-link">
                  Solution
                </a>
                <a href="#testimonials" className="nav-link">
                  Testimonials
                </a>
                <ThemeToggle />
                <a
                  href="#"
                  className="inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-landing_primary-600 hover:bg-landing_primary-700 transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105"
                >
                  Get Started
                </a>
              </div>
            </div>
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
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
          <div className="mx-4 mt-2 rounded-2xl bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm p-4">
            <div className="space-y-2">
              <a href="#features" className="mobile-nav-link">
                Features
              </a>
              <a href="#pricing" className="mobile-nav-link">
                Pricing
              </a>
              <a href="#solution" className="mobile-nav-link">
                Solution
              </a>
              <a href="#testimonials" className="mobile-nav-link">
                Testimonials
              </a>
              <a
                href="#"
                className="block px-4 py-2.5 rounded-full text-center text-base font-medium text-white bg-landing_primary-600 hover:bg-landing_primary-700 transition-all duration-200 hover:scale-105"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
