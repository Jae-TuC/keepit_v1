"use client";

import React from "react";
import { Button } from "./ui/button";
import { UploadCloud } from "lucide-react";
import { useUploadModal } from "@/hooks/use-upload-modal";

const UploadButton = () => {
  const { onOpen } = useUploadModal();
  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" onClick={() => onOpen("file")}>
        <UploadCloud className="size-4" />
        <span>Upload file</span>
      </Button>
    </div>
  );
};

export default UploadButton;
