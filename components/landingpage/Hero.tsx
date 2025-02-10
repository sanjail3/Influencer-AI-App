import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import HeroVideoDialog from "@/components/ui/hero-video-dialog";
import { AvatarCircles } from "@/components/ui/avatar-circles";
import { LandingProductVideoFeature } from '@/components/ui/landingProductFeature';
import ProductFeatures from "../ui/videofeature";

const avatars = [
  {
    imageUrl: "https://avatars.githubusercontent.com/u/16860528",
    profileUrl: "https://github.com/dillionverma",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/20110627",
    profileUrl: "https://github.com/tomonarifeehan",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/106103625",
    profileUrl: "https://github.com/BankkRoll",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59228569",
    profileUrl: "https://github.com/safethecode",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/59442788",
    profileUrl: "https://github.com/sanjay-mali",
  },
  {
    imageUrl: "https://avatars.githubusercontent.com/u/89768406",
    profileUrl: "https://github.com/itsarghyadas",
  },
];

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-landing_primary-50 to-white dark:from-gray-900 dark:via-landing_primary-900/20 dark:to-gray-900 -z-10" />

      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-32">
        <div className="text-center">
          {/* Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl px-4"
          >
            <span className="block mb-2">          {/* Animated Heading */}Launch UGC Ads 10x Faster
            </span>
            <span className="block text-landing_primary-600 dark:text-landing_primary-400">
            AI Creates, You Scale!
            </span>
          </motion.h1>

          {/* Animated Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl px-4"
          >
            Create high-converting UGC ads in minutes with AI Avatars. No shoots, no contracts – just instant, engaging content that drives sales.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8 px-4"
          >
            <div className="rounded-md shadow w-full sm:w-auto">
              <a
                href="/sign-up"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-landing_primary-600 hover:bg-landing_primary-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 hover:shadow-lg hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 items-center justify-center"
          >
            <h2 className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-4">
              Trusted by
            </h2>
            <div className="flex items-center justify-center">
            <AvatarCircles numPeople={99} avatarUrls={avatars} className="items-center" />
            </div>
          </motion.div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12"
          >
            <LandingProductVideoFeature
              textPosition="center"
              videoPosition="center"
              withBackground
              variant="primary"
              title="Add your branding & theme"
              description="Choose from more than 30+ themes or create your own. Upload your logo, set the size and we take care of the rest."
              autoPlay={false}
              controls={false}
              videoSrc="https://cache.shipixen.com/features/3-theme-and-logo.mp4"
            />
          </motion.div>

          {/* Trusted By Section */}

          <ProductFeatures />
         
        </div>
      </div>
    </div>
  );
}




