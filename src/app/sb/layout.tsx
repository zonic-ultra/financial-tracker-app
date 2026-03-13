// app/dashboard/layout.tsx

import AppSidebar from "@/components/ui/AppSidebar";
import Navbar from "@/components/ui/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar ONLY on dashboard routes */}
      <div className="hidden md:block">
        {/* hide on mobile by default */}
        <AppSidebar />
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto bg-background">
        {/* <SidebarTrigger /> */}
        <Navbar />
        {children}
      </main>
    </div>
  );
}
