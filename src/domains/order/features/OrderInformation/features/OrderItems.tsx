import { Skeleton } from "@/components/ui/skeleton";
import { TishtarResponseGenericListSaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult } from "@/services/architect-services/api-architect-orders-items-{orderId}-items-get.schemas";
import { useTranslations } from "next-intl";
import React from "react";
import { OrderInformationItemSimpleChild } from "../components/OrderInformationItemSimpleChild";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { OrderItem } from "../components/OrderItem";

type OrderItemsProps = {
    orderItems?: TishtarResponseGenericListSaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult;
    fetchingOrderItems: boolean;
    orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
};

export const OrderItems = (props: OrderItemsProps) => {
    const { fetchingOrderItems, orderItems, orderData } = props;
    const t = useTranslations("Order.OrderItems");


    if (fetchingOrderItems) return <Skeleton className="w-full h-[60px]" />;
    return (
        <div className="flex flex-col gap-8 w-full">
            <div className="flex flex-col gap-2">
                <p className="title-4">{t("landDimention")}</p>
                <div className="flex items-center gap-4 flex-wrap">
                    <OrderInformationItemSimpleChild
                        title={t("length")}
                        body={orderData.length}
                    />
                    <OrderInformationItemSimpleChild
                        title={t("width")}
                        body={orderData.width}
                    />
                </div>
            </div>
            {Boolean(orderItems) &&
                Number(orderItems?.value?.length) > 0 &&
                orderItems?.value?.map((orderItem, index) => (
                    <OrderItem
                        index={index}
                        orderItem={orderItem}
                        key={orderItem.id}
                    />
                ))}
        </div>
    );
};
