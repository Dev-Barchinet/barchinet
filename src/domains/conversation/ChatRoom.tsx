import React from "react";
import { ChatForm } from "./components/ChatForm";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { useGetApiArchitectChats } from "@/services/architect-services/api-architect-chats-get";
import { useParams } from "next/navigation";
import { useChatList } from "./context/ChatRoomContext";

export const ChatRoom = () => {
    const { id } = useParams<{ id: string }>();
    const { data: chatInfo, isLoading: fetchingChatInfo } =
        useGetApiArchitectChats(
            { ChatId: id },
            { query: { enabled: Boolean(id) } }
        );

    const { currentChatData } = useChatList();

    const chatValue = chatInfo?.value;

    if (fetchingChatInfo) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <LoaderCircle className="rotate-animation" />
            </div>
        );
    }

    if (!chatInfo || !chatValue?.chatId || !currentChatData) {
        return "we are cooked";
    }

    return (
        <div className="flex flex-col h-full flex-1">
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
            <div className="flex-1 max-h-full overflow-y-auto">chats</div>
            <div className="p-4">
                <ChatForm chatId={chatValue?.chatId} />
            </div>
        </div>
    );
};
