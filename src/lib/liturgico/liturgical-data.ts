// ============================================================================
// Cerimonial360 — Geração do dataset + Query de consumo
//
// SEM BANCO (agora): gera public/liturgical/{ano}.json e o provider lê estático.
// COM BANCO (depois): o MESMO gerador popula a tabela dia_liturgico. A query
// troca a fonte sem mudar quem a consome.
// ============================================================================

import { gerarAnoLiturgico, type DiaLiturgico, type CorLiturgica } from "./liturgical-engine";
import { aplicarProprio, dataLiturgicaVigente, PROPRIO_BRASILIA, type DiaProprio, type ConfigVesperas } from "./proprio-brasilia";

// ---------------------------------------------------------------------------
// GERADOR — rode como script (build/seed). Ex.: tsx generate-liturgical-data.ts
// ---------------------------------------------------------------------------
export async function gerarDataset(
  anoInicial: number,
  quantidadeAnos: number,
  proprio: DiaProprio[] = PROPRIO_BRASILIA
): Promise<Record<string, Record<string, DiaLiturgico>>> {
  const out: Record<string, Record<string, DiaLiturgico>> = {};
  for (let i = 0; i < quantidadeAnos; i++) {
    const ano = anoInicial + i;
    const cal = await gerarAnoLiturgico(ano);
    aplicarProprio(cal, proprio, ano);
    out[String(ano)] = cal;
  }
  return out;
}

// ---------------------------------------------------------------------------
// FONTE DE DADOS — abstração trocável (JSON estático agora, DB depois)
// ---------------------------------------------------------------------------
export interface FonteLiturgica {
  getAno(ano: number): Promise<Record<string, DiaLiturgico> | null>;
}

/** Implementação atual: lê os JSON estáticos de /public/liturgical. */
export function fonteJSON(baseUrl = "/liturgical"): FonteLiturgica {
  const cache = new Map<number, Record<string, DiaLiturgico>>();
  return {
    async getAno(ano) {
      if (cache.has(ano)) return cache.get(ano)!;
      try {
        const res = await fetch(`${baseUrl}/${ano}.json`);
        if (!res.ok) return null;
        const data = (await res.json()) as Record<string, DiaLiturgico>;
        cache.set(ano, data);
        return data;
      } catch {
        return null;
      }
    },
  };
}

// ---------------------------------------------------------------------------
// QUERY — o que o LiturgicalProvider chama. Resolve a cor do INSTANTE,
// já respeitando primeiras vésperas.
// ---------------------------------------------------------------------------
export interface CorDoDia {
  data: string;
  cor: CorLiturgica;
  titulo: string;
  tempo: string;
  semana: number | null;
  transferidaCNBB?: boolean;
}

export async function getCorLiturgicaVigente(
  fonte: FonteLiturgica,
  instante: Date = new Date(),
  config?: ConfigVesperas
): Promise<CorDoDia> {
  const anoBase = await fonte.getAno(instante.getFullYear());
  // primeiras vésperas podem apontar para 1º de janeiro do ano seguinte
  const proximo = await fonte.getAno(instante.getFullYear() + 1);
  const merged = { ...(anoBase ?? {}), ...(proximo ?? {}) };

  const fallback: CorDoDia = {
    data: instante.toISOString().slice(0, 10),
    cor: "verde", titulo: "", tempo: "Tempo Comum", semana: null,
  };
  if (!Object.keys(merged).length) return fallback;

  const dataVigente = dataLiturgicaVigente(instante, merged, config);
  const dia = merged[dataVigente];
  if (!dia) return fallback;

  return {
    data: dia.data, cor: dia.cor, titulo: dia.titulo,
    tempo: dia.tempo, semana: dia.semana, transferidaCNBB: dia.transferidaCNBB,
  };
}

/** Versão para uma data específica (ex.: pintar o calendário mensal). */
export async function getCorLiturgicaData(
  fonte: FonteLiturgica,
  data: string
): Promise<CorDoDia | null> {
  const ano = Number(data.slice(0, 4));
  const cal = await fonte.getAno(ano);
  const dia = cal?.[data];
  if (!dia) return null;
  return { data: dia.data, cor: dia.cor, titulo: dia.titulo, tempo: dia.tempo, semana: dia.semana, transferidaCNBB: dia.transferidaCNBB };
}
