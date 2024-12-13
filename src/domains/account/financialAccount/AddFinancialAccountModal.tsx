import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePostApiArchitectFinancialAccounts } from "@/services/architect-services/api-architect-financial-accounts-post";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";

type AddFinancialAccountModalProps = {
    setShowAddFinancialAccountModal: (newValue: boolean) => void;
    refetchAccounts: () => void;
};

export const AddFinancialAccountModal = (
    props: AddFinancialAccountModalProps
) => {
    const { setShowAddFinancialAccountModal, refetchAccounts } = props;
    const [accountNumber, setAccountNumber] = useState("");
    const { mutateAsync, isLoading } = usePostApiArchitectFinancialAccounts();
    const addFinancialAccount = () => {
        mutateAsync({ data: { value: accountNumber } }).then((response) => {
            if (response.isSuccess) {
                toast.success(t("AddFinancialAccountSucceed"));
                refetchAccounts();
                setShowAddFinancialAccountModal(false)
            }
        });
    };
    const t = useTranslations("Profile");
    return (
        <div className="flex flex-col gap-2">
            <p className="title-1">{t("addFinancialAccount")}</p>
            <p className="body-2-5 text-text-muted-foreground">{t("financialAccountNotice")}</p>
            <Label className="body-2-5 mb-2">{t("financialAccountNumber")}</Label>
            <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
            />
            <div className="flex items-center mt-4 justify-between">
                <Button
                    variant="secondary"
                    className="max-w-[100px]"
                    onClick={() => setShowAddFinancialAccountModal(false)}
                >
                    {t("cancel")}
                </Button>
                <Button
                    disabled={!accountNumber}
                    className="max-w-[100px]"
                    onClick={addFinancialAccount}
                    loading={isLoading}
                >
                    {t("add")}
                </Button>
            </div>
        </div>
    );
};
