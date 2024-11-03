import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import useCountdown from "@/hooks/useCountDown";
import { usePostApiArchitectAuthPasswordChangeGenerateOtp } from "@/services/architect-services/api-architect-auth-password-change-generate-otp-post";
import { usePostApiArchitectAuthPasswordChangeVerifyOtp } from "@/services/architect-services/api-architect-auth-password-change-verify-otp-post";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  pin: string;
}

const ResetPasswordOtp = () => {
  const t = useTranslations("Auth.RestPasswordOtp");

  const form = useForm<FormValues>();
  const { handleSubmit } = form;
  const { email, lifeSpan, hasAccount, setStep, otp, setOtp, setLifeSpan } =
    useAuthStepperStore();
  const { minutes, seconds, isFinished } = useCountdown(lifeSpan);

  const {
    mutateAsync: verifyChangePasswordOtp,
    isLoading: verifyingChangePasswordOtp,
  } = usePostApiArchitectAuthPasswordChangeVerifyOtp();

  const { mutateAsync: sendResetPassOtp, isLoading: sendingResetPasswordOtp } =
    usePostApiArchitectAuthPasswordChangeGenerateOtp();

  const onSubmit = (form: FormValues) => {
    const pin = form.pin;

    verifyChangePasswordOtp({ data: { key: pin, token: otp } }).then(
      (response) => {
        if (response.isSuccess) {
          setStep(AuthStep.RESET_PASSWORD);
        }
      }
    );
  };

  const sendOtpCode = () => {
    sendResetPassOtp({ data: { value: email } }).then((response) => {
      if (response.isSuccess) {
        setOtp(response.value?.token || "");
        setLifeSpan(response.value?.lifespan || 360);
      }
    });
  };

  const handleGotoLoginWithPassword = () => {
    setStep(AuthStep.ENTER_PASSWORD);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center gap-5">
      <div className="w-full text-center">
        <h2 className="text-text-foreground title-1">{t("otpCode")}</h2>
        <p className="mt-2 text-text-muted-foreground body-1">
          {t("enterOtp")}
        </p>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col items-center justify-between w-full flex-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col items-center w-full gap-3">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              loading={verifyingChangePasswordOtp}
              className="w-full"
              size={"lg"}
            >
              {t("confirm")}
            </Button>
            <div className="flex items-center gap-1 text-text-muted-foreground body-2">
              <p>{t("getCode")}</p>
              <div>
                {isFinished ? (
                  <Button
                    type="button"
                    variant={"secondary"}
                    className="ms-2"
                    size={"sm"}
                    onClick={sendOtpCode}
                    loading={sendingResetPasswordOtp}
                  >
                    {t("resend")}
                  </Button>
                ) : (
                  <div>
                    {minutes}:{seconds}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            {hasAccount && (
              <Button
                className="mt-6 w-full"
                variant={"outline"}
                type="button"
                onClick={handleGotoLoginWithPassword}
              >
                {t("login")}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ResetPasswordOtp;
