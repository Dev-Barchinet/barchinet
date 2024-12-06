import { TextFieldController } from "@/components/form-controls/TextFieldController";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/core/providers/FormProvider";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import { usePostApiArchitectAuthPasswordChangeGenerateOtp } from "@/services/architect-services/api-architect-auth-password-change-generate-otp-post";
import { usePostApiArchitectAuthSignIn } from "@/services/architect-services/api-architect-auth-sign-in-post";
import { PencilLine } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  password: string;
}

const EnterLoginPassword = () => {
  const { handleSubmit, control } = useForm<FormValues>();
  const t = useTranslations("Auth.LoginWithPassword");
  const { email, setStep, setOtp, setLifeSpan } = useAuthStepperStore();
  const [nextAuthLoading, setNextAuthLoading] = useState(false);
  const { replace } = useRouter()


  const { mutateAsync: sendResetPassOtp, isLoading: sendingResetPasswordOtp } =
    usePostApiArchitectAuthPasswordChangeGenerateOtp();

  const { mutateAsync: signInWithPassword, isLoading: signingInWithPassword } =
    usePostApiArchitectAuthSignIn();

  const onSubmit = (form: FormValues) => {
    signInWithPassword({
      data: { value: email, password: form.password, captchaToken: "fsdfsdf" },
    }).then((response) => {
      if (response.isSuccess) {
        const {
          emailAddress,
          fileAccessCredential,
          firstName,
          lastName,
          id,
          token,
        } = response.value || {};

        setNextAuthLoading(true);

        signIn("LOGIN_USER", {
          id,
          firstName,
          lastName,
          email: emailAddress,
          fileAccessCredential,
          accessToken: token,
          avatar: "",
          redirect: false,
        })
          .then((response) => {
            if (response?.ok) {
              replace('/dashboard')
            }
          })
          .finally(() => {
            setNextAuthLoading(false);
          });
      }
    });
  };

  const handleForgotPassword = () => {
    sendResetPassOtp({ data: { value: email } }).then((response) => {
      if (response.isSuccess) {
        setOtp(response.value?.token || "");
        setLifeSpan(response.value?.lifespan || 360);
        setStep(AuthStep.PASSWORD_OTP);
      }
    });
  };

  const goToEmailStep = () => {
    setStep(AuthStep.CHECK_EMAIL);
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center gap-5">
      <div className="w-full text-center">
        <h2 className="text-text-foreground title-1">
          {t("loginWithPassword")}
        </h2>
        <p className="mt-2 text-text-muted-foreground body-1">
          {t("enterPassword")}
        </p>
      </div>

      <FormWrapper
        className="flex flex-col items-center gap-3 justify-between w-full flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Button
          type="button"
          onClick={goToEmailStep}
          variant={"secondary"}
          className="max-w-[fit-content] flex items-center justify-center gap-2 px-4 mt-4 mb-2"
        >
          <PencilLine />
          <p>{email}</p>
        </Button>
        <TextFieldController
          name="password"
          control={control}
          type="password"
          placeholder={t("passwordPlaceholder")}
        />

        <Button
          type="submit"
          size="lg"
          loading={signingInWithPassword || nextAuthLoading}
        >
          {t("confirm")}
        </Button>
      </FormWrapper>

      <Button
        variant="outline"
        loading={sendingResetPasswordOtp}
        size="lg"
        onClick={handleForgotPassword}
        className="mt-4"
      >
        {t("forgotPassword")}
      </Button>
    </div>
  );
};

export default EnterLoginPassword;
