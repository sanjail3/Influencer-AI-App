// "use client";
// import { useState, useEffect, useRef } from 'react';
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Creator, Voice } from "@/lib/types/creator";
// import { Play, Pause, Volume2, Music2 } from "lucide-react";
// import { ParallaxScroll } from '../ui/parralex-scroll';
// import AiButton from '../ui/ai-button';
// import { generateVideo } from '@/lib/api/videogeneration';
// import { useRouter } from 'next/navigation';
// import { LoadingSpinner } from './LoadingSpinner';
// import { MultiStepLoader as Loader } from "../ui/multi-step-loader";
// import { useSearchParams } from 'next/navigation';
// import { Toaster, toast } from 'sonner';
// import { getSignedInUser } from '@/lib/database/utils';


// // In your JSX
// <Toaster position="top-right" richColors />


// interface CreatorSelectorProps {
//   creators: Creator[];
//   voices: Record<string, Voice>;
//   onBack: () => void;
//   onNext: (creator: Creator, voice: Voice) => void;
//   screenshot_data: string
//   selectedScript: string|null
// }

// interface VideoData {
//   voice: {
//     voice_id: string;
//     output_format: string;
//     model_id: string;
//   };
//   avatar: {
//     avatar_id: string;
//     background_type: string;
//   };
//   video: {
//     duration: number;
//     fps: number;
//     background_color: string;
//   };
//   screenshot_path: string;
//   script: string|null;
// }

// const loadingStates = [
//   {
//     text: "Genrating background video",
//   },
//   {
//     text: "Genrating voiceover",
//   },
//   {
//     text: "Lipsyncing video",
//   },
//   {
//     text: "Combining all elements",
//   },
//   {
//     text: "Stiching your video",
//   },
//   {
//     text: "Finalizing your video",
//   },
  
// ];


  


// export function CreatorSelector({ creators, voices, onBack, onNext,screenshot_data,selectedScript }: CreatorSelectorProps) {
//   const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
//   const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
//   const [activeAudio, setActiveAudio] = useState<string | null>(null);
//   const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
//   const audioRef = useRef<HTMLAudioElement | null>(null);
//   const base64string = screenshot_data.replace(/^data:image\/\w+;base64,/, '');
//   const [isLoading, setIsLoading] = useState(false);

//   const router = useRouter();
  

//   const [videoData, setVideoData] = useState<VideoData>({
//     voice: {
//       voice_id: "21m00Tcm4TlvDq8ikWAM",
//       output_format: 'mp3_44100_128',
//       model_id: 'eleven_multilingual_v2'
//     },
//     avatar: {
//       avatar_id: '002',
//       background_type: 'with_bg'
//     },
//     video: {
//       duration: 30,
//       fps: 30,
//       background_color: 'white'
//     },
//     screenshot_path: base64string,
//     script: selectedScript})

//     const updateVideoData = (newData: Partial<VideoData>) => {
//       setVideoData(prev => ({
//         ...prev,
//         ...newData
//       }));
//     }
  
  


//     const searchParams = useSearchParams();
//     const projectId = searchParams.get('projectId');
    
  
//     const saveVideoToProject = async (videoUrl: string) => {
//       try {
//         const response = await fetch('/api/videos', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             projectId,
//             title: 'AI Generated Video', // You can make this dynamic
//             description: selectedScript,
//             blobUrl: videoUrl,
//             status: 'COMPLETED'
            
//           }),
//         });
  
//         if (!response.ok) {
//           throw new Error('Failed to save video');
//         }
  
//         return await response.json();
//       } catch (error) {
//         console.error('Error saving video:', error);
//         throw error;
//       }
//     };
  
//     const handleGenerate = async () => {
//       setIsLoading(true);
//       if (selectedCreator) {
//         updateVideoData({
//           screenshot_path: screenshot_data,
//           script: selectedScript,
//           voice: { 
//             voice_id: "21m00Tcm4TlvDq8ikWAM",
//             output_format: 'mp3_44100_128',
//             model_id: 'eleven_multilingual_v2'
//           },
//           avatar: {
//             avatar_id: "002",
//             background_type: 'with_bg'
//           }
//         });
        
//         try {
//           const userresponse=await fetch('/api/user/validate-user');

//           const {userId}=await userresponse.json();
//           if (!userId) {
//             toast.error('Please sign in to generate videos');
//             return;
//           }
//           const checkResponse = await fetch('/api/user/check-subscription');

//           console.log(checkResponse)

//           console.log(checkResponse.ok)
        
