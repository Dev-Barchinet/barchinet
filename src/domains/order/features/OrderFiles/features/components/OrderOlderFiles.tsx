import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";
import {
    SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionDocumentSetsQueryResult,
    SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult,
} from "@/services/architect-services/api-architect-orders-revisions-get-get.schemas";
import { useTranslations } from "next-intl";
import React from "react";
import { OrderOlderFilesComments } from "./OrderOlderFilesComments";
import { useFileDownloader } from "@/core/hooks/useFileDownloader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type OrderOlderFilesProps = {
    onDownloadFiles: () => void;
    isDownloading: boolean;
    revisionList: readonly SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult[];
    activeRevisionFiles:
        | readonly SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionDocumentSetsQueryResult[]
        | null
        | undefined;
    fetchingRevisionData: boolean;
    onActiveRevisionChange: (newRevisionId: string) => void;
    activeRevision?: SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult;
};

export const OrderOlderFiles = (props: OrderOlderFilesProps) => {
    const {
        activeRevisionFiles,
        isDownloading,
        onActiveRevisionChange,
        onDownloadFiles,
        revisionList,
        activeRevision,
        fetchingRevisionData,
    } = props;
    const { data: session } = useSession();
    const t = useTranslations("Order.OrderOlderFiles");

    const { getFileLink } = useFileDownloader(
        session?.user.fileAccessCredential,
        session?.user.accessToken
    );

    const indexOfActiveRevision = revisionList
        .map((item) => item.id)
        .indexOf(activeRevision?.id);

    return (
        <div className="order-detail-box max-w-full w-full p-4 mt-4">
            <div className="flex items-center justify-between mb-2">
                <p className="title-3-5">{t("olderUploadedFiles")}</p>
                {activeRevision && (
                    <Select
                        onValueChange={(value) => {
                            onActiveRevisionChange(value);
                        }}
                        value={activeRevision.id}
                    >
                        <SelectTrigger className="max-w-[150px] ">
                            {"Revision" + (indexOfActiveRevision + 1) ||
                                "last Revisison"}
                        </SelectTrigger>
                        <SelectContent>
                            {revisionList.map((revision, index) => (
                                <SelectItem
                                    value={revision.id || ""}
                                    key={revision.id}
                                >
                                    <p>Revision {index + 1}</p>
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>
            {fetchingRevisionData && <Skeleton className="w-full h-[100px]" />}
            {!fetchingRevisionData && (
                <>
                    {activeRevision?.reviewComment && (
                        <OrderOlderFilesComments
                            comment={activeRevision.reviewComment}
                        />
                    )}
                    <div className="flex items-center gap-4 overflow-x-auto max-w-full">
                        {activeRevisionFiles?.map((file, index) => (
                            <div key={file.id} className="min-w-[128px]">
                                <Image
                                    key={index}
                                    src={getFileLink(file.path || "")}
                                    alt={`file-${index}`}
                                    width={128}
                                    height={128}
                                    className=" object-cover rounded-md"
                                />
                            </div>
                        ))}
                    </div>
                    <Button
                        loading={isDownloading}
                        onClick={onDownloadFiles}
                        className="flex ml-auto mt-4 max-w-[150px]"
                    >
                        <Download /> {t("downloadAll")}
                    </Button>
                </>
            )}
        </div>
    );
};
