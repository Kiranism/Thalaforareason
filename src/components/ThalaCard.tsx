"use client";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShareIcon } from "lucide-react";
import ShareActions from "./ShareActions";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
type ThalaCardProps = {
  userMsg: string;
  sysMsg: string;
  userId: string;
};

export default function ThalaCard({ userMsg, sysMsg, userId }: ThalaCardProps) {
  const componentRef = React.useRef<HTMLDivElement>(null);

  const handlePrint = async () => {
    if (!componentRef.current) return;

    const canvas = await html2canvas(componentRef.current, {
      removeContainer: true,
    });
    const data = canvas.toDataURL("image/jpg");

    const link = document.createElement("a");
    link.href = data;
    link.download = "thala7.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card ref={componentRef} className="w-full md:w-[448px] print:w-[448px] ">
      <CardHeader className="flex flex-row place-items-start p-2 justify-between gap-1">
        <p className="text-base md:text-xl font-bold first-letter:uppercase whitespace-break-spaces break-words mt-1">
          &quot;{userMsg}&quot;
        </p>
        <div>
          <ShareActions userId={userId} handlePrint={handlePrint} />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{sysMsg}</p>
      </CardContent>
      <div className="relative w-full md:w-[448px] h-[386px]">
        <Image
          src="/200.gif"
          alt="thala gif"
          fill={true}
          objectFit="cover"
          className="rounded-b-md"
        />
      </div>
    </Card>
  );
}
