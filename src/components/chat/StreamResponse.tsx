"use client";
import useStateContext from "@/provider/state-provider";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function StreamResponse() {
  const { answer } = useStateContext();
  if (Boolean(answer)) return <div className="mb-4 flex items-start gap-2">
    <div suppressHydrationWarning className="markdown-body bg-muted px-4 py-2 rounded-xl max-w-[400px] shadow-sm">
      <Markdown remarkPlugins={[remarkGfm]}>
        {answer}
      </Markdown>
    </div>
  </div>;
}
