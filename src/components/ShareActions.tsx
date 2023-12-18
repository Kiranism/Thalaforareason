"use client";
import React from "react";
import { Button } from "./ui/button";
import { ShareIcon } from "lucide-react";
import { useToast } from "./ui/use-toast";

export default function ShareActions({ userId }: { userId: string }) {
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
    <div>
      <Button variant={"outline"} size={"iconsm"} onClick={handleCopyLink}>
        <ShareIcon className="w-4 h-4" />
      </Button>
    </div>
  );
}
