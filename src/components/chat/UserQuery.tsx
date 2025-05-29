"use client";
import { Message } from "@/provider/state";

export function UserQuery({ message }: { message: Message; }) {
  return <div className="mb-4 ml-auto flex items-start gap-2">
    <div className="markdown-body bg-muted px-4 py-2 rounded-xl rounded-tr-none max-w-sm shadow-sm ml-auto">
      <p className="text-sm text-muted-foreground mb-1">{message.content}</p>
    </div>
    <div className="min-w-8 min-h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
      U
    </div>
  </div>;
}