import { create } from "zustand";

const usePaginationStore = create((set) => ({
  take: 5,
  category: "all",
  order: "ASC",
  currentPage: 1,
  totalPages: 0,
  searchQuery: "",

  setTake: (take) => set({ take }),
  setCategory: (category) => set({ category }),
  setOrder: (order) => set({ order }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setTotalPages: (pages) => set({ totalPages: pages }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default usePaginationStore;
