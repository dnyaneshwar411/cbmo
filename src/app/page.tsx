import { AppSidebar } from "@/components/core/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import ChatProvider from "@/components/core/ChatProvider"

export default function Home() {
  return (
    <main className="h-screen mx-auto flex flex-col">
      <SidebarProvider>
        <AppSidebar />
        <ChatProvider />
      </SidebarProvider>
    </main>
  );
}