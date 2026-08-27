// ============================================================================
// Cerimonial360 — Motor litúrgico (núcleo)
// romcal (Próprio do Tempo, cores, graus, pt-BR) + overlay CNBB (transferências)
//
// Testado contra as normas: Ascensão, Epifania, Assunção, Pedro e Paulo e
// Todos os Santos transferidos ao domingo; Corpus Christi permanece na quinta.
// Ver liturgical-engine.test.ts.
//
// NÃO é chamado em runtime a cada request. É executado UMA vez (build/seed) para
// gerar o dataset de N anos. Ver generate-liturgical-data.ts.
// ============================================================================

import { Romcal } from "romcal";
import { Brazil_PtBr } from "@romcal/calendar.brazil";

export type CorLiturgica =
  | "verde" | "roxo" | "vermelho" | "branco" | "dourado" | "rosa" | "preto";

export type Grau =
  | "SOLENIDADE" | "FESTA" | "MEMORIA" | "MEMORIA_FACULTATIVA" | "FERIA" | "DOMINGO";

export interface DiaLiturgico {
  data: string;            // YYYY-MM-DD
  cor: CorLiturgica;       // cor AMBIENTE do dia (celebração de maior precedência)
  corIndicador: CorLiturgica; // idem — usado no badge/ponto
  tempo: string;           // ex.: "Tempo Comum"
  semana: number | null;
  titulo: string;          // nome da celebração principal
  grau: Grau;
  celebracoes: Array<{ id: string; nome: string; grau: Grau; cor: CorLiturgica }>;
  transferidaCNBB?: boolean;
}

const COLOR_MAP: Record<string, CorLiturgica> = {
  GREEN: "verde", WHITE: "branco", RED: "vermelho",
  VIOLET: "roxo", PURPLE: "roxo", ROSE: "rosa", GOLD: "dourado", BLACK: "preto",
};

const RANK_MAP: Record<string, Grau> = {
  SOLEMNITY: "SOLENIDADE", FEAST: "FESTA", MEMORIAL: "MEMORIA",
  OPTIONAL_MEMORIAL: "MEMORIA_FACULTATIVA", WEEKDAY: "FERIA", SUNDAY: "DOMINGO",
};

// ---------------------------------------------------------------------------
// Utilitários de data (UTC, sem dependência de timezone local)
// ---------------------------------------------------------------------------
function dow(iso: string): number {
  return new Date(iso + "T12:00:00Z").getUTCDay();
}
/** Domingo mais próximo de uma data (regra CNBB p/ Assunção, Pedro e Paulo, Todos os Santos). */
function domingoMaisProximo(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  const w = d.getUTCDay();
  const shift = w === 0 ? 0 : w <= 3 ? -w : 7 - w; // até quarta puxa p/ trás; quinta+ empurra p/ frente
  d.setUTCDate(d.getUTCDate() + shift);
  return d.toISOString().slice(0, 10);
}
/** Domingo seguinte a uma data (regra p/ Ascensão = 7º Domingo da Páscoa). */
function domingoSeguinte(iso: string): string {
  const d = new Date(iso + "T12:00:00Z");
  const w = d.getUTCDay();
  d.setUTCDate(d.getUTCDate() + (w === 0 ? 7 : 7 - w));
  return d.toISOString().slice(0, 10);
}
/** 1º domingo de janeiro (regra p/ Epifania no Brasil). */
function primeiroDomingoJaneiro(ano: number): string {
  for (let dia = 1; dia <= 7; dia++) {
    const d = new Date(Date.UTC(ano, 0, dia));
    if (d.getUTCDay() === 0) return d.toISOString().slice(0, 10);
  }
  return `${ano}-01-07`;
}

// ---------------------------------------------------------------------------
// Overlay CNBB — Decretos nº 2/1986 e nº 4/1986
// Reposiciona as festas transferidas SEMPRE pela norma, ignorando onde o romcal
// as colocou (o romcal aplica algumas transferências, mas nem sempre pela regra
// do "domingo mais próximo" — ex.: Pedro e Paulo em anos como 2026/2027).
// ---------------------------------------------------------------------------
interface Transferencia { id: string; alvo: (ano: number, dataOriginalRomcal: string) => string; }

