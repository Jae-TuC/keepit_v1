import { CSV, DOC, PDF, PPT, TXT, XLSX } from "./icons/icons";
import { BadgeHelp, ImageIcon } from "lucide-react";

type FileType = "images" | "document" | "media" | "other";

interface FilePreviewProps {
  file: {
    type: FileType;
    extension: string;
    name: string;
    url: string;
  };
}

export const FilePreview: React.FC<FilePreviewProps> = ({ file }) => {
  if (
    (file.type === "images" && file.extension === "png") ||
    (file.type === "images" && file.extension === "jpg") ||
    (file.type === "images" && file.extension === "jpeg")
  ) {
    return (
      <div className="rounded-full size-12">
        <ImageIcon className="size-12" />
      </div>
    );
  }

  if (file.type === "document" && file.extension === "pdf") {
    return (
      <div className="rounded-full size-12">
        <PDF />
      </div>
    );
  }

  if (
    (file.type === "document" && file.extension === "doc") ||
    file.extension === "docx"
  ) {
    return (
      <div className="rounded-full size-12">
        <DOC />
      </div>
    );
  }

  if (
    (file.type === "document" && file.extension === "xls") ||
    file.extension === "xlsx"
  ) {
    return (
      <div className="rounded-full size-12">
        <XLSX />
      </div>
    );
  }
  if (file.type === "document" && file.extension === "csv") {
    return (
      <div className="rounded-full size-12">
        <CSV />
      </div>
    );
  }

  if (file.type === "document" && file.extension === "txt") {
    return (
      <div className="rounded-full size-12">
        <TXT />
      </div>
    );
  }

  if (
    (file.type === "document" && file.extension === "ppt") ||
    file.extension === "pptx"
  ) {
    return (
      <div className="rounded-full size-12">
        <PPT />
      </div>
    );
  }

  if (file.type === "other" && file.extension === "mov") {
    return (
      <div className="rounded-full size-12">
        <BadgeHelp />
      </div>
    );
  }

  return (
    <div className="size-12 flex items-center justify-center rounded-full bg-muted">
      <span className="text-xs font-medium text-muted-foreground">
        {file.extension.toUpperCase()}
      </span>
    </div>
  );
};
