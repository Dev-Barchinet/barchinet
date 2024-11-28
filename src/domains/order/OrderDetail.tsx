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
    const { data, isLoading } = useGetApiArchitectOrdersGetId(id, {
        query: { enabled: Boolean(id) },
    });

    const orderData = data?.value;

    if (isLoading) {
        return "loading ...";
    }

    if (!orderData || !id) return "we are fucked up";

    return (
        <Tabs defaultValue="orderInfo" className="p-4">
            <OrderDetailTitle orderData={orderData} />
            <TabsContent value="orderInfo">
                <OrderInformation id={id} orderData={orderData} />
            </TabsContent>
            <TabsContent value="files">
                <OrderFiles id={id} />
            </TabsContent>
            <TabsContent value="payment">
                <OrderPayments id={id} />
            </TabsContent>
        </Tabs>
    );
};
