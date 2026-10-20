# UniFinance · Gestão Financeira Pessoal & Académica

Plataforma moderna de gestão financeira pessoal e académica contextualizada para Moçambique (moeda Metical `MZN`, carteiras móveis `M-Pesa`, `e-Mola`, `mKesh`, orçamentos mensais e metas de poupança).

---

### Arquitetura do Repositório

O projeto é organizado em 3 pastas canónicas:

```text
UniFinance/
├── backend/                       # Servidor Node.js / Express & APIs
│   ├── server.ts                  # Ponto de entrada do backend
│   ├── .env                       # Variáveis de ambiente isoladas do servidor (PORT, chaves)
│   └── .env.example               # Template de variáveis do backend
│
├── frontend/                      # Interface Web & PWA (React 19 + Vite + Tailwind v4)
│   ├── index.html                 # Ponto de entrada do SPA
│   ├── vite.config.ts             # Configuração do Vite e plugins
│   ├── public/                    # Assets estáticos e manifest PWA
│   ├── src/                       # Código-fonte da aplicação React
│   ├── .env                       # Variáveis de ambiente isoladas do cliente (VITE_*)
│   └── .env.example               # Template de variáveis do frontend
│
├── docs/                          # Governança Spec-Driven Development (SDD) & Memória
│   ├── README.md                  # Mapa mestre de navegação de documentação
│   ├── PRD.md                     # Requisitos de Produto
│   ├── documentation-governance.md# Matriz de impacto bidirecional e Git Flow
│   ├── architecture/              # Stack tecnológica e contratos de dados
│   ├── product/                   # Motor de regras determinísticas P0-P5
│   ├── integrations/              # Autenticação e endpoints REST
│   ├── design/                    # Design tokens e responsividade
│   ├── pages/                     # Especificação técnica das telas
│   ├── components/                # Layout e modais
│   ├── tasks/                     # Histórico e templates de sprints
│   └── mega-brain/                # Segundo Cérebro Obsidian (Grafo de Memória Técnica)
│       ├── 00-index.md            # Grafo central com [[wikilinks]]
│       ├── decisions/             # Architecture Decision Records (ADRs)
│       ├── troubleshooting/       # Histórico de falhas e resoluções
│       ├── debt/                  # Registro de dívida técnica
│       └── domain/                # Particularidades financeiras de Moçambique
│
├── AGENTS.md                      # Regras operacionais de IA e ciclo de sprint
├── GEMINI.md                      # Diretrizes para assistentes Gemini
├── package.json                   # Orquestração central de scripts
└── tsconfig.json                  # Resolução estrita de tipos TypeScript
```

---

### Inicialização e Scripts

1. **Configuração de Ambiente:**
   - Backend: Copie `backend/.env.example` para `backend/.env` (porta padrão: `PORT=3001`).
   - Frontend: Copie `frontend/.env.example` para `frontend/.env`.

2. **Comandos Disponíveis na Raiz:**
   ```bash
   # Iniciar o servidor de desenvolvimento (Express + Vite)
   npm run dev

   # Compilar bundle de produção do frontend
   npm run build

   # Validar integridade e tipagem TypeScript
   npm run lint

   # Visualizar build de produção
   npm run preview
   ```

---

### Governança e Especificações
Consulte o guia completo em [docs/README.md](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/docs/README.md) e as regras operacionais em [AGENTS.md](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/AGENTS.md).
