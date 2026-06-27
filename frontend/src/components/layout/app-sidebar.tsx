import {
  BookOpenIcon,
  ClapperboardIcon,
  FolderKanbanIcon,
  HomeIcon,
  SettingsIcon,
  SparklesIcon,
} from "lucide-react"
import { NavLink } from "react-router-dom"

import { appNavItems } from "@/app/routes"
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
import { Badge } from "@/components/ui/badge"

const iconByRoute = {
  "/dashboard": HomeIcon,
  "/library": BookOpenIcon,
  "/videos": ClapperboardIcon,
  "/collections": FolderKanbanIcon,
  "/sources": SparklesIcon,
  "/settings": SettingsIcon,
} as const

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2 rounded-lg border bg-sidebar-primary/10 p-3 text-sidebar-foreground">
          <div className="flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
            FT
          </div>
          <div className="grid flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
            <span className="truncate text-sm font-semibold">Fonte Tube</span>
            <span className="truncate text-xs text-muted-foreground">Acervo inteligente</span>
          </div>
          <Badge variant="secondary" className="group-data-[collapsible=icon]:hidden">
            Beta
          </Badge>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegacao</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {appNavItems.map((item) => {
                const Icon = iconByRoute[item.href as keyof typeof iconByRoute]
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild tooltip={item.title}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""
                        }
                      >
                        <Icon data-icon="inline-start" />
                        <span>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          Fonte Tube v0.1
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
