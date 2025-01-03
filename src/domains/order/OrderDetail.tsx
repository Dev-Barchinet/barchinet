"use client";

import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useGetApiArchitectOrdersGetId } from "@/services/architect-services/api-architect-orders-get-{id}-get";
import { useParams } from "next/navigation";
import React from "react";
import { OrderDetailTitle } from "./features/OrderDetailTitle";
import { OrderInformation } from "./features/OrderInformation";
import { OrderFiles } from "./features/OrderFiles";
import { OrderPayments } from "./features/OrderPayements/OrderPayments";
import "./orderStyles.css"

export const OrderDetail = () => {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, refetch } = useGetApiArchitectOrdersGetId(id, {
        query: { enabled: Boolean(id) },
    });

    const orderData = data?.value;
    const agreementId = orderData?.agreement?.id;

    if (isLoading) {
        return "loading ...";
    }

    if (!orderData || !id) return "No Order Found, Coooooocked";

    return (
        <Tabs defaultValue="orderInfo" className="p-4 h-full">
            <OrderDetailTitle orderData={orderData} refetchOrderDetail={() => refetch()} />
            <TabsContent value="orderInfo">
                <OrderInformation id={id} orderData={orderData} />
            </TabsContent>
            <TabsContent value="files" className="h-full">
                <OrderFiles orderData={orderData} refetchOrderDetail={() => refetch()} />
            </TabsContent>
            <TabsContent value="payment" className="h-full">
                <OrderPayments id={id} agreementId={agreementId} />
            </TabsContent>
        </Tabs>
    );
};
