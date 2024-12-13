import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import React from "react";
import { AddFinancialAccountModal } from "./AddFinancialAccountModal";
import { EditFinancialAccountModal } from "./EditFinancialAccountModal";

type FinancialAccountModalsProps = {
    showAddFinancialAccountModal: boolean;
    setShowAddFinancialAccountModal: (newValue: boolean) => void;
    refetchAccounts: () => void;
    showEditModal: boolean;
    setShowEditModal: (newValue: boolean) => void;
    setShowDeleteModal: (newValue: boolean) => void;
    showDeleteModal: boolean;
    activeAccountId: string;
    setActiveAccountId: (newValue: string) => void;
};

export const FinancialAccountModals = (props: FinancialAccountModalsProps) => {
    const {
        setShowAddFinancialAccountModal,
        refetchAccounts,
        showAddFinancialAccountModal,
        activeAccountId,
        setActiveAccountId,
        setShowDeleteModal,
        setShowEditModal,
        showDeleteModal,
        showEditModal,
    } = props;
    return (
        <div>
            <Dialog
                open={showAddFinancialAccountModal}
                onOpenChange={() => setShowAddFinancialAccountModal(false)}
            >
                <DialogContent>
                    <DialogTitle></DialogTitle>
                    <AddFinancialAccountModal
                        refetchAccounts={refetchAccounts}
                        setShowAddFinancialAccountModal={
                            setShowAddFinancialAccountModal
                        }
                    />
                </DialogContent>
            </Dialog>
            <Dialog
                open={showEditModal}
                onOpenChange={() => setShowEditModal(false)}
            >
                <DialogContent>
                    <DialogTitle></DialogTitle>
                    <EditFinancialAccountModal
                        refetchAccounts={refetchAccounts}
                        setShowEditModal={setShowEditModal}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
