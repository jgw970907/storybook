import { create } from 'zustand';
import { SelectedBookState, SelectedBook } from 'types/bookTypes';

export const useSelectedBook = create<SelectedBookState>((set) => ({
  selectedBook: <SelectedBook>{},
  setSelectedBook: (newBookInfo: SelectedBook) => set(() => ({ selectedBook: newBookInfo })),
}));
