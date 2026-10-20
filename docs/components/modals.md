# Componentes de Diálogo & Modais - UniFinance

Arquivos de Implementação: [`src/components/TransactionModal.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/components/TransactionModal.tsx), `CalculatorModal.tsx`, `NotificationsModal.tsx`

---

### 1. `TransactionModal.tsx` (Lançamento de Movimento)
Responsável por registar novas receitas e despesas ou editar registros existentes.
- **Campos Obrigatórios:**
  - Seletor de Tipo: `Receita` (Verde) vs `Despesa` (Vermelho).
  - Descrição: Texto descritivo da movimentação.
  - Montante: Valor numérico positivo (`amount > 0`).
  - Categoria: Dropdown filtrado pelo tipo selecionado.
  - Método de Pagamento: `M-Pesa`, `e-Mola`, `mKesh`, `Cartão de Débito`, `Dinheiro`, `Transferência`.
  - Data: Seletor de calendário (padrão hoje).
  - Notas: Campo de texto livre opcional.
- **Regra de Bloqueio:**
  - Se o tipo for `Despesa` e o valor ultrapassar o `saldoDisponivel`, o modal deve apresentar aviso sonoro/visual e bloquear a submissão, conforme especificado na **Regra P1**.

---

### 2. Modais Secundários
- **`CalculatorModal.tsx`**: Calculadora financeira flutuante com suporte a operações aritméticas básicas e tecla de transferência direta do resultado para novos lançamentos.
- **`NotificationsModal.tsx`**: Painel lateral/modal exibindo alertas com opções de "Marcar todas como lidas" ou "Eliminar notificação individual".
