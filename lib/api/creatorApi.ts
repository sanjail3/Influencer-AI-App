import { CreatorResponse } from '../types/creator';
// import { dummyCreatorData } from '../data/dummyCreators';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function fetchCreatorsAndVoices(): Promise<CreatorResponse> {
  try {
    const backgroundMusicResponse = await fetch(`${API_URL}/get_background_music`);
    const creatorsResponse = await fetch(`${API_URL}/get_creators`);

    if (!backgroundMusicResponse.ok || !creatorsResponse.ok) {
      throw new Error('Failed to fetch background music or creators');
    }

    const background_music = await backgroundMusicResponse.json();
    const creators = await creatorsResponse.json();

    return {
      creators,
      background_music
    };
    
  } catch (error) {
    console.log('Using dummy creator data:', error);
    throw error;
  }
}