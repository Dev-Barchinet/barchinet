import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { Profile } from "./profile/Profile";
import { FinancialAccount } from "./financialAccount/FinancialAccount";
import { Separator } from "@/components/ui/separator";
import { LogoutButton } from "./profile/components/LogoutButton";

const AccountPage = () => {
    const t = useTranslations("Profile");
    const [showAddFinancialAccountModal, setShowAddFinancialAccountModal] =
        useState(false);

    return (
        <Tabs defaultValue="profile" className="h-full">
            <div className="flex flex-col p-5 w-full h-full">
                <div className="grid grid-cols-3 justify-between items-center gap-3">
                    <p className="title-2 col-span-1">{t("profile")}</p>
                    <div className="col-start-1 col-end-4 xl:col-start-2 xl:col-end-3 row-start-1 flex justify-center">
                        <TabsList>
                            <TabsTrigger value="profile">
                                {t("profileTab")}
                            </TabsTrigger>
                            <TabsTrigger value="account">
                                {t("financialAccount")}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <div className="col-span-1 col-start-3 flex justify-end">
                        <TabsContent value="profile">
                            <LogoutButton />
                        </TabsContent>
                        <TabsContent value="account">
                            <Button
                                size="lg"
                                className="max-w-fit"
                                onClick={() =>
                                    setShowAddFinancialAccountModal(true)
                                }
                            >
                                <Plus /> {t("addFinancialAccount")}
                            </Button>
                        </TabsContent>
                    </div>
                </div>

                <div className="my-4">
                    <Separator />
                </div>

                <div className="w-full h-full">
                    <TabsContent value="profile">
                        <Profile />
                    </TabsContent>
                    <TabsContent value="account" className="h-full">
                        <FinancialAccount
                            showAddFinancialAccountModal={
                                showAddFinancialAccountModal
                            }
                            setShowAddFinancialAccountModal={
                                setShowAddFinancialAccountModal
                            }
                        />
                    </TabsContent>
                </div>
            </div>
        </Tabs>
    );
};

export default AccountPage;
