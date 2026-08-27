# Cerimonial360 ✝️

> **Sistema Integrado de Gestão de Cerimoniários, Escalas Litúrgicas e Calendário da Igreja**

O **Cerimonial360** é uma plataforma web moderna desenvolvida para simplificar e organizar a gestão de acolhimento, escalas de serviço, equipes de acólitos/cerimoniários e o acompanhamento do calendário litúrgico católico paroquial.

---

## 🚀 Principais Funcionalidades

- 📅 **Calendário Litúrgico Inteligente**: Integração com as normas da CNBB (Romcal Brasil), gerando automaticamente as celebrações, solenidades e memórias de cada ano.
- 🎨 **Interface Litúrgica Dinâmica**: Mudança de tema e tokens visuais sincronizada com a cor litúrgica do dia (Verde, Roxo, Vermelho, Branco, Dourado, Rosa).
- 📋 **Montagem e Gestão de Escalas**: Organização de equipes para missas e celebrações com suporte a controle de presença e confirmações.
- 👥 **Cadastro de Servidores/Cerimoniários**: Gestão completa da equipe, funções, disponibilidade e históricos de serviço.
- 📚 **Biblioteca de Ritos e Documentos**: Repositório central para guias litúrgicos, orientações paroquiais e ordens de missa.
- 📢 **Quadro de Avisos Paroquiais**: Comunicação direta e avisos para a equipe de cerimoniários.
- 📊 **Estatísticas e Relatórios**: Indicadores de presença, assiduidade e métricas de desempenho das escalas.

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Biblioteca de UI**: [React 19](https://react.dev/) & [Tailwind CSS v4](https://tailwindcss.com/)
- **Componentes**: [Radix UI Primitives](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Gestão de Estado**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Motor Litúrgico**: [Romcal](https://romcal.js.org/) com Próprio do Brasil (`@romcal/calendar.brazil`)
- **Validação de Tipos**: [TypeScript](https://www.typescriptlang.org/) & [Zod](https://zod.dev/)
- **Testes**: [Vitest](https://vitest.dev/)
- **Linter**: [ESLint 9](https://eslint.org/)

---

## 📋 Requisitos Prévia

Antes de começar, você precisará ter instalado em sua máquina:
- **Node.js**: `v18.x` ou superior
- **Gerenciador de pacotes**: `npm` (incluído no Node), `yarn` ou `pnpm`

---

## 🔧 Instruções de Instalação e Execução

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/SEU_USUARIO/cerimoniarios.git
   cd cerimoniarios
   ```

2. **Instalar as dependências**:
   ```bash
   npm install
   ```

3. **Gerar os dados litúrgicos pré-compilados**:
   ```bash
   npm run generate:liturgical
   ```

4. **Executar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000`

---

## 📜 Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Next.js |
| `npm run build` | Compila a aplicação para produção (executa o gerador litúrgico em `prebuild`) |
| `npm run start` | Executa o servidor de produção após o build |
| `npm run test` | Executa a suíte de testes unitários do motor litúrgico com Vitest |
| `npm run lint` | Executa a verificação estática de código com ESLint |
| `npm run generate:liturgical` | Gera/atualiza o dataset dos anos litúrgicos em `public/liturgical/` |

---

## 📁 Estrutura de Pastas

```text
Cerimoniarios/
├── public/                # Arquivos estáticos e JSONs litúrgicos pré-gerados
├── scripts/               # Scripts auxiliares (ex.: gerador litúrgico)
├── src/
│   ├── app/               # Rotas e páginas do Next.js (App Router)
│   │   ├── (app)/         # Grupo de rotas autenticadas/principais (dashboard, escalas, etc.)
│   │   ├── globals.css    # Design tokens e estilos globais com temas litúrgicos
│   │   └── layout.tsx     # Layout raiz da aplicação
│   ├── components/        # Componentes React reutilizáveis
│   │   ├── layout/        # Componentes de navegação (Sidebar, Topbar, Contexts)
│   │   ├── liturgical/    # Badges e seletores de cor litúrgica
│   │   └── ui/            # Primitivos visuais (Button, Card, GlassSurface, Badge, etc.)
│   ├── lib/               # Regras de negócio e motores
│   │   └── liturgico/     # Motor litúrgico e overlay da CNBB + testes
│   └── types/             # Definições de tipos TypeScript e Enums
├── eslint.config.mjs      # Configuração do ESLint
├── next.config.ts         # Configuração do Next.js
└── package.json           # Dependências e scripts do projeto
```

---

## 🤝 Como Contribuir

Contribuições são super bem-vindas! Siga estes passos para colaborar:

1. Faça um **Fork** deste repositório.
2. Crie uma branch para sua nova funcionalidade: `git checkout -b feature/minha-funcionalidade`.
3. Faça o commit das suas alterações: `git commit -m 'feat: Adiciona minha funcionalidade'`.
4. Garanta que o projeto compila e passa nos testes: `npm run lint && npm run test && npm run build`.
5. Envie para o branch remoto: `git push origin feature/minha-funcionalidade`.
6. Abra um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes (se aplicável).
