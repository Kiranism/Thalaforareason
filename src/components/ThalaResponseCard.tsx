import React from "react";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import Image from "next/image";
import Link from "next/link";

type ThalaResponseCardProps = {
  userMsg: string;
  sysMsg: string;
  userId: string;
};

export default function ThalaResponseCard({
  userMsg,
  sysMsg,
  userId,
}: ThalaResponseCardProps) {
  return (
    <Card>
      <Link href={`/t/${userId}`}>
        <CardHeader>
          <p className="text-xl font-bold text-center">"{userMsg}"</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm truncate">{sysMsg}</p>
        </CardContent>
      </Link>
    </Card>
  );
}
