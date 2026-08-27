// ===== Papéis do sistema =====
export const Papel = {
  SUPER_ADMIN: "SUPER_ADMIN",
  COORDENADOR_GERAL: "COORDENADOR_GERAL",
  COORDENADOR: "COORDENADOR",
  FORMADOR: "FORMADOR",
  SERVIDOR: "SERVIDOR",
  RESPONSAVEL: "RESPONSAVEL",
} as const;
export type Papel = (typeof Papel)[keyof typeof Papel];

// ===== Categorias de servidor =====
export const Categoria = {
  CERIMONIALISTA: "CERIMONIALISTA",
  ACOLITO: "ACOLITO",
  COROINHA: "COROINHA",
  LEITOR: "LEITOR",
  MINISTRO: "MINISTRO",
  SACRISTAO: "SACRISTAO",
} as const;
export type Categoria = (typeof Categoria)[keyof typeof Categoria];

export const CategoriaLabel: Record<Categoria, string> = {
  CERIMONIALISTA: "Cerimonialista",
  ACOLITO: "Acólito",
  COROINHA: "Coroinha",
  LEITOR: "Leitor",
  MINISTRO: "Ministro Extraordinário",
  SACRISTAO: "Sacristão",
};

// ===== Tempos litúrgicos =====
export const TempoLiturgico = {
  ADVENTO: "ADVENTO",
  NATAL: "NATAL",
  TEMPO_COMUM: "TEMPO_COMUM",
  QUARESMA: "QUARESMA",
  TRIDUO_PASCAL: "TRIDUO_PASCAL",
  TEMPO_PASCAL: "TEMPO_PASCAL",
} as const;
export type TempoLiturgico = (typeof TempoLiturgico)[keyof typeof TempoLiturgico];

export const TempoLiturgicoLabel: Record<TempoLiturgico, string> = {
  ADVENTO: "Advento",
  NATAL: "Natal",
  TEMPO_COMUM: "Tempo Comum",
  QUARESMA: "Quaresma",
  TRIDUO_PASCAL: "Tríduo Pascal",
  TEMPO_PASCAL: "Tempo Pascal",
};

// ===== Cores litúrgicas =====
export const CorLiturgica = {
  BRANCO: "BRANCO",
  VERMELHO: "VERMELHO",
  VERDE: "VERDE",
  ROXO: "ROXO",
  ROSA: "ROSA",
  DOURADO: "DOURADO",
  PRETO: "PRETO",
} as const;
export type CorLiturgica = (typeof CorLiturgica)[keyof typeof CorLiturgica];

export const CorLiturgicaConfig: Record<
  CorLiturgica,
  { label: string; hex: string; textColor: string }
> = {
  BRANCO: { label: "Branco", hex: "#F8F8F5", textColor: "#1A1A1A" },
  VERMELHO: { label: "Vermelho", hex: "#B3261E", textColor: "#FFFFFF" },
  VERDE: { label: "Verde", hex: "#2E6B4F", textColor: "#FFFFFF" },
  ROXO: { label: "Roxo", hex: "#5B3E8E", textColor: "#FFFFFF" },
  ROSA: { label: "Rosa", hex: "#D98BA5", textColor: "#1A1A1A" },
  DOURADO: { label: "Dourado", hex: "#B8912F", textColor: "#FFFFFF" },
  PRETO: { label: "Preto", hex: "#1A1A1A", textColor: "#FFFFFF" },
};

// ===== Graus de celebração =====
export const GrauCelebracao = {
  SOLENIDADE: "SOLENIDADE",
  FESTA: "FESTA",
  MEMORIA_OBRIGATORIA: "MEMORIA_OBRIGATORIA",
  MEMORIA_FACULTATIVA: "MEMORIA_FACULTATIVA",
  FERIA: "FERIA",
  SACRAMENTO: "SACRAMENTO",
  DEVOCIONAL: "DEVOCIONAL",
} as const;
export type GrauCelebracao = (typeof GrauCelebracao)[keyof typeof GrauCelebracao];

