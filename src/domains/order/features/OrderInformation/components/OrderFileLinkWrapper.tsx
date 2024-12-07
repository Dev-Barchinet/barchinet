import React, { useState } from "react";
import { OrderFileLink } from "./OrderFileLink";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type OrderFileLinkWrapperProps = {
    links: string[];
};

export const OrderFileLinkWrapper = (props: OrderFileLinkWrapperProps) => {
    const { links } = props;

    const [showLinksModal, setshowLinksModal] = useState(false);

    const hasMoreLinks = links.length > 2;
    return (
        <div className="flex flex-col">
            <OrderFileLink url={links[0]} />
            {links[1] && <OrderFileLink url={links[1]} />}
            {hasMoreLinks && (
                <Button
                    variant="ghost"
                    className="max-w-[40px] ml-auto mt-6"
                    size="sm"
                    onClick={() => setshowLinksModal(true)}
                >
                    More <ChevronRight />
                </Button>
            )}
            <Dialog
                open={showLinksModal}
                onOpenChange={() => setshowLinksModal(false)}
            >
                <DialogContent className="max-w-fit">
                    <DialogTitle>Links</DialogTitle>
                    <div>
                        {links.map((link) => (
                            <OrderFileLink url={link} key={link} />
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};
