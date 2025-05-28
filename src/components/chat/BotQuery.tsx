"use client";
import { Message } from "@/provider/state";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function BotQuery({ message }: { message: Message; }) {
  return <div className="mb-4 flex items-start gap-2">
    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
      G
    </div>
    <div className="bg-muted px-4 pt-2 rounded-xl rounded-tr-none max-w-[600px] shadow-sm">
      <div className="markdown-body text-sm text-muted-foreground mb-1 break-all">
        <Markdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </Markdown>
      </div>
    </div>
  </div>;
}
