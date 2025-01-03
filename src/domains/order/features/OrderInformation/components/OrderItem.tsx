import { SaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult } from "@/services/architect-services/api-architect-orders-items-{orderId}-items-get.schemas";
import React from "react";
import { OrderInformationItemSimpleChild } from "./OrderInformationItemSimpleChild";
import { useTranslations } from "next-intl";
import FileDisplay from "@/domains/order/components/FileDisplay";
import { useGetApiArchitectOrdersItemsDownloadZip } from "@/services/architect-services/api-architect-orders-items-download-zip-get";
import { useParams } from "next/navigation";

type OrderItemProps = {
    orderItem: SaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult;
    index: number;
};

export const OrderItem = (props: OrderItemProps) => {
    const { orderItem, index } = props;
    const t = useTranslations("Order.OrderItems");

    const { id } = useParams<{ id: string }>();

    const { refetch, isLoading } = useGetApiArchitectOrdersItemsDownloadZip(
        {
            OrderId: id,
            OrderItemId: orderItem.id,
        },
        {
            query: { enabled: Boolean(id) && Boolean(orderItem.id) && false },
            request: { responseType: "arraybuffer" },
        }
    );

    const handleDownloadAll = async () => {
        try {
            const response = await refetch(); // Triggers the download API
            const zipFile = response.data;
            if (!zipFile) throw Error("Failed");
            const blob = new Blob([zipFile], {
                type: "application/octet-stream",
            });
            const url = URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.download = `order_item_${orderItem.id}_files.zip`;
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Failed to download files:", error);
        }
    };

    return (
        <div className="flex flex-col gap-2">
            <p className="text-[#1EA170] title-4 ">
                {t("orderIndex", { index: index + 1 })}
            </p>
            <div className="flex items-start flex-wrap gap-4">
                {orderItem?.buildingPartTitle && (
                    <OrderInformationItemSimpleChild
                        title={t("buildingPartTitle")}
                        body={orderItem.buildingPartTitle}
                    />
                )}
                {orderItem?.length && (
                    <OrderInformationItemSimpleChild
                        title={t("length")}
                        body={orderItem.length}
                    />
                )}
                {orderItem?.width && (
                    <OrderInformationItemSimpleChild
                        title={t("width")}
                        body={orderItem.width}
                    />
                )}
                {orderItem?.height && (
                    <OrderInformationItemSimpleChild
                        title={t("height")}
                        body={orderItem.height}
                    />
                )}
                {orderItem?.description && (
                    <OrderInformationItemSimpleChild
                        title={t("description")}
                        body={orderItem.description}
                    />
                )}

                {orderItem?.attachments &&
                    Number(orderItem?.attachments?.length) > 0 && (
                        <OrderInformationItemSimpleChild
                            title={t("files")}
                            body={
                                <FileDisplay
                                    files={orderItem.attachments.map(
                                        (file) => file?.path || ""
                                    )}
                                    onDownloadAll={handleDownloadAll}
                                    isDownloading={isLoading}
                                />
                            }
                        />
                    )}
            </div>
        </div>
    );
};
