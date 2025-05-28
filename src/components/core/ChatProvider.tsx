"use client";
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import useStateContext, { StateContextProvider } from "@/provider/state-provider";
import { addMessage, changeValue } from "@/provider/reducer";
import { toast } from "sonner";
import { Message } from "@/provider/state";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function ChatProvider() {
  return <StateContextProvider>
    <ChatContainer />
  </StateContextProvider>
}

function ChatContainer() {
  return <div className="flex flex-col grow p-4">
    <MessageContainer />
    <SearchInput />
  </div>
}

function MessageContainer() {
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
  </div>
}

function SearchInput() {
  const { state, query, dispatch } = useStateContext();

  async function sendQuery() {
    try {
      const userMessage: Message = {
        id: Date.now().toString(),
        content: query,
        role: "user",
        file: undefined,
      };
      dispatch(addMessage(userMessage));

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

      dispatch(addMessage(aiMessage));
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

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
        G
      </div>
      <div className="bg-muted px-4 py-2 rounded-xl rounded-tl-none max-w-sm shadow-sm">
        <p className="text-sm text-muted-foreground mb-1">Gemini is typing</p>
        <div className="flex space-x-1">
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  )
}

function UserQuery({ message }: { message: Message }) {
  console.log(message)
  return <div className="mb-4 ml-auto flex items-start gap-2">
    <div className="markdown-body bg-muted px-4 py-2 rounded-xl rounded-tr-none max-w-sm shadow-sm ml-auto">
      <p className="text-sm text-muted-foreground mb-1">{message.content}</p>
    </div>
    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
      U
    </div>
  </div>
}

function BotQuery({ message }: { message: Message }) {
  return <div className="mb-4 flex items-start gap-2">
    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold">
      G
    </div>
    <div className="bg-muted px-4 py-2 rounded-xl rounded-tr-none max-w-[600px] shadow-sm">
      <p className="markdown-body text-sm text-muted-foreground mb-1 break-all">
        <Markdown remarkPlugins={[remarkGfm]}>
          {message.content}
        </Markdown>
      </p>
    </div>
  </div>
}

function StreamResponse() {
  const { answer } = useStateContext();
  return <div className="mb-4 flex items-start gap-2">
    <div suppressHydrationWarning className="markdown-body bg-muted px-4 py-2 rounded-xl max-w-[400px] shadow-sm">
      <Markdown remarkPlugins={[remarkGfm]}>
        {answer}
      </Markdown>
      <p className="text-sm text-muted-foreground mb-1">{answer}</p>
    </div>
  </div>
}