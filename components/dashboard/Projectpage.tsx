

"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Trash2, Play, Pause, Video, Plus, Calendar, MoreVertical, Volume2, VolumeX } from "lucide-react";
import { LoadingSpinner } from "@/components/create/LoadingSpinner";
import { CreateProjectDialog } from "./CreateProjectDialog";
import { Toaster, toast } from "sonner";
import GradientSpinner from "./GradientSpinner";

interface Project {
  id: string;
  name: string;
  websiteUrl: string;
  createdAt: string;
  videos: Video[];
  taskId?: string;
}

interface Video {
  id: string;
  title: string;
  blobUrl: string;
  createdAt: string;
  status: string;
}

interface TaskProgress {
  progress: number;
  status: string;
  message: string;
  result?: {
    video_url?: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";

async function checkTaskStatus(taskId: string): Promise<TaskProgress> {
  try {
    const response = await fetch(`${API_URL}/api/task-status/${taskId}`);
    if (response.status === 500) {
      throw new Error("SERVER_ERROR");
    }
    if (!response.ok) {
      throw new Error("Failed to fetch task status");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message === "SERVER_ERROR") {
      throw error;
    }
    console.error("Error checking task status:", error);
    throw error;
  }
}

const VideoThumbnail = ({ video, onPlay }: { video: Video; onPlay: () => void }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (video.status === "PENDING" || video.status === "PROCESSING") {
      toast.warning("Video is still processing. Please wait.");
      return;
    }
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
        onPlay();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/40 to-pink-900/20">
      {video.status === "PENDING" || video.status === "PROCESSING" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <GradientSpinner />
        </div>
      ) : (
        <video
          ref={videoRef}
          src={video.blobUrl}
          className="h-full w-full object-cover"
          muted={isMuted}
          loop
          playsInline
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center transition-opacity hover:bg-black/50">
        <div className="flex space-x-2">
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-purple-100" />
            ) : (
              <Play className="h-5 w-5 text-purple-100" />
            )}
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm"
            onClick={toggleMute}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-purple-100" />
            ) : (
              <Volume2 className="h-5 w-5 text-purple-100" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [taskProgress, setTaskProgress] = useState<Record<string, TaskProgress>>({});
  const router = useRouter();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data);

      // Check for pending videos and fetch their progress
      data.forEach((project: Project) => {
        const pendingVideo = project.videos.find((video) => video.status === "PENDING");
        if (pendingVideo && project.taskId) {
          fetchTaskProgress(project.taskId);
        }
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      toast.error("Failed to fetch projects");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTaskProgress = async (taskId: string) => {
    try {
      const progress = await checkTaskStatus(taskId);
      setTaskProgress((prev) => ({ ...prev, [taskId]: progress }));

      if (progress.status === "SUCCESS" && progress.result?.video_url) {
        // Update the video status to COMPLETED
        await updateVideoStatus(taskId, progress.result.video_url);
        fetchProjects(); // Refresh the projects list
      }
    } catch (error) {
      console.error("Error fetching task progress:", error);
      toast.error("Failed to fetch task progress");
    }
  };

  const updateVideoStatus = async (taskId: string, videoUrl: string) => {
    try {
      const response = await fetch("/api/videos/update-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          taskId,
          status: "COMPLETED",
          videoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update video status");
      }
      toast.success("Video status updated successfully");
    } catch (error) {
      console.error("Error updating video status:", error);
      toast.error("Failed to update video status");
    }
  };

  const handleDeleteVideo = async (projectId: string, videoId: string) => {
    try {
      await fetch(`/api/videos/${videoId}`, {
        method: "DELETE",
      });
      fetchProjects();
      toast.success("Video deleted successfully");
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Failed to delete video");
    }
  };

  const handleDeleteProject = async (projectId: string) => {
    try {
      const project = projects.find((p) => p.id === projectId);
      if (!project) {
        toast.error("Project not found");
        return;
      }

      // Delete all videos associated with the project
      for (const video of project.videos) {
        await fetch(`/api/videos/${video.id}`, {
          method: "DELETE",
        });
      }

      // Delete the project
      await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      fetchProjects();
      toast.success("Project and associated videos deleted successfully");
    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner text="Fetching projects..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-300 via-pink-400 to-purple-400 text-transparent bg-clip-text">
            Your Projects
          </h1>
          <div className="w-full md:w-auto">
            <CreateProjectDialog>
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 transition-all w-full group">
                <Plus className="w-4 h-4 mr-2 text-purple-100 group-hover:text-white" />
                <span className="text-purple-50 group-hover:text-white">New Project</span>
              </Button>
            </CreateProjectDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => {
            const pendingVideo = project.videos.find((video) => video.status === "PENDING");
            const taskId = project.taskId;
            const progress = taskId ? taskProgress[taskId] : null;

            return (
              <Card
                key={project.id}
                className="bg-slate-900/30 backdrop-blur-sm border border-slate-700/30 hover:border-purple-500/50 transition-all overflow-hidden hover:shadow-xl hover:-translate-y-1"
              >
                <div className="relative">
                  {project.videos.length > 0 ? (
                    <VideoThumbnail
                      video={project.videos[0]}
                      onPlay={() => setActiveVideo(project.videos[0].id)}
                    />
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-pink-900/10 flex items-center justify-center">
                      <Video className="w-12 h-12 text-purple-400/30" />
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-purple-50">{project.name}</h3>
                      <div className="flex items-center text-purple-300/80 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {new Date(project.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-purple-200 hover:text-white">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                        <DropdownMenuItem
                          className="focus:bg-slate-700 text-purple-100"
                          onClick={() => router.push(`/create/video?projectId=${project.id}`)}
                        >
                          <Plus className="w-4 h-4 mr-2 text-purple-300" />
                          New Video
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="focus:bg-red-900/30 text-red-400"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Project
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className="space-y-3">
                    {project.videos.map((video) => (
                      <div
                        key={video.id}
                        className="group bg-slate-800/20 hover:bg-slate-700/30 rounded-lg p-3 flex items-center justify-between transition-all border border-slate-700/30"
                      >
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <div className="w-10 h-10 bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Video className="w-5 h-5 text-purple-400" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-medium text-purple-50 truncate">{video.title}</h4>
                            {video.status === "PENDING" || video.status === "PROCESSING" ? (
                              <div className="mt-1 flex items-center space-x-2">
                                <GradientSpinner />
                                <span className="text-sm text-purple-200">Processing...</span>
                              </div>
                            ) : (
                              <Badge
                                variant="outline"
                                className="mt-1 border-none bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-200"
                              >
                                {video.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-purple-300 hover:bg-purple-500/20"
                            onClick={() =>
                              router.push(
                                `/create/video/output?url=${encodeURIComponent(video.blobUrl)}&projectId=${project.id}`
                              )
                            }
                          >
                            <Play className="w-4 h-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="text-red-400 hover:bg-red-500/20"
                            onClick={() => handleDeleteVideo(project.id, video.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {pendingVideo && progress && (
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${progress.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-2">
                        {progress.message || "Processing your video..."}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    
    </div>
  );
}