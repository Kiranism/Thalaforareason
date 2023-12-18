import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { ShareIcon } from "lucide-react";
import ShareActions from "./ShareActions";

type ThalaCardProps = {
  userMsg: string;
  sysMsg: string;
  userId: string;
};

export default function ThalaCard({ userMsg, sysMsg, userId }: ThalaCardProps) {
  return (
    <Card className="w-[340px] md:w-[448px] ">
      <CardHeader className="flex flex-row items-center p-2 justify-between">
        <p className="text-xl font-bold first-letter:uppercase">"{userMsg}"</p>
        <div>
          <ShareActions userId={userId} />
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
