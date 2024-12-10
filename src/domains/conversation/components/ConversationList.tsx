import { SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult } from "@/services/architect-services/api-architect-chats-list-get.schemas";
import React from "react";
import { NoConversationFound } from "./NoConversationFound";
import { ChatItem } from "./ChatItem";

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

  return (
    <div className="min-w-[300px] flex flex-col gap-4 max-h-full overflow-y-auto">
      {chats.map((chat, index) => (
        <>
          <ChatItem chat={chat} key={chat.chatId} />
          {index !== chats.length - 1 && (
            <div className="bg-border h-[1px] w-full" />
          )}
        </>
      ))}
    </div>
  );
};
