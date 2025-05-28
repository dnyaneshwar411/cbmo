import { AppSidebar } from "@/components/core/AppSidebar";
import ChatProvider from "@/components/core/ChatProvider"
import { StateContextProvider } from "@/provider/state-provider";

export default function Home() {
  return (<StateContextProvider>
    <AppSidebar />
    <ChatProvider />
  </StateContextProvider>);
}