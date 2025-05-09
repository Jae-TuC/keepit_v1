"use client";

import DirectoryName from "@/components/directory-name";
import FileCard from "@/components/file-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useGetFilesByType } from "@/hooks/use-query";
import { ListFilter } from "lucide-react";
import React from "react";

const ImagesPage = () => {
  const data = useGetFilesByType("images");
  console.log(data);

  return (
    <div className="w-full min-h-screen rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        {/* get directory name */}
        <DirectoryName />
        {/* filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <Select>
            <SelectTrigger className="">
              <ListFilter className="w-4 h-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="date">Date created</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="size">Size</SelectItem>
              <SelectItem value="type">Type</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5  gap-4.5 mt-6">
        {data?.map((file) => <FileCard key={file._id} {...file} />)}
      </div>
    </div>
  );
};

export default ImagesPage;
