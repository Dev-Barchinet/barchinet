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
                body={orderData.location?.title}
            />
            <OrderInformationItemSimpleChild
                title={t("address")}
                body={orderData.location?.address}
            />
            <OrderInformationItemSimpleChild
                title={t("country")}
                body={orderData.location?.countryTitle}
            />
            <OrderInformationItemSimpleChild
                title={t("province")}
                body={orderData.location?.stateTitle}
            />
        </div>
    );
};
