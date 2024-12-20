import { Button } from "@/components/ui/button";
import { useRouter } from "@/config/i18n/routing";
import { useGetApiArchitectTicketsGetDetailId } from "@/services/architect-services/api-architect-tickets-get-detail-{id}-get";
import { ArrowLeft, LucideFile } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React from "react";

export const TicketDetail = () => {
  const ticketDetailPhrases = useTranslations("ContactUs.TicketDetail");
  const ticketPhrases = useTranslations("ContactUs.Ticketing");
  const { replace } = useRouter();
  const { id } = useParams<{ id?: string }>();

  const { data, isLoading } = useGetApiArchitectTicketsGetDetailId(id || "", {
    query: { enabled: Boolean(id) },
  });

  const ticketDetail = data?.value;
  const ticketDate = new Date(data?.value?.submitDateTime || "");
  const ticketYear = ticketDate.getFullYear();
  const ticketMonth = ticketDate.getMonth();
  const ticketDay = ticketDate.getDay();
  const ticketHour = ticketDate.getHours();
  const ticketMinutes = ticketDate.getMinutes();

  const replyDate = new Date(
    data?.value?.replies?.[0]?.createdOnDateTime || ""
  );
  const replyHour = replyDate.getHours();
  const replyMinutes = replyDate.getMinutes();

  const getTicketStatus = (state: number) => {
    if (state === 4) {
      return {
        text: ticketPhrases("rejected"),
        bgColor: "#E11900",
      };
    } else if (state === 3) {
      return {
        text: ticketPhrases("accepted"),
        bgColor: "#1EA170",
      };
    } else {
      return { text: ticketPhrases("pending"), bgColor: "#C3A21E" };
    }
  };

  const ticketStyles = getTicketStatus(ticketDetail?.state || 1);

  return (
    <div className="mx-4 flex flex-col">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            replace("/contact-us");
          }}
          size="sm"
          variant="outline"
          className="max-w-[32px]"
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-col">
          <p className="title-2">{ticketDetailPhrases("ticketing")}</p>
        </div>
      </div>
      <div className="w-full bg-border my-4 h-[1px]"></div>
      {isLoading ? null : (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 justify-between">
            <div className="ticket-detail-box flex-1">
              <p className="title-5-5">{ticketPhrases("ticketId")}</p>
              <p>{ticketDetail?.id}</p>
            </div>
            <div className="ticket-detail-box flex-1">
              <p className="title-5-5">{ticketPhrases("requestDate")}</p>
              <p>{`${ticketYear}-${ticketMonth}-${ticketDay}`}</p>
            </div>
            <div className="ticket-detail-box flex-1">
              <p className="title-5-5">{ticketPhrases("orderRegistration")}</p>
              <div className="flex items-center gap-2">
                <div
                  className="rounded-full px-2 flex items-center justify-center "
                  style={{ backgroundColor: ticketStyles.bgColor }}
                >
                  <p className="text-white text-center">{ticketStyles.text}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-4 ticket-detail-box">
            {Number(ticketDetail?.attachments?.length) > 0 &&
              ticketDetail?.attachments?.map((ticket) => (
                <div className="my-message flex flex-col" key={ticket.path}>
                  <div className="my-message-content flex items-center">
                    <LucideFile /> <p>{ticket.path?.split("/").slice(-1)[0]}</p>
                  </div>
                  <p className="text-[#8B8D97] body-1">
                    {ticketHour}:{ticketMinutes}
                  </p>
                </div>
              ))}
            {ticketDetail?.description && (
              <div className="my-message flex flex-col">
                <div className="my-message-content">
                  <p>{ticketDetail.description}</p>
                </div>
                <p className="text-[#8B8D97] body-1">
                  {ticketHour}:{ticketMinutes}
                </p>
              </div>
            )}
            {Number(ticketDetail?.replies?.[0]?.attachments?.length) > 0 &&
              ticketDetail?.replies?.[0]?.attachments?.map((attachement) => (
                <div
                  className="admin-message flex flex-col"
                  key={attachement.path}
                >
                  <div className="admin-message-content flex items-center">
                    <LucideFile />{" "}
                    <p>{attachement.path?.split("/").slice(-1)[0]}</p>
                  </div>
                  <p className="text-[#8B8D97] body-1">
                    {replyHour}:{replyMinutes}
                  </p>
                </div>
              ))}
            {ticketDetail?.replies?.[0]?.description && (
              <div className="admin-message flex flex-col">
                <div className="admin-message-content">
                  <p>{ticketDetail?.replies?.[0]?.description}</p>
                </div>
                <p className="text-[#8B8D97] body-1">
                  {replyHour}:{replyMinutes}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
