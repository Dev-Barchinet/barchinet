import { Link, usePathname } from "@/config/i18n/routing";
import { SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult } from "@/services/architect-services/api-architect-chats-list-get.schemas";
import Image from "next/image";
import React from "react";

type ChatItemProps = {
    chat: SocialChatsQueriesV1SharedGetChatsGetChatsQueryResult;
};

export const ChatItem = (props: ChatItemProps) => {
    const { chat } = props;
    const pathname = usePathname();

    const isActive = chat.chatId ? pathname.includes(chat.chatId) : false;
    const lastChanged = new Date(chat.modifiedOnDateTime || new Date());
    const hours = String(lastChanged.getHours()).padStart(2, "0");
    const minutes = String(lastChanged.getMinutes()).padStart(2, "0");

    return (
        <Link
            href={`/conversation/${chat.chatId}`}
            style={{ backgroundColor: isActive ? "#D9EAEA" : "" }}
            className="flex items-center justify-between hover:bg-secondary p-2 rounded-md transition-all cursor-pointer"
        >
            <div className="flex items-center gap-2 flex-1">
                <Image
                    width={40}
                    height={40}
                    className="rounded-[50%]"
                    alt={chat.chattedUserDisplayName || "employer name"}
                    src={
                        chat.chattedUserImagePath ||
                        "/assets/images/chatAvatar.png"
                    }
                />
                <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                        <p className="title-5-5">
                            {chat.chattedUserDisplayName || "TestName"}
                        </p>
                        <p className="body-3 bg-secondary rounded-full px-2 py-1 text-center">
                            {chat.chattedUserRoleTypeTitle || "Test Role"}
                        </p>
                    </div>
                    <p className="body-1 text-text-muted-foreground">
                        {chat.lastMessage?.type === 60001002
                            ? "File"
                            : chat.lastMessage?.value}
                    </p>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                {Number(chat.unviewedMessageCount) > 0 && (
                    <div className="px-2.5 py-0.5 bg-black text-white rounded-full">
                        New
                    </div>
                )}
                <p className="body-2 text-text-muted-foreground text-center">
                    {hours}:{minutes}
                </p>
            </div>
        </Link>
    );
};