export const GrauCelebracaoLabel: Record<GrauCelebracao, string> = {
  SOLENIDADE: "Solenidade",
  FESTA: "Festa",
  MEMORIA_OBRIGATORIA: "Memória Obrigatória",
  MEMORIA_FACULTATIVA: "Memória Facultativa",
  FERIA: "Féria",
  SACRAMENTO: "Sacramento",
  DEVOCIONAL: "Devocional",
};

// ===== Status de escala =====
export const StatusEscala = {
  RASCUNHO: "RASCUNHO",
  PUBLICADA: "PUBLICADA",
  ARQUIVADA: "ARQUIVADA",
} as const;
export type StatusEscala = (typeof StatusEscala)[keyof typeof StatusEscala];

// ===== Status de celebração =====
export const StatusCelebracao = {
  PLANEJADA: "PLANEJADA",
  CONFIRMADA: "CONFIRMADA",
  EM_ANDAMENTO: "EM_ANDAMENTO",
  REALIZADA: "REALIZADA",
  CANCELADA: "CANCELADA",
} as const;
export type StatusCelebracao = (typeof StatusCelebracao)[keyof typeof StatusCelebracao];

// ===== Status de participação =====
export const StatusParticipacao = {
  ESCALADO: "ESCALADO",
  CONFIRMADO: "CONFIRMADO",
  AUSENTE_JUSTIFICADO: "AUSENTE_JUSTIFICADO",
  SUBSTITUICAO_SOLICITADA: "SUBSTITUICAO_SOLICITADA",
  SUBSTITUIDO: "SUBSTITUIDO",
  SERVIU: "SERVIU",
  SERVIU_OUTRA_FUNCAO: "SERVIU_OUTRA_FUNCAO",
  NAO_COMPARECEU: "NAO_COMPARECEU",
  SEM_RESPOSTA: "SEM_RESPOSTA",
  CANCELADA: "CANCELADA",
} as const;
export type StatusParticipacao = (typeof StatusParticipacao)[keyof typeof StatusParticipacao];

export const StatusParticipacaoLabel: Record<StatusParticipacao, string> = {
  ESCALADO: "Escalado",
  CONFIRMADO: "Confirmado",
  AUSENTE_JUSTIFICADO: "Ausente (justificado)",
  SUBSTITUICAO_SOLICITADA: "Substituição solicitada",
  SUBSTITUIDO: "Substituído",
  SERVIU: "Serviu",
  SERVIU_OUTRA_FUNCAO: "Serviu (outra função)",
  NAO_COMPARECEU: "Não compareceu",
  SEM_RESPOSTA: "Sem resposta",
  CANCELADA: "Cancelada",
};

// ===== Nível de habilitação =====
export const NivelHabilitacao = {
  APRENDIZ: "APRENDIZ",
  APTO: "APTO",
  REFERENCIA: "REFERENCIA",
} as const;
export type NivelHabilitacao = (typeof NivelHabilitacao)[keyof typeof NivelHabilitacao];

// ===== Status de membership =====
export const StatusMembership = {
  CONVIDADO: "CONVIDADO",
  ATIVO: "ATIVO",
  INATIVO: "INATIVO",
  AFASTADO: "AFASTADO",
} as const;
export type StatusMembership = (typeof StatusMembership)[keyof typeof StatusMembership];

// ===== Plano =====
export const Plano = {
  GRATUITO: "GRATUITO",
  PAROQUIA: "PAROQUIA",
  DIOCESE: "DIOCESE",
} as const;
export type Plano = (typeof Plano)[keyof typeof Plano];

// ===== Tipo de comunidade =====
export const TipoComunidade = {
  MATRIZ: "MATRIZ",
  CAPELA: "CAPELA",
  SANTUARIO: "SANTUARIO",
  OUTRO: "OUTRO",
} as const;
export type TipoComunidade = (typeof TipoComunidade)[keyof typeof TipoComunidade];

// ===== Prioridade de aviso =====
export const PrioridadeAviso = {
  INFORMATIVO: "INFORMATIVO",
  IMPORTANTE: "IMPORTANTE",
  URGENTE: "URGENTE",
} as const;
export type PrioridadeAviso = (typeof PrioridadeAviso)[keyof typeof PrioridadeAviso];
