"use client";
import { BarchinetBreadCrumb } from "@/components/bread-crumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import useAuthStepperStore from "@/core/stores/useAuthStore";
import DashboardHeader from "@/domains/dashboard/components/DashboardHeader";
import { DashboardNavbar } from "@/domains/dashboard/components/DashboardNavbar";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { resetStepper } = useAuthStepperStore();

  // Track the sidebar mode (expanded or collapsed)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  useEffect(() => {
    resetStepper();
  }, [resetStepper]);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex flex-col max-h-screen overflow-hidden max-w-[100dvw]">
      <DashboardHeader />
      <Separator />
      <SidebarProvider defaultOpen={false}>
        <DashboardNavbar />
        <SidebarInset>
          <div className="max-w-full h-[calc(100%-63px)] flex flex-col mb-[63px]">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger
                  className="-ml-1"
                  onClick={handleSidebarToggle}
                />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <BarchinetBreadCrumb />
              </div>
            </header>
            {/* Dynamically adjust width based on the sidebar's state */}
            <div className={`flex-1 overflow-y-auto max-h-full max-w-[100dvw] ${!isSidebarCollapsed && 'md:max-w-[calc(100dvw-255px)]'} `}>
              {children}
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
