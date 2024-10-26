import React from "react";
import { cn } from "@/lib/utils";

type IconWrapperProps = {
  icon: React.ReactNode;
  size?: number;
  className?: string;
};

const IconWrapper: React.FC<IconWrapperProps> = ({ icon, size = 24, className }) => {
  return (
    <div
      className={cn("flex items-center justify-center", className)}
      style={{ width: size, height: size }}
    >
      {icon}
    </div>
  );
};

export default IconWrapper;
