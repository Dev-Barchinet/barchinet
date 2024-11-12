import IconWrapper from "@/components/IconWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarchinetLogo } from "@/core/icons/BarchinetLogo";
import { AvatarIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import React from "react";

const DashboardHeader = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white">
      <IconWrapper icon={BarchinetLogo} size={35} />
      {!session ? (
        "loading ..."
      ) : (
        <div className="flex items-center gap-1">
          <p>{session?.user?.firstName + " " + session?.user?.lastName}</p>
          <Avatar>
            <AvatarImage src={session?.user?.avatar} />
            <AvatarFallback>
              <AvatarIcon width={20} height={20} />
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
