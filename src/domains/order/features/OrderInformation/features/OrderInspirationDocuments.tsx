import { Skeleton } from "@/components/ui/skeleton";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { TishtarResponseSaleOrdersQueriesV1ArchitectsGetInspirationItemsGetInspirationItemsQueryResult } from "@/services/architect-services/api-architect-orders-inspiration-items-{orderId}-get.schemas";
import React from "react";
import { OrderInformationItemSimpleChild } from "../components/OrderInformationItemSimpleChild";
import FileDisplay from "@/domains/order/components/FileDisplay";
import { useTranslations } from "next-intl";
import { OrderFileLinkWrapper } from "../components/OrderFileLinkWrapper";
import { useGetApiArchitectOrdersInspirationItemsDownloadZip } from "@/services/architect-services/api-architect-orders-inspiration-items-download-zip-get";
import { useParams } from "next/navigation";

type OrderInspirationDocumentsProps = {
  orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
  inspirationFiles?: TishtarResponseSaleOrdersQueriesV1ArchitectsGetInspirationItemsGetInspirationItemsQueryResult;
  fetchingInspirationItems: boolean;
};

export const OrderInspirationDocuments = (
  props: OrderInspirationDocumentsProps
) => {
  const { fetchingInspirationItems, inspirationFiles } = props;
  const t = useTranslations("Order.OrderInspirationFiles");
  const { id } = useParams();

  const { isLoading, refetch } =
    useGetApiArchitectOrdersInspirationItemsDownloadZip(
      { OrderId: String(id) },
      { query: { enabled: false }, request: { responseType: 'arraybuffer' } }
    );

  const handleDownloadFiles = () => {
    refetch().then((response) => {
      const data = response.data;
      if (data) {
        const blob = new Blob([data], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.download = `inspiration_files_${id}.zip`; // Use a meaningful file name
        document.body.appendChild(link);
        link.click();

        // Clean up the URL object and the link element
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } else {
        console.error("No data available for download");
      }
    });
  };

  const files = inspirationFiles?.value?.files;
  const links = inspirationFiles?.value?.links;

  if (fetchingInspirationItems)
    return <Skeleton className="w-[224px] h-[122px]" />;
  return (
    <div className="flex items-start gap-4">
      {files && files.length > 0 && (
        <OrderInformationItemSimpleChild
          title={t("inspirationFiles")}
          body={
            <FileDisplay
              files={files?.map((file) => file.value || "") || []}
              onDownloadAll={handleDownloadFiles}
              isDownloading={isLoading}
            />
          }
        />
      )}
      {links && links.length > 0 && (
        <OrderInformationItemSimpleChild
          title={t("fileLinks")}
          body={
            <OrderFileLinkWrapper
              links={links?.map((link) => link.value || "") || []}
            />
          }
        />
      )}
    </div>
  );
};
