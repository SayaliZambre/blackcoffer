"use client"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
            hover:scale-110 transition-all duration-300 hover:shadow-lg 
            hover-glow relative overflow-hidden group
            bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700
            border-2 hover:border-blue-300 dark:hover:border-blue-600
          "
        >
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0 animate-rotate-360 group-hover:text-yellow-500" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100 group-hover:text-blue-400" />
          <span className="sr-only">Toggle theme</span>

          {/* Sparkle Effect */}
          <div className="absolute top-1 right-1 w-1 h-1 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse" />
          <div
            className="absolute bottom-1 left-1 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-pulse"
            style={{ animationDelay: "0.2s" }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="animate-slide-down bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-700"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={`
            hover:bg-yellow-100 dark:hover:bg-yellow-900/20 transition-all duration-200 cursor-pointer
            ${theme === "light" ? "bg-yellow-50 dark:bg-yellow-900/10" : ""}
            group hover:scale-105 hover:shadow-md
          `}
        >
          <Sun className="mr-2 h-4 w-4 group-hover:animate-bounce group-hover:text-yellow-500" />
          <span className="group-hover:text-yellow-600 dark:group-hover:text-yellow-400">Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={`
            hover:bg-blue-100 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer
            ${theme === "dark" ? "bg-blue-50 dark:bg-blue-900/10" : ""}
            group hover:scale-105 hover:shadow-md
          `}
        >
          <Moon className="mr-2 h-4 w-4 group-hover:animate-bounce group-hover:text-blue-500" />
          <span className="group-hover:text-blue-600 dark:group-hover:text-blue-400">Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={`
            hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-all duration-200 cursor-pointer
            ${theme === "system" ? "bg-purple-50 dark:bg-purple-900/10" : ""}
            group hover:scale-105 hover:shadow-md
          `}
        >
          <Monitor className="mr-2 h-4 w-4 group-hover:animate-bounce group-hover:text-purple-500" />
          <span className="group-hover:text-purple-600 dark:group-hover:text-purple-400">System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
