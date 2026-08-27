import { type CorLiturgica } from "@/types/enums";

/**
 * Configuração visual das cores litúrgicas para uso no design system.
 * Cada cor tem variantes para fundos, textos e bordas em tema claro e escuro.
 */
export const coresLiturgicasDesign: Record<
  CorLiturgica,
  {
    bg: string;
    bgSubtle: string;
    text: string;
    border: string;
    dot: string;
  }
> = {
  BRANCO: {
    bg: "bg-[#F8F8F5]",
    bgSubtle: "bg-[#F8F8F5]/20",
    text: "text-stone-800",
    border: "border-stone-300",
    dot: "bg-[#F8F8F5] ring-1 ring-stone-300",
  },
  VERMELHO: {
    bg: "bg-[#B3261E]",
    bgSubtle: "bg-[#B3261E]/10",
    text: "text-[#B3261E]",
    border: "border-[#B3261E]/30",
    dot: "bg-[#B3261E]",
  },
  VERDE: {
    bg: "bg-[#2E6B4F]",
    bgSubtle: "bg-[#2E6B4F]/10",
    text: "text-[#2E6B4F]",
    border: "border-[#2E6B4F]/30",
    dot: "bg-[#2E6B4F]",
  },
  ROXO: {
    bg: "bg-[#5B3E8E]",
    bgSubtle: "bg-[#5B3E8E]/10",
    text: "text-[#5B3E8E]",
    border: "border-[#5B3E8E]/30",
    dot: "bg-[#5B3E8E]",
  },
  ROSA: {
    bg: "bg-[#D98BA5]",
    bgSubtle: "bg-[#D98BA5]/10",
    text: "text-[#D98BA5]",
    border: "border-[#D98BA5]/30",
    dot: "bg-[#D98BA5]",
  },
  DOURADO: {
    bg: "bg-[#B8912F]",
    bgSubtle: "bg-[#B8912F]/10",
    text: "text-[#B8912F]",
    border: "border-[#B8912F]/30",
    dot: "bg-[#B8912F]",
  },
  PRETO: {
    bg: "bg-[#1A1A1A]",
    bgSubtle: "bg-[#1A1A1A]/10",
    text: "text-[#1A1A1A]",
    border: "border-[#1A1A1A]/30",
    dot: "bg-[#1A1A1A]",
  },
};
