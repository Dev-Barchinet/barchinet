import React from "react";
import { ChatForm } from "./components/ChatForm";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { getApiArchitectChats } from "@/services/architect-services/api-architect-chats-get";
import { useParams } from "next/navigation";
import { useChatList } from "./context/ChatRoomContext";
import { ChatContent } from "./components/ChatContent";
import { useInfiniteQuery } from "react-query";

export const ChatRoom = () => {
    const { id } = useParams<{ id: string }>();

    const {
        data: chatInfo,
        refetch,
        isLoading: fetchingChatInfo,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["chatMessages", id],
        queryFn: ({ pageParam }) => {
            return getApiArchitectChats({
                ChatId: id,
                Skip: pageParam?.pageParam || 0,
                Take: Number(pageParam?.take) || 10,
            });
        },
        enabled: Boolean(id),
        getNextPageParam: (lastPage, allPages) => {
            const totalCount = lastPage.value?.totalCount || 0;
            const currentPage = allPages.length;
            const fetchedItems = currentPage * 10;

            const remainingItems = Math.max(0, totalCount - fetchedItems);
            const take = Math.min(10, remainingItems);

            if (remainingItems > 0) {
                return {
                    pageParam: fetchedItems,
                    meta: { take },
                };
            }
            return undefined;
        },
    });

    const { currentChatData } = useChatList();

    const chatMessages = chatInfo?.pages.flatMap(
        (page) => page.value?.messages || {}
    );

    if (fetchingChatInfo) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <LoaderCircle className="rotate-animation" />
            </div>
        );
    }

    if (!chatInfo || !currentChatData) {
        return "No Chat Found, Cooooked!";
    }

    return (
        <div className="flex flex-col max-h-[100%-80px] h-full flex-1">
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-1">
                    <Image
                        width={40}
                        height={40}
                        className="rounded-[50%]"
                        alt={"employer name"}
                        src={
                            currentChatData.chattedUserImagePath ||
                            "/assets/images/chatAvatar.png"
                        }
                    />
                    <p className="title-5-5">
                        {currentChatData.chattedUserDisplayName}
                    </p>
                </div>
            </div>
            <div className="w-full h-[2px] bg-border" />
            <ChatContent
                messages={chatMessages || []}
                fetchNextPage={fetchNextPage}
                isFetchingNextPage={isFetchingNextPage}
            />

            <div className="p-4">
                <ChatForm
                    chatId={chatInfo.pages[0].value?.chatId || ""}
                    recieverId={currentChatData.chattedUserId}
                    refetchMessages={refetch}
                />
            </div>
        </div>
    );
};
