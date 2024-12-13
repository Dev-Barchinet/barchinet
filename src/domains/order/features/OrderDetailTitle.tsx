import { Button } from "@/components/ui/button";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "@/config/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { AcceptOrderModal } from "../components/AcceptOrderModal";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { usePostApiArchitectChats } from "@/services/architect-services/api-architect-chats-post";

type OrderDetailTitleProps = {
  orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
  refetchOrderDetail: () => void;
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
  const { orderData, refetchOrderDetail } = props;
  const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
  const { mutateAsync: generateChat, isLoading: generatingChat } =
    usePostApiArchitectChats();
  const { replace, push } = useRouter();
  const t = useTranslations("Order.OrderHeader");

  const orderAcceptedByArchitect = !Boolean(orderData.pendingAgreementReview);
  const employerPaidMoney = orderData.chatingEnabled
  const orderStatus = getOrderStatus(orderAcceptedByArchitect);

  const agreementId = orderData.agreement?.id;

  const openChatWithEmployer = async () => {
    const recieverId = orderData.employerId;
    const response = await generateChat({ data: { ReceiverId: recieverId } });
    if (response.isSuccess) {
      push(`/conversation/${response.value}`);
    }
  };

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
        {orderAcceptedByArchitect && employerPaidMoney && (
          <>
            {/* <Button className="gap-2" variant="default">
              <File /> {t("agreement")}
            </Button> */}
            <Button
              variant="secondary"
              onClick={openChatWithEmployer}
              loading={generatingChat}
            >
              {t("chat")}
            </Button>
          </>
        )}
        {!orderAcceptedByArchitect && orderData.pendingAgreementReview && (
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
        {...{
          refetchOrderDetail,
          showAcceptOrderModal,
          setShowAcceptOrderModal,
          agreementId,
        }}
      />
    </div>
  );
};
