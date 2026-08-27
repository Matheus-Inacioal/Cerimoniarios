"use client";

import { cn } from "@/lib/utils";
import { GlassSurface } from "@/components/ui/primitives";
import {
  Home,
  CheckSquare,
  Calendar,
  Bell,
  Menu,
  Users,
  BookOpen,
  BarChart3,
  Settings,
  X,
} from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

/* =============================================================================
   Navegação MOBILE — barras de vidro FLUTUANTES, iguais ao template.

   Diferença-chave vs. a versão atual:
   - A tab bar FLUTUA: descolada das bordas (left/right/bottom: 12px), cantos 22px,
     vidro visível por todos os lados. NÃO é uma barra chapada colada na base.
   - O topo mostra o brasão + nome da paróquia + contexto litúrgico, não busca.
   - No mobile existe SÓ a tab bar. Nada de hambúrguer que abre a sidebar do desktop.
     O 5º item "Mais" abre um drawer com o overflow (Pessoas, Biblioteca, etc).

   Requer que <AmbientField/> esteja renderizado atrás de tudo no layout raiz —
   é o que faz o vidro tingir na cor litúrgica. Sem ele, as barras ficam cinza.
   ============================================================================= */

/* ---------------------------------------------------------------------------
   MobileTopBar — barra superior de vidro (fixa no topo).
   --------------------------------------------------------------------------- */
interface MobileTopBarProps {
  siglaParoquia: string;      // ex.: "SP"
  nomeParoquia: string;       // ex.: "Paróquia São Pedro"
  contexto: string;           // ex.: "Tempo Comum · Semana 17"
  acoes?: React.ReactNode;    // ícones à direita (paleta dev, sino, avatar)
}

export function MobileTopBar({ siglaParoquia, nomeParoquia, contexto, acoes }: MobileTopBarProps) {
  return (
    <GlassSurface
      as="header"
      radius="bar"
      className={cn(
        "fixed top-0 inset-x-0 z-40 h-16 rounded-none border-x-0 border-t-0",
        "flex items-end gap-2.5 px-4 pb-2.5",
        "shadow-[inset_0_1px_0_var(--spec)]"
      )}
    >
      <div
        className="h-[30px] w-[30px] rounded-[9px] bg-[var(--lit)] grid place-items-center text-white text-[13px] font-semibold shrink-0 transition-[background] duration-[var(--dur-ambient)]"
        aria-hidden="true"
      >
        {siglaParoquia}
      </div>
      <div className="min-w-0 flex-1">
        <b className="block text-[15px] font-medium tracking-[-.01em] text-[var(--text-primary)] truncate">
          {nomeParoquia}
        </b>
        <small className="block text-[11.5px] text-[var(--text-secondary)] mt-px truncate">
          {contexto}
        </small>
      </div>
      {acoes && <div className="flex items-center gap-1 pb-0.5">{acoes}</div>}
    </GlassSurface>
  );
}

/* ---------------------------------------------------------------------------
   MobileTabBar — barra inferior de vidro FLUTUANTE.
   --------------------------------------------------------------------------- */
interface TabItem {
  key: string;
  label: string;
  href?: string;
  icon: React.ReactNode;
}

const TABS: TabItem[] = [
  { key: "dashboard",   label: "Início",  href: "/dashboard",   icon: <Home className="h-[18px] w-[18px]" /> },
  { key: "escalas",     label: "Escalas", href: "/escalas",     icon: <CheckSquare className="h-[18px] w-[18px]" /> },
  { key: "celebracoes", label: "Agenda",  href: "/celebracoes", icon: <Calendar className="h-[18px] w-[18px]" /> },
  { key: "avisos",      label: "Avisos",  href: "/avisos",      icon: <Bell className="h-[18px] w-[18px]" /> },
  { key: "mais",        label: "Mais",                          icon: <Menu className="h-[18px] w-[18px]" /> },
];

const OVERFLOW_ITEMS = [
  { label: "Pessoas", href: "/pessoas", icon: Users },
  { label: "Biblioteca", href: "/biblioteca", icon: BookOpen },
  { label: "Estatísticas", href: "/estatisticas", icon: BarChart3 },
  { label: "Configurações", href: "/configuracoes", icon: Settings },
];

interface MobileTabBarProps {
  badges?: Record<string, number>;
}

export function MobileTabBar({ badges = {} }: MobileTabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const getActiveTab = () => {
    if (pathname.startsWith("/dashboard")) return "dashboard";
    if (pathname.startsWith("/escalas")) return "escalas";
    if (pathname.startsWith("/celebracoes")) return "celebracoes";
    if (pathname.startsWith("/avisos")) return "avisos";
    return "mais";
  };

  const activeTab = getActiveTab();

  const handleTabClick = (t: TabItem) => {
    if (t.key === "mais") {
      setDrawerOpen(true);
    } else if (t.href) {
      setDrawerOpen(false);
      router.push(t.href);
    }
  };

  return (
    <>
      <GlassSurface
        as="nav"
        radius="bar"
        className={cn(
          "fixed z-40 left-3 right-3 bottom-3 h-[62px]",
          "grid grid-cols-5 items-center",
          "pb-[env(safe-area-inset-bottom)]"
        )}
        aria-label="Navegação principal"
      >
        {TABS.map((t) => {
          const on = activeTab === t.key && (!drawerOpen || t.key === "mais");
          const badge = badges[t.key];
          return (
            <button
              key={t.key}
              onClick={() => handleTabClick(t)}
              aria-current={on ? "page" : undefined}
              className={cn(
                "relative grid justify-items-center gap-[3px] h-full cursor-pointer",
                "text-[10px] font-medium transition-colors duration-[var(--dur-ambient)]",
                on ? "text-[var(--lit)]" : "text-[var(--text-tertiary)]"
              )}
            >
              <span className="relative mt-2">
                {t.icon}
                {badge ? (
                  <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-1 rounded-full bg-[var(--danger)] text-white text-[9px] font-semibold grid place-items-center">
                    {badge}
                  </span>
                ) : null}
              </span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </GlassSurface>

      {/* Drawer Bottom Sheet para o item "Mais" */}
      {drawerOpen && (
        <>
          <div
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden animate-fade-in"
            onClick={() => setDrawerOpen(false)}
          />
          <GlassSurface
            radius="card"
            className={cn(
              "fixed bottom-0 inset-x-0 z-50 p-5 rounded-b-none border-x-0 border-b-0",
              "animate-fade-in-up lg:hidden space-y-4"
            )}
          >
            <div className="flex items-center justify-between border-b border-[var(--glass-line)] pb-3">
              <span className="text-sm font-semibold text-[var(--text-primary)]">
                Mais Opções
              </span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="h-7 w-7 rounded-full flex items-center justify-center text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--card)]/40 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {OVERFLOW_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-xl border border-[var(--line)] bg-[var(--card)]/80 transition-colors",
                      isActive
                        ? "border-[var(--lit)] text-[var(--lit)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--card)]"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0 text-[var(--brand)]" />
                    <span className="text-xs font-medium truncate">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[var(--glass-line)] flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-[var(--brand)] text-white flex items-center justify-center text-xs font-semibold">
                MC
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--text-primary)] truncate">Marcelo Costa</p>
                <p className="text-[10px] text-[var(--text-tertiary)] truncate">Coordenador</p>
              </div>
            </div>
          </GlassSurface>
        </>
      )}
    </>
  );
}
