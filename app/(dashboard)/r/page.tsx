"use client";

// modules imports
import { File, Image as ImageIcon, Video, FileText } from "lucide-react";
import { format } from "date-fns";
// shadcn imports
import { PieChartComponent } from "@/components/piechart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
// hooks imports
import { useGetFiles } from "@/hooks/use-query";
import { formatFileWithUnits } from "@/lib/utils";
import useTotals from "@/hooks/use-totals";

// components imports
import { FilePreview } from "@/components/file-preview";
import SkeletonLoading from "@/components/skeleton-loading";
import Link from "next/link";

const Root = () => {
  const { data, isLoading, error } = useGetFiles();

  const { totalDocumentSize, totalImageSize, totalMediaSize, totalOtherSize } =
    useTotals();

  const detailedFiles = [
    {
      id: "1",
      name: "Document",
      size: formatFileWithUnits(totalDocumentSize ?? 0),
      href: "/r/documents",
      icon: File,
      type: "document",
    },
    {
      id: "2",
      name: "Image",
      size: formatFileWithUnits(totalImageSize ?? 0),
      href: "/r/images",
      icon: ImageIcon,
      type: "image",
    },
    {
      id: "3",
      name: "Media",
      size: formatFileWithUnits(totalMediaSize ?? 0),
      href: "/r/media",
      icon: Video,
      type: "media",
    },
    {
      id: "4",
      name: "Other",
      size: formatFileWithUnits(totalOtherSize ?? 0),
      href: "/r/others",
      icon: FileText,
      type: "other",
    },
  ];
  return (
    <div className="w-full max-h-screen p-2">
      <div className="flex flex-col gap-y-16 pl-16 pr-6 md:pr-0 xl:pr-24 justify-center md:pl-0 md:flex-row gap-x-8">
        <div className="flex-1 flex flex-col gap-y-6">
          <PieChartComponent data={data ?? []} />
          <div className="w-full grid grid-cols-2 justify-items-center gap-6  max-w-[28rem]  md:max-w-[33rem]">
            {detailedFiles.map((file) => (
              <Card key={file.id} className="w-full">
                <Link href={file.href}>
                  <CardContent>
                    <div className="flex  flex-col items-center">
                      <file.icon className="size-22 text-foreground opacity-80" />
                      <div className="flex flex-col items-center gap-x-4">
                        <p className="text-base font-semibold text-foreground">
                          {file.name}
                        </p>
                        <p className="text-sm text-muted-foreground ml-auto">
                          {file.size}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
        <Card className="flex-1  h-full max-w-[28rem] md:max-w-full">
          <CardHeader>
            <CardTitle>Recent Files</CardTitle>
          </CardHeader>
          {data && data.length > 0 && (
            <CardContent>
              <ScrollArea className="max-h-[30rem] w-full rounded-md overflow-auto">
                <div className="h-full w-full space-y-4.5">
                  {isLoading && <SkeletonLoading />}
                  {error && <div>Error: {error}</div>}
                  {data?.map((file) => (
                    <div
                      key={file._id}
                      className="flex items-center gap-x-4 bg-muted p-2.5 rounded-lg  "
                    >
                      <FilePreview key={file._id} file={file} />
                      <div className="flex justify-between items-end w-full">
                        <div>
                          <h1 className="text-sm capitalize font-semibold">
                            {file.name.length > 15
                              ? file.name.slice(0, 10) + "..."
                              : file.name}
                          </h1>
                          <p className="text-sm text-muted-foreground mt-1">
                            {formatFileWithUnits(file.size)}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {format(file._creationTime, "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          )}
          {error && (
            <div className="px-6">
              <p>No files found</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Root;
