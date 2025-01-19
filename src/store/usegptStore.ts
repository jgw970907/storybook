import { ImagesType } from 'types/imageTypes';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface GptStore {
  userId: string;
  title: string;
  storyId: string;
  prompt?: string;
  story?: string;
  gptResponse?: string;
  imagesStore?: ImagesType[];
  imageUrlsStore?: string[];
  imageIdsStore: string[];
  setUserId: (userId: string) => void;
  setTitle: (title: string) => void;
  setStoryId: (storyId: string) => void;
  setPrompt: (prompt: string) => void;
  setStory: (story: string) => void;
  setGptResponse: (gptResponse: string) => void;
  setImageIdsStore: (imageIds: string[]) => void;
}

export const useGptStore = create<GptStore>()(
  devtools(
    persist(
      (set) => ({
        userId: '',
        title: '',
        storyId: '',
        prompt: '',
        story: '',
        gptResponse: '',
        imageIdsStore: [],
        setUserId: (userId) => set({ userId }),
        setTitle: (title) => set({ title }),
        setStoryId: (storyId) => set({ storyId }),
        setPrompt: (prompt) => set({ prompt }),
        setStory: (story) => set({ story }),
        setGptResponse: (gptResponse) => set({ gptResponse }),
        setImageIdsStore: (imageIds) => set({ imageIdsStore: imageIds }),
      }),
      {
        name: 'gpt-store',
      },
    ),
  ),
);
