"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, CalendarDays, LoaderCircle, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CelebracaoTitulo } from "@/components/ui/primitives";
import { requestBackend } from "@/util/request";

const fieldClass =
  "mt-2 h-11 w-full rounded-xl border border-[var(--line)] bg-[var(--card)] px-3.5 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)] focus:ring-2 focus:ring-[var(--brand)]/10";

const tiposCelebracao = [
  "Missa",
  "Celebração da Palavra",
  "Casamento",
  "Batizado",
  "Funeral",
  "Adoração",
  "Outro",
];

export default function FormularioCelebracaoPage() {
  const router = useRouter();
  const [data, setData] = useState("");
  const [horario, setHorario] = useState("");
  const [tipo, setTipo] = useState("");
  const [local, setLocal] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const salvarCelebracao = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErro("");
    setSalvando(true);

    try {
      await requestBackend({
        url: "/celebracoes",
        method: "POST",
        data: { data, horario, tipo, local },
      });
      router.push("/celebracoes");
    } catch (error) {
      console.error("Erro ao salvar celebração:", error);
      setErro("Não foi possível salvar a celebração. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => router.push("/celebracoes")}
          aria-label="Voltar para celebrações"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <CelebracaoTitulo className="text-2xl">Nova celebração</CelebracaoTitulo>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">
            Informe a data, horário, tipo e local da celebração.
          </p>
          
        </div>
      </div>

      <form onSubmit={salvarCelebracao}>
        <Card className="space-y-5 p-5 sm:p-7">
          <div className="flex items-center gap-3 border-b border-[var(--line)] pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--brand-tint)]">
              <CalendarDays className="h-5 w-5 text-[var(--brand)]" />
            </div>
            <div>
              <h2 className="font-display text-lg font-medium text-[var(--text-primary)]">
                Dados da celebração
              </h2>
              <p className="text-xs text-[var(--text-secondary)]">
                Os campos marcados são obrigatórios.
              </p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-[var(--text-primary)]">
              Data <span className="text-[var(--error)]">*</span>
              <input
                type="date"
                value={data}
                onChange={(event) => setData(event.target.value)}
                className={fieldClass}
                required
              />
            </label>

            <label className="text-sm font-medium text-[var(--text-primary)]">
              Horário <span className="text-[var(--error)]">*</span>
              <input
                type="time"
                value={horario}
                onChange={(event) => setHorario(event.target.value)}
                className={fieldClass}
                required
              />
            </label>

            <label className="text-sm font-medium text-[var(--text-primary)]">
              Tipo de celebração <span className="text-[var(--error)]">*</span>
              <select
                value={tipo}
                onChange={(event) => setTipo(event.target.value)}
                className={fieldClass}
                required
              >
                <option value="">Selecione o tipo</option>
                {tiposCelebracao.map((tipoCelebracao) => (
                  <option key={tipoCelebracao} value={tipoCelebracao}>
                    {tipoCelebracao}
                  </option>
                ))}
              </select>
            </label>

            <label className="text-sm font-medium text-[var(--text-primary)]">
              Local <span className="text-[var(--error)]">*</span>
              <input
                type="text"
                value={local}
                onChange={(event) => setLocal(event.target.value)}
                placeholder="Ex.: Igreja Matriz"
                className={fieldClass}
                required
              />
            </label>
          </div>

          {erro && (
            <p className="text-sm text-[var(--error)]" role="alert">
              {erro}
            </p>
          )}

          <div className="flex justify-end gap-2 border-t border-[var(--line)] pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/celebracoes")}
              disabled={salvando}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={salvando}>
              {salvando ? (
                <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              {salvando ? "Salvando..." : "Salvar celebração"}
            </Button>
          </div>
        </Card>
      </form>
    </div>
  );
}
