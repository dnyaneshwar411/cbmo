import { ChatState, History, Message } from "./state";

export type ChatAction =
  | {
    type: "CHANGE_VALUE";
    payload: {
      name: "state" | "query" | "messages" | "error" | "history" | "answer",
      value: string | File | Message
    }
  }
  | { type: "ADD_MESSAGE"; payload: Message }
  | { type: "SET_STATE"; payload: "ready" | "requesting" | "streaming" }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "CLEAR_CHAT" }
  | { type: "SELECT_CHAT", payload: number }
  | { type: "INIT", payload: History[] }
  | {
    type: "UPDATE_CHATS",
    payload: {
      chats: History[]
      index?: number
    }
  }

export function reducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        state: "ready",
        history: action.payload,
        messages: Boolean(action.payload.length)
          ? action.payload[0].messages
          : []
      }
    case "CHANGE_VALUE":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages,
        action.payload],
        state: "requesting",
        query: ""
      }
    case "SET_STATE":
      return {
        ...state,
        state: action.payload
      }
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload
      }
    case "CLEAR_CHAT":
      return {
        ...state,
        messages: [],
        error: null
      }
    case "SELECT_CHAT":
      return {
        ...state,
        selectedIndex: action.payload,
        messages: !isNaN(action.payload)
          ? state.history[action.payload].messages
          : []
      }
    case "UPDATE_CHATS":
      return {
        ...state,
        history: action.payload.chats,
        selectedIndex: action.payload.index || state.selectedIndex,
        messages: action.payload.index !== undefined
          ? action.payload.chats[action.payload.index].messages
          : []
      }
    default:
      return state
  }
}

export function init(history: History[]): ChatAction {
  return {
    type: "INIT",
    payload: history
  }
}

export function changeValue(
  name: "state" | "query" | "messages" | "error" | "history" | "answer",
  value: string | File | Message
): ChatAction {
  return {
    type: "CHANGE_VALUE",
    payload: {
      name,
      value
    }
  }
}

export function addMessage(payload: Message): ChatAction {
  return {
    type: "ADD_MESSAGE",
    payload
  }
}

export function selectChat(payload: number): ChatAction {
  return {
    type: "SELECT_CHAT",
    payload
  }
}

export function updateChats(history: History[], index?: number): ChatAction {
  return {
    type: "UPDATE_CHATS",
    payload: {
      chats: history,
      index
    }
  }
}