import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { usePutApiArchitectFinancialAccounts } from "@/services/architect-services/api-architect-financial-accounts-put";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import toast from "react-hot-toast";

type EditFinancialAccountModalProps = {
    setShowEditModal: (newValue: boolean) => void;
    refetchAccounts: () => void;
    activeAccountId: string;
    setActiveAccountId: (newValue: string) => void;
};

export const EditFinancialAccountModal = (
    props: EditFinancialAccountModalProps
) => {
    const {
        setShowEditModal,
        refetchAccounts,
        activeAccountId,
        setActiveAccountId,
    } = props;
    const { mutateAsync, isLoading } = usePutApiArchitectFinancialAccounts();
    const [isActive, setIsActive] = useState(false);
    const [isDefault, setIsDefault] = useState(false);
    const t = useTranslations("Profile");

    const editFinancialAccount = async () => {
        const response = await mutateAsync({
            data: { id: activeAccountId, isActive, isDefault },
        });
        if (response.isSuccess) {
            toast.success(t("EditFinancialAccountSucceed"));
            refetchAccounts();
            setShowEditModal(false);
            setActiveAccountId("");
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <p className="title-1">{t("editFinancialAccount")}</p>

            {/* Checkbox for 'isActive' */}
            <div className="flex items-center gap-2">
                <Checkbox
                    id="isActive"
                    checked={isActive}
                    onCheckedChange={(checked) => setIsActive(Boolean(checked))}
                />
                <Label htmlFor="isActive" className="cursor-pointer">
                    {t("isActive")}
                </Label>
            </div>

            {/* Checkbox for 'isDefault' */}
            <div className="flex items-center gap-2">
                <Checkbox
                    id="isDefault"
                    checked={isDefault}
                    onCheckedChange={(checked) =>
                        setIsDefault(Boolean(checked))
                    }
                />
                <Label htmlFor="isDefault" className="cursor-pointer">
                    {t("isDefault")}
                </Label>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-4 mt-4">
                <Button
                    variant="secondary"
                    className="max-w-[100px]"
                    onClick={() => setShowEditModal(false)}
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={editFinancialAccount}
                    className="max-w-[100px]"
                    loading={isLoading}
                >
                    {t("save")}
                </Button>
            </div>
        </div>
    );
};
