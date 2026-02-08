import {
  BadgeCent,
  ChartSpline,
  Grid2x2Plus,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import Link from "next/link";
import Image from "next/image";

const items = [
  { title: "Home", url: "/", icon: Home }, // ← Public landing page
  { title: "Overview", url: "/dashboard", icon: ChartSpline },
  { title: "Transactions", url: "/dashboard/transactions", icon: BadgeCent },
  { title: "Categories", url: "/dashboard/categories", icon: Grid2x2Plus },
];

const adminItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];
export default function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-6 px-4 border-b">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-3">
                <Image
                  src="/logo_finance_tracker.svg" // ← your logo file in public/
                  alt="FinTra Logo"
                  width={40}
                  height={40}
                  className="size-8 sm:size-10"
                  priority
                />
                <span className="text-xl sm:text-2xl font-bold tracking-tight">
                  Fin Tra
                </span>
              </Link>
            </SidebarMenuButton>
            <SidebarGroupLabel>
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                WEALTH PRO
              </span>
            </SidebarGroupLabel>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User</SidebarGroupLabel>
          <SidebarContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        {/* {isAdmin && ( */}
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarMenu>
            {adminItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <item.icon className="size-5" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t text-xs text-muted-foreground text-center">
        © {new Date().getFullYear()} Fin Tra
      </SidebarFooter>
    </Sidebar>
  );
}
