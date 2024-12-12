import { useGetApiArchitectChatsList } from "@/services/architect-services/api-architect-chats-list-get";
import {
    SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult,
    TishtarResponseGenericListSocialChatsQueriesV1SharedGetChatsGetChatsQueryResult,
} from "@/services/architect-services/api-architect-chats-list-get.schemas";
import { useParams } from "next/navigation";
import React, { createContext, PropsWithChildren, useContext } from "react";
import {
    QueryObserverResult,
    RefetchOptions,
    RefetchQueryFilters,
} from "react-query";

type ChatRoomContextType = {
    chatList: readonly SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult[];
    isLoading: boolean;
    refetch?: <TPageData>(
        options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
    ) => Promise<
        QueryObserverResult<
            TishtarResponseGenericListSocialChatsQueriesV1SharedGetChatsGetChatsQueryResult,
            unknown
        >
    >;
    currentChatData?:
        | SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult
        | undefined;
};

const ChatRoomContext = createContext<ChatRoomContextType>({
    chatList: [],
    isLoading: false,
});

const ChatRoomContextProvider = (props: PropsWithChildren) => {
    const { data, isLoading, refetch } = useGetApiArchitectChatsList({ query: { staleTime: 10000 } });
    const { id } = useParams<{ id?: string }>();

    const chatList = data?.value || [];
    const currentChatData = chatList?.find((chat) => chat.chatId === id);

    return (
        <ChatRoomContext.Provider
            value={{ chatList, isLoading, refetch, currentChatData }}
        >
            {props.children}
        </ChatRoomContext.Provider>
    );
};

export const useChatList = () => useContext(ChatRoomContext);

export default ChatRoomContextProvider;
