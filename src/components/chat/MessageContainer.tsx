"use client";
import { Message } from "@/provider/state";
import useStateContext from "@/provider/state-provider";
import { BotQuery } from "../chat/BotQuery";
import { StreamResponse } from "../chat/StreamResponse";
import { TypingIndicator } from "../chat/TypingIndicator";
import { UserQuery } from "../chat/UserQuery";

export function MessageContainer() {
  const { state, messages } = useStateContext();


  return <div className="max-w-[840px] w-full mt-10 mx-auto">
    {!Boolean(messages.length) && <div className="text-center mt-[30vh]">
      <h1 className="text-4xl font-bold mb-4 leading-[1]">No Messages</h1>
      <p className="text-lg leading-[1] text-[var(--muted)]">Ask questions to get answers.</p>
    </div>}
    {messages.map((message: Message) => message.role === "user"
      ? <UserQuery key={message.id} message={message} />
      : <BotQuery key={message.id} message={message} />
    )}
    {state === "requesting" && <StreamResponse />}
    {state === "requesting" && <TypingIndicator />}
  </div>;
}
