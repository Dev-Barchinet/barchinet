import { CrmTicketsQueriesV1SharedGetTicketsGetTicketsQueryResult } from "@/services/architect-services/api-architect-tickets-get-all-get.schemas";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { TicketRegistrationState } from "../components/TicketRegistrationState";

export const useTicketTableColumns =
  (): ColumnDef<CrmTicketsQueriesV1SharedGetTicketsGetTicketsQueryResult>[] => {
    const t = useTranslations("ContactUs.Ticketing");

    return [
      {
        accessorKey: "id",
        header: t("ticketId"),
      },
      {
        accessorKey: "submitDateTime",
        header: t("requestDate"),
        cell: ({ row }) => {
          const date = new Date(row.original.submitDateTime || "")
          const year = date.getFullYear()
          const month = date.getMonth()
          const day = date.getDay()
          return `${year}-${month}-${day}`;
        },
      },
      {
        accessorKey: "title",
        header: t("orderRegistration"),
        cell: ({ row }) => {
          return <TicketRegistrationState ticketData={row.original} />;
        },
      },
    ];
  };