//         if (!checkResponse.ok) {
//             const errorData = await checkResponse.json();
            
//             // Show specific toast based on error type
//             if (checkResponse.status === 401) {
//                 toast.error('Please login to generate videos');
//             } else if (errorData.errorType === 'INSUFFICIENT_CREDITS') {
//                 toast.error('You need more credits. Upgrade your plan or purchase more credits.');
//             } else if (errorData.errorType === 'NO_SUBSCRIPTION') {
//                 toast.error('Premium subscription required for video generation');
//             } else {
//                 toast.error('Failed to verify subscription status');
//             }
//             return;
//         }
//         if(!projectId){
//           toast.error('Please create a project');
//           return;
//         }
//           const response= await generateVideo(videoData,projectId,userId);
//           // const response="https://aisaasvalidator.blob.core.windows.net/video-gpt/generated_videos/tmp1419zo3d.mp4"

//           // Save video to database
//           const savedVideo = await saveVideoToProject(response);

//           console.log('Video saved to project:', savedVideo);
          
//           // Navigate to output page with project and video IDs
//           router.push(`/create/video/output?${new URLSearchParams({
//             url: response,
//             projectId: projectId || '',
//             videoId: savedVideo.id
//           })}`);
//         } catch (error) {
//           console.error('Error:', error);
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };
  



//   const musicTracks = [
//     { id: '1', name: 'Into the night', mood: 'Thriller', popularity: 'Popular' },
//     { id: '2', name: 'Unlock Me', mood: 'Motivational', popularity: 'Trending' },
//     { id: '3', name: 'Epic Background', mood: 'Emotional', popularity: 'Popular' },
//     { id: '4', name: 'Else - Paris', mood: 'Electronic', popularity: 'Popular' }
//   ];

//   const voicesArray = Object.values(voices);
//   const filteredVoices = voicesArray.filter(voice => 
//     selectedCreator && voice.gender === selectedCreator.gender
//   );

//   const handleAudioToggle = (voiceId: string, previewUrl: string) => {
//     if (activeAudio === voiceId) {
//       if (audioRef.current) {
//         audioRef.current.pause();
//         audioRef.current = null;
//       }
//       setActiveAudio(null);
//     } else {
//       if (audioRef.current) {
//         audioRef.current.pause();
//       }
//       audioRef.current = new Audio(previewUrl);
//       audioRef.current.play().catch(error => console.error('Audio playback failed:', error));
//       setActiveAudio(voiceId);
      
//       audioRef.current.onended = () => {
//         setActiveAudio(null);
//         audioRef.current = null;
//       };
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//           <LoadingSpinner text="Generating video..." />
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-screen-2xl mx-auto px-4">
//       <h2 className="text-3xl mb-8 font-semibold">Choose an actor</h2>

//       <div className="flex gap-8">
//         <div className="w-1/2">
//           <div className="overflow-hidden"> {/* Remove scrollbar */}
//             <ParallaxScroll 
//               videos={creators.map(creator => ({
//                 id: creator.id,
//                 url: creator.preview_url,
//                 name: creator.name,
//                 description: creator.description
//               }))}
//               onSelect={(video) => {
//                 const creator = creators.find(c => c.id === video.id);
//                 setSelectedCreator(creator || null);
//                 setSelectedVoice(null);
//               }}
//             />
//           </div>
//         </div>
        

//         <div className="w-1/2 space-y-8">
//           {/* <section>
//             <h2 className="text-2xl mb-6 font-semibold">Voice Settings</h2>
//             <div className="space-y-4">
//               {selectedCreator ? (
//                 filteredVoices.map((voice) => (
//                   <Card
//                     key={voice.voice_id}
//                     className={`p-4 cursor-pointer transition-all ${
//                       selectedVoice?.voice_id === voice.voice_id ? 'ring-2 ring-purple-500' : ''
//                     }`}
//                     onClick={() => setSelectedVoice(voice)}
//                   >
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <h4 className="text-lg font-semibold">{voice.name}</h4>
//                         <p className="text-sm opacity-80">{voice.description} • {voice.accent}</p>
//                       </div>
//                       <Button
//                         size="icon"
//                         className="bg-purple-900/80 hover:bg-purple-800"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           handleAudioToggle(voice.voice_id, voice.preview_url);
//                         }}
//                       >
//                         {activeAudio === voice.voice_id ? 
//                           <Pause className="h-4 w-4" /> : 
//                           <Volume2 className="h-4 w-4" />
//                         }
//                       </Button>
//                     </div>
//                   </Card>
//                 ))
//               ) : (
//                 <p className="text-center py-8 opacity-80">Please select an actor first</p>
//               )}
//             </div>
//           </section> */}

