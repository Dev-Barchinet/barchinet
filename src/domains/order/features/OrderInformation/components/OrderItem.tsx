import { SaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult } from "@/services/architect-services/api-architect-orders-items-{orderId}-items-get.schemas";
import React from "react";
import { OrderInformationItemSimpleChild } from "./OrderInformationItemSimpleChild";
import { useTranslations } from "next-intl";

type OrderItemProps = {
    orderItem: SaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult;
    index: number
};

export const OrderItem = (props: OrderItemProps) => {
    const { orderItem, index } = props;
    const t = useTranslations("Order.OrderItems");

    return (
        <div className="flex flex-col gap-2">
            <p className="text-[#1EA170] title-4 ">
                {t("orderIndex", { index })}
            </p>
            <div className="flex items-center flex-wrap gap-4">
                <OrderInformationItemSimpleChild
                    title={t("buildingPartTitle")}
                    body={orderItem.buildingPartTitle}
                />
            </div>
        </div>
    );
};
