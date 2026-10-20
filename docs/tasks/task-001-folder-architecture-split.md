# TASK-1-001: Rearquitetura de Pastas (Backend, Frontend e Docs com Mega-Brain)

---

### Metadados da Tarefa
- **ID da Tarefa:** `TASK-1-001`
- **Data:** 2026-10-17
- **Sprint:** Sprint 1
- **Trilha:** Trilha A / Trilha C (Arquitetura e Governança)
- **Responsável:** Antigravity / Gemini
- **Specs Afetadas em `/docs/`:**
  - `docs/README.md`
  - `docs/documentation-governance.md`
  - `docs/architecture/stack.md`
- **Notas Afetadas em `mega-brain/`:**
  - `docs/mega-brain/00-index.md`
  - `docs/mega-brain/decisions/adr-001-localstorage-architecture.md`
  - `AGENTS.md`
  - `GEMINI.md`

---

### 1. Contexto e Problema
- **Comportamento Atual:**
  - O repositório possui uma raiz híbrida onde arquivos de backend (`server.ts`), frontend (`src/`, `public/`, `index.html`, `vite.config.ts`), documentação (`docs/`) e memória técnica (`mega-brain/`) residem no mesmo nível.
  - Isso dificulta o isolamento de deploys (ex: frontend estático na Vercel vs backend dedicado em Docker/Node) e dispersa a documentação entre `docs/` e `mega-brain/`.
- **Comportamento Esperado:**
  - Repositório organizado em 3 pastas canónicas:
    1. `backend/`: Código de servidor, API, middlewares e serviços de persistência.
    2. `frontend/`: Código da aplicação cliente (React 19, componentes, páginas, assets, Tailwind, Vite).
    3. `docs/`: Toda a documentação técnica unificada, contendo `docs/mega-brain/` como subsistema de memória retrospectiva do Obsidian.

---

### 2. Solução Proposta & Nova Árvore de Diretórios

```text
UniFinance/
├── backend/                       # Camada de Servidor & API
│   ├── server.ts                  # Ponto de entrada do servidor Express
│   └── (futuras rotas/controllers)# Rotas públicas e privadas
│
├── frontend/                      # Camada de Interface do Utilizador (UX)
│   ├── index.html                 # Ponto de entrada HTML do SPA
│   ├── vite.config.ts             # Configuração do Vite e Tailwind v4
│   ├── public/                    # Assets estáticos e manifest PWA
│   └── src/                       # Código React (App, components, pages, contexts, services)
│
├── docs/                          # Governança Prescritiva & Memória Viva
│   ├── README.md                  # Mapa mestre de documentação
│   ├── PRD.md                     # Requisitos de produto
│   ├── documentation-governance.md# Matriz de impacto e Git Flow
│   ├── architecture/              # Stack e modelagem de dados
│   ├── product/                   # Regras de negócio
│   ├── integrations/              # Auth e endpoints
│   ├── design/                    # Tokens e responsividade
│   ├── pages/                     # Especificação de rotas
│   ├── components/                # Layout e modais
│   ├── copywriting/               # Microcópia pt-MZ
│   ├── audits/                    # WCAG e segurança
│   ├── tasks/                     # Specs de tarefas
│   ├── specs/                     # Especificações de módulos
│   └── mega-brain/                # Memória Retrospectiva (Obsidian Grafo)
│       ├── 00-index.md            # Grafo central
│       ├── decisions/             # ADRs
│       ├── troubleshooting/       # Histórico de falhas
│       ├── debt/                  # Dívida técnica
│       └── domain/                # Domínio financeiro moçambicano
│
├── AGENTS.md                      # Regras operacionais na raiz
├── GEMINI.md                      # Diretrizes Gemini na raiz
├── package.json                   # Orquestração raiz ou scripts de execução
├── tsconfig.json                  # Configuração TypeScript adaptada
├── .env / .env.example            # Variáveis de ambiente
└── .gitignore                     # Ignora dist, node_modules, logs
```

---

### 3. Estratégia de Execução & Adaptações Técnicas
1. **Movimentação da Documentação:**
   - Mover `mega-brain/` para `docs/mega-brain/`.
   - Atualizar todos os links relativos e referências em `AGENTS.md`, `GEMINI.md`, `docs/documentation-governance.md` e `docs/README.md`.
2. **Movimentação do Frontend:**
   - Mover `src/`, `public/`, `index.html`, `vite.config.ts` para `frontend/`.
   - Atualizar caminhos no `vite.config.ts` e `index.html`.
3. **Movimentação do Backend:**
   - Mover `server.ts` para `backend/server.ts`.
   - Atualizar a importação do middleware Vite no `backend/server.ts` para apontar a raiz do frontend para `../frontend`.
4. **Ajustes de Scripts no `package.json` e `tsconfig.json`:**
   - Atualizar scripts `dev`, `build`, `lint` para referenciar os novos caminhos ou subpastas sem quebrar o pipeline.

---

### 4. Análise de Trade-offs & Riscos
- **Vantagens:**
  - Separação clara de responsabilidades (SoC).
  - Facilidade de deploy independente (Vercel para `frontend/`, container Docker para `backend/`).
  - Documentação 100% centralizada sob `docs/` com Obsidian integrado.
- **Riscos & Mitigações:**
  - *Risco:* Quebra do middleware do Vite no `server.ts` em modo dev.
    *Mitigação:* Configurar `root: path.resolve(__dirname, '../frontend')` na inicialização do `vite.createServer()`.
  - *Risco:* Quebra de resolução do TypeScript no `tsconfig.json`.
    *Mitigação:* Ajustar `include` para `["frontend/src/**/*", "backend/**/*"]`.

---

### 5. Critérios de Aceitação (Definition of Done)
- [ ] `docs/mega-brain/` realocado com links íntegros.
- [ ] Pastas `backend/`, `frontend/` e `docs/` criadas e populadas corretamente.
- [ ] `rtk npm run lint` executado com sucesso ou apontando estritamente os mesmos erros pré-existentes.
- [ ] O comando de inicialização `npm run dev` continua funcional através do novo caminho de `server.ts`.
- [ ] `AGENTS.md`, `GEMINI.md` e matriz de governança atualizados.
