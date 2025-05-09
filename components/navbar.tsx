import React from "react";
import { SidebarTrigger } from "./ui/sidebar";
import Search from "./search";
import { SignOutButton, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import UploadButton from "./upload-button";

const Navbar = () => {
  return (
    <nav className="w-full flex items-center justify-between px-2 gap-16 py-5 border-b sticky top-0 bg-background z-10">
      {/* Sidebar trigger */}
      <SidebarTrigger className="size-8 hover:bg-muted rounded-md" />
      {/* Search component */}
      <Search />

      <UploadButton />

      {/* User button and sign out button */}
      <div className="max-w-2xl flex items-center gap-2">
        <UserButton />
        <SignOutButton>
          <Button variant="ghost" size="icon">
            <LogOut className="size-4" />
          </Button>
        </SignOutButton>
      </div>
    </nav>
  );
};

export default Navbar;
