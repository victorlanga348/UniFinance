# TASK-2-001: Implementação de Regras Críticas de Caixa, Metas no Histórico, Saldo Zero e Validação End-to-End

---

### Metadados da Tarefa
- **ID da Tarefa:** `TASK-2-001`
- **Data:** 2026-10-20
- **Sprint:** Sprint 2
- **Trilha:** Trilha B (Regras de Negócio & Core) / Trilha C (Frontend, UI/UX & Validações)
- **Responsável:** Antigravity / Gemini
- **Specs Afetadas em `/docs/`:**
  - `docs/product/rules-engine.md`
  - `docs/pages/transactions.md`
  - `docs/pages/goals.md`
  - `docs/pages/dashboard.md`
  - `docs/documentation-governance.md`
- **Notas Afetadas em `mega-brain/`:**
  - `docs/mega-brain/specs/modules/review-audit-corrections.md`
  - `docs/mega-brain/specs/modules/unifinance-core.md`
  - `docs/mega-brain/00-index.md`

---

### 1. Contexto e Problema
O utilizador solicitou o alinhamento completo do sistema de ponta a ponta com 5 diretrizes imperativas:
1. **Inicialização Limpa (Input 0 em vez de 5000):** Eliminar os valores pré-preenchidos de 5000 no Onboarding, Perfil e Contexto, iniciando com input de 0 MZN e permitindo adicionar fundos dinamicamente.
2. **Metas Registadas no Histórico:** Toda a alocação de fundos para metas (aporte/depósito ou saldo inicial da meta) deve gerar um registo correspondente na lista de transações (`transactions`), aparecendo no Extrato com categoria apropriada (`Metas & Poupança`). Se a meta for eliminada, o saldo poupado deve ser resgatado de volta ao caixa com registo de entrada.
3. **Prevenção Estrita de Saldos Negativos:** Nenhuma despesa ou redução de saldo pode resultar em saldo inferior a zero. Operações que excedam a liquidez disponível são bloqueadas tanto na interface quanto nas camadas de serviço/contexto.
4. **Bloqueio de Alocações em Metas Superiores ao Saldo Disponível:** Não permitir depositar nem definir valor inicial em metas que ultrapasse o `saldoDisponivel` em conta.
5. **Operação 100% Funcional de Ponta a Ponta:** Garantir que todos os botões, navegações, formulários, modais, filtros e relatórios operem sem erros de runtime ou inconsistências de dados.

---

### 2. Solução Proposta & Mudanças Técnicas

#### A. Inicialização com Zero e Flexibilidade de Adição de Saldo
- **`frontend/src/pages/Onboarding.tsx`**:
  - `saldoInicial` inicializado com `0` (anteriormente `5000`).
  - `goalTarget` inicializado com `0` (placeholder indicativo).
- **`frontend/src/pages/ProfilePage.tsx`**:
  - `saldoInicial` fallback alterado para `user?.saldoInicial ?? 0` (anteriormente `5000`).
- **`frontend/src/contexts/FinanceContext.tsx`**:
  - `saldoInicial` no context atualizado de `user?.saldoInicial ?? 10000` para `user?.saldoInicial ?? 0`.
- **`frontend/src/pages/Dashboard.tsx`**:
  - Inclusão de botão de atalho direto para "+ Registar Receita / Entrada" no painel principal, facilitando a adição de liquidez a qualquer momento.

#### B. Registro de Metas no Histórico de Transações
- **`frontend/src/services/db.ts`**:
  - Adição da categoria padrão `{ id: 'exp-metas', name: 'Metas & Poupança', type: 'expense', icon: 'Target', description: 'Valores alocados a metas e objetivos de poupança' }` em `DEFAULT_CATEGORIES`.
- **`frontend/src/contexts/FinanceContext.tsx`**:
  - `depositToGoal(goalId, amount)`:
    - Valida se `amount <= saldoAtual`.
    - Atualiza `currentAmount` da meta.
    - Regista automaticamente transação de saída (`expense`) no histórico:
      `description: 'Poupança: Meta "${goal.name}"'`, `categoryId: 'exp-metas'`, `paymentMethod: 'Saldo em Conta'`.
  - `addGoal(goalData)`:
    - Se `goalData.currentAmount > 0`, valida se `<= saldoAtual` e cria transação de histórico:
      `description: 'Alocação Inicial: Meta "${goal.name}"'`, `categoryId: 'exp-metas'`.
  - `deleteGoal(goalId)`:
    - Se a meta possuir `currentAmount > 0`, realiza o estorno/resgate automático dos fundos para o saldo disponível, registando transação de entrada (`income`):
      `description: 'Resgate da Meta "${goal.name}"'`, `categoryId: 'inc-outros'`.
      Notifica o utilizador via toast.

