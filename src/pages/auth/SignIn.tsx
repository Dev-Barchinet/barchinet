"use client";
import useAuthStepperStore from "@/core/stores/useAuthStore";
import React from "react";
import CheckEmail from "./components/CheckEmail";
import EnterOtp from "./components/EnterOtp";
import IconWrapper from "@/components/IconWrapper";
import { BarchinetLogo } from "@/core/icons/BarchinetLogo";
import CompleteProfile from "./components/CompleteProfile";
import EnterLoginPassword from "./components/EnterLoginPassword";
import ResetPassword from "./components/ResetPassword";
import ResetPasswordOtp from "./components/ResetPasswordOtp";
import SetPassword from "./components/SetPassword";

const SignIn = () => {
  const { step, loading } = useAuthStepperStore();

  return (
    <div className="w-full flex-1 flex items-center justify-center h-screen bg-white">
      {!loading && (
        <div className="max-w-[439px] w-full rounded-xl p-8 flex flex-col items-center gap-9 min-h-[60dvh]">
          <IconWrapper icon={BarchinetLogo} size={70} />

          {step === "checkEmail" && <CheckEmail />}
          {step === "enterOtp" && <EnterOtp />}
          {step === "enterPassword" && <EnterLoginPassword />}
          {step === "completeProfile" && <CompleteProfile />}
          {step === "resetPassword" && <ResetPassword />}
          {step === "passwordOtp" && <ResetPasswordOtp />}
          {step === "setPassword" && <SetPassword />}
        </div>
      )}
    </div>
  );
};

export default SignIn;
