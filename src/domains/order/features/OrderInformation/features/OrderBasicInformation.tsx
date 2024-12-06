import React, { useState } from "react";
import { OrderInformationItemSimpleChild } from "../components/OrderInformationItemSimpleChild";
import { useTranslations } from "next-intl";
import { SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult } from "@/services/architect-services/api-architect-orders-get-{id}-get.schemas";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { TishtarResponseGenericListSaleOrdersQueriesV1ArchitectsGetAsBuiltPlansGetAsBuiltPlansQueryResult } from "@/services/architect-services/api-architect-orders-as-bulit-plans-{orderId}-get.schemas";
import { Skeleton } from "@/components/ui/skeleton";
import FileDisplay from "@/domains/order/components/FileDisplay";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useGetApiArchitectOrdersAsBulitPlansDownloadZip } from "@/services/architect-services/api-architect-orders-as-bulit-plans-download-zip-get";

type OrderBasicInformationProps = {
  orderData: SaleOrdersQueriesV1ArchitectsGetOrdersGetOrderDetailQueryResult;
  asBuiltPlanFiles?: TishtarResponseGenericListSaleOrdersQueriesV1ArchitectsGetAsBuiltPlansGetAsBuiltPlansQueryResult;
  fetchingAsBuiltPlanFiles: boolean;
};

export const OrderBasicInformation = (props: OrderBasicInformationProps) => {
  const { orderData, fetchingAsBuiltPlanFiles, asBuiltPlanFiles } = props;
  const t = useTranslations("Order.OrderBasicInformation");
  const [showServices, setShowServices] = useState(false);

  const { isLoading, refetch } =
    useGetApiArchitectOrdersAsBulitPlansDownloadZip(
      { OrderId: orderData.id },
      { query: { enabled: false }, request: { responseType: "arraybuffer" } }
    );

  const asBuiltPlanFilesValue = asBuiltPlanFiles?.value;
  const orderServices = orderData.services;

  const handleShowServices = () => {
    setShowServices(true);
  };

  const handleDownloadAllAsBuiltPlans = async () => {
    try {
      const response = await refetch(); // Fetch the zip file
      const zipFile = response.data;
      if (!zipFile) throw Error("Failed to Download");
      const blob = new Blob([zipFile], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `order_${orderData.id}_as_built_plans.zip`;
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download as-built plans:", error);
    }
  };

  return (
    <div className="flex items-start flex-wrap gap-4">
      <OrderInformationItemSimpleChild
        title={t("projectName")}
        body={orderData?.title || "Order Title"}
      />
      <OrderInformationItemSimpleChild
        title={t("projectType")}
        body={orderData?.projectTypeTitle || "Order Type"}
      />
      <OrderInformationItemSimpleChild
        title={t("buildingCategory")}
        body={orderData?.buildingCategoryTitle || "Order Category"}
      />
      <OrderInformationItemSimpleChild
        title={t("architectureStyle")}
        body={orderData?.architectureStyleTitle || "Order Architecture Style"}
      />
      <OrderInformationItemSimpleChild
        title={t("servicesCount")}
        body={
          <div className="flex items-center justify-between gap-2">
            <p>
              {orderData?.services?.length || 0} {t("services")}
            </p>
            <Button
              variant="link"
              className="w-[50px] h-5"
              onClick={handleShowServices}
            >
              {t("more")} <ChevronRight />
            </Button>
          </div>
        }
      />
      {fetchingAsBuiltPlanFiles && <Skeleton className="w-[224px] h-[122px]" />}
      {!fetchingAsBuiltPlanFiles &&
        Number(asBuiltPlanFiles?.value?.length) > 0 && (
          <OrderInformationItemSimpleChild
            title={t("asBuiltPlanFiles")}
            body={
              <FileDisplay
                files={
                  asBuiltPlanFilesValue?.map((file) => file.path || "") || []
                }
                onDownloadAll={handleDownloadAllAsBuiltPlans}
                isDownloading={isLoading}
              />
            }
          />
        )}

      <Dialog open={showServices} onOpenChange={() => setShowServices(false)}>
        <DialogContent>
          <DialogTitle>Services</DialogTitle>
          <div className="order-detail-box p-3">
            {orderServices?.map((service) => (
              <p key={service.serviceId} className="title-3">
                {service.serviceTitle}
              </p>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
