import React from 'react';
import clsx from 'clsx';
import { GlowBg } from '@/components/shared/glow-bg';

type VideoPosition = 'left' | 'right' | 'center';
type TextPosition = 'center' | 'left';
type VariantType = 'primary' | 'secondary';

interface YouTubeEmbedProps {
  videoId: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
}

interface LandingYouTubeFeatureProps {
  children?: React.ReactNode;
  className?: string;
  innerClassName?: string;
  title?: string | React.ReactNode;
  titleComponent?: React.ReactNode;
  description?: string | React.ReactNode;
  descriptionComponent?: React.ReactNode;
  textPosition?: TextPosition;
  youtubeVideoId?: string;
  videoPosition?: VideoPosition;
  videoMaxWidth?: string;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  loop?: boolean;
  zoomOnHover?: boolean;
  minHeight?: number;
  withBackground?: boolean;
  withBackgroundGlow?: boolean;
  variant?: VariantType;
  backgroundGlowVariant?: VariantType;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ 
  videoId, 
  className, 
  autoPlay = false,
  muted = true,
  controls = true,
  loop = false
}) => {
  // Construct YouTube URL with parameters
  const params = new URLSearchParams({
    autoplay: autoPlay ? '1' : '0',
    mute: muted ? '1' : '0',
    controls: controls ? '1' : '0',
    loop: loop ? '1' : '0',
    playlist: loop ? videoId : '', // Required for looping
  });

  return (
    <div className={clsx('relative w-full pt-[56.25%]', className)}>
      <iframe
        className="absolute inset-0 w-full h-full rounded-md"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};

export const LandingYouTubeFeature: React.FC<LandingYouTubeFeatureProps> = ({
  children,
  className,
  innerClassName,
  title,
  titleComponent,
  description,
  descriptionComponent,
  textPosition = 'left',
  youtubeVideoId,
  videoPosition = 'right',
  videoMaxWidth = 'none',
  autoPlay,
  muted = true,
  controls = true,
  loop = false,
  zoomOnHover = false,
  minHeight = 350,
  withBackground = false,
  withBackgroundGlow = false,
  variant = 'primary',
  backgroundGlowVariant,
}) => {
  return (
    <section
      className={clsx(
        'w-full flex flex-col justify-center items-center gap-8 py-12 lg:py-16',
        withBackground && variant === 'primary'
          ? 'bg-primary-100/20 dark:bg-primary-900/10'
          : '',
        withBackground && variant === 'secondary'
          ? 'bg-secondary-100/20 dark:bg-secondary-900/10'
          : '',
        withBackgroundGlow ? 'overflow-hidden' : '',
        className,
      )}
    >
      <div
        className={clsx(
          'w-full p-6 flex flex-col items-center relative',
          videoPosition === 'center'
            ? 'container-narrow'
            : 'max-w-full container-ultrawide grid lg:grid-cols-12 gap-8 lg:gap-16',
          textPosition === 'center' ? 'items-center' : 'items-start',
          innerClassName,
        )}
        style={{
          minHeight,
        }}
      >
        

        {withBackgroundGlow ? (
          <div className="hidden lg:flex justify-center w-full h-full absolute pointer-events-none">
            <GlowBg
              className={clsx('w-full lg:w-1/2 h-auto z-0')}
              variant={backgroundGlowVariant}
            />
          </div>
        ) : null}

        {youtubeVideoId ? (
          <>
            {videoPosition === 'center' ? (
              <section className="w-full mt-auto pt-6 md:pt-8">
                <YouTubeEmbed
                  className={clsx(
                    'w-full',
                    zoomOnHover ? 'hover:scale-110 transition-all' : '',
                  )}
                  videoId={youtubeVideoId}
                  autoPlay={autoPlay}
                  muted={muted}
                  controls={controls}
                  loop={loop}
                />
              </section>
            ) : null}

            {videoPosition === 'left' || videoPosition === 'right' ? (
              <YouTubeEmbed
                className={clsx(
                  'w-full lg:col-span-7',
                  zoomOnHover ? 'hover:scale-110 transition-all' : '',
                )}
                videoId={youtubeVideoId}
                autoPlay={autoPlay}
                muted={muted}
                controls={controls}
                loop={loop}
              />
            ) : null}
          </>
        ) : null}
      </div>
    </section>
  );
};

export default LandingYouTubeFeature;