// ============================================================================
// Cerimonial360 — Próprio diocesano/paroquial + Primeiras Vésperas
//
// Camada aplicada DEPOIS do motor + overlay CNBB. Precedência local vence.
// O próprio de Brasília aqui é SEED de exemplo — em produção cada tenant carrega
// o seu (padroeiro, dedicação da igreja) a partir da tabela DiaProprio.
// ============================================================================

import type { CorLiturgica, DiaLiturgico, Grau } from "./liturgical-engine";

export interface DiaProprio {
  /** MM-DD para datas fixas anuais, ou YYYY-MM-DD para pontual */
  data: string;
  nome: string;
  grau: Grau;
  cor: CorLiturgica;
  /** true = solenidade/festa que vence o dia e muda a cor ambiente */
  venceDia: boolean;
  escopo: "DIOCESE" | "PAROQUIA";
}

// ---------------------------------------------------------------------------
// SEED — Arquidiocese de Brasília
// ATENÇÃO: valores litúrgicos devem ser conferidos contra o Ordo/Anuário da
// Arquidiocese antes do lançamento. A data da dedicação da Catedral diverge
// entre fontes (1967 x 1970) — CONFIRMAR no Ordo, não deixar chutada.
// ---------------------------------------------------------------------------
export const PROPRIO_BRASILIA: DiaProprio[] = [
  {
    // Padroeira principal do Brasil e da Arquidiocese — já é Solenidade nacional
    // (o motor + romcal já resolve como solenidade branca em 12/10). Mantido aqui
    // só para documentar; não precisa sobrescrever.
    data: "10-12", nome: "Nossa Senhora Aparecida",
    grau: "SOLENIDADE", cor: "branco", venceDia: true, escopo: "DIOCESE",
  },
  {
    // Co-padroeiro da Arquidiocese de Brasília
    data: "01-31", nome: "São João Bosco",
    grau: "FESTA", cor: "branco", venceDia: true, escopo: "DIOCESE",
  },
  {
    // Dedicação da Catedral Metropolitana — Festa em toda a diocese.
    // DATA A CONFIRMAR NO ORDO (placeholder abaixo). Não publicar sem conferência.
    data: "05-31", nome: "Dedicação da Catedral Metropolitana de Brasília",
    grau: "FESTA", cor: "branco", venceDia: true, escopo: "DIOCESE",
  },
];

/** Aplica o próprio sobre o calendário já gerado (motor + CNBB). */
export function aplicarProprio(
  calendario: Record<string, DiaLiturgico>,
  proprio: DiaProprio[],
  ano: number
): void {
  for (const p of proprio) {
    const data = p.data.length === 5 ? `${ano}-${p.data}` : p.data;
    const dia = calendario[data];
    if (!p.venceDia) continue;
    const entry = { id: `proprio_${p.nome}`, nome: p.nome, grau: p.grau, cor: p.cor };
    if (!dia) {
      calendario[data] = {
        data, cor: p.cor, corIndicador: p.cor, tempo: "", semana: null,
        titulo: p.nome, grau: p.grau, celebracoes: [entry],
      };
    } else {
      // precedência local vence: entra como principal (salvo se o dia já é
      // solenidade de precedência superior — regra fina, tratar no futuro)
      dia.celebracoes.unshift(entry);
      dia.cor = p.cor; dia.corIndicador = p.cor; dia.titulo = p.nome; dia.grau = p.grau;
    }
  }
}

// ---------------------------------------------------------------------------
// PRIMEIRAS VÉSPERAS
// O dia litúrgico de domingos e solenidades começa na tarde da véspera.
// Sábado 19h já é o domingo. Esta função decide qual "dia litúrgico" está
// vigente em um INSTANTE, não apenas em uma data de calendário.
// ---------------------------------------------------------------------------
export interface ConfigVesperas {
  /** hora de corte no sábado/véspera (24h). Padrão 16h. Configurável por paróquia. */
  horaCorte: number;
}

/**
 * Retorna a chave de data (YYYY-MM-DD) do dia litúrgico vigente NO INSTANTE dado.
 * Se for véspera de domingo/solenidade após a hora de corte, retorna o dia seguinte.
 */
export function dataLiturgicaVigente(
  instante: Date,
  calendario: Record<string, DiaLiturgico>,
  config: ConfigVesperas = { horaCorte: 16 }
): string {
  const hoje = instante.toISOString().slice(0, 10);
  const hora = instante.getHours();

  if (hora < config.horaCorte) return hoje;

  // olha o dia seguinte
  const amanha = new Date(instante);
  amanha.setDate(amanha.getDate() + 1);
  const amanhaKey = amanha.toISOString().slice(0, 10);
  const diaSeguinte = calendario[amanhaKey];
  if (!diaSeguinte) return hoje;

  // primeiras vésperas valem para DOMINGO e SOLENIDADE
  const temVesperas = diaSeguinte.grau === "DOMINGO" || diaSeguinte.grau === "SOLENIDADE";
  return temVesperas ? amanhaKey : hoje;
}
