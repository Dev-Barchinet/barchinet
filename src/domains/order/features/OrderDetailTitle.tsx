import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@/config/i18n/routing";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { ArrowLeft, File } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { AcceptOrderModal } from "../components/AcceptOrderModal";

type OrderDetailTitleProps = {
  orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
};


const getOrderStatus = (orderAcceptedByArchitect: boolean) => {
  if (orderAcceptedByArchitect) {
    return {
      title: "Accepted",
      backgroundColor: "#1EA170",
    };
  }
  return {
    backgroundColor: "#C3A21E",
    title: "waiting for you to acccept",
  };
};



export const OrderDetailTitle = (props: OrderDetailTitleProps) => {
  const { orderData } = props;
  const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
  const { replace } = useRouter();
  const t = useTranslations("Order.OrderHeader");

  const orderAcceptedByArchitect = Boolean(orderData.canAssignInitialDocuments);
  const orderStatus = getOrderStatus(orderAcceptedByArchitect);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            replace("/orders");
          }}
          size="sm"
          variant="outline"
          className="max-w-[32px]"
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-col gap-2 title-2">
          <p>
            {t("orderNumber")}: {orderData.number}
          </p>
          <div
            className="rounded-full p-1 px-2 text-center max-w-fit"
            style={{ backgroundColor: orderStatus.backgroundColor }}
          >
            <p className="body-3 text-white">{orderStatus.title}</p>
          </div>
        </div>
      </div>
      <TabsList>
        <TabsTrigger value="orderInfo">order information</TabsTrigger>
        <TabsTrigger value="files">your file</TabsTrigger>
        <TabsTrigger value="payment">payment</TabsTrigger>
      </TabsList>
      <div className="lex items-center justify-end gap-2.5">
        {orderAcceptedByArchitect && (
          <>
            <Button className="gap-2" variant="default">
              <File /> {t("agreement")}
            </Button>
            <Button variant="secondary">{t("chat")}</Button>
          </>
        )}
        {!orderAcceptedByArchitect && (
          <Button
            className="gap-2"
            variant="default"
            onClick={() => {
              setShowAcceptOrderModal(true);
            }}
          >
            {t("accept")}
          </Button>
        )}
      </div>
      <AcceptOrderModal
        {...{ showAcceptOrderModal, setShowAcceptOrderModal }}
      />
    </div>
  );
};
