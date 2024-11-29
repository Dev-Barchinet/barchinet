import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { useTranslations } from "next-intl";
import React from "react";
import { OrderInformationItemSimpleChild } from "../components/OrderInformationItemSimpleChild";

type OrderProjectPricingProps = {
    orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
};

export const OrderProjectPricing = (props: OrderProjectPricingProps) => {
    const { orderData } = props;
    const t = useTranslations("Order.OrderProjectPricing");

    return (
        <div className="flex itesm-center gap-4 flex-wrap">
            <OrderInformationItemSimpleChild
                title={t("revisionCount")}
                body={orderData.revisionCount}
            />
            <OrderInformationItemSimpleChild
                title={t("estimate")}
                body={orderData.deliveryDay}
            />
            <OrderInformationItemSimpleChild
                title={t("currency")}
                body={
                    orderData.finalPriceCurrencyTitle ||
                    "Make A Deal With Employer"
                }
            />
            <OrderInformationItemSimpleChild
                title={t("price")}
                body={orderData.finalPrice || "Make A Deal With Employer"}
            />
        </div>
    );
};
