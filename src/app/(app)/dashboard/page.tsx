"use client";

import {
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  ChevronRight,
  Church,
  Bell,
  ClipboardList,
} from "lucide-react";
import {
  Card,
  CardStack,
  SectionLabel,
  CelebracaoTitulo,
  MetricCard,
} from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CorLiturgicaBadge, type CorLiturgicaKey } from "@/components/liturgical/cor-liturgica-badge";

const pendenciaUrgente = {
  id: "p0",
  titulo: "Missa dominical",
  data: "Dom, 27 jul",
  horario: "08:00",
  comunidade: "Matriz",
  funcaoEscalada: "Principal (Coordenação)",
  cor: "verde" as CorLiturgicaKey,
};

const proximasCelebracoes = [
  {
    id: "1",
    titulo: "Missa dominical",
    data: "Dom, 27 jul",
    horario: "08:00",
    comunidade: "Matriz",
    cor: "verde" as CorLiturgicaKey,
    status: "3/5 confirmados",
    statusVariant: "warning" as const,
    pendente: true,
  },
  {
    id: "2",
    titulo: "Missa dominical",
    data: "Dom, 27 jul",
    horario: "19:00",
    comunidade: "Matriz",
    cor: "verde" as CorLiturgicaKey,
    status: "5/5 confirmados",
    statusVariant: "success" as const,
    pendente: false,
  },
  {
    id: "3",
    titulo: "São Tiago Apóstolo",
    data: "Sex, 25 jul",
    horario: "19:30",
    comunidade: "Capela São José",
    cor: "vermelho" as CorLiturgicaKey,
    status: "2/4 confirmados",
    statusVariant: "warning" as const,
    pendente: false,
  },
  {
    id: "4",
    titulo: "Missa dominical",
    data: "Dom, 03 ago",
    horario: "08:00",
    comunidade: "Matriz",
    cor: "verde" as CorLiturgicaKey,
    status: "Escala não publicada",
    statusVariant: "error" as const,
    pendente: false,
  },
];

const pendenciasAtencao = [
  {
    id: "1",
    texto: "Rafael não confirmou presença para domingo 08h",
    detalhe: "Talvez valha um contato",
    tempo: "Há 2 dias",
    urgencia: "alta",
  },
  {
    id: "2",
    texto: "Juliana solicita substituição em 27/07 19h",
    detalhe: "Função: Credência",
    tempo: "Há 4 horas",
    urgencia: "media",
  },
  {
    id: "3",
    texto: "3 servidores não leram o aviso sobre o ensaio",
    detalhe: "Ensaio da Vigília de Assunção",
    tempo: "Há 1 dia",
    urgencia: "baixa",
  },
];

const estatisticasRapidas = [
  { label: "Celebrações este mês", valor: "18", icon: <Calendar />, variacao: "+2" },
  { label: "Servidores ativos", valor: "31", icon: <Users />, variacao: "+3" },
  { label: "Taxa de confirmação", valor: "87%", icon: <CheckCircle2 />, variacao: "+5%" },
  { label: "Escalas publicadas", valor: "2/3", icon: <ClipboardList /> },
];

