"use client";

import { cn } from "@/lib/utils";
import { useLiturgicalColor, type CorLiturgicaKey } from "@/components/liturgical-provider";

/**
 * CorLiturgicaBadge — displays a liturgical color indicator.
 * 
 * Rules from spec:
 * - display: inline-flex; align-items: center; gap: 6px
 * - padding: 4px 10px; border-radius: 999px
 * - background: rgba(127,127,127,.13)
 * - text: font-size: 11.5px; font-weight: 500
 * - color dot: 13px. Uses var(--lit) when matching active liturgical color or specific hex if explicit.
 * - Branco: cream disc (#FAF7EF) with ring-1 ring-[#D4C9A8].
 * - P5: Always has a text label alongside the color dot.
 */

const corConfig: Record<CorLiturgicaKey, { hex: string; label: string }> = {
  verde:    { hex: "#2E6B4F", label: "Verde" },
  roxo:     { hex: "#5B3E8E", label: "Roxo" },
  vermelho: { hex: "#B3261E", label: "Vermelho" },
  branco:   { hex: "#FAF7EF", label: "Branco" },
  dourado:  { hex: "#96741F", label: "Dourado" },
  rosa:     { hex: "#BE5F7C", label: "Rosa" },
  preto:    { hex: "#1A1A1A", label: "Preto" },
  neutro:   { hex: "#7A5C3E", label: "Neutro" },
};

interface CorLiturgicaBadgeProps {
  cor: CorLiturgicaKey;
  /** Always show text label (default: true, per P5) */
  comRotulo?: boolean;
  className?: string;
  size?: "sm" | "md";
}

export function CorLiturgicaBadge({
  cor,
  comRotulo = true,
  className,
  size = "md",
}: CorLiturgicaBadgeProps) {
  const { cor: activeCor } = useLiturgicalColor();
  const config = corConfig[cor] || corConfig.verde;
  const isWhite = cor === "branco";
  const isActiveColor = cor === activeCor;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] rounded-full font-medium transition-colors select-none",
        "bg-[rgba(127,127,127,0.13)] text-[var(--text-primary)]",
        size === "sm"
          ? "text-[10.5px] px-2 py-0.5"
          : "text-[11.5px] px-[10px] py-[4px]",
        className
      )}
    >
      <span
        className={cn(
          "rounded-full shrink-0",
          size === "sm" ? "h-[10px] w-[10px]" : "h-[13px] w-[13px]",
          isWhite && "ring-1 ring-[#D4C9A8]"
        )}
        style={{
          backgroundColor: isWhite
            ? "#FAF7EF"
            : isActiveColor
              ? "var(--lit)"
              : config.hex,
        }}
      />
      {comRotulo && config.label}
    </span>
  );
}

export { corConfig };
export type { CorLiturgicaKey };
