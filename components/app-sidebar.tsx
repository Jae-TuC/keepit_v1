"use client";

import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FolderOpen, Images, VideoIcon, ChartPie } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

const items = [
  {
    title: "Documents",
    url: "/r/documents",
    icon: FolderOpen,
  },
  {
    title: "Images",
    url: "/r/images",
    icon: Images,
  },
  {
    title: "Media",
    url: "/r/media",
    icon: VideoIcon,
  },
  {
    title: "Other",
    url: "/r/others",
    icon: ChartPie,
  },
];

const AppSidebar = () => {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const { user } = useUser();

  if (!user) return null;

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="relative ml-4 py-4 flex items-center gap-2.5">
          <UserButton />
          <h1 className="text-base font-medium inline-flex items-center gap-1">
            <span>{user?.firstName}</span>
            <span>{user?.lastName}</span>
          </h1>
        </Link>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground/70">
                Dashboard
              </span>
            </div>
          </SidebarGroupLabel>
          <SidebarMenu className=" mt-6">
            {items.map((item) => (
              <SidebarMenuItem
                key={item.title}
                className={cn(
                  "p-2.5 cursor-pointer rounded-md",
                  isActive(item.url) && "bg-muted"
                )}
              >
                <Link
                  href={item.url}
                  className="flex items-center gap-3"
                  title={item.title}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full rounded-md p-2 flex items-center justify-between text-foreground bg-background">
              <span className="text-base font-medium">
                {user.emailAddresses[0].emailAddress.at(0)?.toUpperCase()}
                {user.emailAddresses[0].emailAddress.slice(1)}
              </span>
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
