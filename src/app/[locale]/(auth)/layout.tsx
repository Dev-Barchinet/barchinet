import AuthLayout from "@/core/components/AuthLayout";
import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex items-center justify-between min-h-screen">
      <AuthLayout />
      {children}
    </div>
  );
};

export default layout;
