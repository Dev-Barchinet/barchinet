import { SocialChatsQueriesV1SharedGetMessagesChatMessageContract } from "@/services/architect-services/api-architect-chats-get.schemas";
import React from "react";
import { ChatMessageItem } from "./ChatMessageItem";

type ChatContentProps = {
    messages: SocialChatsQueriesV1SharedGetMessagesChatMessageContract[];
};

export const ChatContent = (props: ChatContentProps) => {
    const { messages } = props;
    if (messages.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                No Messages Yet Start Chatting
            </div>
        );
    }
    return (
        <div className="flex flex-col-reverse">
            {messages.map((message) => (
                <ChatMessageItem message={message} key={message.id} />
            ))}
        </div>
    );
};
