import React, { useState } from "react";
import { OrderFileUploader } from "./components/OrderFileUploader";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDraftFileRevisions } from "./OrderFileRevisions";
import { SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult } from "@/services/architect-services/api-architect-orders-revisions-get-get.schemas";
import { usePostApiArchitectOrdersRevisionsFile } from "@/services/architect-services/api-architect-orders-revisions-file-post";
import { usePostApiArchitectOrdersRevisions } from "@/services/architect-services/api-architect-orders-revisions-post";
import toast from "react-hot-toast";

type OrderDraftFilesProps = {
    revisions:
        | readonly SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult[]
        | null
        | undefined;
    isLoading: boolean;
    id: string;
    disabled: boolean;
    refetchRevisions: () => void;
    maximumRevisionCount: number;
};

export const OrderDraftFiles = (props: OrderDraftFilesProps) => {
    const {
        revisions,
        isLoading,
        id,
        refetchRevisions,
        disabled,
        maximumRevisionCount,
    } = props;
    const lastRevision = revisions?.[(revisions?.length || 1) - 1];
    const [description, setDescription] = useState("");

    const { mutateAsync: uploadDraftFile, isLoading: uploadingFiles } =
        usePostApiArchitectOrdersRevisionsFile();

    const { mutateAsync: submitRevision, isLoading: submittingRevision } =
        usePostApiArchitectOrdersRevisions();

    const handleCreateRevision = async (files: File[]) => {
        let result = false;
        const response = await submitRevision({
            data: { description, orderId: id },
        });
        if (response.isSuccess) {
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                await uploadDraftFile({
                    data: {
                        File: file,
                        OrderId: id,
                        RevisionId: response.value,
                    },
                }).then((response) => {
                    if (response.isSuccess) {
                        toast.success(
                            `file ${index + 1} uploaded successfully`
                        );
                    }
                });
            }
            toast.success("Submitted.");
            refetchRevisions();
            setDescription("");
            result = true;
        }
        return result;
    };

    if (isLoading) {
        return <Skeleton className="w-full h-[200px]" />;
    }

    return (
        <div className="flex flex-col w-full">
            <OrderFileUploader
                currentRevision={Number(revisions?.length) + 1}
                maximumRevisionCount={maximumRevisionCount}
                disabled={disabled || submittingRevision || uploadingFiles}
                uploading={submittingRevision || uploadingFiles}
                onSubmit={handleCreateRevision}
                description={description}
                setDescription={setDescription}
            />
            {revisions && revisions.length > 0 && (
                <OrderDraftFileRevisions
                    lastRevisionId={lastRevision?.id || ""}
                    revisions={revisions}
                />
            )}
        </div>
    );
};