//           <section>
//             <h2 className="text-2xl mb-6 font-semibold">Background Music</h2>
//             <div className="grid grid-cols-2 gap-4">
//               {musicTracks.map((track) => (
//                 <Card
//                   key={track.id}
//                   className={`p-4 cursor-pointer transition-all hover:bg-purple-800/10 ${
//                     selectedMusic === track.id ? 'ring-2 ring-purple-500' : ''
//                   }`}
//                   onClick={() => setSelectedMusic(track.id)}
//                 >
//                   <div className="flex flex-col h-full">
//                     <div className="flex items-start justify-between mb-3">
//                       <Music2 className="h-8 w-8 text-purple-400" />
//                       <Button
//                         size="icon"
//                         variant="ghost"
//                         className="hover:bg-purple-800/20"
//                       >
//                         <Play className="h-4 w-4" />
//                       </Button>
//                     </div>
//                     <h4 className="text-lg font-semibold">{track.name}</h4>
//                     <div className="flex gap-2 mt-2">
//                       <span className="text-xs px-2 py-1 rounded-full bg-purple-900/20">
//                         {track.mood}
//                       </span>
//                       <span className="text-xs px-2 py-1 rounded-full bg-purple-900/20">
//                         {track.popularity}
//                       </span>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//             </div>
//           </section>
//         </div>
//       </div>

//       <div className="flex justify-between mt-12">
//         <Button
//           variant="ghost"
//           onClick={onBack}
//           className="hover:bg-purple-800/20"
//         >
//           Back
//         </Button>

//         <div className="flex items-center justify-center">
//               <AiButton  text="Generate Video" onClick={handleGenerate}   />
//               </div>
//         {/* <Button
//           onClick={() => selectedCreator && selectedVoice && onNext(selectedCreator, selectedVoice)}
//           disabled={!selectedCreator || !selectedVoice}
//           className="bg-purple-600 hover:bg-purple-700"
//         >
//           Next
//         </Button> */}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Creator, Voice } from "@/lib/types/creator";
import { Play, Pause, Volume2, Music2 } from "lucide-react";
import { ParallaxScroll } from '../ui/parralex-scroll';
import AiButton from '../ui/ai-button';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Toaster, toast } from 'sonner';
import { Resend } from 'resend';
import { VideoCreatedTemplate } from '@components/email/VideoCreatedTemplate';

interface CreatorSelectorProps {
  creators: Creator[];
  voices: Record<string, Voice>;
  onBack: () => void;
  onNext: (creator: Creator, voice: Voice) => void;
  screenshot_data: string;
  selectedScript: string | null;
}

interface VideoData {
  voice: {
    voice_id: string;
    output_format: string;
    model_id: string;
  };
  avatar: {
    avatar_id: string;
    background_type: string;
  };
  video: {
    duration: number;
    fps: number;
    background_color: string;
  };
  screenshot_path: string;
  script: string | null;
}

interface TaskProgress {
  progress: number;
  status: string;
  message: string;
  result?: {
    video_url?: string;
  };
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';


async function generateVideo(videoData: VideoData, projectId: string, userId: string) {
  try {
    const response = await fetch(`${API_URL}/api/generate-video`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...videoData,
        projectId,
        userId
      })
    });
    
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to start video generation');
    }
    
    return {
      taskId: data.task_id,
      statusUrl: data.status_url
    };
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
}

async function checkTaskStatus(taskId: string): Promise<TaskProgress> {
  try {
    const response = await fetch(`${API_URL}/api/task-status/${taskId}`);
    if (response.status === 500) {
      throw new Error('SERVER_ERROR');
    }
    if (!response.ok) {
      throw new Error('Failed to fetch task status');
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error && error.message === 'SERVER_ERROR') {
      throw error;
    }
    console.error('Error checking task status:', error);
    throw error;
  }
}

