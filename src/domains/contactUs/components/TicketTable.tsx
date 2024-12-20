import { QueriesListQueryFilterResultCrmTicketsQueriesV1SharedGetTicketsGetTicketsQueryResult } from "@/services/architect-services/api-architect-tickets-get-all-get.schemas";
import { useTranslations } from "next-intl";
import React from "react";
import { useTicketTableColumns } from "../hooks/useTicketTableColumns";
import { DataTable } from "@/components/data-table";

type TicketTableProps = {
  tickets?: QueriesListQueryFilterResultCrmTicketsQueriesV1SharedGetTicketsGetTicketsQueryResult | null;
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  pageIndex: number;
  isLoading: boolean;
};

export const TicketTable = (props: TicketTableProps) => {
  const { setPageIndex, tickets, pageSize, pageIndex, isLoading } = props;
  const t = useTranslations("ContactUs.Ticketing");
  const columns = useTicketTableColumns();

  const handlePagination = async (step: "next" | "previous") => {
    setPageIndex((currentPageIndex) => {
      if (step === "next") {
        return currentPageIndex + 1;
      }
      return currentPageIndex - 1;
    });
  };

  return (
    <div className="max-w-full">
      <DataTable
        showSearch={false}
        isLoading={isLoading}
        pageIndex={pageIndex}
        tableTitle=""
        showColumnFilter={false}
        handlePagination={handlePagination}
        hasMore={(pageIndex + 1) * pageSize < Number(tickets?.totalCount)}
        columns={columns}
        data={tickets?.items || []}
      />
    </div>
  );
};
