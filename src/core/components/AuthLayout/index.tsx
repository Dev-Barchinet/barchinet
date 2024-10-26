import Image from "next/image";
import React from "react";

const AuthLayout = () => {
  return (
    <div className="relative w-[50dvw] h-[100dvh]">
      <Image
        src={"/assets/images/loginScreen.jpeg"}
        alt="Barchinet Architect Logo"
        fill
        sizes="50dvw, 100dvh"
        className="object-cover"
      />
    </div>
  );
};

export default AuthLayout;
