"use client";

import { useGetApiArchitectChatsList } from "@/services/architect-services/api-architect-chats-list-get";
import { useTranslations } from "next-intl";
import React from "react";
import { ConversationLoading } from "./components/ConversationLoading";
import { ConversationList } from "./components/ConversationList";

export const ConversationWrapper = () => {
  const { data, isLoading } = useGetApiArchitectChatsList();
  const t = useTranslations("Messages");

  const chats = data?.value;

  return (
    <div className="flex flex-col gap-6 mx-3 flex-1">
      <p className="title-2">{t("conversations")}</p>
      {isLoading ? <ConversationLoading /> : <ConversationList chats={chats} />}
    </div>
  );
};
