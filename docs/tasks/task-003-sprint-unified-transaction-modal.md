# TASK-3-001: Modal Unificado de Lançamentos (Adicionar / Tirar Dinheiro) e Limpeza do Header

---

### Metadados da Tarefa
- **ID da Tarefa:** `TASK-3-001`
- **Data:** 2026-10-20
- **Sprint:** Sprint 3
- **Trilha:** Trilha C (Frontend, UI/UX & Interações)
- **Responsável:** Antigravity / Gemini
- **Specs Afetadas em `/docs/`:**
  - `docs/pages/dashboard.md`
  - `docs/components/layout.md`
  - `docs/documentation-governance.md`
- **Notas Afetadas em `mega-brain/`:**
  - `docs/mega-brain/specs/modules/review-audit-corrections.md`
  - `docs/mega-brain/00-index.md`

---

### 1. Contexto e Problema
1. **Poluição Visual no Header:**
   - Os botões `+ Receita` e `+ Despesa` no cabeçalho superior ([Header.tsx](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/components/Header.tsx)) duplicam opções de navegação e sobrecarregam o topo da tela. Devem desaparecer conforme solicitação do utilizador.
2. **Redirecionamento Inconveniente no Banner do Dashboard:**
   - O primeiro botão do banner no Dashboard ([Dashboard.tsx](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/frontend/src/pages/Dashboard.tsx)) exibe texto duplicado `+ + Adicionar Receita / Saldo` e redireciona o utilizador para a página `/transactions` (`setActivePage('transactions')`).
3. **Necessidade de Modal Unificado no Próprio Dashboard:**
   - O utilizador quer registar receitas ou despesas ali mesmo no Dashboard sem sair da página.
   - O modal deve conter abas ou seletores claros para:
     - **Adicionar Dinheiro:** Receita / Entrada de liquidez.
     - **Tirar Dinheiro:** Despesa / Saída de valores com validação estrita contra o `saldoAtual`.

---

### 2. Solução Proposta & Mudanças Técnicas

#### A. Criação de Componente Modal Reutilizável: `frontend/src/components/TransactionModal.tsx`
- Componente modal acessível, responsivo e contextualizado para Moçambique:
  - **Tabs de Seleção no Topo:** `+ Adicionar Dinheiro (Receita)` e `- Tirar Dinheiro (Despesa)`.
  - **Campos do Formulário:**
    - Descrição da operação (ex: "Bolsa de Estudos", "Recarga M-Pesa", etc.).
    - Montante em MZN com formatação e validação de valor positivo.
    - Categoria contextual (filtrada conforme a aba ativa: receitas ou despesas).
    - Método de Pagamento (M-Pesa, e-Mola, mKesh, Dinheiro em Carteira, Transferência Bancária, Cartão).
    - Data da transação.
    - Notas/observações adicionais.
  - **Regra Determinística de Saldo (Anti-Negativo):**
    - Se a aba for "Tirar Dinheiro" (despesa), bloqueia o envio caso `montante > saldoAtual`, exibindo aviso visual de saldo livre insuficiente.
  - **Feedback e Atualização:**
    - Dispara `addTransaction` do `FinanceContext`, exibe toast animado de sucesso e atualiza em tempo real o saldo e histórico do Dashboard sem recarregar a página.

#### B. Limpeza do Header: `frontend/src/components/Header.tsx`
- Remoção do bloco de botões `+ Receita` e `+ Despesa` (linhas 117-135).
- Manutenção do indicador de saldo (quando fora do Dashboard), botão PWA, notificações e avatar.

#### C. Integração no Banner do Dashboard: `frontend/src/pages/Dashboard.tsx`
- Remoção do texto duplicado `+ +`.
- O botão passa a chamar `setIsTxModalOpen(true)` diretamente, mantendo o utilizador no Dashboard.
- Rótulo claro: `+ Registar Movimento` (com badge de suporte para Adicionar / Tirar).
- Inclusão do `<TransactionModal isOpen={isTxModalOpen} onClose={() => setIsTxModalOpen(false)} />`.

---

### 3. Análise de Trade-offs & Riscos
- **Vantagens:** Experiência de uso instantânea e sem atrito para lançamentos rápidos direto no painel principal; eliminação de poluição no topo da interface; validação consistente de saldo.
- **Riscos / Mitigações:** Manter a consistência de categorias e métodos de pagamento centralizados no `FinanceContext` para evitar discrepâncias com a tela de histórico.

---

### 4. Critérios de Aceitação (Definition of Done)
- [ ] Botões `+ Receita` e `+ Despesa` removidos do cabeçalho.
- [ ] Primeiro botão do banner do Dashboard abre o modal diretamente na tela sem redirecionar para outra página.
- [ ] Modal contém opção de "Adicionar Dinheiro" e "Tirar Dinheiro" com alternância fluida.
- [ ] Validação de saldo impede registar despesas superiores ao `saldoAtual`.
- [ ] `rtk npm run lint` e `rtk npm run build` compilam com código 0.
