"use client";

import { Plus, Pin, AlertCircle, Info, ChevronRight, Eye } from "lucide-react";
import { Card, CardStack, CelebracaoTitulo } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const avisosMock = [
  {
    id: "1",
    titulo: "Ensaio para a Vigília de Assunção",
    corpo: "Teremos ensaio no sábado dia 09/08 às 15h na sacristia da Matriz. Presença obrigatória para todos os cerimonialistas escalados.",
    autor: "Marcelo Costa",
    iniciais: "MC",
    data: "21/07/2026",
    prioridade: "IMPORTANTE" as const,
    fixado: true,
    exigeConfirmacao: true,
    lidos: 18,
    total: 25,
  },
  {
    id: "2",
    titulo: "Nova escala de agosto publicada",
    corpo: "A escala de agosto já está disponível. Confirme sua presença até o dia 28/07.",
    autor: "Marcelo Costa",
    iniciais: "MC",
    data: "20/07/2026",
    prioridade: "INFORMATIVO" as const,
    fixado: false,
    exigeConfirmacao: false,
    lidos: 22,
    total: 25,
  },
  {
    id: "3",
    titulo: "Mudança no horário da missa de quarta",
    corpo: "A missa de quarta-feira desta semana (23/07) será às 19h30 ao invés de 19h, por conta de compromisso do celebrante.",
    autor: "Pe. Antônio",
    iniciais: "PA",
    data: "19/07/2026",
    prioridade: "URGENTE" as const,
    fixado: true,
    exigeConfirmacao: true,
    lidos: 25,
    total: 25,
  },
];

const prioridadeConfig = {
  INFORMATIVO: { label: "Informativo", variant: "info" as const, icon: Info },
  IMPORTANTE: { label: "Importante", variant: "warning" as const, icon: AlertCircle },
  URGENTE: { label: "Urgente", variant: "error" as const, icon: AlertCircle },
};

export default function AvisosPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <CelebracaoTitulo className="text-2xl">Avisos</CelebracaoTitulo>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Mural de comunicação da equipe
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Novo aviso
        </Button>
      </div>

      <CardStack className="stagger">
        {avisosMock.map((aviso) => {
          const config = prioridadeConfig[aviso.prioridade];
          const Icon = config.icon;
          const percentLido = Math.round((aviso.lidos / aviso.total) * 100);

          return (
            <Card key={aviso.id} className="group">
              <div className="flex gap-4">
                <Avatar className="h-10 w-10 shrink-0 ring-0 shadow-sm">
                  <AvatarFallback className="text-xs bg-[var(--brand)] text-white">
                    {aviso.iniciais}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 flex-wrap">
                    {aviso.fixado && (
                      <Pin className="h-3.5 w-3.5 text-[var(--brand)] shrink-0 mt-0.5" />
                    )}
                    <h3 className="font-display text-base font-medium text-[var(--text-primary)]">
                      {aviso.titulo}
                    </h3>
                    <Badge variant={config.variant} className="text-[10px] shrink-0">
                      <Icon className="h-3 w-3" />
                      {config.label}
                    </Badge>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                    {aviso.corpo}
                  </p>

                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-xs text-[var(--text-tertiary)]">
                      {aviso.autor} · {aviso.data}
                    </span>

                    {aviso.exigeConfirmacao && (
                      <div className="flex items-center gap-1.5 ml-auto">
                        <Eye className="h-3 w-3 text-[var(--text-tertiary)]" />
                        <span className="text-xs text-[var(--text-secondary)]">
                          {aviso.lidos}/{aviso.total}
                        </span>
                        <div className="w-14 h-1.5 rounded-full bg-[var(--line)]">
                          <div
                            className="h-full rounded-full bg-[var(--success)] transition-all"
                            style={{ width: `${percentLido}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </div>
            </Card>
          );
        })}
      </CardStack>
    </div>
  );
}
