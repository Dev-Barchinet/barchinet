import { Button } from "@/components/ui/button";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { Podcast } from "lucide-react";
import React, { useState } from "react";
import { AcceptOrderModal } from "../../components/AcceptOrderModal";
import { OrderInformationItem } from "../OrderInformation/components/OrderInformationItem";
import { useTranslations } from "next-intl";
import { OrderDraftFiles } from "./features/OrderFilesWrapper";
import { useGetApiArchitectOrdersRevisionsGet } from "@/services/architect-services/api-architect-orders-revisions-get-get";
import { useParams } from "next/navigation";

type OrderFileProps = {
    orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
    refetchOrderDetail: () => void
};

export const OrderFiles = (props: OrderFileProps) => {
    const { orderData, refetchOrderDetail } = props;
    const [showAcceptOrderModal, setShowAcceptOrderModal] = useState(false);
    const t = useTranslations("Order.OrderFiles");

    const { id } = useParams<{ id: string }>();
    const { data, isLoading, refetch } = useGetApiArchitectOrdersRevisionsGet({
        OrderId: id,
    });

    const revisions = data?.value;

    const orderShowableToArchitect = !Boolean(orderData.pendingAgreementReview);

    if (!orderShowableToArchitect) {
        return (
            <div className="w-full h-full gap-2 flex-1 flex flex-col items-center justify-center">
                <Podcast className="text-[#6A6A6A] mb-2" />
                <p className="title-3">
                    {orderData.pendingAgreementReview
                        ? t("empty")
                        : orderData.stateTitle}
                </p>
                <p className="body-1 text-text-muted-foreground mb-2">
                    {orderData.pendingAgreementReview
                        ? t("emptyError")
                        : orderData.stateDescription}
                </p>
                {orderData.pendingAgreementReview && (
                    <Button
                        className="gap-2 max-w-[100px]"
                        variant="default"
                        onClick={() => {
                            setShowAcceptOrderModal(true);
                        }}
                    >
                        {t("accept")}
                    </Button>
                )}
                <AcceptOrderModal
                    {...{ showAcceptOrderModal, setShowAcceptOrderModal, refetchOrderDetail }}
                />
            </div>
        );
    }

    return (
        <div className="w-full">
            <OrderInformationItem
                grayMode={!Boolean(orderData.canAssignInitialDocuments)}
                title={t("draft")}
                OrderInformationBody={
                    <OrderDraftFiles
                        refetchRevisions={refetch}
                        id={id}
                        disabled={!Boolean(orderData.canAssignInitialDocuments)}
                        isLoading={isLoading}
                        revisions={revisions?.filter(
                            (revision) => revision.revisionType === 1
                        )}
                        maximumRevisionCount={Number(orderData.revisionCount)}
                    />
                }
            />
            <OrderInformationItem
                grayMode={!Boolean(orderData.canAssignFinalDocuments)}
                title={t("finalFiles")}
                OrderInformationBody={
                    <OrderDraftFiles
                        maximumRevisionCount={Number(
                            orderData.finalRevisionCount
                        )}
                        disabled={!Boolean(orderData.canAssignFinalDocuments)}
                        refetchRevisions={refetch}
                        id={id}
                        isLoading={isLoading}
                        revisions={revisions?.filter(
                            (revision) => revision.revisionType === 2
                        )}
                    />
                }
            />
        </div>
    );
};
