import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePutApiArchitectFinancialAccounts } from "@/services/architect-services/api-architect-financial-accounts-put";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";

type EditFinancialAccountModalProps = {
    setShowEditModal: (newValue: boolean) => void;
    refetchAccounts: () => void;
};

export const EditFinancialAccountModal = (
    props: EditFinancialAccountModalProps
) => {
    const { setShowAddFinancialAccountModal, refetchAccounts } = props;
    const [accountNumber, setAccountNumber] = useState("");
    const { mutateAsync, isLoading } = usePutApiArchitectFinancialAccounts();
    const addFinancialAccount = () => {
        mutateAsync({ data: {  } }).then((response) => {
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
