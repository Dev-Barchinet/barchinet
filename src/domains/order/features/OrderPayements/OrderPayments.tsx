import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiArchitectContractorAgreementsPayments } from "@/services/architect-services/api-architect-contractor-agreements-payments-get";
import React from "react";
import { OrderPaymentItem } from "./components/OrderPaymentItem";
import { Podcast } from "lucide-react";

type OrderPaymentsProps = {
  id: string;
  agreementId?: string | null;
};

export const OrderPayments = (props: OrderPaymentsProps) => {
  const { agreementId } = props;
  const { data, isLoading } = useGetApiArchitectContractorAgreementsPayments(
    { ContractorAgreementId: agreementId || "" },
    { query: { enabled: Boolean(agreementId) } }
  );

  if (isLoading)
    return (
      <div className="mx-4 flex flex-col gap-1">
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[100px] h-[20px]" />
        <Skeleton className="w-[100px] h-[20px]" />
      </div>
    );

  if (data?.value?.length === 0 || !data?.value)
    return (
      <div className="w-full h-full flex items-center justify-center gap-3 flex-col text-muted-foreground">
        <Podcast />
        <p className="title-3-5">Empty</p>
        <p className="body-1">There is no payment for this project.</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 p-4">
      {data?.value?.map((payement, index) => (
        <>
          <OrderPaymentItem key={payement.id} payement={payement} />
          {index !== Number(data.value?.length) - 1 && (
            <div
            className="w-full h-[1px] bg-border"
            key={`divider-${payement.id}`}
          ></div>
          )}
        </>
      ))}
    </div>
  );
};
