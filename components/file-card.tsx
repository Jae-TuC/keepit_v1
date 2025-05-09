import { format } from "date-fns";
import {
  Download,
  EllipsisVertical,
  Eye,
  Pencil,
  Share,
  Trash,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FilePreview } from "./file-preview";

import { FileRecord } from "@/lib/types";
import { formatFileWithUnits } from "../lib/utils";
import { useUploadModal } from "@/hooks/use-upload-modal";

const FileCard = (file: FileRecord) => {
  const { onOpen } = useUploadModal();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = () => {
    const newWindow = window.open(file.url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Card className="p-2 min-w-50 flex-none">
      <CardHeader className="p-2 flex items-center justify-between">
        <CardTitle className="text-base">
          {file.name.slice(0, 10)}
          {file.name.length > 10 && "..."}
        </CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => onOpen("rename", file)}
            >
              <span>Rename</span>
              <Pencil className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={handleView}
            >
              <span>View</span>
              <Eye className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => onOpen("share", file)}
            >
              <span>Share</span>
              <Share className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={handleDownload}
            >
              <span>Download</span>
              <Download className="w-4 h-4" />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              className="flex items-center justify-between"
              onClick={() => onOpen("delete", file)}
            >
              <span>Delete</span>
              <Trash className="w-4 h-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-0 flex items-center justify-center">
        <FilePreview file={file} />
      </CardContent>
      <CardFooter className="w-full p-0">
        <div className="flex items-center justify-between gap-2 px-2 w-full">
          <p className="text-xs text-muted-foreground ">
            {formatFileWithUnits(file.size)}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(file._creationTime, "MMM d, yyyy")}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;

// this will take in a file object and display the file card
// the file card will have the file name, file type, file size, and file icon
// the file card will also have a button to download the file
// the file card will also have a button to delete the file
// the file card will also have a button to view the file
// the file card will also have a button to edit the file
// the file card will also have a button to share the file
// the file card will also have a button to rename the file
