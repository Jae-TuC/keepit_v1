"use client";

import DeleteModal from "@/components/modals/delete-modal";
import RenameModal from "@/components/modals/rename-modal";
import ShareModal from "@/components/modals/share-modal";
import FileModal from "@/components/modals/use-file-modal";
import { useEffect, useState } from "react";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <FileModal />
      <RenameModal />
      <ShareModal />
      <DeleteModal />
    </>
  );
};
