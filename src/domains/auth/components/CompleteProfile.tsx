import { TextFieldController } from "@/components/form-controls/TextFieldController";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/core/providers/FormProvider";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import { usePutApiArchitectAccountsFullName } from "@/services/architect-services/api-architect-accounts-fullName-put";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  firstName: string;
  lastName: string;
}

const CompleteProfile = () => {
  const { setStep } = useAuthStepperStore();
  const t = useTranslations("Auth.CompleteProfile");
  const { handleSubmit, control } = useForm<FormValues>();

  const { mutateAsync: updateProfile, isLoading } =
    usePutApiArchitectAccountsFullName();

  const onSubmit = ({ firstName, lastName }: FormValues) => {
    console.log({firstName})
    updateProfile({
      data: { firstName, lastName },
    }).then((response) => {
      console.log(response)
      if (response.isSuccess) {
        setStep(AuthStep.SET_PASSWORD);
      }
    });
  };

  return (
    <div className="w-full flex-1 flex flex-col items-center gap-5">
      <div className="w-full text-center">
        <h2 className="text-text-foreground title-1">{t("createAccount")}</h2>
        <p className="mt-2 text-text-muted-foreground body-1">
          {t("completeInformation")}
        </p>
      </div>
      <FormWrapper
        className="flex flex-col items-center justify-between w-full flex-1 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextFieldController
          name="firstName"
          control={control}
          type="string"
          placeholder={t("namePlaceHolder")}
        />
        <TextFieldController
          name="lastName"
          control={control}
          type="string"
          placeholder={t("familyNamePlaceHolder")}
        />
        <Button type="submit" loading={isLoading} size={"lg"}>
          {t("signup")}
        </Button>
      </FormWrapper>
    </div>
  );
};

export default CompleteProfile;
