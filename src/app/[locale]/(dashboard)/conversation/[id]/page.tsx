"use client";
import { ChatForm } from "@/domains/conversation/components/ChatForm";
import { useGetApiArchitectChats } from "@/services/architect-services/api-architect-chats-get";
import { LoaderCircle, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const { id } = useParams<{ id: string }>();
  const { data: chatInfo, isLoading: fetchingChatInfo } =
    useGetApiArchitectChats(
      { ChatId: id },
      { query: { enabled: Boolean(id) } }
    );

  const chatValue = chatInfo?.value;

  if (fetchingChatInfo) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <LoaderCircle className="rotate-animation" />
      </div>
    );
  }

  if (!chatInfo || !chatValue?.chatId) {
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
            src={"/assets/images/chatAvatar.png"}
          />
          <p className="title-5-5">{"TestName"}</p>
        </div>
        <div className="flex items-center gap-2 min-w-fit">
          <ShoppingCartIcon className="w-4" />
          <p className="min-w-fit">0 Orders</p>
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

export default Page;
