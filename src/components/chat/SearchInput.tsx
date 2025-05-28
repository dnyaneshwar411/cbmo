"use client";
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import useStateContext from "@/provider/state-provider";
import { addMessage, changeValue } from "@/provider/reducer";
import { toast } from "sonner";
import { Message } from "@/provider/state";

export default function SearchInput() {
  const { state, query, dispatch, addMessage: addMessageHistory } = useStateContext();

  async function sendQuery() {
    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: query,
        role: "user",
        file: undefined,
      };
      dispatch(addMessage(userMessage))
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: query }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      const aiMessage: Message = {
        id: Date.now().toString() + "-ai",
        content: "",
        role: "bot",
        file: undefined,
      };

      if (!reader) throw new Error("Unable to get response stream.");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        aiMessage.content += chunk;
        dispatch(changeValue("answer", aiMessage.content));
      }
      addMessageHistory([userMessage, aiMessage])
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message || "Something went wrong. Please try again!");
      }
      dispatch(changeValue("error", "Failed to stream response"));
    } finally {
      dispatch(changeValue("state", "ready"));
    }
  }

  return <div className="bg-background sticky bottom-0 pb-16 mt-auto">
    <div className="max-w-[840px] w-full bg-[var(--popover)] mx-auto flex items-end gap-4 border-1 rounded-[6px] overflow-clip">
      <Textarea
        className="max-h-[120px] h-auto !bg-transparent focus:outline-none focus-visible:ring-[0px] rounded-b-none border-[0px]"
        placeholder="Query..."
        value={query}
        onChange={e => dispatch(changeValue("query", e.target.value))}
      />
      <Button
        className="h-auto !bg-transparent border-none"
        variant="outline"
        disabled={!Boolean(query.length) || state === "requesting"}
        onClick={sendQuery}
      >
        <Send className="!w-[20px] !h-[20px] !cursor-pointer" />
      </Button>
    </div>
  </div>
}