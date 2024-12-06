import { SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult } from "@/services/architect-services/api-architect-orders-revisions-get-get.schemas";
import React, { useEffect, useState } from "react";
import { OrderOlderFiles } from "./components/OrderOlderFiles";
import { useGetApiArchitectOrdersRevisionsDownloadZip } from "@/services/architect-services/api-architect-orders-revisions-download-zip-get";
import toast from "react-hot-toast";

type OrderDraftFileRevisionsProps = {
  lastRevisionId: string;
  revisions: readonly SaleOrdersQueriesV1ArchitectsGetRevisionGetRevisionsQueryResult[];
};

export const OrderDraftFileRevisions = (
  props: OrderDraftFileRevisionsProps
) => {
  const { lastRevisionId, revisions } = props;
  const [activeRevisionId, setActiveRevisionId] = useState("");

  useEffect(() => {
    if (lastRevisionId) {
      setActiveRevisionId(lastRevisionId);
    }
  }, [lastRevisionId]);

  const activeRevision = revisions.find(
    (revision) => revision.id === activeRevisionId
  );

  const {
    refetch,
    isLoading: downloadingFiles,
    isRefetching: refetchingFiles,
  } = useGetApiArchitectOrdersRevisionsDownloadZip(
    { OrderId: revisions?.[0]?.orderId, RevisionId: activeRevisionId },
    { query: { enabled: false }, request: { responseType: "arraybuffer" } }
  );

  const handleDownloadDraftFiles = () => {
    refetch()
      .then((response) => {
        const zipFile = response.data;
        if (!zipFile) throw Error("Failed to Download");
        const blob = new Blob([zipFile], {
          type: "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `revision_${activeRevisionId}_files.zip`;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to Download Files.");
      });
  };

  return (
    <OrderOlderFiles
      activeRevisionFiles={activeRevision?.documentSets}
      isDownloading={downloadingFiles || refetchingFiles}
      onActiveRevisionChange={(newId) => setActiveRevisionId(newId)}
      onDownloadFiles={handleDownloadDraftFiles}
      revisionList={revisions}
      activeRevision={activeRevision}
      fetchingRevisionData={false}
    />
  );
};
