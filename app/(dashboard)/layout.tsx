import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";
import Navbar from "@/components/navbar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-up");
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full">
        <Navbar />
        <div className="p-6 px-4 sm:px-8 lg:px-12">{children}</div>
      </main>
    </SidebarProvider>
  );
}
