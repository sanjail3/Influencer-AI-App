"use client";

import { useSearchParams } from 'next/navigation';
import { VideoPlayer } from "@/components/video/Videoplayer";
import { VideoControls } from "@/components/video/VideoController";
import { LoadingSpinner } from "@/components/create/LoadingSpinner";
import { CreatePageHeader } from '@/components/create/CreatePageHeader';
import React, { Suspense } from 'react';

export default function VideoOutputPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VideoOutputContent />
    </Suspense>
  );
}

function VideoOutputContent() {
  const searchParams = useSearchParams();
  const videoUrl = searchParams.get('url');

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