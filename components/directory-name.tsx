import { usePathname } from "next/navigation";
import React from "react";

const DirectoryName = () => {
  const pathname = usePathname();
  const directoryName = pathname.split("/");

  const newPathName =
    directoryName[directoryName.length - 1] === "r"
      ? "Dashboard"
      : directoryName[directoryName.length - 1] === "images"
        ? "Images"
        : directoryName[directoryName.length - 1] === "documents"
          ? "Documents"
          : directoryName[directoryName.length - 1] === "media"
            ? "Media"
            : directoryName[directoryName.length - 1] === "others"
              ? "Others"
              : directoryName[directoryName.length - 1];

  return (
    <div className="flex items-center gap-2">
      <h1 className="text-[1.625rem] font-bold"> {newPathName}</h1>
    </div>
  );
};

export default DirectoryName;
