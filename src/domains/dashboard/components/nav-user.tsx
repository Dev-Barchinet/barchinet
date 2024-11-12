"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "@/config/i18n/routing";
import { Headset, Loader, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function NavUser() {
  const t = useTranslations("Dashboard.Navbar");
  const [signingOut, setSigningOut] = useState(false);

  const handleSignout = async () => {
    setSigningOut(true);
    await signOut({ redirect: true, callbackUrl: "/" });
    setSigningOut(false);
  };

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <Link href={"/contact-us"}>
            <SidebarMenuButton>
              <Headset />
              <p>{t("contact")}</p>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton onClick={handleSignout} disabled={signingOut}>
            <LogOut color="#E11900" />
            <p className="text-[#E11900]">{t("logout")}</p>
            {signingOut && <Loader />}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
