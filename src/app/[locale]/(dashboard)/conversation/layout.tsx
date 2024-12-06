import React, { PropsWithChildren } from "react";

type ConversationLayoutProps = PropsWithChildren;

const ConversationLayout = (props: ConversationLayoutProps) => {
    const { children } = props;
    return (
        <div className="flex items-start p-4">
            <div>chat list</div>
            <div>{children}</div>
        </div>
    );
};

export default ConversationLayout;
