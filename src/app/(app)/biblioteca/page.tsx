"use client";

import { Upload, Search, FileText, Image, Video } from "lucide-react";
import { Card, CelebracaoTitulo } from "@/components/ui/primitives";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const documentosMock = [
  { id: "1", titulo: "Roteiro da missa dominical — Tempo Comum", tipo: "documento", formato: "PDF", tamanho: "245 KB", categoria: "Roteiros", atualizadoEm: "15/07/2026" },
  { id: "2", titulo: "Guia do turiferário — Manual prático", tipo: "documento", formato: "PDF", tamanho: "1.2 MB", categoria: "Formação", atualizadoEm: "10/07/2026" },
  { id: "3", titulo: "Esquema da procissão de entrada", tipo: "imagem", formato: "PNG", tamanho: "890 KB", categoria: "Diagramas", atualizadoEm: "05/07/2026" },
  { id: "4", titulo: "Posições na liturgia eucarística", tipo: "documento", formato: "PDF", tamanho: "320 KB", categoria: "Formação", atualizadoEm: "01/07/2026" },
];

const tipoIcon = { documento: FileText, imagem: Image, video: Video };

export default function BibliotecaPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <CelebracaoTitulo className="text-2xl">Biblioteca</CelebracaoTitulo>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Documentos, guias e materiais de formação
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-tertiary)]" />
        <input
          type="text"
          placeholder="Buscar documentos..."
          className="w-full rounded-xl border border-[var(--line)] bg-[var(--card)] py-2.5 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:border-[var(--brand)] focus:outline-none transition-all"
        />
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <Button variant="secondary" size="sm">Todos</Button>
        <Button variant="ghost" size="sm">Roteiros</Button>
        <Button variant="ghost" size="sm">Formação</Button>
        <Button variant="ghost" size="sm">Diagramas</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 stagger">
        {documentosMock.map((doc) => {
          const Icon = tipoIcon[doc.tipo as keyof typeof tipoIcon] || FileText;
          return (
            <Card key={doc.id} className="group">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--brand-tint)] group-hover:scale-105 transition-transform">
                  <Icon className="h-5 w-5 text-[var(--brand)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-base font-medium text-[var(--text-primary)] line-clamp-2 leading-snug">
                    {doc.titulo}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-[10px]">{doc.formato}</Badge>
                    <span className="text-[10px] text-[var(--text-tertiary)]">{doc.tamanho}</span>
                  </div>
                  <p className="text-[10px] text-[var(--text-tertiary)] mt-1.5">
                    Atualizado em {doc.atualizadoEm}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
