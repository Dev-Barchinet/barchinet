import React from "react";
import { OrderFileUploader } from "./components/OrderFileUploader";

export const OrderDraftFiles = () => {
  return (
    <div className="flex flex-col w-full">
      <OrderFileUploader
        currentRevision={1}
        maximumRevisionCount={53}
        uploading={false}
        onFileChange={console.log}
      />
    </div>
  );
};
