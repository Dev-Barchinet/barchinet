import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import FormWrapper from "@/core/providers/FormProvider";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import useCountdown from "@/hooks/useCountDown";
import { PencilLine } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  otp: string;
}

const EnterOtp = () => {
  const { control, handleSubmit } = useForm<FormValues>();
  const { email, lifeSpan, hasAccount } = useAuthStepperStore();
  const { minutes, seconds, restart, isFinished } = useCountdown(lifeSpan);

  const onSubmit = (data: FormValues) => {};
  return (
    <div className="w-full flex-1 flex flex-col items-center gap-5">
      <p>Enter the 6-digit code sent to the email below</p>
      <FormWrapper
        className="flex flex-col items-center justify-between w-full flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center w-full gap-3">
          <Button>
            <PencilLine />
            <p>{email}</p>
          </Button>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div>
            <p>Get the code Again:</p>
            <div>
              {isFinished ? (
                <Button type="button">resend</Button>
              ) : (
                <div>
                  {minutes}:{seconds}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {hasAccount && <Button type="button">Login with password</Button>}
          <Button type="submit">Confirm</Button>
        </div>
      </FormWrapper>
    </div>
  );
};

export default EnterOtp;
