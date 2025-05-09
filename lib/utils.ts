import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { FileType } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a file size in bytes to a human-readable string.
 *
 * @param bytes The file size in bytes.
 * @param decimals The number of decimal places to use (default: 2).
 * @returns A human-readable string representing the file size (e.g., "1.23 MB").  Returns "0 Bytes" if bytes is 0.
 */
export function formatFileSize(bytes: number, decimals: number = 2): number {
  if (bytes === 0) return 0;

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals; // Ensure decimals is not negative

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm));
}

export function formatFileWithUnits(
  bytes: number,
  decimals: number = 2
): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals; // Ensure decimals is not negative
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export const chartColors: Record<FileType | "free", string> = {
  document: "var(--chart-1)",
  images: "var(--chart-2)",
  media: "var(--chart-3)",
  other: "var(--chart-5)",
  free: "var(--chart-4)",
};

export function convertToCompactSizeNumber(bytes: number): number {
  if (bytes >= 1024 ** 3) {
    return parseFloat((bytes / 1024 ** 3).toFixed(2)); // GB
  } else if (bytes >= 1024 ** 2) {
    return parseFloat((bytes / 1024 ** 2).toFixed(2)); // MB
  } else if (bytes >= 1024) {
    return parseFloat((bytes / 1024).toFixed(2)); // KB
  } else {
    return parseFloat(bytes.toFixed(2)); // Bytes
  }
}
