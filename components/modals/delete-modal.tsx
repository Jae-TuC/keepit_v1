import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUploadModal } from "@/hooks/use-upload-modal";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DeleteModal = () => {
  const { isOpen, type, onClose, file } = useUploadModal();

  const deletefile = useMutation(api.file.deleteFile);
  const handleDelete = () => {
    if (file?._id) {
      deletefile({ id: file._id });
      toast.success("File deleted successfully");
      onClose();
    }
  };
  const isModalOpen = isOpen && type === "delete";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete file</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this file?
          </DialogDescription>
          <div className="mt-4 flex items-center justify-between gap-4">
            <Button variant="outline" onClick={() => onClose()}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