export default function DashboardPage() {
  return (
    <div className="space-y-4 lg:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-medium text-[var(--text-primary)] tracking-tight font-display">
          Bom dia, Marcelo
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1 flex items-center gap-2">
          Tempo Comum · Semana 17 ·{" "}
          <CorLiturgicaBadge cor="verde" size="sm" />
        </p>
      </div>

      {/* Metric Cards via primitivo MetricCard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {estatisticasRapidas.map((stat) => (
          <MetricCard
            key={stat.label}
            icon={stat.icon}
            valor={stat.valor}
            label={stat.label}
            variacao={stat.variacao}
          />
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 lg:space-y-6">
          {/* Card Pendente com barra de acento via primitivo <Card pendente> */}
          <Card pendente>
            <SectionLabel>PRECISA DA SUA RESPOSTA</SectionLabel>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <CelebracaoTitulo>{pendenciaUrgente.titulo}</CelebracaoTitulo>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)] font-medium">
                    <Calendar className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
                    {pendenciaUrgente.data}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)] font-medium">
                    <Clock className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
                    {pendenciaUrgente.horario}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                    <Church className="h-3.5 w-3.5" />
                    {pendenciaUrgente.comunidade}
                  </span>
                </div>
                <p className="text-xs text-[var(--brand)] font-medium mt-2">
                  Função escalada: {pendenciaUrgente.funcaoEscalada}
                </p>
              </div>
              <CorLiturgicaBadge cor={pendenciaUrgente.cor} />
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[var(--line)]">
              <Button size="sm" variant="default">
                Vou servir
              </Button>
              <Button size="sm" variant="outline">
                Não posso
              </Button>
              <Button size="sm" variant="ghost" className="text-xs text-[var(--text-secondary)]">
                Solicitar substituição
              </Button>
            </div>
          </Card>

          {/* Próximas Celebrações */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <SectionLabel className="mb-0">PRÓXIMAS CELEBRAÇÕES</SectionLabel>
              <Button variant="ghost" size="sm" className="text-xs text-[var(--brand)] p-0 h-auto font-medium">
                Ver todas
                <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
              </Button>
            </div>

            <CardStack className="stagger">
              {proximasCelebracoes.map((cel) => (
                <div
                  key={cel.id}
                  className="group flex items-center gap-4 rounded-[12px] border border-[var(--line)] p-3.5 transition-all cursor-pointer hover:border-[var(--brand)]"
                >
                  <CorLiturgicaBadge cor={cel.cor} comRotulo={false} size="sm" className="shrink-0" />

                  <div className="flex-1 min-w-0">
                    <p className="font-display text-[17px] font-medium text-[var(--text-primary)] truncate">
                      {cel.titulo}
                    </p>
                    <div className="flex items-center gap-3 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <Calendar className="h-3 w-3 text-[var(--text-tertiary)]" />
                        {cel.data}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <Clock className="h-3 w-3 text-[var(--text-tertiary)]" />
                        {cel.horario}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
                        <Church className="h-3 w-3" />
                        {cel.comunidade}
                      </span>
                    </div>
                  </div>

                  <Badge variant={cel.statusVariant} className="shrink-0 hidden sm:inline-flex">
                    {cel.status}
                  </Badge>

                  <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </CardStack>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-4 lg:space-y-6">
          {/* Atenção */}
          <Card>
            <SectionLabel>ATENÇÃO</SectionLabel>
            <CardStack className="stagger">
              {pendenciasAtencao.map((p) => (
                <div
                  key={p.id}
                  className="group flex gap-3 rounded-[12px] border border-[var(--line)] p-3 transition-all hover:border-[var(--brand)] cursor-pointer"
                >
                  <div className="shrink-0 mt-0.5">
                    {p.urgencia === "alta" ? (
                      <AlertTriangle className="h-4 w-4 text-[var(--danger)]" />
                    ) : p.urgencia === "media" ? (
                      <Clock className="h-4 w-4 text-[var(--warning)]" />
                    ) : (
                      <Bell className="h-4 w-4 text-[var(--info)]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--text-primary)] leading-snug">
                      {p.texto}
                    </p>
                    <p className="text-[10.5px] text-[var(--text-tertiary)] mt-0.5">
                      {p.detalhe} · {p.tempo}
                    </p>
                  </div>
                </div>
              ))}
            </CardStack>

            <Button variant="outline" size="sm" className="w-full mt-4 text-xs font-medium">
              Ver todas as pendências
            </Button>
          </Card>

          {/* CTA Card Sólido */}
          <Card>
            <SectionLabel>PRÓXIMO MÊS</SectionLabel>
            <CelebracaoTitulo className="text-lg">Escala de agosto</CelebracaoTitulo>
            <p className="text-xs text-[var(--text-secondary)] mt-1 leading-relaxed">
              Comece a montar a escala do próximo mês com base na escala atual.
            </p>
            <Button variant="default" size="sm" className="mt-4">
              Criar escala
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
