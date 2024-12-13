"use client";

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import { ConversationLoading } from "./components/ConversationLoading";
import { ConversationList } from "./components/ConversationList";
import { useChatList } from "./context/ChatRoomContext";

export const ConversationWrapper = (props: PropsWithChildren) => {
    const { children } = props;
    const t = useTranslations("Messages");

    const { isLoading, refetch, chatList } = useChatList();

    return (
        <div className="flex flex-col justify-start h-full max-h-full">
            <div className="flex items-center justify-between mx-4 mt-4">
                <p className="title-2">{t("conversations")}</p>
                <Button className="max-w-[150px]" onClick={() => refetch?.()}>
                    <RefreshCcw /> Refresh
                </Button>
            </div>
            <div className="flex flex-1 items-start p-4 gap-4 h-full max-h-[calc(100%-60px)]">
                {isLoading && <ConversationLoading />}
                {!isLoading && (
                    <>
                        <div className="h-full conversation-layout-border max-h-full overflow-y-auto">
                            <ConversationList chats={chatList} />
                        </div>
                        <div className="flex-1 max-h-full h-full max-w-[calc(100%-320px)] conversation-layout-border">
                            {children}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
