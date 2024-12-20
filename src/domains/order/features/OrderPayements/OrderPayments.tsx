import React from "react";

type OrderPaymentsProps = {
  id: string;
};

export const OrderPayments = (props: OrderPaymentsProps) => {
  const { id } = props;
  return <div>{id} OrderPayments</div>;
};
