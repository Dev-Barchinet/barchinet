import React from "react";
import { OrderFileUploader } from "./components/OrderFileUploader";
import { Skeleton } from "@/components/ui/skeleton";
import { OrderDraftFileRevisions } from "./OrderFileRevisions";
import { SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult } from "@/services/architect-services/api-architect-orders-revisions-get-get.schemas";
import { usePostApiArchitectOrdersRevisionsFile } from "@/services/architect-services/api-architect-orders-revisions-file-post";
import { usePostApiArchitectOrdersRevisions } from "@/services/architect-services/api-architect-orders-revisions-post";
import toast from "react-hot-toast";
import { useDeleteApiArchitectOrdersRevisionsFile } from "@/services/architect-services/api-architect-orders-revisions-file-delete";

type OrderDraftFilesProps = {
  revisions:
    | readonly SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult[]
    | null
    | undefined;
  isLoading: boolean;
  id: string;
  refetchRevisions: () => void;
};

export const OrderDraftFiles = (props: OrderDraftFilesProps) => {
  const { revisions, isLoading, id, refetchRevisions } = props;
  const lastRevision = revisions?.[(revisions?.length || 1) - 1];

  const { mutateAsync: uploadDraftFile } =
    usePostApiArchitectOrdersRevisionsFile();

  const { mutateAsync: submitRevision, isLoading: submittingRevision } =
    usePostApiArchitectOrdersRevisions();

  const { mutateAsync: deleteFile } =
    useDeleteApiArchitectOrdersRevisionsFile();

  const onFileUpload = async (files: File[]) => {
    const response = await uploadDraftFile({
      data: {
        File: files[files.length - 1],
        OrderId: id,
      },
    });

    if (response.isSuccess) return true;
    return false;
  };

  const handleFileDelete = async (index: number) => {
    const response = await deleteFile({ params: { OrderId: id } });
    if (response.isSuccess) return true;
    return false;
  };

  const handleCreateRevision = () => {
    submitRevision({
      data: { title: "title1", description: "", orderId: id },
    }).then((response) => {
      if (response.isSuccess) {
        toast.success("Submitted.");
        refetchRevisions();
      }
    });
  };

  if (isLoading) {
    return <Skeleton className="w-full h-[200px]" />;
  }

  return (
    <div className="flex flex-col w-full">
      <OrderFileUploader
        currentRevision={1}
        maximumRevisionCount={53}
        uploading={submittingRevision}
        onFileChange={onFileUpload}
        onSubmit={handleCreateRevision}
        onDeleteFile={handleFileDelete}
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
