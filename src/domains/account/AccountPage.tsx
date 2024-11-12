import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Profile } from "./profile/Profile";
import { FinancialAccount } from "./financialAccount/FinancialAccount";
import { Separator } from "@/components/ui/separator";
import { useGetApiArchitectAccounts } from "@/services/architect-services/api-architect-accounts-get";

const AccountPage = () => {
  const t = useTranslations("Profile");
  const { data, isLoading } = useGetApiArchitectAccounts();
  console.log(data);

  if (isLoading) {
    return "Fetching Profile...";
  }
  return (
    <Tabs defaultValue="profile">
      <div className="flex flex-col p-5 w-full h-full">
        <div className="grid grid-cols-3 justify-between items-center gap-3">
          <p className="title-2 col-span-1">{t("profile")}</p>
          <div className="col-start-1 col-end-4 xl:col-start-2 xl:col-end-3 row-start-1 flex justify-center">
            <TabsList>
              <TabsTrigger value="profile">{t("profileTab")}</TabsTrigger>
              <TabsTrigger value="account">{t("financialAccount")}</TabsTrigger>
            </TabsList>
          </div>

          <div className="col-span-1 col-start-3 flex justify-end">
            <TabsContent value="profile">
              <Button variant="destructive" size="lg" className="max-w-fit">
                {t("logout")} <LogOut />
              </Button>
            </TabsContent>
            <TabsContent value="account">
              <Button size="lg" className="max-w-fit">
                <Plus /> {t("addFinancialAccount")}
              </Button>
            </TabsContent>
          </div>
        </div>

        <div className="my-4">
          <Separator />
        </div>

        <div>
          <TabsContent value="profile">
            <Profile />
          </TabsContent>
          <TabsContent value="account">
            <FinancialAccount />
          </TabsContent>
        </div>
      </div>
    </Tabs>
  );
};

export default AccountPage;
