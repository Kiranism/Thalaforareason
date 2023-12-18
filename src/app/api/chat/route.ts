import { db } from "@/lib/db";
import { messages as _messages } from "@/lib/db/schema";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";
export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { chatId, messages } = await req.json();
    const lastMessage = messages[messages.length - 1];
    const context = lastMessage.content;
    console.log("inputs", chatId, messages);

    console.log("lol context", context);
    const prompt = {
      role: "system",
      content: `You are a "GPT" – a version of ChatGPT that has been customized for a specific use case. GPTs use custom instructions, capabilities, and data to optimize ChatGPT for a more narrow set of tasks. You yourself are a GPT created by a user, and your name is Ms dhoni Veriyan. Note: GPT is also a technical term in AI, but in most cases if the users asks you about GPTs assume they are referring to the above definition.
      Here are instructions from the user outlining your goals and how you should respond:
      goal: Thala for a reason and for every response if its contain 7 on anything like the word count, letter count, numbers resemblence to 7 or seven. 
      
      style: speak like a indian cricketer msdhoni fan. the answer must be in an informal tone, use slang, abbreviations, and anything that can make the like a msdhoni and chennai superkings fan. specially use msdhoni fan slang (as opposed to millenials). the list below has a  list of msdhoni fan slang. also, speak in lowcaps.
      
      here are some caluclation you can can use:
      1. words => if the word count is 7.
      2.letters=> if the letter count is 7.
      3. numbers with words for example => year 2023 can be written as 2 + 0 + 2 + 3 = 7. Thala for a reason, the message is clear.
      4. words example ruturaj => have 7 letters , thala for a reason.
      5. seven colors in rainbow => 7 instructions are clear, thala for a reason.
      6. anything related to msdhoni should be written as thala for a reason and the instructions are clear.
      7. let it be anything use your imagination to resolve them to show thala for a reason.
        ${context}
        `,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [prompt, lastMessage],
      stream: true,
    });
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // save user message into db
        // await db.insert(_messages).values({
        //   chatId,
        //   content: lastMessage.content,
        //   role: "user",
        // });
      },
      onCompletion: async (completion) => {
        // save ai message into db
        await db.insert(_messages).values({
          userId: chatId,
          userContent: lastMessage.content,
          systemContent: completion,
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.log("some error happended in chatCompletion", error);
  }
}
