import { useFileDownloader } from "@/core/hooks/useFileDownloader";
import { SocialChatsQueriesV1SharedGetMessagesChatMessageContract } from "@/services/architect-services/api-architect-chats-get.schemas";
import { Check, LoaderCircle, LucideFile } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";

type ChatMessageItemProps = {
    message: SocialChatsQueriesV1SharedGetMessagesChatMessageContract;
};

export const ChatMessageItem = (props: ChatMessageItemProps) => {
    const { message } = props;
    const { data: session } = useSession();
    const fileAccessToken = session?.user?.fileAccessCredential;
    const accessToken = session?.user?.accessToken;
    const { downloadFile, isDownloading } = useFileDownloader(
        fileAccessToken,
        accessToken
    );

    const isMyMessage = message.isCurrentUser;
    const isMessageSeen = message.isViewed;

    const messageTime = new Date(message.timestamp || new Date());
    const lastModifiedHour = messageTime.getHours();
    const lastModifiedMinutes = messageTime.getMinutes();
    const isMessageFile = message.type === 60001002;
    const fileName = message.value?.split("/").slice(-1)[0];

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
                    <div
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() =>
                            downloadFile(message?.value || "", fileName || "")
                        }
                    >
                        <LucideFile /> <p>{fileName}</p>
                    </div>
                ) : (
                    <p>{message.value}</p>
                )}
            </div>
            <div className="flex items-center gap-1">
                {isDownloading && <LoaderCircle />}
                <p className="text-[#8B8D97] body-1">
                    {lastModifiedHour}:{lastModifiedMinutes}
                </p>
                {isMyMessage && isMessageSeen && (
                    <div className="flex items-center bg-[#F4F4F5] rounded">
                        <Check className="w-[12px] h-[12px]" />
                    </div>
                )}
            </div>
        </div>
    );
};