const VideoProgressTracker = ({ progress }: { progress: TaskProgress }) => {
  return (
    <div className="w-full max-w-md">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Generating Video</h3>
            <span className="text-sm text-purple-600">
              {Math.round(progress.progress)}%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress.progress}%` }}
            />
          </div>

          <p className="text-sm text-gray-600">
            {progress.message || "Processing your video..."}
          </p>
        </div>
      </Card>
    </div>
  );
};

export function CreatorSelector({ creators, voices, onBack, onNext, screenshot_data, selectedScript }: CreatorSelectorProps) {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [selectedVoice, setSelectedVoice] = useState<Voice | null>(null);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [errorCount, setErrorCount] = useState(0);
  const [lastProgress, setLastProgress] = useState(0);
  const [taskProgress, setTaskProgress] = useState<TaskProgress>({
    progress: 0,
    status: '',
    message: ''
  });
  const[videoId, setVideoId] = useState<string | null>(null);

  const resend = new Resend(process.env.RESEND_API_KEY);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('projectId');
  const base64string = screenshot_data.replace(/^data:image\/\w+;base64,/, '');

  const [videoData, setVideoData] = useState<VideoData>({
    voice: {
      voice_id: "21m00Tcm4TlvDq8ikWAM",
      output_format: 'mp3_44100_128',
      model_id: 'eleven_multilingual_v2'
    },
    avatar: {
      avatar_id: '002',
      background_type: 'with_bg'
    },
    video: {
      duration: 30,
      fps: 30,
      background_color: 'white'
    },
    screenshot_path: base64string,
    script: selectedScript
  });

  // Task status polling
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const MAX_RETRY_ATTEMPTS = 5;
    const POLLING_INTERVAL = 2000;

    const pollTaskStatus = async () => {
      if (!taskId) return;

      try {
        const statusData = await checkTaskStatus(taskId);
        
        // Only update progress if it's greater than the last known progress
        if (statusData.progress >= lastProgress) {
          setTaskProgress(statusData);
          setLastProgress(statusData.progress);
        }
        
        // Reset error count on successful request
        setErrorCount(0);

        if (statusData.status === 'SUCCESS' && statusData.result?.video_url) {
          clearInterval(intervalId);
          const savedVideo = await UpdateVideoData(statusData.result.video_url);
          const videoPageUrl = `${process.env.NEXT_PUBLIC_APP_URL}/create/video/output?${new URLSearchParams({
            url: statusData.result.video_url,
            projectId: projectId || '',
            videoId: savedVideo.id
          })}`;
    
          // Send an email with the video page link
          try {
            const { data, error } = await resend.emails.send({
              from: 'sanjai.l2021ai@sece.ac.in', // Replace with your email
              to: 'user@example.com', // Replace with the user's email
              subject: 'Your Video is Ready!',
              react: VideoCreatedTemplate({
                videoPageUrl,
                videoTitle: 'Your Custom Video', // Replace with the actual video title
                userName: 'User' // Replace with the user's name
              }),
            });
    
            if (error) {
              console.error('Error sending video creation email:', error);
            } else {
              console.log('Video creation email sent:', data);
            }
          } catch (emailError) {
            console.error('Failed to send video creation email:', emailError);
          }
    
          // Redirect to the video page
          router.push(videoPageUrl);
        
        } else if (statusData.status === 'FAILED') {
          clearInterval(intervalId);
          toast.error(statusData.message || 'Video generation failed');
          setIsLoading(false);
          setTaskId(null);
        }
      } catch (error) {
        if (error instanceof Error && error.message === 'SERVER_ERROR') {
          setErrorCount(prev => {
            const newCount = prev + 1;
            if (newCount >= MAX_RETRY_ATTEMPTS) {
              clearInterval(intervalId);
              toast.error('Server error occurred too many times. Please try again later.');
              setIsLoading(false);
              setTaskId(null);
              return 0; // Reset count
            }
            return newCount;
          });
        } else {
          clearInterval(intervalId);
          toast.error('Error checking video generation status');
          setIsLoading(false);
          setTaskId(null);
        }
      }
    };

    if (taskId) {
      // Initial poll
      pollTaskStatus();
      // Set up interval
      intervalId = setInterval(pollTaskStatus, POLLING_INTERVAL);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [taskId, projectId, router, lastProgress]);

  const saveVideoToProject = async () => {
    try {
      const response = await fetch('/api/videos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId,
          title: 'AI Generated Video',
          description: selectedScript,
          blobUrl: "",
          status: 'PROCESSING'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save video');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving video:', error);
      throw error;
    }
  };

  const UpdateVideoData = async (videoUrl: string) => {
    try {
      const response = await fetch('/api/videos', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          videoId,
          projectId,
          status: 'COMPLETED',
          blobUrl: videoUrl
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save video');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving video:', error);
      throw error;
    }
  };


  const updateTaskId = async (taskId: string) => {
    try {
      const response = await fetch(`/api/videoprojects/${projectId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save video');
      }

      return await response.json();
    } catch (error) {
      console.error('Error saving video:', error);
      throw error;
    }
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    if (selectedCreator) {
      try {
        const userResponse = await fetch('/api/user/validate-user');
        const { userId } = await userResponse.json();
        
        if (!userId) {
          toast.error('Please sign in to generate videos');
          setIsLoading(false);
          return;
        }

        const checkResponse = await fetch('/api/user/check-subscription');
        if (!checkResponse.ok) {
          const errorData = await checkResponse.json();
          if (checkResponse.status === 401) {
            toast.error('Please login to generate videos');
          } else if (errorData.errorType === 'INSUFFICIENT_CREDITS') {
            toast.error('You need more credits. Upgrade your plan or purchase more credits.');
          } else if (errorData.errorType === 'NO_SUBSCRIPTION') {
            toast.error('Premium subscription required for video generation');
          } else {
            toast.error('Failed to verify subscription status');
          }
          setIsLoading(false);
          return;
        }

        if (!projectId) {
          toast.error('Please create a project');
          setIsLoading(false);
          return;
        }

        
        
        const { taskId: newTaskId } = await generateVideo(videoData, projectId, userId);

        const uploadVideo=await saveVideoToProject()
        if(!uploadVideo){
          toast.error('Failed to save video');
          setIsLoading(false);
          return;
        }
        setVideoId(uploadVideo.id)
        const response = await updateTaskId(newTaskId);
        if (!response) {
          toast.error('Failed to update task ID');
          setIsLoading(false);
          return;
        }
        setTaskId(newTaskId);
        
        setLastProgress(0);
        setErrorCount(0);
      } catch (error) {
        console.error('Error:', error);
        toast.error('Failed to start video generation');
        setIsLoading(false);
      }
    }
  };

  const handleAudioToggle = (voiceId: string, previewUrl: string) => {
    if (activeAudio === voiceId) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setActiveAudio(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      audioRef.current = new Audio(previewUrl);
      audioRef.current.play().catch(error => console.error('Audio playback failed:', error));
      setActiveAudio(voiceId);
      
      audioRef.current.onended = () => {
        setActiveAudio(null);
        audioRef.current = null;
      };
    }
  };

  const musicTracks = [
    { id: '1', name: 'Into the night', mood: 'Thriller', popularity: 'Popular' },
    { id: '2', name: 'Unlock Me', mood: 'Motivational', popularity: 'Trending' },
    { id: '3', name: 'Epic Background', mood: 'Emotional', popularity: 'Popular' },
    { id: '4', name: 'Else - Paris', mood: 'Electronic', popularity: 'Popular' }
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-6">
        <VideoProgressTracker progress={taskProgress} />
        {taskProgress.status === 'FAILED' && (
          <div className="text-red-500 text-sm">
            Generation failed. Please try again.
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4">
      <h2 className="text-3xl mb-8 font-semibold">Choose an actor</h2>

      <div className="flex gap-8">
        <div className="w-1/2">
          <div className="overflow-hidden">
            <ParallaxScroll 
              videos={creators.map(creator => ({
                id: creator.id,
                url: creator.preview_url,
                name: creator.name,
                description: creator.description
              }))}
              onSelect={(video) => {
                const creator = creators.find(c => c.id === video.id);
                setSelectedCreator(creator || null);
                setSelectedVoice(null);
              }}
            />
          </div>
        </div>

        <div className="w-1/2 space-y-8">
          <section>
            <h2 className="text-2xl mb-6 font-semibold">Background Music</h2>
            <div className="grid grid-cols-2 gap-4">
              {musicTracks.map((track) => (
                <Card
                  key={track.id}
                  className={`p-4 cursor-pointer transition-all hover:bg-purple-800/10 ${
                    selectedMusic === track.id ? 'ring-2 ring-purple-500' : ''
                  }`}
                  onClick={() => setSelectedMusic(track.id)}
                >
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between mb-3">
                      <Music2 className="h-8 w-8 text-purple-400" />
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-purple-800/20"
                      >
                        <Play className="h-4 w-4" />
                      </Button>
                    </div>
                    <h4 className="text-lg font-semibold">{track.name}</h4>
                    <div className="flex gap-2 mt-2">
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-900/20">
                        {track.mood}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-900/20">
                        {track.popularity}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="flex justify-between mt-12">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-purple-800/20"
        >
          Back
        </Button>

        <div className="flex items-center justify-center">
          <AiButton text="Generate Video" onClick={handleGenerate} />
        </div>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}

export default CreatorSelector;