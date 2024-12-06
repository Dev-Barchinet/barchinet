import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { usePostApiArchitectContractorAgreementsReview } from "@/services/architect-services/api-architect-contractor-agreements-review-post";
import { useGetApiArchitectContractorAgreementsId } from "@/services/architect-services/api-architect-contractor-agreements-{id}-get";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

type AcceptOrderModalProps = {
  showAcceptOrderModal: boolean;
  setShowAcceptOrderModal: (newValue: boolean) => void;
  agreementId?: string;
};

export const AcceptOrderModal = (props: AcceptOrderModalProps) => {
  const { showAcceptOrderModal, setShowAcceptOrderModal, agreementId } = props;
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const t = useTranslations("Order.OrderAgreement");
  const { data, isLoading } = useGetApiArchitectContractorAgreementsId(
    agreementId || "",
    {
      query: { enabled: Boolean(agreementId) && showAcceptOrderModal },
    }
  );
  const { refresh } = useRouter();

  const { mutateAsync, isLoading: pendingAcceptAgreement } =
    usePostApiArchitectContractorAgreementsReview();

  const agreement = data?.value;

  const handleAcceptAgreement = async () => {
    await mutateAsync({
      data: {
        approved: true,
        contractorAgreementId: agreement?.id,
        signature: agreement?.signature,
      },
    }).then((response) => {
      if (response.isSuccess) {
        toast.success(t("succeed"));
        setShowAcceptOrderModal(false);
        refresh();
      }
    });
  };

  return (
    <Dialog
      open={showAcceptOrderModal}
      onOpenChange={() => setShowAcceptOrderModal(false)}
    >
      <DialogContent>
        <DialogTitle>{t("theAgreeeMent")}</DialogTitle>
        {isLoading && <Skeleton className="w-[100px] h-[100px]" />}
        {!isLoading && (
          <div className="w-full flex flex-col gap-4">
            <p className="max-w-lg text-wrap max-h-[380px] overflow-y-auto body-1 text-text-muted-foreground">
              {agreement?.contract}
            </p>
            <div className="items-top flex space-x-2">
              <Checkbox
                id="terms1"
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onCheckedChange={(event: any) => {
                  setAcceptedTerms(Boolean(event.valueOf()));
                }}
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("terms")}
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="sm"
                className="max-w-[80px]"
                onClick={() => setShowAcceptOrderModal(false)}
              >
                {t("cancel")}
              </Button>
              <Button
                disabled={!acceptedTerms}
                variant="default"
                size="sm"
                className="max-w-[80px]"
                onClick={handleAcceptAgreement}
                loading={pendingAcceptAgreement}
              >
                {t("accept")}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
