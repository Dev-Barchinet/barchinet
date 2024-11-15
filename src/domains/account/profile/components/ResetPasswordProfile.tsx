import { InputField } from "@/components/form-controls/InputField";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import ResetPassword from "@/domains/auth/components/ResetPassword";
import ResetPasswordOtp from "@/domains/auth/components/ResetPasswordOtp";
import { usePostApiArchitectAuthPasswordChangeGenerateOtp } from "@/services/architect-services/api-architect-auth-password-change-generate-otp-post";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

export const ResetPasswordProfile = () => {
    const t = useTranslations("Profile.ResetPassword");

    const { setEmail, setStep, step, resetStepper, setOtp, setLifeSpan } =
        useAuthStepperStore();
    const {
        mutateAsync: sendResetPassOtp,
        isLoading: sendingResetPasswordOtp,
    } = usePostApiArchitectAuthPasswordChangeGenerateOtp();

    const { data: session } = useSession();

    const handleSendOtp = () => {
        if (session?.user.email) {
            sendResetPassOtp({ data: { value: session?.user.email } }).then(
                (response) => {
                    if (response.isSuccess) {
                        setStep(AuthStep.PASSWORD_OTP);
                        setOtp(response.value?.token || "");
                        setLifeSpan(response.value?.lifespan || 360);
                        setEmail(session?.user.email);
                    }
                }
            );
        }
    };

    return (
        <>
            <InputField
                label={t("password")}
                placeholder={t("passwordPlaceholder")}
                value="********"
                type="password"
                disabled
            />

            <div className="col-span-1 flex items-end">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleSendOtp}
                    loading={sendingResetPasswordOtp}
                >
                    {t("resetPassword")}
                </Button>
            </div>

            {/* OTP Dialog */}
            <Dialog
                open={step === AuthStep.PASSWORD_OTP}
                onOpenChange={(open) => {
                    if (!open) {
                        resetStepper();
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="hidden" />
                    </DialogHeader>
                    <ResetPasswordOtp />
                </DialogContent>
            </Dialog>

            {/* Reset Password Dialog */}
            <Dialog
                open={step === AuthStep.RESET_PASSWORD}
                onOpenChange={(open) => {
                    if (!open) {
                        resetStepper();
                    }
                }}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="hidden" />{" "}
                    </DialogHeader>
                    <ResetPassword isInLogin={false} />
                </DialogContent>
            </Dialog>
        </>
    );
};
