import React from "react";
import ResetPassword from "@/domains/auth/components/ResetPassword";
import ResetPasswordOtp from "@/domains/auth/components/ResetPasswordOtp";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useAuthStepperStore, { AuthStep } from "@/core/stores/useAuthStore";
import { useTranslations } from "next-intl";

export const ResetPasswordProfileModals = () => {
    const t = useTranslations("Profile.ResetPassword");

    const { step, resetStepper } = useAuthStepperStore();
    return (
        <>
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
                        <DialogTitle>{t("resetPasswordTitle")}</DialogTitle>
                    </DialogHeader>
                    <ResetPassword isInLogin={false} />
                </DialogContent>
            </Dialog>
        </>
    );
};
