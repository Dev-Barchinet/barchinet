"use client";

import React, { useState } from "react";
import { useOrderColumns } from "./useOrderColumns";
import { DataTable } from "@/components/data-table";
import { useGetApiArchitectOrdersGetAll } from "@/services/architect-services/api-architect-orders-get-all-get";
import { useTranslations } from "next-intl";

const OrdersPage = () => {
    const columnDef = useOrderColumns();
    const t = useTranslations("Orders");
    const [searchKey, setSearchKey] = useState("");
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize] = useState(10);

    const { data, isLoading } = useGetApiArchitectOrdersGetAll({
        SearchKey: searchKey,
        PageIndex: pageIndex,
        PageSize: pageSize,
    });

    const ordersList = data?.value?.items || [];

    const handlePagination = async (step: "next" | "previous") => {
        setPageIndex((currentPageIndex) => {
            if (step === "next") {
                return currentPageIndex + 1;
            }
            return currentPageIndex - 1;
        });
    };

    const handleSearchOrders = (searchTerm: string) => {
        setSearchKey(searchTerm);
    };

    return (
        <div className="px-3">
            <DataTable
                data={ordersList}
                columns={columnDef}
                handlePagination={handlePagination}
                isLoading={isLoading}
                onSearchChanged={handleSearchOrders}
                tableTitle={t("tableTitle")}
                pageIndex={pageIndex}
                hasMore={
                    (pageIndex + 1) * pageSize < Number(data?.value?.totalCount)
                }
            />
        </div>
    );
};

export default OrdersPage;
