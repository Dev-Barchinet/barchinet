import { TextFieldController } from "@/components/form-controls/TextFieldController";
import IconWrapper from "@/components/IconWrapper";
import { Button } from "@/components/ui/button";
import { GoogleAuthIcon } from "@/core/icons/GoogleAuthIcon";
import FormWrapper from "@/core/providers/FormProvider";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import { usePostApiArchitectAuthEntryGenerateOtp } from "@/services/architect-services/api-architect-auth-entry-generate-otp-post";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  email: string;
}

const CheckEmail = () => {
  const { setEmail, setHasAccount, setOtp, setLifeSpan, setStep } =
    useAuthStepperStore();
  const { control, handleSubmit } = useForm<FormValues>();
  const t = useTranslations("Auth.CheckEmail");

  const { mutateAsync: generateOtp, isLoading } =
    usePostApiArchitectAuthEntryGenerateOtp();

  const handleGoogleAuth = async () => {
    const response = await signIn("google");
    console.log(response);
  };

  const onSubmit = (data: FormValues) => {
    generateOtp({
      data: { value: data.email, captchaToken: "captcha token" },
    }).then((response) => {
      if (response.isSuccess) {
        const otpResponse = response.value;

        setEmail(data.email);
        setHasAccount(Boolean(otpResponse?.wasUser));
        setOtp(otpResponse?.token || "");
        setLifeSpan(otpResponse?.lifespan || 360);

        setStep(AuthStep.ENTER_OTP);
      }
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center gap-5">
      <div className="w-full text-center">
        <h2 className="text-text-foreground title-1">{t("login")}</h2>
        <p className="mt-2 text-text-muted-foreground body-1">{t("title")}</p>
      </div>
      <FormWrapper
        className="flex flex-col items-center justify-between w-full flex-1"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col items-center w-full gap-3 mt-3">
          <TextFieldController
            name="email"
            control={control}
            type="email"
            placeholder={t("emailPlaceHolder")}
            formRules={{
              required: t("emailRequired"),
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: t("validEmailError"),
              },
            }}
          />
          <Button size={"lg"} type="submit" loading={isLoading}>
            {t("getCode")}
          </Button>
          <div className="pb-3"></div>
          <div className="flex items-center gap-4 justify-between w-full">
            <div className="flex-1 h-[1px] bg-border-border"></div>
            <p className="text-text-muted-foreground">{t("or")}</p>
            <div className="flex-1 h-[1px] bg-border-border"></div>
          </div>
          <Button
            variant={"outline"}
            type="button"
            className="mt-6"
            onClick={handleGoogleAuth}
          >
            <IconWrapper icon={GoogleAuthIcon} />
            <p>{t("signInGoogle")}</p>
          </Button>
          {/* <Button variant={"outline"} type="button" onClick={handleGoogleAuth}>
            <IconWrapper icon={LinkedinAuthIcon} />
            <p>{t("signInLinedin")}</p>
          </Button> */}
        </div>
      </FormWrapper>
    </div>
  );
};

export default CheckEmail;
