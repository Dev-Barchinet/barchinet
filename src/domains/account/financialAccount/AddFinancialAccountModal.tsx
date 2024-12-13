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
            }
        });
    };
    const t = useTranslations("Profile");
    return (
        <div>
            <p>{t("addFinancialAccount")}</p>
            <p>{t("financialAccountNotice")}</p>
            <Label>{t("financialAccountNumber")}</Label>
            <Input
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
            />
            <div>
                <Button
                    variant="secondary"
                    onClick={() => setShowAddFinancialAccountModal(false)}
                >
                    {t("cancel")}
                </Button>
                <Button
                    disabled={!accountNumber}
                    onClick={addFinancialAccount}
                    loading={isLoading}
                >
                    {t("add")}
                </Button>
            </div>
        </div>
    );
};
