import React from "react";

type OrderInformationItemSimpleChildProps = {
  title: string;
  body: string;
};

export const OrderInformationItemSimpleChild = (
  props: OrderInformationItemSimpleChildProps
) => {
  const { title, body } = props;
  return (
    <div className="flex flex-col gap-2">
      <p>{title}</p>
      <p>{body}</p>
    </div>
  );
};
