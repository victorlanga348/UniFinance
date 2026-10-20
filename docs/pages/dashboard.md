# Especificação da Rota: Dashboard Principal

Arquivo de Implementação: [`src/pages/Dashboard.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/pages/Dashboard.tsx)

---

### 1. Objetivo da Tela
Oferecer ao utilizador uma visão imediata, consolidada e sem ruído de sua saúde financeira no momento atual.

---

### 2. Componentes & Seções Principais

1. **Card de Destaque - Saldo Disponível:**
   - Exibe o valor de `saldoDisponivel` em Meticais (`MZN`).
   - Indicador de variação mensal percentual.
   - Botões de ação rápida: "Nova Receita" e "Nova Despesa" (abrem modal).
2. **Cards Secundários de Métricas:**
   - Total de Receitas Registadas no ciclo atual.
   - Total de Despesas Registadas no ciclo atual.
   - Total Guardado em Metas de Poupança (capital retido).
3. **Resumo Visual de Gastos por Categoria:**
   - Gráfico de barras ou rosca indicando a distribuição das maiores saídas.
4. **Feed de Últimas Movimentações:**
   - Lista das últimas 5 transações com data, categoria, método de pagamento e valor formatado.
   - Link para "Ver todas as movimentações".
5. **Alerta Rápido de Orçamento:**
   - Card contextual exibindo categorias que ultrapassaram 80% do teto mensal.

---

### 3. Estados da Tela
- **Loading:** Skeleton loaders animados em todos os cards numéricos.
- **Vazio:** Estado amigável para utilizador recém-cadastrado convidando a registar a primeira receita ou saldo inicial.
- **Erro:** Toast de erro via [`FinanceContext`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/contexts/FinanceContext.tsx#L206) caso o carregamento de dados falhe.
