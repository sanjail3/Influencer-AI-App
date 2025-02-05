import { ReactNode, forwardRef, useRef, Ref } from "react";
import { HTMLMotionProps, motion, useSpring, useTransform } from "framer-motion";
import Balancer from "react-wrap-balancer";

import { cn } from "@/lib/utils";

interface FeatureCardProps extends HTMLMotionProps<"div"> {
  feature: {
    title: ReactNode;
    category: string;
    videoUrl: string; // Changed from imageUrl to videoUrl
    posterUrl?: string; // Optional thumbnail for the video
  };
  zIndexOffset?: number;
}

const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  ({ feature, className, zIndexOffset = 0, ...props }, ref) => {
    const { title, category, videoUrl, posterUrl } = feature;
    const springValue = useSpring(0, {
      bounce: 0,
    });
    const zIndex = useTransform(springValue, (value) => +Math.floor(value * 10) + 10 + zIndexOffset);
    const scale = useTransform(springValue, [0, 1], [1, 1.1]);

    const validProps = Object.entries(props).reduce((acc: { [key: string]: any }, [key, value]) => {
      if (key !== 'ref' && typeof value !== 'string') {
        acc[key] = value;
      }
      return acc;
    }, {});

    const content = (
      <>
        <video
          src={videoUrl}
          poster={posterUrl}
          className="-z-1 absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="z-10 flex h-full w-full flex-col gap-4 bg-gradient-to-t from-zinc-800/50 from-15% to-transparent p-6">
          <small className="inline w-fit rounded-xl bg-orange-950 bg-opacity-50 px-4 py-2 text-sm font-medium leading-none text-white">
            {category}
          </small>

          <div className="flex-1" />
          <h3 className="rounded-xl bg-blue-950 bg-opacity-40 p-6 text-xl font-bold leading-none text-white backdrop-blur-sm">
            {title}
          </h3>
        </div>
      </>
    );

    const containerClassName = cn(
      "relative flex h-[30rem] w-80 flex-col overflow-hidden rounded-2xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-2xl",
      className
    );

    return (
      <>
        <motion.div
          ref={ref}
          {...validProps}
          onMouseEnter={() => springValue.set(1)}
          onMouseLeave={() => springValue.set(0)}
          style={{
            zIndex,
            scale,
          }}
          className={cn(containerClassName, "hidden sm:flex ")}
        
        >
          {content}
        </motion.div>
        <motion.div
          initial={{ y: 100 }}
          whileInView={{ y: 0, transition: { duration: 0.5 } }}
          className={cn(containerClassName, "flex sm:hidden cursor-pointer")}
        >
          {content}
        </motion.div>
      </>
    );
  }
);

export default function ProductFeatures() {
  const cardWidth = 80 * 4; // w-80 x 4
  const angle = 6;
  const yOffset = 50;
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <section className="storybook-fix flex w-full flex-col items-center gap-8 py-16">
      <h2 className="text-4xl font-bold text-gray-800 text-center">AI-Generated UGC Ads That Look 100% Real!</h2>
      <p className="text-gray-600 max-w-3xl text-center text-lg">
      AI-generated influencers that look, sound, and sell like real people!
      </p>

      <div className="relative flex w-full flex-wrap justify-center gap-16 px-6 py-16 sm:flex-row sm:gap-8 lg:max-w-screen-xl">
        <FeatureCard
          ref={cardRef}
          feature={{
            category: "Vases",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            posterUrl: "https://via.placeholder.com/400x500?text=Vase+Thumbnail",
            title: "Elegant Swirling Glass Vase",
          }}
          initial={{
            x: cardWidth,
            y: yOffset,
            opacity: 0,
            rotate: 0,
            scale: 0.9,
          }}
          animate={{
            x: yOffset,
            y: 10,
            opacity: 1,
            scale: 0.95,
            rotate: -angle,
            transition: {
              type: "spring",
              delay: 0.8,
            },
          }}
        />

        <FeatureCard
          feature={{
            category: "Jugs",
            title: "Artisanal Ceramic Jug",
            videoUrl: "https://www.w3schools.com/html/movie.mp4",
            posterUrl: "https://via.placeholder.com/400x500?text=Jug+Thumbnail",
          }}
          initial={{
            y: yOffset,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
            transition: {
              type: "spring",
              delay: 0.4,
            },
          }}
          zIndexOffset={1}
        />

        <FeatureCard
          feature={{
            category: "Bottles",
            title: "Colorful Gradient Glass Bottle",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            posterUrl: "https://via.placeholder.com/400x500?text=Bottle+Thumbnail",
          }}
          initial={{
            x: -cardWidth,
            y: yOffset,
            opacity: 0,
            rotate: 0,
            scale: 0.9,
          }}
          animate={{
            x: -yOffset,
            y: 10,
            opacity: 1,
            rotate: angle,
            scale: 0.95,
            transition: {
              type: "spring",
              delay: 0.6,
            },
          }}
        />
      </div>
    </section>
  );
}