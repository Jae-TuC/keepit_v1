"use client";

import { useGetFiles } from "./use-query";

const useTotals = () => {
  const { data } = useGetFiles();
  const totalDocumentSize =
    data?.reduce((acc, file): number => {
      const isDocument =
        file.type === "document" ||
        ["txt", "csv", "md"].includes(file.extension.toLowerCase());
      return isDocument ? acc + file.size : acc;
    }, 0) ?? 0;

  const totalImageSize = data?.reduce((acc, file) => {
    if (
      file.type === "images" ||
      file.extension === "png" ||
      file.extension === "jpg" ||
      file.extension === "jpeg" ||
      file.extension === "gif"
    ) {
      return acc + file.size;
    }
    return acc;
  }, 0);

  const totalMediaSize = data?.reduce((acc, file) => {
    if (
      file.type === "media" &&
      (file.extension === "mp4" ||
        file.extension === "mov" ||
        file.extension === "mp3")
    ) {
      return acc + file.size;
    }
    return acc;
  }, 0);

  const totalOtherSize = data?.reduce((acc, file) => {
    if (file.type === "other") {
      return acc + file.size;
    }
    return acc;
  }, 0);

  return {
    totalDocumentSize,
    totalImageSize,
    totalMediaSize,
    totalOtherSize,
  };
};

export default useTotals;
