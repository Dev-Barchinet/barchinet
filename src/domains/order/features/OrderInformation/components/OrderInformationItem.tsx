import React from "react";

type OrderInformationItemProps = {
  OrderInformationBody: React.ReactNode;
  title: string;
  grayMode?: boolean;
};

export const OrderInformationItem = (props: OrderInformationItemProps) => {
  const { OrderInformationBody, title, grayMode = false } = props;
  return (
    <div className="flex items-stretch gap-3 p-3">
      <div className="relative min-h-full">
        <div
          className="w-6 h-6 rounded-[50%]"
          style={{ backgroundColor: grayMode ? "#E0E0E2" : "#1EA170" }}
        ></div>
        <div
          className="absolute bottom-0 top-0 w-[1px] h-[calc(100%+30px)] left-[50%] -translate-x-[0.5px]"
          style={{ backgroundColor: grayMode ? "#E0E0E2" : "#1EA170" }}
        ></div>
      </div>
      <div className="flex flex-col flex-1 gap-4 items-start max-w-[calc(100%-1.5rem)]">
        <div
          className="flex items-center justify-center py-1 px-4 rounded-full max-w-full"
          style={{
            backgroundColor: grayMode ? "#E0E0E2" : "rgba(30, 161, 112, 0.20)",
          }}
        >
          <p className="title-6 text-text-foreground">{title}</p>
        </div>
        {OrderInformationBody}
      </div>
    </div>
  );
};
