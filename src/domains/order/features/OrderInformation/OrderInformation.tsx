import { useGetApiArchitectOrdersAsBulitPlansOrderId } from "@/services/architect-services/api-architect-orders-as-bulit-plans-{orderId}-get";
import { useGetApiArchitectOrdersInspirationItemsOrderId } from "@/services/architect-services/api-architect-orders-inspiration-items-{orderId}-get";
import { useGetApiArchitectOrdersItemsOrderIdItems } from "@/services/architect-services/api-architect-orders-items-{orderId}-items-get";
import React from "react";
import { OrderInformationItem } from "./components/OrderInformationItem";
import { OrderBasicInformation } from "./features/OrderBasicInformation";

type OrderInformationProps = {
  id: string;
};

export const OrderInformation = (props: OrderInformationProps) => {
  const { id } = props;
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
        title="Project Basic Information"
        OrderInformationBody={<OrderBasicInformation />}
      />
    </div>
  );
};
