"use client";

import { Plus, FileDown, ChevronRight, ClipboardList } from "lucide-react";
import { Card, CardStack, CelebracaoTitulo } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const escalasMock = [
  {
    id: "1",
    titulo: "Julho/2026",
    periodo: "01 jul — 31 jul 2026",
    status: "PUBLICADA" as const,
    versao: 2,
    celebracoes: 12,
    slots: 48,
    preenchidos: 45,
  },
  {
    id: "2",
    titulo: "Agosto/2026",
    periodo: "01 ago — 31 ago 2026",
    status: "RASCUNHO" as const,
    versao: 1,
    celebracoes: 14,
    slots: 56,
    preenchidos: 20,
  },
  {
    id: "3",
    titulo: "Junho/2026",
    periodo: "01 jun — 30 jun 2026",
    status: "ARQUIVADA" as const,
    versao: 3,
    celebracoes: 13,
    slots: 52,
    preenchidos: 52,
  },
];

const statusConfig = {
  PUBLICADA: { label: "Publicada", variant: "success" as const },
  RASCUNHO: { label: "Rascunho", variant: "warning" as const },
  ARQUIVADA: { label: "Arquivada", variant: "secondary" as const },
};

export default function EscalasPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <CelebracaoTitulo className="text-2xl">Escalas</CelebracaoTitulo>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Gerencie as escalas mensais do cerimonial
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <FileDown className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button>
            <Plus className="h-4 w-4" />
            Nova escala
          </Button>
        </div>
      </div>

      <CardStack className="stagger">
        {escalasMock.map((escala) => {
          const config = statusConfig[escala.status];
          const percentual = Math.round((escala.preenchidos / escala.slots) * 100);

          return (
            <Card key={escala.id} className="group">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-tint)]">
                  <ClipboardList className="h-5 w-5 text-[var(--brand)]" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display text-base font-medium text-[var(--text-primary)]">
                      {escala.titulo}
                    </h3>
                    <Badge variant={config.variant}>{config.label}</Badge>
                    <Badge variant="secondary" className="hidden sm:inline-flex text-[10px]">
                      v{escala.versao}
                    </Badge>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                    {escala.periodo} · {escala.celebracoes} celebrações
                  </p>
                </div>

                <div className="hidden md:flex flex-col items-end gap-1.5 min-w-[140px]">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xs text-[var(--text-secondary)]">
                      {escala.preenchidos}/{escala.slots} slots
                    </span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">
                      {percentual}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-[var(--line)]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percentual}%`,
                        backgroundColor:
                          percentual === 100
                            ? "var(--success)"
                            : percentual >= 70
                              ? "var(--brand)"
                              : "var(--warning)",
                      }}
                    />
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          );
        })}
      </CardStack>
    </div>
  );
}
