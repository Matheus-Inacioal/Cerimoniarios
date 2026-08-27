"use client";

import * as React from "react";
import { fonteJSON, getCorLiturgicaVigente, type CorDoDia } from "@/lib/liturgico/liturgical-data";

/* =============================================================================
   LiturgicalProvider — injeta a cor litúrgica ATIVA nos tokens CSS.
   Em produção, a cor vem exclusivamente da query getCorLiturgicaVigente()
   respeitando o calendário litúrgico oficial da CNBB e Primeiras Vésperas.
   O seletor manual na topbar é exibido APENAS em modo de desenvolvimento.
   ============================================================================= */

export type CorLiturgicaKey =
  | "verde" | "roxo" | "vermelho" | "branco" | "dourado" | "rosa" | "preto" | "neutro";

const AMBIENTE: Record<CorLiturgicaKey, { h: number; s: number; lit: string }> = {
  verde:    { h: 155, s: 30, lit: "#2E6B4F" },
  roxo:     { h: 266, s: 32, lit: "#5B3E8E" },
  vermelho: { h: 4,   s: 44, lit: "#B3261E" },
  branco:   { h: 42,  s: 26, lit: "#9A7B2E" },
  dourado:  { h: 42,  s: 48, lit: "#96741F" },
  rosa:     { h: 340, s: 42, lit: "#BE5F7C" },
  preto:    { h: 266, s: 32, lit: "#5B3E8E" },
  neutro:   { h: 40,  s: 6,  lit: "#7A5C3E" },
};

interface LiturgicalContextType {
  cor: CorLiturgicaKey;
  setCor: (c: CorLiturgicaKey) => void;
  infoDia?: CorDoDia | null;
  carregando: boolean;
}

const Ctx = React.createContext<LiturgicalContextType>({
  cor: "verde",
  setCor: () => {},
  infoDia: null,
  carregando: false,
});

export function useLiturgicalColor() {
  return React.useContext(Ctx);
}

export function LiturgicalProvider({
  cor: corInicial,
  children,
}: {
  cor?: CorLiturgicaKey;
  children: React.ReactNode;
}) {
  const [ativa, setAtiva] = React.useState<CorLiturgicaKey>(corInicial ?? "verde");
  const [infoDia, setInfoDia] = React.useState<CorDoDia | null>(null);
  const [carregando, setCarregando] = React.useState<boolean>(true);

  React.useEffect(() => {
    let cancelado = false;
    async function carregarCorVigente() {
      try {
        const fonte = fonteJSON();
        const resultado = await getCorLiturgicaVigente(fonte, new Date());
        if (!cancelado && resultado) {
          setInfoDia(resultado);
          if (!corInicial) {
            setAtiva((resultado.cor as CorLiturgicaKey) ?? "verde");
          }
        }
      } catch (err) {
        console.warn("LiturgicalProvider: erro ao obter cor do calendário estático", err);
      } finally {
        if (!cancelado) setCarregando(false);
      }
    }

    carregarCorVigente();

    // Reavalia a cada 10 minutos (p/ virar no horário de corte das Primeiras Vésperas)
    const intervalId = setInterval(carregarCorVigente, 10 * 60 * 1000);
    return () => {
      cancelado = true;
      clearInterval(intervalId);
    };
  }, [corInicial]);

  const style = React.useMemo(() => {
    const a = AMBIENTE[ativa] ?? AMBIENTE.verde;
    return {
      "--amb-h": String(a.h),
      "--amb-s": `${a.s}%`,
      "--lit": a.lit,
    } as React.CSSProperties;
  }, [ativa]);

  return (
    <Ctx.Provider value={{ cor: ativa, setCor: setAtiva, infoDia, carregando }}>
      <div style={style} className="contents">
        {children}
      </div>
    </Ctx.Provider>
  );
}
