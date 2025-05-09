import { Id } from "@/convex/_generated/dataModel";

export interface FolderOrFileProps {
  id: string;
  name: string;
  type: "folder" | "file";
  size: number;
  createdAt: string;
}

export interface FileCardProps extends FolderOrFileProps {
  extension?:
    | "png"
    | "jpg"
    | "jpeg"
    | "mp4"
    | "mp3"
    | "pdf"
    | "doc"
    | "docx"
    | "xls"
    | "xlsx"
    | "ppt"
    | "pptx"
    | "txt"
    | "csv";
}

export type FileType = "images" | "media" | "document" | "other";

export interface FileRecord {
  _id: Id<"files">;
  _creationTime: number;
  name: string;
  type: FileType;
  extension: string;
  size: number; // in bytes
  url: string;
  storageId: string;
  folder: Id<"folders">;
}
