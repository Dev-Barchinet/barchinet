import { Button } from "@/components/ui/button";
import { FinancialAccountsQueriesV1SharedGetGetAccountsQueryResult } from "@/services/architect-services/api-architect-financial-accounts-get.schemas";
import { Pen, Trash } from "lucide-react";
import React from "react";

type FinancialAccountItemProps = {
    account: FinancialAccountsQueriesV1SharedGetGetAccountsQueryResult;
    editAccount: (id: string) => void;
    deleteAccount: (id: string) => void;
};

export const FinancialAccountItem = (props: FinancialAccountItemProps) => {
    const { account, editAccount, deleteAccount } = props;
    return (
        <div className="flex items-center gap-2">
            <div className="text-center px-1 shadow-sm border-[#E4E4E7] rounded-md">
                {account.number}
            </div>
            <Button
                variant="secondary"
                onClick={() => deleteAccount(account.id || "")}
            >
                <Trash />
            </Button>
            <Button
                variant="secondary"
                onClick={() => editAccount(account.id || "")}
            >
                <Pen />
            </Button>
        </div>
    );
};
