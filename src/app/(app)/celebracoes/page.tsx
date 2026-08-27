"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Card, SectionLabel, CelebracaoTitulo } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { CorLiturgicaBadge, type CorLiturgicaKey } from "@/components/liturgical/cor-liturgica-badge";
import { fonteJSON, getCorLiturgicaData, type CorDoDia } from "@/lib/liturgico/liturgical-data";

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const nomesMeses = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const celebracoesMock: Record<string, { titulo: string; horario: string; cor: CorLiturgicaKey }[]> = {
  "2026-07-25": [{ titulo: "São Tiago Apóstolo", horario: "19:30", cor: "vermelho" }],
  "2026-07-27": [
    { titulo: "Missa dominical", horario: "08:00", cor: "verde" },
    { titulo: "Missa dominical", horario: "19:00", cor: "verde" },
  ],
};

function getDiasDoMes(ano: number, mes: number) {
  const primeiro = new Date(ano, mes, 1);
  const ultimo = new Date(ano, mes + 1, 0);
  const diasAntes = primeiro.getDay();
  const totalDias = ultimo.getDate();
  const dias: { dia: number; isoData: string; mesAtual: boolean }[] = [];

  const ultimoDiaAnterior = new Date(ano, mes, 0).getDate();
  for (let i = diasAntes - 1; i >= 0; i--) {
    const d = ultimoDiaAnterior - i;
    const m = mes === 0 ? 11 : mes - 1;
    const a = mes === 0 ? ano - 1 : ano;
    const isoData = `${a}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    dias.push({ dia: d, isoData, mesAtual: false });
  }

  for (let i = 1; i <= totalDias; i++) {
    const isoData = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    dias.push({ dia: i, isoData, mesAtual: true });
  }

  const restantes = 42 - dias.length;
  for (let i = 1; i <= restantes; i++) {
    const m = mes === 11 ? 0 : mes + 1;
    const a = mes === 11 ? ano + 1 : ano;
    const isoData = `${a}-${String(m + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    dias.push({ dia: i, isoData, mesAtual: false });
  }

  return dias;
}

export default function CelebracoesPage() {
  const [dataAtual, setDataAtual] = useState({ ano: 2026, mes: 6 });
  const [mapaLiturgico, setMapaLiturgico] = useState<Record<string, CorDoDia>>({});

  const dias = useMemo(() => getDiasDoMes(dataAtual.ano, dataAtual.mes), [dataAtual.ano, dataAtual.mes]);
  const hojeIso = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    let cancelado = false;
    async function carregarCoresMes() {
      const fonte = fonteJSON();
      const novoMapa: Record<string, CorDoDia> = {};
      
      for (const d of dias) {
        if (!d.mesAtual) continue;
        const res = await getCorLiturgicaData(fonte, d.isoData);
        if (res) novoMapa[d.isoData] = res;
      }

      if (!cancelado) {
        setMapaLiturgico(novoMapa);
      }
    }

    carregarCoresMes();
    return () => { cancelado = true; };
  }, [dias]);

  const mesAnterior = () => {
    setDataAtual((prev) =>
      prev.mes === 0 ? { ano: prev.ano - 1, mes: 11 } : { ano: prev.ano, mes: prev.mes - 1 }
    );
  };

  const proximoMes = () => {
    setDataAtual((prev) =>
      prev.mes === 11 ? { ano: prev.ano + 1, mes: 0 } : { ano: prev.ano, mes: prev.mes + 1 }
    );
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <CelebracaoTitulo className="text-2xl">Celebrações</CelebracaoTitulo>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Calendário litúrgico e celebrações da paróquia
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4" />
          Nova celebração
        </Button>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon-sm" onClick={mesAnterior}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="font-display text-lg font-medium text-[var(--text-primary)]">
              {nomesMeses[dataAtual.mes]} {dataAtual.ano}
            </h2>
            <Button variant="ghost" size="icon-sm" onClick={proximoMes}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-1">
            <Button variant="secondary" size="sm">Mês</Button>
            <Button variant="ghost" size="sm">Semana</Button>
            <Button variant="ghost" size="sm">Lista</Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px rounded-[12px] overflow-hidden border border-[var(--line)] bg-[var(--line)]">
          {diasSemana.map((d) => (
            <div
              key={d}
              className="bg-[var(--card)] py-2 text-center text-xs font-medium text-[var(--text-tertiary)]"
            >
              {d}
            </div>
          ))}

          {dias.map((d, i) => {
            const infoLiturgica = mapaLiturgico[d.isoData];
            const cels = d.mesAtual ? celebracoesMock[d.isoData] : undefined;
            const isHoje = d.isoData === hojeIso;
            const corDia: CorLiturgicaKey = (infoLiturgica?.cor as CorLiturgicaKey) ?? "verde";

            return (
              <div
                key={i}
                className={`min-h-[80px] lg:min-h-[100px] bg-[var(--card)] p-2 transition-colors hover:bg-[var(--page)] cursor-pointer relative ${
                  !d.mesAtual ? "opacity-30" : ""
                }`}
              >
                <div className="flex items-center gap-1 justify-between">
                  <span
                    className={`text-xs font-medium leading-none ${
                      isHoje
                        ? "flex h-6 w-6 items-center justify-center rounded-full bg-[var(--brand)] text-white"
                        : "text-[var(--text-secondary)]"
                    }`}
                  >
                    {d.dia}
                  </span>
                  {d.mesAtual && (
                    <CorLiturgicaBadge cor={corDia} comRotulo={false} size="sm" />
                  )}
                </div>

                {d.mesAtual && infoLiturgica?.titulo && (
                  <p className="text-[9.5px] text-[var(--text-tertiary)] mt-1 truncate font-display">
                    {infoLiturgica.titulo}
                  </p>
                )}

                {cels && (
                  <div className="mt-1 space-y-1">
                    {cels.map((cel, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium truncate bg-[var(--page)] text-[var(--text-secondary)] border border-[var(--line)]"
                      >
                        <CorLiturgicaBadge cor={cel.cor} comRotulo={false} size="sm" />
                        <span className="truncate hidden sm:inline">{cel.titulo}</span>
                        <span className="truncate sm:hidden">{cel.horario}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-[var(--line)]">
          <SectionLabel className="mb-0 text-[10px]">CORES LITÚRGICAS:</SectionLabel>
          {(["verde", "roxo", "vermelho", "branco", "dourado", "rosa"] as CorLiturgicaKey[]).map((cor) => (
            <CorLiturgicaBadge key={cor} cor={cor} size="sm" />
          ))}
        </div>
      </Card>
    </div>
  );
}
