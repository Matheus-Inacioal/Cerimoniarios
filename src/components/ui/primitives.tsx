import { cn } from "@/lib/utils";
import * as React from "react";

/* =============================================================================
   Cerimonial360 — Primitivos canônicos de layout e superfície.
   Todo o acabamento visual (padding, radius, vidro, cor) mora AQUI.
   Telas montam a partir destes componentes e NUNCA reescrevem esses valores.
   ============================================================================= */


/* ---------------------------------------------------------------------------
   Card — superfície SÓLIDA de conteúdo. Sempre opaca. Nunca cor litúrgica.
   `pendente` adiciona a barra de acento litúrgica de 3px à esquerda (regra P1).
   --------------------------------------------------------------------------- */
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  pendente?: boolean;
  as?: React.ElementType;
}

export function Card({ pendente, as: Tag = "div", className, children, ...props }: CardProps) {
  return (
    <Tag
      className={cn(
        "bg-[var(--card)] border border-[var(--line)]",
        "shadow-[var(--card-shadow)]",
        "p-[var(--pad-card)]",
        pendente
          ? "border-l-[3px] border-l-[var(--lit)] rounded-r-[var(--radius-card)] rounded-l-none transition-[border-color] duration-[var(--dur-ambient)]"
          : "rounded-[var(--radius-card)]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}


/* ---------------------------------------------------------------------------
   CardStack — espaçamento vertical canônico entre cards.
   --------------------------------------------------------------------------- */
export function CardStack({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex flex-col gap-[var(--gap-card)]", className)} {...props} />;
}


/* ---------------------------------------------------------------------------
   GlassSurface — Liquid Glass. Para chrome flutuante que NÃO contém texto longo:
   topbar, tab bar, nav rail, FAB, bottom sheet, banners, overlays.
   A classe .glass-surface aciona a degradação automática do globals.css (P4).
   --------------------------------------------------------------------------- */
interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  /** raio: 'bar' (22px) padrão, ou 'card' (16px) */
  radius?: "bar" | "card";
}

export function GlassSurface({ as: Tag = "div", radius = "bar", className, children, ...props }: GlassSurfaceProps) {
  return (
    <Tag
      className={cn(
        "glass-surface",
        "bg-[var(--glass)] border border-[var(--glass-line)]",
        "shadow-[var(--glass-shadow),inset_0_1px_0_var(--spec)]",
        "backdrop-blur-[26px] [backdrop-filter:var(--glass-blur)] [-webkit-backdrop-filter:var(--glass-blur)]",
        "transition-[background] duration-[var(--dur-ambient)]",
        radius === "bar" ? "rounded-[var(--radius-bar)]" : "rounded-[var(--radius-card)]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}


/* ---------------------------------------------------------------------------
   SectionLabel — rótulo de seção. Único ritmo tipográfico de eyebrow no app.
   Ex.: "PRECISA DA SUA RESPOSTA", "ESTA SEMANA".
   --------------------------------------------------------------------------- */
export function SectionLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "block uppercase font-semibold text-[var(--text-tertiary)]",
        "text-[11px] tracking-[0.11em] mb-3",
        className
      )}
      {...props}
    />
  );
}


/* ---------------------------------------------------------------------------
   CelebracaoTitulo — título de celebração em Fraunces.
   --------------------------------------------------------------------------- */
export function CelebracaoTitulo({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("font-display text-[22px] text-[var(--text-primary)]", className)}
      {...props}
    />
  );
}


/* ---------------------------------------------------------------------------
   MetricCard — card de métrica do dashboard. Miolo compacto (ícone→número→label).
   --------------------------------------------------------------------------- */
interface MetricCardProps {
  icon: React.ReactNode;
  valor: React.ReactNode;
  label: string;
  variacao?: string;
  className?: string;
}

export function MetricCard({ icon, valor, label, variacao, className }: MetricCardProps) {
  return (
    <Card className={cn("relative", className)}>
      <div className="flex items-start justify-between">
        <span className="text-[var(--lit)] [&>svg]:h-5 [&>svg]:w-5">{icon}</span>
        {variacao && (
          <span className="text-[12px] font-medium text-[var(--success)]">{variacao}</span>
        )}
      </div>
      <div className="mt-3 text-[30px] font-semibold leading-none text-[var(--text-primary)]">
        {valor}
      </div>
      <div className="mt-1.5 text-[13px] text-[var(--text-secondary)]">{label}</div>
    </Card>
  );
}


/* ---------------------------------------------------------------------------
   AmbientField — o campo de cor litúrgica atrás de todo o app.
   Renderize UMA vez no layout raiz. O vidro por cima o deixa transparecer.
   --------------------------------------------------------------------------- */
export function AmbientField() {
  return <div className="ambient-field" aria-hidden="true" />;
}
