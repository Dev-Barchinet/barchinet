import { Button } from "@/components/ui/button";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { Podcast } from "lucide-react";
import React, { useState } from "react";
import { AcceptOrderModal } from "../../components/AcceptOrderModal";
import { OrderInformationItem } from "../OrderInformation/components/OrderInformationItem";
import { useTranslations } from "next-intl";
import { OrderDraftFiles } from "./features/OrderDraftFiles";
import { OrderFinalFiles } from "./features/OrderFinalFiles";

type OrderFileProps = {
  orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
};

export const OrderFiles = (props: OrderFileProps) => {
  const { orderData } = props;
  const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
  const t = useTranslations("Order.OrderFiles");

  const orderAcceptedByArchitect = Boolean(orderData.canAssignInitialDocuments);

  if (orderAcceptedByArchitect) {
    return (
      <div className="w-full h-full gap-2 flex-1 flex flex-col items-center justify-center">
        <Podcast className="text-[#6A6A6A] mb-2" />
        <p className="title-3">{t("empty")}</p>
        <p className="body-1 text-text-muted-foreground mb-2">
          {t("emptyError")}
        </p>
        <Button
          className="gap-2 max-w-[100px]"
          variant="default"
          onClick={() => {
            setShowAcceptOrderModal(true);
          }}
        >
          {t("accept")}
        </Button>
        <AcceptOrderModal
          {...{ showAcceptOrderModal, setShowAcceptOrderModal }}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <OrderInformationItem
        title={t("draft")}
        OrderInformationBody={<OrderDraftFiles />}
      />
      <OrderInformationItem
        grayMode
        title={t("finalFiles")}
        OrderInformationBody={<OrderFinalFiles />}
      />
    </div>
  );
};
