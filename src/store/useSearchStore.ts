import { create } from 'zustand';

interface SearchStore {
  searchTitle: string;
  setSearchTitle: (search: string) => void;
  searchAuthorName: string;
  setSearchAuthorName: (search: string) => void;
  category: string;
  setCategory: (category: string) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchTitle: '',
  setSearchTitle: (search) => set({ searchTitle: search }),
  searchAuthorName: '',
  setSearchAuthorName: (search) => set({ searchAuthorName: search }),
  category: '',
  setCategory: (category) => set({ category }),
}));
