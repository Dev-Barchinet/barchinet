import { Skeleton } from "@/components/ui/skeleton";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { TishtarResponseSaleOrdersQueriesV1ArchitectsGetInspirationItemsGetInspirationItemsQueryResult } from "@/services/architect-services/api-architect-orders-inspiration-items-{orderId}-get.schemas";
import React from "react";
import { OrderInformationItemSimpleChild } from "../components/OrderInformationItemSimpleChild";
import FileDisplay from "@/domains/order/components/FileDisplay";
import { useTranslations } from "next-intl";

type OrderInspirationDocumentsProps = {
    orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
    inspirationFiles?: TishtarResponseSaleOrdersQueriesV1ArchitectsGetInspirationItemsGetInspirationItemsQueryResult;
    fetchingInspirationItems: boolean;
};

export const OrderInspirationDocuments = (
    props: OrderInspirationDocumentsProps
) => {
    const { fetchingInspirationItems, inspirationFiles } = props;
    const t = useTranslations("Order.OrderInspirationFiles");

    if (fetchingInspirationItems)
        return <Skeleton className="w-[224px] h-[122px]" />;
    return (
        <div>
            <OrderInformationItemSimpleChild
                title={t("inspirationFiles")}
                body={
                    <FileDisplay
                        files={
                            inspirationFiles?.value?.files?.map(
                                (file) => file.value || ""
                            ) || []
                        }
                    />
                }
            />
        </div>
    );
};
