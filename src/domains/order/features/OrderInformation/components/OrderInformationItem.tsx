import React from "react";

type OrderInformationItemProps = {
  OrderInformationBody: React.ReactNode;
  title: string;
};

export const OrderInformationItem = (props: OrderInformationItemProps) => {
  const { OrderInformationBody, title } = props;
  return (
    <div className="flex items-stretch gap-3 p-3">
      <div className="relative min-h-full">
        <div className="w-6 h-6 rounded-[50%] bg-[#1EA170]"></div>
        <div className="absolute bottom-0 top-0 w-[1px] h-[calc(100%+30px)] bg-[#1EA170] left-[50%] -translate-x-[0.5px]"></div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        <div className="flex items-center justify-center py-1 px-4 bg-[#1EA170]/20 rounded-full">
          <p className="title-6 text-text-foreground">{title}</p>
        </div>
        {OrderInformationBody}
      </div>
    </div>
  );
};
