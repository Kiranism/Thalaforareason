"use client";
import React, { useRef } from "react";
import { nanoid } from "ai";
import { Message, useChat } from "ai/react";
import ThalaCard from "../ThalaCard";
import SubmitButton from "./submit-button";
import Celebration from "../Celebration";
import { chatResponse } from "@/lib/db/schema";
import { useRouter } from "next/navigation";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import { useReactToPrint } from "react-to-print";
interface ThalaFormProps {
  initialPrompt?: string;
  initialChats?: any;
}

type role = "user" | "assistant" | "system" | "function";

export function ThalaForm({ initialPrompt, initialChats }: ThalaFormProps) {
  const submitRef = useRef<React.ElementRef<"button">>(null);
  const [isExploding, setIsExploding] = React.useState(false);

  const router = useRouter();
  const chatId = nanoid();

  function mapRawMessageToMessage(rawMessage: chatResponse) {
    let initialMsg = [];
    if (rawMessage?.userContent) {
      initialMsg.push({
        id: rawMessage?.id.toString(),
        createdAt: new Date(rawMessage?.createdAt),
        content: rawMessage?.userContent,
        role: "user" as role,
      });
    }
    if (rawMessage?.systemContent) {
      initialMsg.push({
        id: rawMessage?.id.toString(),
        createdAt: new Date(rawMessage?.createdAt),
        content: rawMessage?.systemContent,
        role: "assistant" as role,
      });
    }
    return initialMsg;
  }

  const playAudio = () => {
    const audio = new Audio("/msdsong.mp3");
    audio.play();
  };

  const {
    input,
    handleInputChange,
    handleSubmit,
    messages,
    isLoading,
    data,
    metadata,
  } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: mapRawMessageToMessage(initialChats),
    initialInput: initialPrompt ?? "",
    onResponse: (response) => {
      console.log("res", response);
      setIsExploding(true);
      playAudio();
    },
  });

  console.log("messgaes", messages, data);

  return (
    <div className="flex gap-4 flex-col">
      <div className="absolute top-0">
        <Celebration isExploading={isExploding} />
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-black rounded-xl shadow-lg h-fit flex flex-row px-1 items-center w-full"
      >
        <input
          value={input}
          onChange={handleInputChange}
          type="text"
          name="prompt"
          disabled={initialPrompt ? true : false}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              submitRef.current?.click();
            }
          }}
          placeholder="Thala For a Reason"
          className={cn(
            initialPrompt && "truncate",
            "bg-transparent text-white placeholder:text-gray-400 ring-0 outline-none resize-none py-2.5 px-2 font-mono text-sm h-10 w-full transition-all duration-300"
          )}
        />
        {initialPrompt ? (
          <Link
            href={"/"}
            className={cn(
              "text-white text-xs w-36 flex items-center gap-1 justify-end mx-1 "
            )}
          >
            Add New <PlusIcon className="w-4 h-4" />
          </Link>
        ) : (
          <SubmitButton ref={submitRef} isLoading={isLoading} />
        )}
      </form>

      {messages.length > 1 &&
        messages
          .reduce<Message[][]>((result, value, index, array) => {
            if (index % 2 === 0) result.push(array.slice(index, index + 2));
            return result;
          }, [])
          .map((pair, index) => (
            <ThalaCard
              key={index}
              userId={initialChats ? initialChats.userId : data[0]?.chatId}
              userMsg={
                pair[0].role === "user" ? pair[0]?.content : pair[1]?.content
              }
              sysMsg={
                pair[0].role === "assistant"
                  ? pair[0]?.content
                  : pair[1]?.content
              }
            />
          ))}
    </div>
  );
}
