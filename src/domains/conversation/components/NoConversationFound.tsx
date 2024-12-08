import { Podcast } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

export const NoConversationFound = () => {
  const t = useTranslations("Messages");
  return (
    <div className="flex w-full items-center justify-center flex-1 h-full">
      <div className="flex items-center flex-col gap-4">
        <Podcast className="text-gray-500" />
        <p className="title-3">{t("noMessageFound")}</p>
      </div>
    </div>
  );
};
