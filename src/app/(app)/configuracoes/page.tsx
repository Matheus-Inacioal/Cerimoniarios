"use client";

import { Church, Users, BookOpen, ClipboardList, ChevronRight, Palette, Globe, Bell, Shield, Database } from "lucide-react";
import { Card, CelebracaoTitulo } from "@/components/ui/primitives";
import { Badge } from "@/components/ui/badge";

const secoes = [
  { titulo: "Paróquia", descricao: "Dados da paróquia, brasão, cor de marca e fuso horário", icon: Church, badge: null },
  { titulo: "Comunidades", descricao: "Matriz, capelas e locais de celebração", icon: Globe, badge: "2" },
  { titulo: "Funções litúrgicas", descricao: "Principal, Palavra, Credência e funções personalizadas", icon: Users, badge: "3" },
  { titulo: "Tipos de celebração", descricao: "Missa dominical, solenidade, sacramento e perfis de equipe", icon: BookOpen, badge: null },
  { titulo: "Checklists", descricao: "Templates de checklist por tipo de celebração", icon: ClipboardList, badge: null },
  { titulo: "Notificações", descricao: "Canais, horários e preferências de envio", icon: Bell, badge: null },
  { titulo: "Aparência", descricao: "Tema escuro, fonte e acessibilidade", icon: Palette, badge: null },
  { titulo: "Segurança", descricao: "Papéis, permissões e log de auditoria", icon: Shield, badge: null },
  { titulo: "Dados e exportação", descricao: "Backup, exportação CSV/PDF e LGPD", icon: Database, badge: null },
];

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <CelebracaoTitulo className="text-2xl">Configurações</CelebracaoTitulo>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Personalize o funcionamento do Cerimonial360 para sua paróquia
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
        {secoes.map((secao) => {
          const Icon = secao.icon;
          return (
            <Card key={secao.titulo} className="group">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-tint)] transition-transform group-hover:scale-105">
                  <Icon className="h-5 w-5 text-[var(--brand)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-medium text-[var(--text-primary)]">
                      {secao.titulo}
                    </h3>
                    {secao.badge && (
                      <Badge variant="secondary" className="text-[10px]">{secao.badge}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                    {secao.descricao}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-[var(--text-tertiary)] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
