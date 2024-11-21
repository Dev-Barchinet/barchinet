import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const ConversationLoading = () => {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="w-[170px] h-[20px]" />
      <Skeleton className="w-[170px] h-[20px]" />
      <Skeleton className="w-[170px] h-[20px]" />
      <Skeleton className="w-[170px] h-[20px]" />
      <Skeleton className="w-[170px] h-[20px]" />
      <Skeleton className="w-[170px] h-[20px]" />
      <Skeleton className="w-[170px] h-[20px]" />
    </div>
  );
};
