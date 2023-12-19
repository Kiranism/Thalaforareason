"use client";
import React from "react";
import { Button } from "./ui/button";
import { DownloadIcon, ShareIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";
import { useReactToPrint } from "react-to-print";

export default function ShareActions({
  userId,
  handlePrint,
}: {
  userId: string;
  handlePrint: () => void;
}) {
  const { toast } = useToast();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_APP_URL}/t/${userId}`
    );
    toast({
      title: "Link Copied to Clickboard",
    });
  };

  return (
    <div className="gap-1 flex">
      <Button variant={"outline"} size={"iconsm"} onClick={handleCopyLink}>
        <ShareIcon className="w-4 h-4" />
      </Button>
      {/* <Button variant={"outline"} size={"iconsm"} onClick={handlePrint}>
        <DownloadIcon className="w-4 h-4" />
      </Button> */}
    </div>
  );
}
