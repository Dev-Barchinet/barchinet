import { SaleContractorAgreementsQueriesV1ArchitectsGetPaymentsGetPaymentsQueryResult } from "@/services/architect-services/api-architect-contractor-agreements-payments-get.schemas";
import React from "react";
import { OrderInformationItemSimpleChild } from "../../OrderInformation/components/OrderInformationItemSimpleChild";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useFileDownloader } from "@/core/hooks/useFileDownloader";
import { useSession } from "next-auth/react";

type OrderPayementItemProps = {
  payement: SaleContractorAgreementsQueriesV1ArchitectsGetPaymentsGetPaymentsQueryResult;
};

export const OrderPaymentItem = (props: OrderPayementItemProps) => {
  const { payement } = props;
  const t = useTranslations("Order.OrderPayement");
  const timestampDate = new Date(payement.transactionTimestamp || "");
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  const { data: session } = useSession();
  const fileAccessToken = session?.user?.fileAccessCredential;
  const accessToken = session?.user?.accessToken;

  const { getFileLink, downloadFile, isDownloading } = useFileDownloader(
    fileAccessToken,
    accessToken
  );

  const handleFileDownload = async () => {
    if (isDownloading) return;
    await downloadFile(
      payement.receiptPath || "",
      `receipt-${payement.trackingNumber}`
    );
  };

  const formattedDate = timestampDate.toLocaleDateString("en-GB", options);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center flex-wrap gap-4">
        <OrderInformationItemSimpleChild
          body={payement.processTypeTitle}
          title={t("paymentMethod")}
        />
        <OrderInformationItemSimpleChild
          body={formattedDate}
          title={t("paymentDate")}
        />
        <OrderInformationItemSimpleChild
          body={payement.accountNumber}
          title={t("financial")}
        />
        <OrderInformationItemSimpleChild
          body={payement.trackingNumber}
          title={t("trackingNum")}
        />
        <OrderInformationItemSimpleChild
          body={payement.amount?.toLocaleString()}
          title={t("amount")}
        />
      </div>
      {payement.receiptPath && !payement.receiptPath.includes("pdf") && (
        <Image
          onClick={handleFileDownload}
          src={getFileLink(payement.receiptPath)}
          alt="reciept"
          width={132}
          height={132}
          className="object-contain cursor-pointer"
          style={{ cursor: isDownloading ? "progress" : "pointer" }}
        />
      )}
      {payement.receiptPath && payement.receiptPath.includes("pdf") && (
        <div
          className="w-[132px] p-3 cursor-pointer h-[132px] bg-border rounded-md"
          style={{ cursor: isDownloading ? "progress" : "pointer" }}
          onClick={handleFileDownload}
        >
          File
        </div>
      )}
    </div>
  );
};
