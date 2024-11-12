import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import useCountdown from "@/hooks/useCountDown";
import { usePostApiArchitectAuthEntryGenerateOtp } from "@/services/architect-services/api-architect-auth-entry-generate-otp-post";
import { usePostApiArchitectAuthSignInVerifyOtp } from "@/services/architect-services/api-architect-auth-sign-in-verify-otp-post";
import { usePostApiArchitectAuthSignUpVerifyOtp } from "@/services/architect-services/api-architect-auth-sign-up-verify-otp-post";
import { PencilLine } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
  pin: string;
}

const EnterOtp = () => {
  const t = useTranslations("Auth.EnterOtp");

  const form = useForm<FormValues>();
  const { handleSubmit } = form;
  const { email, lifeSpan, hasAccount, setStep, otp, setOtp } =
    useAuthStepperStore();
  const { minutes, seconds, restart, isFinished } = useCountdown(lifeSpan);

  const { replace } = useRouter();

  const { mutateAsync: generateOtp, isLoading } =
    usePostApiArchitectAuthEntryGenerateOtp();

  const { mutateAsync: verifySignUpOtp, isLoading: verifyingSignupOtp } =
    usePostApiArchitectAuthSignUpVerifyOtp();
  const { mutateAsync: verifySignInOtp, isLoading: verifyingSigninOtp } =
    usePostApiArchitectAuthSignInVerifyOtp();

  const onSubmit = (form: FormValues) => {
    const pin = form.pin;
    if (!hasAccount) {
      verifySignUpOtp({
        data: { key: pin, token: otp, captchaToken: "fdgdfg" },
      }).then(async (response) => {
        if (response.isSuccess) {
          const {
            emailAddress,
            fileAccessCredential,
            firstName,
            lastName,
            token,
            setPasswordToken,
            id,
          } = response.value || {};

          await signIn("CREATE_USER", {
            firstName,
            lastName,
            email: emailAddress,
            accessToken: token,
            setPasswordToken,
            fileAccessCredential,
            id,
            redirect: false,
          });
          // set user data
          setOtp(setPasswordToken || "");
          setStep(AuthStep.COMPLETE_PROFILE);
        }
      });
    } else {
      verifySignInOtp({
        data: { key: pin, token: otp, captchaToken: "dsftrsd" },
      }).then(async (response) => {
        if (response.isSuccess) {
          const {
            emailAddress,
            fileAccessCredential,
            firstName,
            lastName,
            token,
            id,
          } = response.value || {};
          // set user profile
          const signinResponse = await signIn("LOGIN_USER", {
            firstName,
            lastName,
            email: emailAddress,
            accessToken: token,
            fileAccessCredential,
            id,
            redirect: false,
          });

          console.log({ signinResponse });

          if (signinResponse?.ok) {
            console.log("sign in succeed");
            replace("/dashboard");
          }
        }
      });
    }
  };

  const goToEmailStep = () => {
    setStep(AuthStep.CHECK_EMAIL);
  };

  const sendOtpCode = () => {
    generateOtp({
      data: { value: email, captchaToken: "captcha token" },
    }).then((response) => {
      if (response.isSuccess) {
        toast(t("otpSent"));
        restart();
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
            <Button
              type="button"
              onClick={goToEmailStep}
              variant={"secondary"}
              className="max-w-[fit-content] flex items-center justify-center gap-2 px-4 mt-4 mb-2"
            >
              <PencilLine />
              <p>{email}</p>
            </Button>
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
              loading={verifyingSignupOtp || verifyingSigninOtp}
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
                    loading={isLoading}
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
                {t("loginWithPassword")}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EnterOtp;
