import React from "react";
import ThalaResponseCard from "./ThalaResponseCard";
import { chatResponse } from "@/lib/db/schema";
import { char } from "drizzle-orm/mysql-core";

type ThalaResponseProps = {
  chats: chatResponse[];
};

export default function ThalaResponse({ chats }: ThalaResponseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {chats.map((chat) => (
        <ThalaResponseCard
          sysMsg={chat.systemContent}
          userMsg={chat.userContent}
          userId={chat.userId}
        />
      ))}
    </div>
  );
}
