import { createContext, Dispatch, useContext, useReducer } from "react";
import { ChatState, initialState } from "./state";
import { ChatAction, reducer } from "./reducer";

export interface ChatContextType extends ChatState {
  dispatch: Dispatch<ChatAction>;
}

const StateContext = createContext<ChatContextType | undefined>(undefined);

export function StateContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StateContext value={{ dispatch, ...state }}>
    {children}
  </StateContext>
}

export default function useStateContext() {
  const context = useContext(StateContext);
  if (context === undefined) throw new Error("No context available")
  return context;
}