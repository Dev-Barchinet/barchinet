import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import React from "react";
import { OrderInformationItemSimpleChild } from "../components/OrderInformationItemSimpleChild";
import { useTranslations } from "next-intl";

type OrderProjectAddressProps = {
    orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
};

export const OrderProjectAddress = (props: OrderProjectAddressProps) => {
    const { orderData } = props;
    const t = useTranslations("Order.OrderProjectAddress");
    return (
        <div className="flex itesm-center gap-4 flex-wrap">
            <OrderInformationItemSimpleChild
                title={t("title")}
                body={orderData.locationTitle}
            />
            <OrderInformationItemSimpleChild
                title={t("address")}
                body={orderData.locationAddress}
            />
            <OrderInformationItemSimpleChild
                title={t("country")}
                body={orderData.locationCountry}
            />
            <OrderInformationItemSimpleChild
                title={t("province")}
                body={orderData.locationState}
            />
        </div>
    );
};
