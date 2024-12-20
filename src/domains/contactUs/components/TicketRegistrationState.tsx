import { Button } from "@/components/ui/button";
import { Link } from "@/config/i18n/routing";
import { CrmTicketsQueriesV1SharedGetTicketsGetTicketsQueryResult } from "@/services/architect-services/api-architect-tickets-get-all-get.schemas";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type TicketRegistrationStateProps = {
  ticketData: CrmTicketsQueriesV1SharedGetTicketsGetTicketsQueryResult;
};

export const TicketRegistrationState = (
  props: TicketRegistrationStateProps
) => {
  const { ticketData } = props;
  const t = useTranslations("ContactUs.Ticketing");

  const { id, state } = ticketData;

  const getTicketStatus = (state: number) => {
    if (state === 4) {
      return {
        text: t("rejected"),
        bgColor: "#E11900",
      };
    } else if (state === 3) {
      return {
        text: t("accepted"),
        bgColor: "#1EA170",
      };
    } else {
      return { text: t("pending"), bgColor: "#C3A21E" };
    }
  };

  const ticketStyles = getTicketStatus(state || 1);
  return (
    <div className="flex items-center gap-2">
      <div
        className="rounded-full px-2 flex items-center justify-center "
        style={{ backgroundColor: ticketStyles.bgColor }}
      >
        <p className="text-white text-center">{ticketStyles.text}</p>
      </div>
      <Link href={`/contact-us/${id}`}>
        <Button variant="secondary" className="max-w-[120px]">
          {t("more")} <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};
