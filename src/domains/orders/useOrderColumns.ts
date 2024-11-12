"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrdersQueryResult } from "@/services/architect-services/api-architect-orders-get-all-get.schemas";

export function useOrderColumns(): ColumnDef<SaleOrdersQueriesV1ArchitectsGetOrdersGetOrdersQueryResult>[] {
  const t = useTranslations("Orders.TableHeaders");

  return [
    {
      accessorKey: "orderNumber",
      header: t("orderNumber"),
    },
    {
      accessorKey: "title",
      header: t("title"),
    },
    {
      accessorKey: "projectType",
      header: t("projectType"),
    },
    {
      accessorKey: "buildingCategory",
      header: t("buildingCategory"),
    },
    {
      accessorKey: "projectType",
      header: t("architectureStyle"),
    },
    {
      accessorKey: "serviceCount",
      header: t("serviceCount"),
    },
    {
      accessorKey: "state",
      header: t("state"),
    },
  ];
}
