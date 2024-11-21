"use client";

import React, { useState } from "react";
import { useOrderColumns } from "./useOrderColumns";
import { DataTable } from "@/components/data-table";
import { useInfiniteQuery } from "react-query";
import { getApiArchitectOrdersGetAll } from "@/services/architect-services/api-architect-orders-get-all-get";
import { useTranslations } from "next-intl";

const OrdersPage = () => {
  const columnDef = useOrderColumns();
  const t = useTranslations("Orders");
  const [searchKey, setSearchKey] = useState("");

  const { data, isLoading, isFetching, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery(["orders", searchKey], {
      queryFn: ({ pageParam }) =>
        getApiArchitectOrdersGetAll({
          PageIndex: pageParam,
          PageSize: 5,
          SearchKey: searchKey,
        }),
      keepPreviousData: true,
    });

  const ordersList = data
    ? // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      data.pages.flatMap((page) => page.value?.items!)
    : [];

  const handlePagination = async () => {
    await fetchNextPage();
  };

  const handleSearchOrders = (searchTerm: string) => {
    console.log("searchTerm");
    setSearchKey(searchTerm);
  };

  return (
    <div className="px-3">
      <DataTable
        data={ordersList}
        columns={columnDef}
        fetchNextPage={handlePagination}
        isLoading={isLoading || isFetching}
        isFetchingNextPage={isFetchingNextPage}
        onSearchChanged={handleSearchOrders}
        tableTitle={t("tableTitle")}
        hasMore={ordersList.length < Number(data?.pages[0].value?.totalCount)}
      />
    </div>
  );
};

export default OrdersPage;
