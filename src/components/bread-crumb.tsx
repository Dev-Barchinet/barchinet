import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import { usePathname } from "@/config/i18n/routing";

export const BarchinetBreadCrumb = () => {
  const pathname = usePathname();

  // Split the pathname into parts
  const pathParts = pathname.split("/").filter(Boolean); // Remove empty strings

  // Prevent duplication of "Dashboard"
  const isDashboardOnly = pathParts.length === 1 && pathParts[0] === "dashboard";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Static Dashboard Link */}
        <BreadcrumbItem>
          {pathname === "/dashboard" ? (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {!isDashboardOnly && <BreadcrumbSeparator />}

        {/* Dynamic Breadcrumb Links */}
        {!isDashboardOnly &&
          pathParts.map((part, index) => {
            const isLast = index === pathParts.length - 1;
            const href = `/${pathParts.slice(0, index + 1).join("/")}`;

            return (
              <React.Fragment key={part}>
                <BreadcrumbItem>
                  {pathname === href ? (
                    <BreadcrumbPage>{decodeURIComponent(part)}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={href}>
                      {decodeURIComponent(part)}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
