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
};

export const OrderDraftFiles = (props: OrderDraftFilesProps) => {
    const { revisions, isLoading, id, refetchRevisions, disabled } = props;
    const lastRevision = revisions?.[(revisions?.length || 1) - 1];
    const [description, setDescription] = useState("");

    const { mutateAsync: uploadDraftFile } =
        usePostApiArchitectOrdersRevisionsFile();

    const { mutateAsync: submitRevision, isLoading: submittingRevision } =
        usePostApiArchitectOrdersRevisions();

    const handleCreateRevision = (files: File[]) => {
        submitRevision({
            data: { title: "title1", description, orderId: id },
        }).then(async (response) => {
            if (response.isSuccess) {
                for (let index = 0; index < files.length; index++) {
                    const file = files[index];
                    await uploadDraftFile({
                        data: {
                            File: file,
                            OrderId: id,
                            RevisionId: response.value,
                        },
                    });
                }
                toast.success("Submitted.");
                refetchRevisions();
            }
        });
    };

    if (isLoading) {
        return <Skeleton className="w-full h-[200px]" />;
    }

    return (
        <div
            className="flex flex-col w-full"
        >
            <OrderFileUploader
                currentRevision={1}
                maximumRevisionCount={53}
                disabled={disabled}
                uploading={submittingRevision}
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
