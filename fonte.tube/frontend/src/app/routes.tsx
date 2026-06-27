import { Navigate, createBrowserRouter } from "react-router-dom"

import { AppShell } from "@/components/layout/app-shell"
import { CollectionsPage } from "@/features/collections/collections-page"
import { DashboardPage } from "@/features/dashboard/dashboard-page"
import { LibraryPage } from "@/features/library/library-page"
import { SettingsPage } from "@/features/settings/settings-page"
import { SourcesPage } from "@/features/sources/sources-page"
import { VideosPage } from "@/features/videos/videos-page"

export const appNavItems = [
  { title: "Dashboard", href: "/dashboard" },
  { title: "Biblioteca", href: "/library" },
  { title: "Videos", href: "/videos" },
  { title: "Colecoes", href: "/collections" },
  { title: "Fontes", href: "/sources" },
  { title: "Definicoes", href: "/settings" },
] as const

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "library", element: <LibraryPage /> },
      { path: "videos", element: <VideosPage /> },
      { path: "collections", element: <CollectionsPage /> },
      { path: "sources", element: <SourcesPage /> },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
])
