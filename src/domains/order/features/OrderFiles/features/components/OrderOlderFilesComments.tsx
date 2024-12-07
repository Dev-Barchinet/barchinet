import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";
import React from "react";

type OrderOlderFilesCommentsProps = {
  comment: string;
};

export const OrderOlderFilesComments = (
  props: OrderOlderFilesCommentsProps
) => {
  const t = useTranslations("Order.OrderOlderFiles");
  return (
    <div className="flex items-center gap-3 mb-4">
      <p className="title-5-5">{t("youHaveComments")}</p>
      <Dialog>
        <DialogTrigger>
          <Button variant="secondary" className="max-w-[150px]">
            {t("viewComments")}
          </Button>
        </DialogTrigger>
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent>
          <p className="overflow-y-auto">{props.comment}</p>
        </DialogContent>
      </Dialog>
    </div>
  );
};
