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
    const controller = new AbortController();
    const signal = controller.signal;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      role: "user",
      file: undefined,
    };

    const aiMessage: Message = {
      id: Date.now().toString() + "-ai",
      content: "",
      role: "bot",
      file: undefined,
    };

    try {
      dispatch(addMessage(userMessage));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: query }),
        signal,
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        let result;
        try {
          result = await reader.read();
        } catch (readError) {
          toast.error("Network connection lost.");
          throw readError;
        }

        const { value, done } = result;
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        aiMessage.content += chunk;
        dispatch(changeValue("answer", aiMessage.content));
      }

      addMessageHistory([userMessage, aiMessage]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong.");
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