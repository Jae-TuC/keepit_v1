"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { Card, CardContent } from "@/components/ui/card";
import { FileRecord, FileType } from "@/lib/types";
import { chartColors, formatFileSize, formatFileWithUnits } from "@/lib/utils";

const chartConfig = {
  document: {
    label: "Documents",
    color: "var(--chart-1)",
  },
  images: {
    label: "Images",
    color: "var(--chart-2)",
  },
  media: {
    label: "Media",
    color: "var(--chart-3)",
  },
  free: {
    label: "Free",
    color: "var(--chart-4)",
  },
  other: {
    label: "Other",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig;

const MAX_STORAGE_BYTES = 5 * 1000 * 1000 * 100;

export function PieChartComponent({ data: files }: { data: FileRecord[] }) {
  const { chartData: D, total } = React.useMemo(() => {
    const typeSums: Record<FileType, number> = {
      document: 0,
      images: 0,
      media: 0,
      other: 0,
    };

    let total = 0;

    for (const file of files) {
      const fileType = file.type as FileType;

      // Ensure fileType is valid before using it
      if (fileType in typeSums) {
        typeSums[fileType] += file.size;
        total += file.size;
      }
    }

    const remaining = MAX_STORAGE_BYTES - total;

    const chartData = [
      ...Object.entries(typeSums).map(([type, size]) => ({
        browser: type,
        width: formatFileSize(parseFloat(((size / total) * 100).toFixed(2))),
        totalSize: formatFileSize(size),
        fill: chartColors[type as FileType],
      })),
      {
        browser: "Free",
        width: formatFileSize(
          parseFloat(
            (((MAX_STORAGE_BYTES - total) / MAX_STORAGE_BYTES) * 100).toFixed(2)
          )
        ),
        totalSize: formatFileSize(remaining),
        fill: "var(--chart-5)",
      },
    ];

    return { chartData, total };
  }, [files]);

  if (!files || files.length === 0) return null;

  return (
    <Card className="flex flex-col items-center h-[250px] max-w-[28rem] md:max-w-[33rem] w-full">
      <CardContent className="flex-1 flex pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent hideLabel={false} indicator="dot" />
              }
            />
            <Pie
              data={D}
              dataKey="totalSize"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xs font-bold"
                        >
                          {formatFileWithUnits(total)}/
                          {formatFileWithUnits(MAX_STORAGE_BYTES)}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className=" flex-col justify-center gap-y-2 hidden sm:flex">
          <h1 className="text-lg md:text-xl font-semibold min-w-[9rem]">
            Available Storage
          </h1>
          <p className="text-xs md:text-sm font-normal">
            {formatFileWithUnits(total)}/
            {formatFileWithUnits(MAX_STORAGE_BYTES)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
