import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";

const ShareModal = () => {
  const { isOpen, type, onClose, file } = useUploadModal();
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (file) {
      setUrl(`${window.location.origin}/r/share/${file._id}`);
    }
  }, [file]);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
  };

  const isModalOpen = isOpen && type === "share";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share file</DialogTitle>
          <DialogDescription>Share your file with others</DialogDescription>
        </DialogHeader>
        <div className="relative flex items-center justify-center">
          <Input value={url} readOnly className="w-full" />
          <Button
            size="icon"
            className="absolute right-0 cursor-pointer"
            onClick={handleCopy}
          >
            <Copy className="w-4 h-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
