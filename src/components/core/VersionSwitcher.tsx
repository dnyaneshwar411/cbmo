"use client"

import * as React from "react"
import { Bot } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import ThemeToggleButton from "./ThemeToggleButton"

export function VersionSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#4a3aff] text-sidebar-primary-foreground">
            <Bot className="size-4" />
          </div>
          <div className="mr-auto flex flex-col gap-0.5 leading-none">
            <span className="font-semibold">CBMO.ai</span>
          </div>
          <ThemeToggleButton />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}