"use client";
export function TypingIndicator() {
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
  );
}
