"use client";
import { copyText } from "@/lib/helpers";
import { Message } from "@/provider/state";
import { ClipboardList } from "lucide-react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

export function BotQuery({ message }: { message: Message; }) {
  return <div className="mb-4 flex items-start gap-2">
    <div className="min-w-8 min-h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
      G
    </div>
    <div className="bg-muted px-4 pt-2 rounded-xl rounded-tr-none max-w-[600px] shadow-sm relative">
      <ClipboardList
        className="w-[20px] h-[20px] absolute top-2 right-0 translate-x-[28px] opacity-10 hover:opacity-100 cursor-pointer"
        onClick={() => {
          copyText(message.content);
          toast.success("Message Copied");
        }}
      />
      <div className="markdown-body text-sm text-muted-foreground mb-1 break-all">
        <Markdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </Markdown>
      </div>
    </div>
  </div>;
}
