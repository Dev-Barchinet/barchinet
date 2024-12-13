import { Button } from "@/components/ui/button";
import { useDeleteApiArchitectFinancialAccountsId } from "@/services/architect-services/api-architect-financial-accounts-{id}-delete";
import { useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";
type DeleteFinancialAccountModalProps = {
    setShowDeleteModal: (newValue: boolean) => void;
    refetchAccounts: () => void;
    activeAccountId: string;
    setActiveAccountId: (newValue: string) => void;
};

export const DeleteFinancialAccountModal = (
    props: DeleteFinancialAccountModalProps
) => {
    const {
        activeAccountId,
        refetchAccounts,
        setActiveAccountId,
        setShowDeleteModal,
    } = props;

    const t = useTranslations("Profile");

    const { mutateAsync, isLoading } =
        useDeleteApiArchitectFinancialAccountsId();

    const deleteFinancialAccount = () => {
        mutateAsync({ id: activeAccountId }).then((response) => {
            if (response.isSuccess) {
                toast.success(t("DeleteFinancialAccountSucceed"));
                setActiveAccountId("");
                refetchAccounts();
                setShowDeleteModal(false);
            }
        });
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <p className="title-1">{t("deleteFinancialAccount")}</p>
            <div className="flex items-center justify-end gap-4 mt-4">
                <Button
                    variant="secondary"
                    className="max-w-[100px]"
                    onClick={() => setShowDeleteModal(false)}
                >
                    {t("cancel")}
                </Button>
                <Button
                    onClick={deleteFinancialAccount}
                    className="max-w-[100px]"
                    loading={isLoading}
                >
                    {t("delete")}
                </Button>
            </div>
        </div>
    );
};
