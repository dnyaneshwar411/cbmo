"use client";
import { useEffect, useRef } from "react";
import { MessageContainer } from "../chat/MessageContainer";
import SearchInput from "../chat/SearchInput";
import useStateContext from "@/provider/state-provider";
import { SidebarTrigger } from "../ui/sidebar";

export default function ChatProvider() {
  const bottomRef = useRef<HTMLDivElement>(null)
  const { selectedIndex, answer } = useStateContext();

  useEffect(function () {
    const container = bottomRef.current;
    if (container) {
      container.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedIndex, answer])

  return <div className="flex flex-col grow p-4 pb-0">
    <SidebarTrigger className="bg-[var(--secondary)] sticky top-4" />
    <MessageContainer />
    <SearchInput />
    <div key={selectedIndex} ref={bottomRef} />
  </div>
}