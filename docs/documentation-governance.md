# Matriz de Governança de Documentação (SDD) & Git Flow

Este documento estabelece o contrato formal de sincronização entre o código-fonte da aplicação **UniFinance** e todo o ecossistema de documentação técnica em `/docs` e memória viva em `mega-brain/`.

---

### 1. Princípio Fundamental de Governança
> **Nenhuma linha de código existe ou é alterada sem especificação prévia validada.**
> Todo comportamento observável do UniFinance (cálculo de saldo, transações, orçamentos, metas, auth e interface) deve estar formalizado em `/docs` e contextualizado em `mega-brain/`.

---

### 2. Git Flow & Padrão de Nomenclatura

#### Estrutura de Branches
- `main`: Código estável pronto para produção. Protegida contra commits diretos.
- `develop`: Linha principal de integração contínua.
- `feat/sprint-<X>-trilha-<A|B|C>-<slug>`: Branches de funcionalidade divididas por trilha:
  - **Trilha A (Backend & DB)**: `feat/sprint-1-trilha-A-auth-jwt`
  - **Trilha B (Regras de Negócio & Core)**: `feat/sprint-1-trilha-B-deducao-metas-saldo`
  - **Trilha C (Frontend, UI/UX & Design)**: `feat/sprint-1-trilha-C-unificacao-movimentos`
- `fix/<slug>`: Correções críticas imediatas vinculadas a um registro em `mega-brain/troubleshooting/`.

#### Mensagens de Commit (Conventional Commits em Português)
Formato: `<tipo>(<escopo>): <descrição no imperativo>`
- `feat(metas)`: deduzir valor destinado a metas do saldo disponível
- `fix(auth)`: bloquear login com credenciais inválidas e validar hash
- `docs(governance)`: atualizar matriz de impacto bidirecional
- `refactor(views)`: consolidar extrato e relatórios em aba unificada
- `chore(deps)`: atualizar typescript e vite para versões estáveis

---

### 3. Matriz de Impacto Bidirecional

Sempre que um dos arquivos de código abaixo for alterado, os respectivos documentos em `/docs` e notas em `mega-brain/` **devem obrigatoriamente** ser atualizados na mesma sprint:

| Arquivo de Código Alterado | Documentos Afetados em `/docs/` | Notas Afetadas em `docs/mega-brain/` |
| :--- | :--- | :--- |
| [`frontend/src/services/db.ts`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/services/db.ts) | `docs/architecture/data-model.md`<br>`docs/integrations/auth.md`<br>`docs/product/rules-engine.md` | `docs/mega-brain/decisions/adr-001-localstorage-architecture.md`<br>`docs/mega-brain/debt/debt-001-insecure-auth-storage.md` |
| [`frontend/src/contexts/FinanceContext.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/contexts/FinanceContext.tsx) | `docs/product/rules-engine.md`<br>`docs/architecture/data-model.md` | `docs/mega-brain/specs/modules/review-audit-corrections.md` |
| [`backend/server.ts`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/backend/server.ts) | `docs/architecture/stack.md`<br>`docs/integrations/api-contracts.md` | `docs/mega-brain/troubleshooting/bug-001-port-3000-collision.md`<br>`docs/mega-brain/decisions/adr-002-descontinuacao-ia-chatbot.md` |
| [`frontend/src/types/finance.ts`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/types/finance.ts) | `docs/architecture/data-model.md`<br>`docs/integrations/api-contracts.md` | `docs/mega-brain/specs/modules/unifinance-core.md` |
| [`frontend/src/pages/Login.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/pages/Login.tsx) / [`Register.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/pages/Register.tsx) | `docs/integrations/auth.md`<br>`docs/pages/auth.md` | `docs/mega-brain/debt/debt-001-insecure-auth-storage.md` |
| [`frontend/src/pages/Transactions.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/pages/Transactions.tsx) | `docs/pages/transactions.md`<br>`docs/components/layout.md` | `docs/mega-brain/specs/modules/review-audit-corrections.md` |
| [`frontend/src/pages/BudgetsPage.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/pages/BudgetsPage.tsx) | `docs/pages/budgets.md`<br>`docs/product/rules-engine.md` | `docs/mega-brain/specs/modules/unifinance-core.md` |
| [`frontend/src/pages/GoalsPage.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/pages/GoalsPage.tsx) | `docs/pages/goals.md`<br>`docs/product/rules-engine.md` | `docs/mega-brain/specs/modules/review-audit-corrections.md` |
| [`frontend/src/pages/EducationPage.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/pages/EducationPage.tsx) | `docs/pages/education.md` | `docs/mega-brain/decisions/adr-002-descontinuacao-ia-chatbot.md` |
| [`frontend/src/index.css`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/index.css) / Tokens Visuais | `docs/design/tokens.md`<br>`docs/design/responsive.md` | `docs/mega-brain/specs/modules/review-audit-corrections.md` |

---

### 4. Checklist Obrigatório de Fechamento de Sprint

Antes de concluir qualquer tarefa ou efetuar merge de branch, responda às 5 perguntas mandatórias:

1. **Validação de Compilação & Tipagem**: O projeto compila sem erros com `rtk npm run lint`?
2. **Sincronização Bidirecional**: As alterações nos modelos, cálculos ou interfaces foram refletidas nos documentos correspondentes de `/docs`?
3. **Memória de Decisões & Falhas**: Houve decisões arquiteturais (ADR), falhas de ambiente ou novas dívidas técnicas que foram catalogadas em `mega-brain/`?
4. **Isolamento de Escopo**: Nenhuma alteração foi feita fora do escopo aprovado para a sprint?
5. **Pergunta de Fechamento**: Foi formulada formalmente a pergunta:
   > *"Existe alguma alteração no projeto que não esteja refletida em /docs, no mega-brain ou no README?"*
