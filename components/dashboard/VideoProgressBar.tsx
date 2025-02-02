import React from 'react';

interface VideoProgressBarProps {
  progress: number;
  className?: string;
}

export function VideoProgressBar({ progress, className = '' }: VideoProgressBarProps) {
  return (
    <div className={`w-full bg-slate-700 rounded-full h-1.5 ${className}`}>
      <div 
        className="bg-purple-500 h-1.5 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}