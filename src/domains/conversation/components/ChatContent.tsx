import { SocialChatsQueriesV1SharedGetMessagesChatMessageContract } from "@/services/architect-services/api-architect-chats-get.schemas";
import React, { useEffect, useRef } from "react";
import { ChatMessageItem } from "./ChatMessageItem";

type ChatContentProps = {
    messages: SocialChatsQueriesV1SharedGetMessagesChatMessageContract[];
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
};

export const ChatContent = (props: ChatContentProps) => {
    const { messages, fetchNextPage, isFetchingNextPage } = props;
    const sentinelRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const sentinelRefValue = sentinelRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 0.5,
            }
        );

        if (sentinelRefValue) {
            observer.observe(sentinelRefValue);
        }

        return () => {
            if (sentinelRefValue) {
                observer.unobserve(sentinelRefValue);
            }
        };
    }, [fetchNextPage, isFetchingNextPage]);

    if (messages.length === 0) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                No Messages Yet Start Chatting
            </div>
        );
    }

    return (
        <div className="flex flex-col-reverse h-full px-4 pt-2 gap-4 flex-1 max-h-full overflow-y-auto">
            {messages.map((message) => (
                <ChatMessageItem message={message} key={message.id} />
            ))}
            <div
                ref={sentinelRef}
                className="min-h-[10px] w-full "
            />
            {isFetchingNextPage && (
                <div className="w-full text-center text-gray-500">
                    Loading...
                </div>
            )}
        </div>
    );
};
