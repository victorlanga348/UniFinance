# Índice Mestre de Documentação - UniFinance

Bem-vindo ao centro de documentação prescritiva do **UniFinance**, uma plataforma de gestão financeira pessoal e académica contextualizada para Moçambique.

---

### Mapa do Ecossistema de Documentação

```text
docs/
├── README.md                      # Este índice mestre
├── PRD.md                         # Documento de Definição de Produto e Requisitos Globais
├── documentation-governance.md    # Matriz de Governança, Impacto, Git Flow e Checklist
│
├── architecture/                  # Arquitetura de software e persistência
│   ├── stack.md                   # Stack tecnológica (React 19, Vite, Tailwind v4, Express)
│   └── data-model.md              # Contratos de tipos (Transaction, Category, Budget, Goal, Profile)
│
├── product/                       # Lógica de negócio e motores de validação
│   └── rules-engine.md            # Regras de saldo disponível, deduções e bloqueios
│
├── integrations/                  # Segurança e contratos de comunicação
│   ├── auth.md                    # Fluxo de autenticação, transição do btoa e JWT
│   └── api-contracts.md           # Endpoints HTTP REST atuais e planejados
│
├── design/                        # Identidade visual e responsividade
│   ├── tokens.md                  # Tokens de cores (Slate, Safira, Esmeralda), tipografia e modo escuro
│   └── responsive.md              # Diretrizes de responsividade e PWA
│
├── pages/                         # Especificação técnica das rotas
│   ├── dashboard.md               # Painel principal
│   ├── transactions.md            # Movimentos unificados e relatórios
│   ├── budgets.md                 # Teto de gastos mensais por categoria
│   ├── goals.md                   # Metas de poupança com dedução no saldo
│   └── education.md               # Academia UniFinance
│
├── components/                    # Componentes modulares
│   ├── layout.md                  # Sidebar, Header dinâmico e BottomNav
│   └── modals.md                  # Modais de lançamento, orçamentos e metas
│
├── copywriting/                   # Linguagem e microcópia
│   └── microcopy.md               # Dicionário de mensagens, alertas e erros em pt-MZ
│
├── audits/                        # Segurança e conformidade
│   └── accessibility-and-security.md # Auditoria de segurança, localStorage e acessibilidade
│
├── tasks/                         # Ciclo de tarefas e sprints
│   └── template.md                # Template obrigatório de spec de tarefa
│
├── specs/                         # Especificações funcionais consolidadas
│   └── unifinance-core.md         # Núcleo da aplicação
│
└── mega-brain/                    # Segundo Cérebro (Memória Retrospectiva Obsidian)
    ├── 00-index.md                # Grafo mestre com wikilinks
    ├── decisions/                 # ADRs
    ├── troubleshooting/           # Memória de bugs
    ├── debt/                      # Dívida técnica
    └── domain/                    # Regras de Moçambique
```

---

### Conexão com o Segundo Cérebro (`docs/mega-brain/`)
Enquanto as seções superiores de `/docs` estabelecem **o que o sistema deve ser**, o subdiretório [`docs/mega-brain/`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/docs/mega-brain/00-index.md) armazena a **memória retrospectiva** (ADRs, falhas de ambiente, dívida técnica e decisões históricas) acessível no Obsidian.
