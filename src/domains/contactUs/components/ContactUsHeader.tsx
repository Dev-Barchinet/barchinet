import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTranslations } from "next-intl";
import React from "react";

export const ContactUsHeader = () => {
    const t = useTranslations("ContactUs");
    return (
        <Tabs defaultValue="faq" className="h-full">
            <div className="flex items-center">
                <p></p>
                <div>
                    <TabsList>
                        <TabsTrigger value="faq">{t("faqTab")}</TabsTrigger>
                        <TabsTrigger value="ticketing">
                            {t("ticketingTab")}
                        </TabsTrigger>
                        <TabsTrigger value="aboutUs">
                            {t("aboutUs")}
                        </TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="ticketing">
                    <Button>
                        
                    </Button>
                </TabsContent>
            </div>
        </Tabs>
    );
};
