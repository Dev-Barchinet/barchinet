import { TextFieldController } from "@/components/form-controls/TextFieldController";
import { Button } from "@/components/ui/button";
import FormWrapper from "@/core/providers/FormProvider";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import { usePutApiArchitectAuthPassword } from "@/services/architect-services/api-architect-auth-password-put";
import { CircleCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface FormValues {
    password: string;
}

type ResetPasswordProps = {
    isInLogin?: boolean;
};

const ResetPassword = (props: ResetPasswordProps) => {
    const { isInLogin = true } = props;
    const t = useTranslations("Auth.ResetPassword");
    const { control, handleSubmit, watch } = useForm<FormValues>();
    const { setStep, otp, resetStepper } = useAuthStepperStore();
    const { mutateAsync: changePassword, isLoading: changingPassword } =
        usePutApiArchitectAuthPassword();
    const [nextAuthLoading, setNextAuthLoading] = useState(false);

    const [conditions, setConditions] = useState({
        atLeast8Chars: false,
        upperAndLowerCase: false,
        hasNumbers: false,
    });

    const password = watch("password");

    const validateConditions = (password: string) => {
        if (password === undefined) return;
        setConditions({
            atLeast8Chars: password.length >= 8,
            upperAndLowerCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
            hasNumbers: /\d/.test(password),
        });
    };

    const onSubmit = (form: FormValues) => {
        changePassword({
            data: { newPassword: form.password, changePasswordToken: otp },
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

                if (isInLogin) {
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
                                redirect("/dashboard");
                            }
                        })
                        .finally(() => {
                            setNextAuthLoading(false);
                        });
                } else {
                    toast.success(t("resetPasswordSuccess"));
                }

                resetStepper();
            }
        });
    };

    const navigateToLogin = () => {
        setStep(AuthStep.ENTER_PASSWORD);
    };

    // Update password conditions when the password changes
    useEffect(() => {
        validateConditions(password);
    }, [password]);

    // Check if all conditions are met
    const allConditionsMet = Object.values(conditions).every(Boolean);

    return (
        <div className="w-full flex-1 flex flex-col items-center gap-5">
            <div className="w-full text-center">
                <h2 className="text-text-foreground title-1">
                    {t("resetPassword")}
                </h2>
                <p className="mt-2 text-text-muted-foreground body-1">
                    {t("reEnterPassword")}
                </p>
            </div>
            <FormWrapper
                className="flex gap-5 flex-col items-center justify-between w-full flex-1"
                onSubmit={(event) => {
                    event.stopPropagation();
                    handleSubmit(onSubmit)(event);
                }}
            >
                <TextFieldController
                    name="password"
                    control={control}
                    type="password"
                    placeholder={t("passwordPlaceholder")}
                />

                <div className="flex flex-col items-start gap-5">
                    <div className="flex items-center  gap-2">
                        <CircleCheck
                            className={
                                conditions.atLeast8Chars ? "text-green-500" : ""
                            }
                            size={24}
                        />
                        <p className="text-text-muted-foreground body-3">
                            {t("atLeast8Chars")}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <CircleCheck
                            className={
                                conditions.upperAndLowerCase
                                    ? "text-green-500"
                                    : ""
                            }
                            size={24}
                        />
                        <p className="text-text-muted-foreground body-3">
                            {t("upperCaseLowerCase")}
                        </p>
                    </div>
                    <div className="flex items-center  gap-2">
                        <CircleCheck
                            className={
                                conditions.hasNumbers ? "text-green-500" : ""
                            }
                            size={24}
                        />
                        <p className="text-text-muted-foreground body-3">
                            {t("useNumbers")}
                        </p>
                    </div>
                </div>

                <Button
                    type="submit"
                    size="lg"
                    loading={changingPassword || nextAuthLoading}
                    disabled={!allConditionsMet}
                >
                    {t("resetPassword")}
                </Button>
            </FormWrapper>

            {!isInLogin && (
                <Button size="lg" variant="outline" onClick={navigateToLogin}>
                    {t("login")}
                </Button>
            )}
        </div>
    );
};

export default ResetPassword;
