"use client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggleButton() {
  const { setTheme } = useTheme();
  return <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className="h-[32px] w-[32px] bg-background text-center cursor-pointer flex items-center justify-center border-1 rounded-[8px]">
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem onClick={() => setTheme("light")}>
        Light
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme("dark")}>
        Dark
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}