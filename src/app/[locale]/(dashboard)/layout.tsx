import React, { PropsWithChildren } from "react";

const layout = ({ children }: PropsWithChildren) => {
  return <div>dashboard nav{children}</div>;
};

export default layout;
