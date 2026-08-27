"use client";

import {
  Calendar, Users, CheckCircle2, TrendingDown,
  BarChart3, PieChart,
} from "lucide-react";
import { Card, SectionLabel, CelebracaoTitulo, MetricCard } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";

const resumo = [
  { label: "Celebrações realizadas", valor: "52", icon: <Calendar />, variacao: "+8%" },
  { label: "Taxa de confirmação", valor: "87%", icon: <CheckCircle2 />, variacao: "+5%" },
  { label: "Servidores ativos", valor: "31", icon: <Users /> },
  { label: "Faltas (sem aviso)", valor: "4", icon: <TrendingDown /> },
];

const distribuicaoFuncao = [
  { funcao: "Principal", count: 45, percent: 30, color: "var(--brand)" },
  { funcao: "Palavra", count: 38, percent: 25, color: "var(--success)" },
  { funcao: "Credência", count: 67, percent: 45, color: "var(--warning)" },
];

const topServidores = [
  { nome: "Dona Cecília", celebracoes: 24, funcao: "Credência" },
  { nome: "Marcelo Costa", celebracoes: 18, funcao: "Principal" },
  { nome: "Juliana Oliveira", celebracoes: 15, funcao: "Principal" },
  { nome: "Beatriz Lima", celebracoes: 12, funcao: "Credência" },
  { nome: "Rafael Santos", celebracoes: 10, funcao: "Palavra" },
];

export default function EstatisticasPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <CelebracaoTitulo className="text-2xl">Estatísticas</CelebracaoTitulo>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Visão geral do cerimonial nos últimos 3 meses
          </p>
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm">Este mês</Button>
          <Button variant="secondary" size="sm">Trimestre</Button>
          <Button variant="outline" size="sm">Ano</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 stagger">
        {resumo.map((stat) => (
          <MetricCard
            key={stat.label}
            icon={stat.icon}
            valor={stat.valor}
            label={stat.label}
            variacao={stat.variacao}
          />
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
        <Card>
          <SectionLabel className="flex items-center gap-2">
            <PieChart className="h-4 w-4 text-[var(--brand)] inline" />
            DISTRIBUIÇÃO POR FUNÇÃO
          </SectionLabel>
          <div className="space-y-4">
            {distribuicaoFuncao.map((item) => (
              <div key={item.funcao}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-[var(--text-primary)]">{item.funcao}</span>
                  <span className="text-sm text-[var(--text-secondary)]">{item.count} ({item.percent}%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[var(--line)]">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${item.percent}%`, backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <SectionLabel className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[var(--brand)] inline" />
            MAIS ATIVOS NO TRIMESTRE
          </SectionLabel>
          <div className="space-y-2">
            {topServidores.map((s, i) => (
              <div key={s.nome} className="flex items-center gap-3 rounded-xl p-2.5 hover:bg-[var(--page)] transition-colors">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--line)] text-xs font-medium text-[var(--text-secondary)]">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{s.nome}</p>
                  <p className="text-[11px] text-[var(--text-tertiary)]">{s.funcao}</p>
                </div>
                <span className="text-sm font-medium text-[var(--brand)]">{s.celebracoes}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
