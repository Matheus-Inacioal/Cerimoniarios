"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { GlassSurface } from "@/components/ui/primitives";
import { useLiturgicalColor, type CorLiturgicaKey } from "@/components/liturgical-provider";
import { useSidebar } from "@/components/layout/sidebar-context";
import {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  MessageSquare,
  BarChart3,
  Settings,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Church,
  Bell,
  Search,
  Menu,
  X,
  Palette,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Celebrações", href: "/celebracoes", icon: Calendar, badge: 3 },
  { label: "Escalas", href: "/escalas", icon: ClipboardList, badge: 1 },
  { label: "Pessoas", href: "/pessoas", icon: Users },
  { label: "Avisos", href: "/avisos", icon: MessageSquare, badge: 2 },
  { label: "Biblioteca", href: "/biblioteca", icon: BookOpen },
  { label: "Estatísticas", href: "/estatisticas", icon: BarChart3 },
];

const bottomNav: NavItem[] = [
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

const litColors: { value: CorLiturgicaKey; label: string; hex: string }[] = [
  { value: "verde", label: "Verde", hex: "#2E6B4F" },
  { value: "roxo", label: "Roxo", hex: "#5B3E8E" },
  { value: "vermelho", label: "Vermelho", hex: "#B3261E" },
  { value: "branco", label: "Branco", hex: "#FAF7EF" },
  { value: "dourado", label: "Dourado", hex: "#96741F" },
  { value: "rosa", label: "Rosa", hex: "#BE5F7C" },
];

export function LiturgicalColorSwitcher() {
  const { cor, setCor } = useLiturgicalColor();
  const [open, setOpen] = useState(false);

  if (process.env.NODE_ENV === "production") return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--card)]/40 transition-colors cursor-pointer"
        title="Trocar cor litúrgica (demonstração)"
      >
        <Palette className="h-4 w-4 text-[var(--text-secondary)]" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-10 z-50 rounded-xl bg-[var(--card)] border border-[var(--line)] shadow-lg p-2 min-w-[160px] animate-scale-in">
            <p className="text-[10px] font-medium text-[var(--text-tertiary)] uppercase tracking-wider px-2 py-1">
              Cor litúrgica
            </p>
            {litColors.map((c) => (
              <button
                key={c.value}
                onClick={() => {
                  setCor(c.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2.5 w-full rounded-lg px-2 py-1.5 text-sm transition-colors cursor-pointer",
                  cor === c.value
                    ? "bg-[var(--page)] text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-secondary)] hover:bg-[var(--page)]"
                )}
              >
                <span
                  className={cn(
                    "h-3 w-3 rounded-full shrink-0",
                    c.value === "branco" && "ring-1 ring-[#D4C9A8]"
                  )}
                  style={{ backgroundColor: c.value === cor ? "var(--lit)" : c.hex }}
                />
                {c.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NavLink({
  item,
  collapsed,
  onClick,
}: {
  item: NavItem;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
        isActive
          ? "bg-[var(--card)] text-[var(--text-primary)] shadow-[var(--card-shadow)]"
          : "text-[var(--text-secondary)] hover:bg-[var(--card)]/50 hover:text-[var(--text-primary)]",
        collapsed && "justify-center px-2"
      )}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-[var(--lit)]" />
      )}
      <Icon className={cn("h-[18px] w-[18px] shrink-0", isActive && "text-[var(--lit)]")} />
      {!collapsed && (
        <>
          <span className="truncate">{item.label}</span>
          {item.badge && item.badge > 0 && (
            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--danger)] text-[10px] font-semibold text-white px-1.5">
              {item.badge}
            </span>
          )}
        </>
      )}
      {collapsed && item.badge && item.badge > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--danger)] text-[8px] font-bold text-white">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

