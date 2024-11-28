import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { TishtarResponseSaleOrdersQueriesV1ArchitectsGetInspirationItemsGetInspirationItemsQueryResult } from "@/services/architect-services/api-architect-orders-inspiration-items-{orderId}-get.schemas";
import React from "react";

type OrderInspirationDocumentsProps = {
    orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
    inspirationFiles?: TishtarResponseSaleOrdersQueriesV1ArchitectsGetInspirationItemsGetInspirationItemsQueryResult;
    fetchingInspirationItems: boolean
};

export const OrderInspirationDocuments = (
    props: OrderInspirationDocumentsProps
) => {

    console.log({props})
    return <div>OrderInspirationDocuments</div>;
};
