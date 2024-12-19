"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Ticketing } from "./features/Ticketing";

export const ContactUs = () => {
  const t = useTranslations("ContactUs");
  const [showAddTicket, setShowAddTicket] = useState(false);
  return (
    <div className="h-full w-full px-4 flex flex-col">
      <div className="flex items-center justify-between">
        <p className="title-2">{t("contactSupport")}</p>
        <Button
          className="max-w-[160px]"
          onClick={() => setShowAddTicket(true)}
        >
          {t("Ticketing.addTicketButton")}
        </Button>
      </div>
      <div className="flex-1 w-full h-full border-red-500">
        <Ticketing
          showAddTicket={showAddTicket}
          setShowAddTicket={setShowAddTicket}
        />
      </div>
    </div>
  );

  // return (
  //   <Tabs defaultValue="faq" className="h-full w-full px-4 flex flex-col">
  //     <div className="flex items-center justify-between">
  //       <p className="title-2">{t("contactSupport")}</p>
  //       <div className="flex-1 flex items-center justify-center">
  //         <TabsList>
  //           <TabsTrigger value="faq">{t("faqTab")}</TabsTrigger>
  //           <TabsTrigger value="ticketing">{t("ticketingTab")}</TabsTrigger>
  //           <TabsTrigger value="aboutUs">{t("aboutUs")}</TabsTrigger>
  //         </TabsList>
  //       </div>
  //       <TabsContent value="ticketing">
  //         <Button className="max-w-[160px]">{t("addTicketButton")}</Button>
  //       </TabsContent>
  //       <TabsContent value="faq">
  //         <div className="min-w-[160px] min-h-[36px]"></div>
  //       </TabsContent>
  //       <TabsContent value="aboutUs">
  //         <div className="min-w-[160px] min-h-[36px]"></div>
  //       </TabsContent>
  //     </div>
  //     <div className="w-full h-[1px] bg-border my-3"></div>
  //     <div className="flex-1 w-full h-full border-red-500">
  //       <TabsContent value="faq">
  //         <Faq />
  //       </TabsContent>
  //       <TabsContent value="ticketing">
  //         <Ticketing />
  //       </TabsContent>
  //       <TabsContent value="aboutUs">
  //         {" "}
  //         <AboutUs />{" "}
  //       </TabsContent>
  //     </div>
  //   </Tabs>
  // );
};
