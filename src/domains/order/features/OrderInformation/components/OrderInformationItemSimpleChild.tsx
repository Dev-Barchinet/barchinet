import React from "react";

type OrderInformationItemSimpleChildProps = {
    title: string;
    body: React.ReactNode;
};

export const OrderInformationItemSimpleChild = (
    props: OrderInformationItemSimpleChildProps
) => {
    const { title, body } = props;
    return (
        <div className="flex flex-col gap-2 order-detail-box p-6">
            <p className="title-4 font-medium text-text-foreground">{title}</p>
            <div className="title-3 text-text-foreground">{body}</div>
        </div>
    );
};
