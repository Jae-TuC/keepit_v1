import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from "react";
import { FileType } from "@/lib/types";
import { Id } from "@/convex/_generated/dataModel";

export const useGetFiles = () => {
  const data = useQuery(api.file.getFiles);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null); // Use null for no error

  useEffect(() => {
    setIsLoading(false); // Set loading to false when data is available (or undefined)
    if (data === undefined) return; // important check

    if (!data) {
      // Check for null
      setError("Failed to fetch files.");
      return;
    }

    if (data.length === 0) {
      setError("No files found.");
      return;
    }
    setError(null); //clear error
  }, [data]);

  return { data, isLoading, error };
};

export const useGetFilesByType = (type: FileType) => {
  const data = useQuery(api.file.getFilesByType, { type });
  return data;
};

export const useGetFileById = (id: Id<"files">) => {
  const data = useQuery(api.file.getFileById, { id });
  return data;
};
