export interface Message {
  id: string
  role: "user" | "bot"
  content: string
  file: File | undefined
}

interface History {
  messages: Message[]
  started: string
}

export interface ChatState {
  state: "ready" | "requesting" | "streaming"
  query: string
  answer: string
  messages: Message[]
  isTyping: boolean
  error: string | null
  history: History[] // to be done
}

export const initialState: ChatState = {
  state: "ready",
  query: "",
  answer: "",
  messages: [],
  isTyping: false,
  error: null,
  history: []
}