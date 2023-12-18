import ThalaResponse from "@/components/ThalaResponse";
import { ThalaForm } from "@/components/form/thala-form";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
export const dynamic = "force-dynamic";

export default async function Home({ params }: { params: { id: string } }) {
  const chat = await db
    .select()
    .from(messages)
    .where(eq(messages.userId, params.id))
    .orderBy(desc(messages.createdAt));
  console.log(`chatsfrom ${params.id}=>`, chat);

  const chats = await db
    .select()
    .from(messages)
    .orderBy(desc(messages.createdAt));

  return (
    <div className="py-10 min-h-[100dvh] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-500 via-slate-100 to-blue-400">
      <div className="container flex gap-4 md:gap-10 flex-col">
        <div className="flex max-w-md mx-auto flex-col items-center text-center">
          <div className="flex w-full justify-center items-center flex-col">
            <h1 className="text-2xl md:text-4xl whitespace-nowrap font-bold">
              Thala for {chats.length} Reason
            </h1>
            <p>
              This app is made with love, dedicated to India&apos;s legendary
              captain, Ms. Dhoni.
            </p>
          </div>

          <div className="w-full mt-4">
            <ThalaForm
              initialPrompt={chat[0]?.userContent}
              initialChats={chat[0]}
            />
          </div>
        </div>
        <div>
          <ThalaResponse chats={chats} />
        </div>
      </div>
    </div>
  );
}
