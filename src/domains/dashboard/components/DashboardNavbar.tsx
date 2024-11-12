"use client";

import * as React from "react";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { NavMain } from "@/domains/dashboard/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavUser } from "@/domains/dashboard/components/nav-user";

export function DashboardNavbar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations("Dashboard.Navbar");

  const navMain = [
    {
      title: t("dashboard"),
      icon: LayoutDashboard,
      url: "/dashboard",
    },
    {
      title: t("orders"),
      icon: ShoppingCart,
      url: "/orders",
    },
    {
      title: t("conversation"),
      icon: MessageSquare,
      url: "/conversation",
    },
    {
      title: t("account"),
      icon: Users,
      url: "/account",
    },
    {
      title: t("portfolio"),
      icon: Settings,
      url: "/portfolio",
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
