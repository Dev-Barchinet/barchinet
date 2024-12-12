import { SocialChatsQueriesV1SharedGetMessagesChatMessageContract } from "@/services/architect-services/api-architect-chats-get.schemas";
import { LucideFile, LucideTicket } from "lucide-react";
import React from "react";

type ChatMessageItemProps = {
    message: SocialChatsQueriesV1SharedGetMessagesChatMessageContract;
};

export const ChatMessageItem = (props: ChatMessageItemProps) => {
    const { message } = props;

    const isMyMessage = message.isCurrentUser;
    const isMessageSeen = message.isViewed;

    const messageTime = new Date(message.modificationTimestamp || new Date());
    const lastModifiedHour = messageTime.getHours();
    const lastModifiedMinutes = messageTime.getMinutes();
    const isMessageFile = message.type === 60001002;

    return (
        <div
            className={`flex flex-col ${
                isMyMessage ? "my-message" : "employer-message"
            }`}
        >
            <div
                className={`${
                    isMyMessage
                        ? "my-message-content"
                        : "employer-message-content"
                }`}
            >
                {isMessageFile ? (
                    <div className="flex items-center gap-2">
                        <LucideFile /> <p>{}</p>
                    </div>
                ) : (
                    <p>{message.value}</p>
                )}
            </div>
            <div className="flex items-center gap-1">
                <p className="text-[#8B8D97] body-1">
                    {lastModifiedHour}:{lastModifiedMinutes}
                </p>
                {isMyMessage && isMessageSeen && (
                    <div className="flex items-center bg-[#F4F4F5] rounded">
                        <LucideTicket />
                    </div>
                )}
            </div>
        </div>
    );
};
