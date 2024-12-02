import { SaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult } from "@/services/architect-services/api-architect-orders-items-{orderId}-items-get.schemas";
import React from "react";
import { OrderInformationItemSimpleChild } from "./OrderInformationItemSimpleChild";
import { useTranslations } from "next-intl";
import FileDisplay from "@/domains/order/components/FileDisplay";

type OrderItemProps = {
  orderItem: SaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult;
  index: number;
};

export const OrderItem = (props: OrderItemProps) => {
  const { orderItem, index } = props;
  const t = useTranslations("Order.OrderItems");

  return (
    <div className="flex flex-col gap-2">
      <p className="text-[#1EA170] title-4 ">
        {t("orderIndex", { index: index + 1 })}
      </p>
      <div className="flex items-start flex-wrap gap-4">
        <OrderInformationItemSimpleChild
          title={t("buildingPartTitle")}
          body={orderItem.buildingPartTitle}
        />
        <OrderInformationItemSimpleChild
          title={t("length")}
          body={orderItem.length}
        />
        <OrderInformationItemSimpleChild
          title={t("width")}
          body={orderItem.width}
        />
        <OrderInformationItemSimpleChild
          title={t("height")}
          body={orderItem.height}
        />
        <OrderInformationItemSimpleChild
          title={t("description")}
          body={orderItem.description}
        />

        {orderItem.attachments && orderItem.attachments.length > 0 && (
          <OrderInformationItemSimpleChild
            title={t("files")}
            body={
              <FileDisplay
                files={
                  orderItem.attachments?.map((file) => file.path || "") || []
                }
              />
            }
          />
        )}
      </div>
    </div>
  );
};
