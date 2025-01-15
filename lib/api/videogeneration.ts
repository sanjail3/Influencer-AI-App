

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
  script: string|null;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:5000';



export async function generateVideo (videoData: VideoData){
  try {
    console.log(videoData);
    const response = await fetch(`${API_URL}/api/generate-video`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(videoData)
    });
    
    const data = await response.json();
    return data.video_url;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
};