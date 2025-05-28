import { ChatState, Message } from "./state";

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

export function reducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
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
    default:
      return state
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