import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGetApiArchitectTicketsGetAll } from "@/services/architect-services/api-architect-tickets-get-all-get";
import { LoaderCircle, Podcast } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { AddTicketModal } from "../components/AddTicketModal";

type TicketingProps = {
  showAddTicket: boolean;
  setShowAddTicket: (newValue: boolean) => void;
};

export const Ticketing = (props: TicketingProps) => {
  const { showAddTicket, setShowAddTicket } = props;
  const { data, isLoading, refetch } = useGetApiArchitectTicketsGetAll();
  const t = useTranslations("ContactUs.Ticketing");

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderCircle className="rotate-animation" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      {data?.value?.totalCount === 0 ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3">
          <Podcast className="gray.500" />
          <p className="title-3">{t("empty")}</p>
          <p className="body-1 ">{t("noTicketMessage")}</p>
          <Button
            onClick={() => setShowAddTicket(true)}
            className="max-w-[160px]"
          >
            {t("addTicketButton")}
          </Button>
        </div>
      ) : (
        <div>ticketing</div>
      )}
      <Dialog open={showAddTicket} onOpenChange={() => setShowAddTicket(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("addTicketButton")}</DialogTitle>
          </DialogHeader>
          <AddTicketModal
            onTicketCreated={() => {
              setShowAddTicket(false);
              refetch()
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
