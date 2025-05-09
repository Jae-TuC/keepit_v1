import { FileRecord } from "@/lib/types";
import { create } from "zustand";

export type ModalType = "file" | "rename" | "share" | "delete";

interface UploadModalState {
  type: ModalType | null;
  file?: FileRecord;
  isOpen: boolean;
  onOpen: (type: ModalType, file?: FileRecord) => void;
  onClose: () => void;
}

export const useUploadModal = create<UploadModalState>((set) => ({
  type: null,
  file: undefined,
  isOpen: false,
  onOpen: (type, file) => set({ isOpen: true, type, file }),
  onClose: () => set({ isOpen: false, type: null }),
}));
