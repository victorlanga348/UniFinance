# Especificação da Rota: Movimentos & Relatórios (Unificada)

Arquivos de Implementação: [`src/pages/Transactions.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/pages/Transactions.tsx) e [`ReportsPage.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/pages/ReportsPage.tsx)

---

### 1. Objetivo da Tela
Unificar em uma única experiência coerente o histórico detalhado de movimentações (entradas/saídas) e a análise visual de relatórios financeiros, eliminando telas redundantes (`IncomePage` e `ExpensePage`).

---

### 2. Estrutura em Abas (Tabs)

#### Aba 1: Extrato & Lançamentos
- **Barra de Controle & Filtros:**
  - Campo de busca por texto (descrição ou notas).
  - Filtro por Tipo: `Todos`, `Receitas`, `Despesas`.
  - Filtro por Método de Pagamento (`M-Pesa`, `e-Mola`, `mKesh`, `Dinheiro`, `Cartão`, `Transferência`).
  - Filtro por Período / Mês.
- **Tabela / Lista Responsiva:**
  - Colunas: Data, Tipo/Ícone, Descrição, Categoria, Meio de Pagamento, Valor (`.tabular-nums`) e Ações (Editar / Eliminar).
  - Em telas mobile, renderiza cartões compactos em vez de tabela ampla.
- **Botões de Ação:**
  - "+ Lançar Movimento": Abre modal com seletor de tipo.

#### Aba 2: Relatórios & Distribuição
- **Gráficos Financeiros:**
  - Evolução mensal de Receitas vs Despesas.
  - Distribuição percentual de gastos por categoria.
  - Taxa de Poupança (Savings Rate).
- **Exportação:**
  - Exportação de extrato em formato CSV para conferência académica ou pessoal.
