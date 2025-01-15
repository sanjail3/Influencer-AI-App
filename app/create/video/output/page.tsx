"use client";

import { useSearchParams } from 'next/navigation';
import { VideoPlayer } from "@/components/video/Videoplayer";
import { VideoControls } from "@/components/video/VideoController";

import { LoadingSpinner } from "@/components/create/LoadingSpinner";
import { VideoMetadata } from '@/components/video/VideoMetadata';
import { CreatePageHeader } from '@/components/create/CreatePageHeader';

export default function VideoOutputPage() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('url');
//   const metadata = {
//     duration: searchParams.get('duration') || '00:00',
//     style: searchParams.get('style') || 'Modern & Dynamic',
//     music: searchParams.get('music') || 'Unknown',
//     avatar: searchParams.get('avatar') || 'Unknown',
//   };

  if (!videoUrl) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/40 via-black to-black">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CreatePageHeader 
          title="AI Video Ads" 
          subtitle="Generate videos from your product links" 
        />
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 flex flex-col items-center">
            <VideoPlayer videoUrl={videoUrl} />
            <VideoControls videoUrl={videoUrl} />
          </div>
          {/* <VideoMetadata metadata={metadata} /> */}
        </div>
      </div>
    </div>
  );
}