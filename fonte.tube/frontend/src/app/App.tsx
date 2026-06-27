import { RouterProvider } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider } from "@/components/layout/theme-provider"
import { router } from "@/app/routes"

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" storageKey="fonte-tube-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster richColors closeButton />
      </TooltipProvider>
    </ThemeProvider>
  )
}
