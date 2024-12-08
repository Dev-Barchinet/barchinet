"use client";
import { Button } from "@/components/ui/button";
import { ConversationList } from "@/domains/conversation/components/ConversationList";
import { ConversationLoading } from "@/domains/conversation/components/ConversationLoading";
import { useGetApiArchitectChatsList } from "@/services/architect-services/api-architect-chats-list-get";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { PropsWithChildren } from "react";
import "./conversationStyles.css"


type ConversationLayoutProps = PropsWithChildren;

const ConversationLayout = (props: ConversationLayoutProps) => {
  const { children } = props;
  const t = useTranslations("Messages");

  const { data, isLoading, refetch } = useGetApiArchitectChatsList();

  return (
    <div className="flex flex-col justify-start h-full">
      <div className="flex items-center justify-between mx-4 mt-4">
        <p className="title-2">{t("conversations")}</p>
        <Button className="max-w-[150px]" onClick={() => refetch()}>
          <RefreshCcw /> Refresh
        </Button>
      </div>
      <div className="flex items-start p-4 gap-4 h-full">
        {isLoading && <ConversationLoading />}
        {!isLoading && (
          <>
            <div className="h-full conversation-layout-border max-h-full overflow-y-auto">
              <ConversationList chats={data?.value} />
            </div>
            <div className="flex-1 h-full conversation-layout-border">{children}</div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConversationLayout;
