export interface Message {
  id: string
  role: "user" | "bot"
  content: string
  file?: File | undefined
}

export interface History {
  id: number
  messages: Message[]
  title: string
  started: Date
}

export interface ChatState {
  state: "init" | "ready" | "requesting" | "streaming"
  query: string
  answer: string
  messages: Message[]
  isTyping: boolean
  error: string | null
  history: History[], // to be done
  selectedIndex: number
}

export const initChat = {
  id: Date.now(),
  messages: [],
  title: "Welcome",
  started: new Date()
};

export const initialState: ChatState = {
  state: "init",
  query: "",
  answer: "",
  messages: [],
  isTyping: false,
  error: null,
  history: [],
  selectedIndex: 0
}