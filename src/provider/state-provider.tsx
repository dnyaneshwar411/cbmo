"use client";
import { createContext, Dispatch, useContext, useEffect, useReducer } from "react";
import { ChatState, History, initChat, initialState, Message } from "./state";
import { ChatAction, init, reducer, updateChats } from "./reducer";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import Loader from "@/components/core/Loader";

export interface ChatContextType extends ChatState {
  dispatch: Dispatch<ChatAction>;
  addNewChat: (chat: History) => void;
  addMessage: (messages: Message[]) => void;
  clearChat: (index: number | undefined) => void;
}

const StateContext = createContext<ChatContextType | undefined>(undefined);

export function StateContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [history, setHistory] = useLocalStorage<History[]>("history", [initChat]);
  useEffect(function () {
    dispatch(init(history));
  }, []);

  function addMessage(messages: Message[]) {
    for (const message of messages) {
      if (!Boolean(message.file)) delete message.file;
    }
    const newHistory = history.map((chat, index) => index === state.selectedIndex
      ? { ...chat, messages: [...chat.messages, ...messages] }
      : chat
    )
    console.log(state.selectedIndex)
    setHistory(newHistory)
    dispatch(updateChats(newHistory, state.selectedIndex));
  }

  function clearChat(index: number | undefined) {
    if (index !== undefined || history.length === 1) {
      setHistory([initChat]);
      dispatch(updateChats([initChat], 0))
    } else {
      const newChats = history.filter((_, idx) => index !== idx)
      setHistory(newChats);
      dispatch(updateChats(newChats, 0))
    }
  }

  function addNewChat(chat: History) {
    setHistory(prev => [chat, ...prev]);
    dispatch(updateChats([chat, ...history], 0));
  }

  if (state.state === "init") return <div className="h-screen w-screen flex items-center justify-center">
    <Loader />
  </div>

  return <StateContext value={{
    ...state,
    dispatch,
    addNewChat,
    addMessage,
    clearChat
  }}>
    {children}
  </StateContext>
}

export default function useStateContext() {
  const context = useContext(StateContext);
  if (context === undefined) throw new Error("No context available")
  return context;
}