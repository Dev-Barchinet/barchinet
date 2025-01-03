import { useGetApiArchitectOrdersAsBulitPlansOrderId } from "@/services/architect-services/api-architect-orders-as-bulit-plans-{orderId}-get";
import { useGetApiArchitectOrdersInspirationItemsOrderId } from "@/services/architect-services/api-architect-orders-inspiration-items-{orderId}-get";
import { useGetApiArchitectOrdersItemsOrderIdItems } from "@/services/architect-services/api-architect-orders-items-{orderId}-items-get";
import React from "react";
import { OrderInformationItem } from "./components/OrderInformationItem";
import { OrderBasicInformation } from "./features/OrderBasicInformation";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { useTranslations } from "next-intl";
import { OrderInspirationDocuments } from "./features/OrderInspirationDocuments";
import { OrderProjectAddress } from "./features/OrderProjectAddress";
import { OrderProjectPricing } from "./features/OrderProjectPricing";
import { OrderItems } from "./features/OrderItems";

type OrderInformationProps = {
  id: string;
  orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
};

export const OrderInformation = (props: OrderInformationProps) => {
  const { id, orderData } = props;
  const t = useTranslations("Order");
  const { data: asBuiltPlanFiles, isLoading: fetchingAsBuiltPlanFiles } =
    useGetApiArchitectOrdersAsBulitPlansOrderId(id, {
      query: { enabled: Boolean(id) },
    });

  const { data: inspirationFiles, isLoading: fetchingInspirationItems } =
    useGetApiArchitectOrdersInspirationItemsOrderId(id, {
      query: { enabled: Boolean(id) },
    });
  const { data: orderItems, isLoading: fetchingOrderItems } =
    useGetApiArchitectOrdersItemsOrderIdItems(id, {
      query: { enabled: Boolean(id) },
    });

  return (
    <div className="w-full">
      <OrderInformationItem
        title={t("orderBasicInformation")}
        OrderInformationBody={
          <OrderBasicInformation
            orderData={orderData}
            asBuiltPlanFiles={asBuiltPlanFiles}
            fetchingAsBuiltPlanFiles={fetchingAsBuiltPlanFiles}
          />
        }
      />
      {!fetchingInspirationItems &&
        (Number(inspirationFiles?.value?.files?.length) > 0 ||
          Number(inspirationFiles?.value?.links?.length) > 0) && (
          <OrderInformationItem
            title={t("inspirationDocuments")}
            OrderInformationBody={
              <OrderInspirationDocuments
                orderData={orderData}
                inspirationFiles={inspirationFiles}
                fetchingInspirationItems={fetchingInspirationItems}
              />
            }
          />
        )}
      <OrderInformationItem
        title={t("projectAddress")}
        OrderInformationBody={<OrderProjectAddress orderData={orderData} />}
      />
      <OrderInformationItem
        title={t("projectPricing")}
        OrderInformationBody={<OrderProjectPricing orderData={orderData} />}
      />
      {Number(orderItems?.value?.length) > 0 && (
        <OrderInformationItem
          title={t("orderItems")}
          OrderInformationBody={
            <OrderItems
              orderItems={orderItems}
              orderData={orderData}
              fetchingOrderItems={fetchingOrderItems}
            />
          }
        />
      )}
    </div>
  );
};
