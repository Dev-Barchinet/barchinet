import { TishtarResponseGenericListSaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult } from '@/services/architect-services/api-architect-orders-items-{orderId}-items-get.schemas'
import React from 'react'

type OrderItemsProps = {
  orderItems?: TishtarResponseGenericListSaleOrdersQueriesV1ArchitectsGetItemsGetItemQueryResult
  fetchingOrderItems: boolean
}

export const OrderItems = (props: OrderItemsProps) => {
  return (
    <div>OrderItems</div>
  )
}
