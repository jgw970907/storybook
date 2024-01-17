import { create } from "zustand";

const usePaginationStore = create((set) => ({
  currentPage: 1,
  totalPages: 0,
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
}));

export default usePaginationStore;
