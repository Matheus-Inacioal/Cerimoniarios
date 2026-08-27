/**
 * Funções litúrgicas padrão pré-carregadas no onboarding.
 * 
 * Estrutura baseada na organização prática do cerimonial:
 * - Principal: coordenação ritual
 * - Palavra: liturgia da palavra
 * - Credência: objetos litúrgicos e apoio ao altar
 */
export interface FuncaoLiturgicaSeed {
  codigo: string;
  nome: string;
  descricao: string;
  icone: string;
  ordemProcissional: number;
  exigeExperiencia: boolean;
  idadeMinima?: number;
  quantidadePadrao: number;
}

export const funcoesLiturgicasPadrao: FuncaoLiturgicaSeed[] = [
  {
    codigo: "PRINCIPAL",
    nome: "Principal",
    descricao:
      "Coordena a celebração do ponto de vista ritual. Dirige os demais servidores.",
    icone: "crown",
    ordemProcissional: 1,
    exigeExperiencia: true,
    quantidadePadrao: 1,
  },
  {
    codigo: "PALAVRA",
    nome: "Palavra",
    descricao:
      "Auxilia os leitores, salmista e no momento da oração dos fiéis.",
    icone: "book-open",
    ordemProcissional: 2,
    exigeExperiencia: false,
    quantidadePadrao: 1,
  },
  {
    codigo: "CREDENCIA",
    nome: "Credência",
    descricao:
      "Cuida das atividades voltadas a auxiliar os coroinhas e outros servidores com os objetos litúrgicos.",
    icone: "hand",
    ordemProcissional: 3,
    exigeExperiencia: false,
    quantidadePadrao: 1,
  },
];