#### C. Bloqueio Estrito de Saldos Negativos e Metas > Saldo
- **`frontend/src/contexts/FinanceContext.tsx`**:
  - `addTransaction`: Se `type === 'expense'` e `amount > saldoAtual`, bloqueia com erro e toast `"Saldo insuficiente"`.
  - `updateTransaction`: Se a alteração resultar em saldo negativo, bloqueia com erro.
  - `deleteTransaction`: Se eliminar uma receita causar saldo negativo, cancela a operação com aviso.
  - `depositToGoal`: Se `amount > saldoAtual`, rejeita a operação.
  - `addGoal`: Se `goalData.currentAmount > saldoAtual`, rejeita a criação.
- **Interfaces (`Transactions.tsx`, `GoalsPage.tsx`)**:
  - Nos formulários de nova despesa e depósito em meta:
    - Exibição inline do saldo disponível em tempo real.
    - Atributo `max={saldoAtual}` nos inputs monetários.
    - Mensagem de aviso visual em vermelho e desativação do botão de submissão quando o valor excede a liquidez disponível.

#### D. Verificação e Polimento End-to-End
- Auditar e validar todos os botões de ação (Header, Sidebar, Dashboard, Movimentos, Orçamentos, Metas, Educação, Perfil, Configurações, Calculadora).
- Executar `rtk npm run lint` e `rtk npm run build` para garantir integridade estrutural.

---

### 3. Análise de Trade-offs & Riscos
- **Vantagens:**
  - Integridade contábil matemática absoluta: saldo disponível real reflete a liquidez de caixa e nunca fica negativo.
  - Rastreabilidade total: o utilizador vê exatamente no extrato onde cada Metical foi alocado.
  - Onboarding sem pressupostos: começa com 0 MZN reais de acordo com a realidade do utilizador.
- **Riscos & Mitigações:**
  - *Risco:* Dupla dedução de saldo caso o cálculo subtraia as despesas e também as metas.
  - *Mitigação:* Como toda alocação em meta agora gera uma transação de despesa em `transactions`, o saldo livre é `saldoInicial + totalReceitas - totalDespesas`, evitando dedução duplicada e mantendo coerência matemática precisa.

---

### 4. Critérios de Aceitação (Definition of Done)
- [ ] Inputs de saldo inicial no Onboarding e Perfil iniciam em `0` e aceitam novos valores livremente.
- [ ] Todas as alocações/aportes em metas aparecem listadas no histórico de movimentações (`Transactions.tsx`).
- [ ] Eliminação de meta com saldo estorna os fundos para o extrato como receita/resgate.
- [ ] Qualquer tentativa de registrar despesa maior que o saldo disponível é bloqueada (na UI e no Context).
- [ ] Qualquer tentativa de destinar valor a uma meta maior que o saldo disponível é bloqueada (na UI e no Context).
- [ ] Todos os botões e navegações do projeto funcionam perfeitamente sem falhas.
- [ ] Validações `rtk npm run lint` e `rtk npm run build` executam com sucesso absoluto.

---

### 5. Checklist de Implementação Passo a Passo
1. [ ] Atualizar `DEFAULT_CATEGORIES` em `frontend/src/services/db.ts` com a categoria `exp-metas` e ícone correspondente.
2. [ ] Atualizar `frontend/src/contexts/FinanceContext.tsx` com as validações de saldo negativo, integração de metas no histórico e fallback zero.
3. [ ] Atualizar `frontend/src/pages/Onboarding.tsx` e `frontend/src/pages/ProfilePage.tsx` com valores padrão zero.
4. [ ] Atualizar `frontend/src/pages/GoalsPage.tsx` e `frontend/src/pages/Transactions.tsx` com validações visuais de teto máximo (`max={saldoAtual}`).
5. [ ] Adicionar botão de acesso rápido a receitas no `frontend/src/pages/Dashboard.tsx`.
6. [ ] Validar compilação com `rtk npm run lint` e build com `rtk npm run build`.
7. [ ] Sincronizar `/docs` e encerrar com a pergunta mandatória.
