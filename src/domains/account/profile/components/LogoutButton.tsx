import { Button } from "@/components/ui/button";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Dialog } from "@radix-ui/react-dialog";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

export const LogoutButton = () => {
    const t = useTranslations("Profile.Logout");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [signingOut, setSigningOut] = useState(false);

    const handleSignout = async () => {
        setSigningOut(true);
        await signOut({ redirect: true, callbackUrl: "/" }).finally(() => {
            setSigningOut(false);
        });
    };

    return (
        <>
            <Button
                variant="destructive"
                size="lg"
                className="max-w-fit"
                onClick={() => {
                    setShowConfirmation(true);
                }}
            >
                {t("logout")} <LogOut />
            </Button>

            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogHeader>
                    <DialogTitle className="hidden" />
                </DialogHeader>
                <DialogContent>
                    <div className="flex flex-col gap-3">
                        <p className="title-3 text-text-foreground">
                            {t("logout")}
                        </p>
                        <p className="body-1">{t("logoutConfirm")}</p>
                        <div className="flex max-w-[40%] ml-auto  items-center justify-end gap-2 mt-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowConfirmation(false);
                                }}
                            >
                                {t("cancel")}
                            </Button>
                            <Button
                                onClick={handleSignout}
                                type="button"
                                loading={signingOut}
                            >
                                {t("logout")}
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