export function Sidebar() {
  const { collapsed, toggleCollapsed } = useSidebar();

  return (
    <GlassSurface
      radius="bar"
      as="aside"
      style={{ width: "var(--sidebar-w, 260px)" }}
      className={cn(
        "hidden lg:flex flex-col fixed left-0 top-0 bottom-0 z-30 transition-all duration-300 ease-[var(--ease)] rounded-none border-0 border-r"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex items-center gap-3 px-4 h-[var(--topbar-height)] shrink-0 border-b border-[var(--glass-line)]/50",
          collapsed && "justify-center px-2"
        )}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[var(--brand)] shadow-md shadow-[var(--brand)]/20">
          <Church className="h-5 w-5 text-white" />
        </div>
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="text-[13px] font-semibold text-[var(--text-primary)] truncate">
              Cerimonial360
            </span>
            <span className="text-[10px] text-[var(--text-tertiary)] truncate">
              Paróquia São Pedro
            </span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <div className="flex flex-col gap-0.5">
          {mainNav.map((item) => (
            <NavLink key={item.href} item={item} collapsed={collapsed} />
          ))}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[var(--glass-line)] px-3 py-3 shrink-0">
        <div className="flex flex-col gap-0.5">
          {bottomNav.map((item) => (
            <NavLink key={item.href} item={item} collapsed={collapsed} />
          ))}
        </div>

        {/* User profile */}
        <div
          className={cn(
            "mt-2 flex items-center gap-3 rounded-xl px-3 py-2 cursor-pointer hover:bg-[var(--card)]/50 transition-colors",
            collapsed && "justify-center px-2"
          )}
        >
          <Avatar className="h-8 w-8 ring-0 shadow-sm shrink-0">
            <AvatarFallback className="text-[11px] bg-[var(--brand)] text-white">
              MC
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-[13px] font-medium text-[var(--text-primary)] truncate">
                Marcelo Costa
              </span>
              <span className="text-[10px] text-[var(--text-tertiary)] truncate">
                Coordenador
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle button */}
      <button
        onClick={toggleCollapsed}
        aria-label={collapsed ? "Expandir menu lateral" : "Colapsar menu lateral"}
        className="absolute -right-3 top-16 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--card)] border border-[var(--line)] text-[var(--text-tertiary)] shadow-md hover:text-[var(--text-primary)] hover:scale-105 transition-all cursor-pointer z-10"
      >
        {collapsed ? (
          <ChevronRight className="h-3.5 w-3.5" />
        ) : (
          <ChevronLeft className="h-3.5 w-3.5" />
        )}
      </button>
    </GlassSurface>
  );
}

export function Topbar() {
  return (
    <GlassSurface
      radius="bar"
      as="header"
      className="sticky top-0 z-40 flex h-[var(--topbar-height)] items-center justify-between px-4 lg:px-6 rounded-none border-0 border-b w-full"
    >
      <MobileMenuButton />

      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
          <input
            type="text"
            placeholder="Buscar celebrações, pessoas, escalas..."
            className="w-full rounded-xl bg-[var(--card)]/60 border border-[var(--line)] py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:bg-[var(--card)] focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10 focus:outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 pr-2">
        <LiturgicalColorSwitcher />

        <button className="relative flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--card)]/40 transition-colors cursor-pointer">
          <Bell className="h-[18px] w-[18px] text-[var(--text-secondary)]" />
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--danger)] text-[9px] font-bold text-white shadow-sm animate-pulse-soft">
            5
          </span>
        </button>

        <div className="lg:hidden ml-1">
          <Avatar className="h-8 w-8 ring-0 shadow-sm">
            <AvatarFallback className="text-[11px] bg-[var(--brand)] text-white">
              MC
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </GlassSurface>
  );
}

function MobileMenuButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full hover:bg-[var(--card)]/40 transition-colors cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <Menu className="h-5 w-5 text-[var(--text-secondary)]" />
      </button>

      <div className="hidden lg:block" />

      {open && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <GlassSurface
            radius="bar"
            className="fixed inset-y-0 left-0 z-50 w-[280px] lg:hidden animate-slide-in-left rounded-none border-0 border-r flex flex-col"
          >
            <div className="flex items-center justify-between px-4 h-[var(--topbar-height)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--brand)]">
                  <Church className="h-5 w-5 text-white" />
                </div>
                <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                  Cerimonial360
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--card)]/50 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4 text-[var(--text-secondary)]" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-3 py-3">
              <div className="flex flex-col gap-0.5">
                {mainNav.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    collapsed={false}
                    onClick={() => setOpen(false)}
                  />
                ))}
                <div className="my-2 border-t border-[var(--glass-line)]" />
                {bottomNav.map((item) => (
                  <NavLink
                    key={item.href}
                    item={item}
                    collapsed={false}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </nav>
          </GlassSurface>
        </>
      )}
    </>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const mobileItems = mainNav.slice(0, 5);

  return (
    <GlassSurface
      radius="bar"
      as="nav"
      className="fixed bottom-0 left-0 right-0 z-40 lg:hidden rounded-none border-0 border-t safe-area-bottom"
    >
      <div className="flex items-center justify-around py-1">
        {mobileItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors relative min-w-[56px]",
                isActive ? "text-[var(--lit)]" : "text-[var(--text-tertiary)]"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="text-[10px] font-medium">{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute top-0 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--danger)] text-[7px] font-bold text-white">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-[2px] w-5 rounded-full bg-[var(--lit)]" />
              )}
            </Link>
          );
        })}
      </div>
    </GlassSurface>
  );
}
