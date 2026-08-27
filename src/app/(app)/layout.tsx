"use client";

import { LiturgicalProvider } from "@/components/liturgical-provider";
import { AmbientField } from "@/components/ui/primitives";
import { SidebarProvider } from "@/components/layout/sidebar-context";
import { Sidebar, Topbar, LiturgicalColorSwitcher } from "@/components/layout/navigation";
import { MobileTopBar, MobileTabBar } from "@/components/mobile-nav";
import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function LayoutContent({ children }: { children: React.ReactNode }) {

  const acoesMobile = (
    <>
      <LiturgicalColorSwitcher />
      <button className="relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--card)]/40 transition-colors cursor-pointer">
        <Bell className="h-4 w-4 text-[var(--text-secondary)]" />
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--danger)] text-[8px] font-bold text-white shadow-sm animate-pulse-soft">
          5
        </span>
      </button>
      <Avatar className="h-7 w-7 ring-0 shadow-sm ml-1">
        <AvatarFallback className="text-[10px] bg-[var(--brand)] text-white">
          MC
        </AvatarFallback>
      </Avatar>
    </>
  );

  return (
    <div className="relative z-1 min-h-dvh">
      {/* Navigation Mobile (< lg) */}
      <div className="lg:hidden">
        <MobileTopBar
          siglaParoquia="SP"
          nomeParoquia="Paróquia São Pedro"
          contexto="Tempo Comum · Semana 17"
          acoes={acoesMobile}
        />
        <MobileTabBar badges={{ avisos: 2, celebracoes: 3, escalas: 1 }} />
      </div>

      {/* Sidebar Desktop (>= lg) */}
      <Sidebar />

      {/* Main Wrapper */}
      <div className="layout-main-wrapper flex flex-col min-w-0 min-h-dvh">
        {/* Topbar Desktop (>= lg) */}
        <div className="hidden lg:block">
          <Topbar />
        </div>

        {/* Content Container */}
        <main className="flex-1 p-4 pt-[78px] pb-[96px] lg:px-8 lg:py-6 lg:pb-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LiturgicalProvider cor="verde">
      <SidebarProvider>
        <AmbientField />
        <LayoutContent>{children}</LayoutContent>
      </SidebarProvider>
    </LiturgicalProvider>
  );
}
