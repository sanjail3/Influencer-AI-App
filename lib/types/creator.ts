export interface Creator {
  id: string;
  name: string;
  preview_url: string;
  gender: 'male' | 'female';
  description: string;
}

export interface BackgroundMusic {
  id: string;
  name: string;
  genre: string;
  duration: string;
  preview_url: string;
}

export interface CreatorResponse {
  creators: Creator[];
  background_music: BackgroundMusic[];
}