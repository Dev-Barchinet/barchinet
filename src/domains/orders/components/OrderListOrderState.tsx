import { Button } from "@/components/ui/button";
import { Link } from "@/config/i18n/routing";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrdersQueryResult } from "@/services/architect-services/api-architect-orders-get-all-get.schemas";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type OrderListOrderStateProps = {
  orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrdersQueryResult;
};

const getOrderStateColor = (orderState: number) => {
  if (orderState === 1) {
    return "#C3A21E";
  }
  if (orderState === 2) {
    return "#E11900";
  }
  return "#1EA170";
};

export const OrderListOrderState = (props: OrderListOrderStateProps) => {
  const { orderData } = props;
  const orderStatus = orderData.status;
  const orderStatusTitle = orderData.statusTitle;
  const orderStateColor = getOrderStateColor(orderStatus || 1);
  const t = useTranslations("Orders");

  return (
    <div className="flex items-center gap-2">
      <div
        style={{ backgroundColor: orderStateColor }}
        className="rounded-md px-2  body-3 text-white"
      >
        {orderStatusTitle}
      </div>
      <Link href={`/orders/${orderData.id}`}>
        <Button variant="outline" className="max-w-[100px]">
          {t("more")} <ChevronRight />
        </Button>
      </Link>
    </div>
  );
};
