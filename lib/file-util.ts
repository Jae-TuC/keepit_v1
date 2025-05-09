import { FileType } from "./types";

export const extractFileData = (file: File) => {
  const lastDotIndex = file.name.lastIndexOf(".");
  let name = file.name;
  let extension = "";

  if (lastDotIndex > 0) {
    name = file.name.substring(0, lastDotIndex);
    extension = file.name.substring(lastDotIndex + 1);
  }

  const size = file.size;
  const type = file.type;

  return {
    name,
    extension,
    size,
    type: classifyFile(type, extension),
  };
};

export const classifyFile = (mimeType: string, extension: string): FileType => {
  const normalizedExt = extension.toLowerCase();

  if (mimeType.startsWith("image/")) return "images";
  if (mimeType.startsWith("video/") || mimeType.startsWith("audio/"))
    return "media";
  if (mimeType === "application/pdf") return "document";

  const documentExtensions = [
    "pdf",
    "doc",
    "docx",
    "xls",
    "xlsx",
    "ppt",
    "pptx",
    "txt",
    "md",
    "csv",
  ];

  if (documentExtensions.includes(normalizedExt)) {
    return "document";
  }

  return "other";
};
