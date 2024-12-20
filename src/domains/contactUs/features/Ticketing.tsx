import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetApiArchitectTicketsGetAll } from "@/services/architect-services/api-architect-tickets-get-all-get";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { AddTicketModal } from "../components/AddTicketModal";
import { TicketTable } from "../components/TicketTable";

type TicketingProps = {
  showAddTicket: boolean;
  setShowAddTicket: (newValue: boolean) => void;
};

export const Ticketing = (props: TicketingProps) => {
  const { showAddTicket, setShowAddTicket } = props;
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize] = useState(10);
  const { data, isLoading, refetch } = useGetApiArchitectTicketsGetAll({
    PageIndex: pageIndex,
    PageSize: pageSize,
  });

  const t = useTranslations("ContactUs.Ticketing");

  return (
    <div className="w-full h-full">
      <TicketTable
        tickets={data?.value}
        setPageIndex={setPageIndex}
        pageIndex={pageIndex}
        pageSize={pageSize}
        isLoading={isLoading}
      />

      <Dialog open={showAddTicket} onOpenChange={() => setShowAddTicket(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("addTicketButton")}</DialogTitle>
          </DialogHeader>
          <AddTicketModal
            onTicketCreated={() => {
              setShowAddTicket(false);
              refetch();
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