const TRANSFERENCIAS_CNBB: Transferencia[] = [
  { id: "epiphany_of_the_lord",                      alvo: (ano) => primeiroDomingoJaneiro(ano) },
  { id: "ascension_of_the_lord",                     alvo: (_a, orig) => domingoSeguinte(orig) },
  { id: "assumption_of_the_blessed_virgin_mary",     alvo: (ano) => domingoMaisProximo(`${ano}-08-15`) },
  { id: "peter_and_paul_apostles",                   alvo: (ano) => domingoMaisProximo(`${ano}-06-29`) },
  { id: "all_saints",                                alvo: (ano) => domingoMaisProximo(`${ano}-11-01`) },
  // Corpus Christi: NO BRASIL permanece na quinta-feira. Intencionalmente ausente.
];

// ---------------------------------------------------------------------------
// Geração de um ano
// ---------------------------------------------------------------------------
interface RomcalItem {
  id: string;
  name?: string;
  date?: string;
  colors?: string[];
  seasonNames?: string[];
  rank?: string;
  calendar?: {
    weekOfSeason?: number;
  };
}

export async function gerarAnoLiturgico(ano: number): Promise<Record<string, DiaLiturgico>> {
  const romcal = new Romcal({ localizedCalendar: Brazil_PtBr });
  const cal = await romcal.generateCalendar(ano);

  // Indexa todas as celebrações por id (para localizar as que serão movidas)
  const porId: Record<string, RomcalItem> = {};
  for (const celebs of Object.values(cal)) for (const c of celebs as unknown as RomcalItem[]) porId[c.id] = c;

  // Monta o mapa por data (romcal já ordena por precedência; [0] é a principal)
  const porData: Record<string, DiaLiturgico> = {};
  const toDia = (celebs: RomcalItem[], data: string): DiaLiturgico => {
    const principal = celebs[0];
    return {
      data,
      cor: COLOR_MAP[principal.colors?.[0] ?? ""] ?? "verde",
      corIndicador: COLOR_MAP[principal.colors?.[0] ?? ""] ?? "verde",
      tempo: principal.seasonNames?.[0] ?? "",
      semana: principal.calendar?.weekOfSeason ?? null,
      titulo: principal.name ?? "",
      grau: RANK_MAP[principal.rank ?? ""] ?? "FERIA",
      celebracoes: celebs.map((c) => ({
        id: c.id, nome: c.name ?? "", grau: RANK_MAP[c.rank ?? ""] ?? "FERIA",
        cor: COLOR_MAP[c.colors?.[0] ?? ""] ?? "verde",
      })),
    };
  };
  for (const [data, celebs] of Object.entries(cal)) porData[data] = toDia(celebs as unknown as RomcalItem[], data);

  // Aplica o overlay CNBB
  for (const t of TRANSFERENCIAS_CNBB) {
    const cel = porId[t.id];
    if (!cel || !cel.date) continue;
    const origem: string = cel.date;
    const destino = t.alvo(ano, origem);
    if (destino === origem) continue;

    // remove da origem
    if (porData[origem]) {
      porData[origem].celebracoes = porData[origem].celebracoes.filter((c) => c.id !== t.id);
      // se a origem ficou sem a principal, rebaixa para a próxima (ou vira féria/tempo)
      if (porData[origem].celebracoes.length) {
        porData[origem] = { ...porData[origem], ...refazPrincipal(porData[origem]) };
      }
    }
    // injeta no destino como principal
    const nova = {
      id: cel.id, nome: cel.name ?? "", grau: RANK_MAP[cel.rank ?? ""] ?? "SOLENIDADE",
      cor: COLOR_MAP[cel.colors?.[0] ?? ""] ?? "branco",
    };
    if (!porData[destino]) {
      porData[destino] = {
        data: destino, cor: nova.cor, corIndicador: nova.cor, tempo: "", semana: null,
        titulo: nova.nome, grau: nova.grau, celebracoes: [nova], transferidaCNBB: true,
      };
    } else {
      porData[destino].celebracoes.unshift(nova);
      porData[destino] = {
        ...porData[destino],
        cor: nova.cor, corIndicador: nova.cor, titulo: nova.nome, grau: nova.grau,
        transferidaCNBB: true,
      };
    }
  }

  return porData;
}

function refazPrincipal(dia: DiaLiturgico): Partial<DiaLiturgico> {
  const p = dia.celebracoes[0];
  if (!p) return {};
  return { cor: p.cor, corIndicador: p.cor, titulo: p.nome, grau: p.grau };
}

export const _internal = { domingoMaisProximo, domingoSeguinte, primeiroDomingoJaneiro, dow };
