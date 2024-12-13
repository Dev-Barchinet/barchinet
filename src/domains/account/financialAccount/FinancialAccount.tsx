import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetApiArchitectFinancialAccounts } from "@/services/architect-services/api-architect-financial-accounts-get";
import { Plus, Podcast } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FinancialAccountModals } from "./FinancialAccountModals";
import { FinancialAccountItem } from "./FinancialAccountItem";

type FinancialAccountProps = {
    showAddFinancialAccountModal: boolean;
    setShowAddFinancialAccountModal: (newValue: boolean) => void;
};

export const FinancialAccount = (props: FinancialAccountProps) => {
    const { setShowAddFinancialAccountModal, showAddFinancialAccountModal } =
        props;
    const t = useTranslations("Profile");
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [activeAccountId, setActiveAccountId] = useState("");

    const {
        data,
        isLoading,
        refetch: refetchAccounts,
    } = useGetApiArchitectFinancialAccounts();

    const financialAccounts = data?.value;

    const handleOpenDeleteAccountModal = (id: string) => {
        setActiveAccountId(id);
        setShowDeleteModal(true);
    };

    const handleOpenEditAccountModal = (id: string) => {
        console.log(id);
        setActiveAccountId(id);
        setShowEditModal(true);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col gap-1">
                <Skeleton className="w-[200px] h-[32px]" />
                <Skeleton className="w-[200px] h-[32px]" />
                <Skeleton className="w-[200px] h-[32px]" />
                <Skeleton className="w-[200px] h-[32px]" />
                <Skeleton className="w-[200px] h-[32px]" />
            </div>
        );
    }

    if (!financialAccounts || financialAccounts.length === 0) {
        return (
            <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                <Podcast className="w-[32px] h-[32px] text-muted-foreground" />
                <p className="title-3">Empty</p>
                <p className="body-1">you havent add any financial account</p>
                <Button
                    size="lg"
                    className="max-w-fit"
                    onClick={() => setShowAddFinancialAccountModal(true)}
                >
                    <Plus /> {t("addFinancialAccount")}
                </Button>
                <FinancialAccountModals
                    {...{
                        refetchAccounts,
                        setShowAddFinancialAccountModal,
                        showAddFinancialAccountModal,
                        showEditModal,
                        setShowEditModal,
                        showDeleteModal,
                        setShowDeleteModal,
                        activeAccountId,
                        setActiveAccountId,
                    }}
                />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2.5">
            {financialAccounts.map((account) => (
                <FinancialAccountItem
                    key={account.id}
                    account={account}
                    deleteAccount={handleOpenDeleteAccountModal}
                    editAccount={handleOpenEditAccountModal}
                />
            ))}
            <FinancialAccountModals
                {...{
                    refetchAccounts,
                    setShowAddFinancialAccountModal,
                    showAddFinancialAccountModal,
                    showEditModal,
                    setShowEditModal,
                    showDeleteModal,
                    setShowDeleteModal,
                    activeAccountId,
                    setActiveAccountId,
                }}
            />
        </div>
    );
};
