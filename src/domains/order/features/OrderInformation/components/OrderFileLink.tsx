import { useState } from "react";
import { Button } from "@/components/ui/button";

type OrderFileLinkProps = {
  url: string;
};

export const OrderFileLink = ({ url }: OrderFileLinkProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <div className="truncate flex-1 max-w-[307px] flex items-center body-1 h-[28px] w-[307px] px-3 py-1 text-left border rounded-md">
        {url}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" onClick={handleCopyLink}>
          {isCopied ? "Copied!" : "Copy Link"}
        </Button>
      </div>
    </div>
  );
};
