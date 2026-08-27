// ============================================================================
// Cerimonial360 — Testes do motor litúrgico
// Rode: npx vitest run src/lib/liturgico/liturgical-engine.test.ts
//
// Estes testes são o CONTRATO com a norma da CNBB. Se o romcal atualizar e
// quebrar algo, ou se alguém mexer no overlay, estes casos falham antes do build.
// ============================================================================

import { describe, it, expect } from "vitest";
import { gerarAnoLiturgico, _internal, DiaLiturgico } from "./liturgical-engine";

const dow = (iso: string) =>
  ["dom", "seg", "ter", "qua", "qui", "sex", "sab"][new Date(iso + "T12:00:00Z").getUTCDay()];

function acharPorId(cal: Record<string, DiaLiturgico>, id: string): { data: string } | null {
  for (const [data, dia] of Object.entries(cal))
    if (dia.celebracoes.some((c) => c.id === id)) return { data };
  return null;
}
const corDe = (cal: Record<string, DiaLiturgico>, data: string) => cal[data]?.cor ?? "—";

describe("Overlay CNBB — transferências (Decretos 2/1986 e 4/1986)", () => {
  it("Ascensão vai para domingo em 2026 (17/05), não fica na quinta (14/05)", async () => {
    const cal = await gerarAnoLiturgico(2026);
    const asc = acharPorId(cal, "ascension_of_the_lord");
    expect(asc?.data).toBe("2026-05-17");
    expect(dow(asc!.data)).toBe("dom");
  });

  it("Epifania vai para o 1º domingo de janeiro em 2026 (04/01)", async () => {
    const cal = await gerarAnoLiturgico(2026);
    const epi = acharPorId(cal, "epiphany_of_the_lord");
    expect(dow(epi!.data)).toBe("dom");
    expect(epi?.data).toBe("2026-01-04");
  });

  it("Corpus Christi PERMANECE na quinta no Brasil (04/06/2026)", async () => {
    const cal = await gerarAnoLiturgico(2026);
    const cc = acharPorId(cal, "most_holy_body_and_blood_of_christ");
    expect(dow(cc!.data)).toBe("qui");
  });

  it("Assunção cai em domingo (mais próximo de 15/08)", async () => {
    const cal = await gerarAnoLiturgico(2026);
    const as = acharPorId(cal, "assumption_of_the_blessed_virgin_mary");
    expect(dow(as!.data)).toBe("dom");
  });

  it("Pedro e Paulo no domingo mais próximo de 29/06 — 28/06 em 2026, não 05/07", async () => {
    const cal = await gerarAnoLiturgico(2026);
    const pp = acharPorId(cal, "peter_and_paul_apostles");
    expect(pp?.data).toBe("2026-06-28");
    expect(dow(pp!.data)).toBe("dom");
  });

  it("Todos os Santos no domingo mais próximo de 01/11", async () => {
    const cal = await gerarAnoLiturgico(2026);
    const ts = acharPorId(cal, "all_saints");
    expect(dow(ts!.data)).toBe("dom");
  });
});

describe("Cor litúrgica ambiente", () => {
  it("Sexta-feira Santa é vermelha (03/04/2026)", async () => {
    const cal = await gerarAnoLiturgico(2026);
    expect(corDe(cal, "2026-04-03")).toBe("vermelho");
  });
  it("1º Domingo do Advento é roxo (29/11/2026)", async () => {
    const cal = await gerarAnoLiturgico(2026);
    expect(corDe(cal, "2026-11-29")).toBe("roxo");
  });
  it("Domingo do Tempo Comum é verde", async () => {
    const cal = await gerarAnoLiturgico(2026);
    expect(corDe(cal, "2026-07-19")).toBe("verde");
  });
  it("Aparecida é solenidade branca em 12/10", async () => {
    const cal = await gerarAnoLiturgico(2026);
    expect(corDe(cal, "2026-10-12")).toBe("branco");
    const ap = acharPorId(cal, "our_lady_of_aparecida");
    expect(ap?.data).toBe("2026-10-12");
  });
});

describe("Robustez multi-ano (2025–2030)", () => {
  const domingoMaisProximo = _internal.domingoMaisProximo;
  for (const ano of [2025, 2026, 2027, 2028, 2029, 2030]) {
    it(`${ano}: Ascensão, Pedro e Paulo e Todos os Santos em domingo`, async () => {
      const cal = await gerarAnoLiturgico(ano);
      for (const id of ["ascension_of_the_lord", "peter_and_paul_apostles", "all_saints"]) {
        const hit = acharPorId(cal, id);
        expect(hit, `${id} ausente em ${ano}`).not.toBeNull();
        expect(dow(hit!.data), `${id} em ${ano} não é domingo`).toBe("dom");
      }
      // Pedro e Paulo especificamente no domingo mais próximo de 29/06
      const pp = acharPorId(cal, "peter_and_paul_apostles");
      expect(pp?.data).toBe(domingoMaisProximo(`${ano}-06-29`));
    });
  }
});

describe("Utilitários de data", () => {
  it("domingoMaisProximo puxa p/ trás até quarta, empurra da quinta em diante", () => {
    // 29/06/2026 é segunda → domingo mais próximo é 28/06 (anterior)
    expect(_internal.domingoMaisProximo("2026-06-29")).toBe("2026-06-28");
  });
  it("domingoSeguinte sempre avança", () => {
    expect(dow(_internal.domingoSeguinte("2026-05-14"))).toBe("dom");
  });
});
