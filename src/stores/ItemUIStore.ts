import { create } from "zustand";

interface ItemUIStore {
  selectedId: number | null;
  isModalOpen: boolean;
  isEditMode: boolean;

  setSelected: (id: number | null) => void;
  openCreateModal: () => void;
  openEditModal: (id: number) => void;
  closeModal: () => void;
}

export const useItemUIStore = create<ItemUIStore>((set) => ({
  selectedId: null,
  isModalOpen: false,
  isEditMode: false,
  setSelected: (id) => set({ selectedId: id }),
  openCreateModal: () =>
    set({ isModalOpen: true, isEditMode: false, selectedId: null }),

  openEditModal: (id) =>
    set({ isModalOpen: true, isEditMode: true, selectedId: id }),

  closeModal: () => set({ isModalOpen: false, selectedId: null }),
}));
