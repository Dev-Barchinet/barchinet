"use client";
import React, { PropsWithChildren } from "react";
import "./conversationStyles.css";
import { ConversationWrapper } from "@/domains/conversation/ConversationWrapper";
import ChatRoomContextProvider from "@/domains/conversation/context/ChatRoomContext";

type ConversationLayoutProps = PropsWithChildren;

const ConversationLayout = (props: ConversationLayoutProps) => {
    return (
        <ChatRoomContextProvider>
            <ConversationWrapper>{props.children}</ConversationWrapper>;
        </ChatRoomContextProvider>
    );
};

export default ConversationLayout;
