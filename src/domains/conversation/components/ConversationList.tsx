import { SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult } from "@/services/architect-services/api-architect-chats-list-get.schemas";
import React from "react";
import { NoConversationFound } from "./NoConversationFound";

type ConversationListProps = {
  chats?:
    | readonly SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult[]
    | null;
};

export const ConversationList = (props: ConversationListProps) => {
  const { chats } = props;

  if (!chats || chats.length === 0) {
    return <NoConversationFound />;
  }

  return <div>ConversationList</div>;
};
