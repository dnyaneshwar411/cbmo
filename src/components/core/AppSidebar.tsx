"use client";
import * as React from "react"
import { useState } from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Branding } from "./Branding"
import { SearchForm } from "./SearchForm"
import { AlertDialogTrigger } from "../ui/alert-dialog"
import ClearChatAlert from "../modals/ClearChatAlert"
import useStateContext from "@/provider/state-provider"
import { Trash2 } from "lucide-react";
import NewChatModal from "../modals/NewChatModal";
import { selectChat } from "@/provider/reducer";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { history, selectedIndex, dispatch } = useStateContext()
  const [query, setQuery] = useState("");
  const filteredHistory = history.filter(chat => chat.title.toLowerCase().includes(query.toLowerCase()));
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Branding />
        <SearchForm
          query={query}
          setQuery={setQuery}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <NewChatModal />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredHistory.map((chat, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className="h-auto px-4 py-[8px] mb-1 rounded-[4px] cursor-pointer"
                    isActive={index === selectedIndex}
                  >
                    <div>
                      <div onClick={() => dispatch(selectChat(index))} className="mr-auto grow">{chat.title}</div>
                      <ClearChatAlert index={index}>
                        <AlertDialogTrigger className="cursor-pointer">
                          <Trash2 className="w-[16px] h-[16px] text-[var(--accent-1)]" />
                        </AlertDialogTrigger>
                      </ClearChatAlert>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <ClearChatAlert>
          <AlertDialogTrigger className="cursor-pointer !bg-[var(--accent-1)] py-[6px] opacity-80 hover:opacity-100 rounded-[8px]">
            Clear Chats
          </AlertDialogTrigger>
        </ClearChatAlert>
      </SidebarFooter>
    </Sidebar>
  )
}