# Especificação da Rota: Orçamentos Mensais

Arquivo de Implementação: [`src/pages/BudgetsPage.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/pages/BudgetsPage.tsx)

---

### 1. Objetivo da Tela
Permitir que o utilizador configure e monitore tetos de gastos mensais para categorias específicas de despesas (ex: Alimentação, Transporte, Comunicação/Recargas, Internet).

---

### 2. Componentes & Funcionalidades

1. **Card Resumo de Orçamento Global:**
   - Montante Total Orçado vs Montante Total Consumido no mês atual.
   - Barra de progresso geral e saldo orçamentário restante.
2. **Grid de Cartões de Orçamento por Categoria:**
   - Cada cartão exibe:
     - Nome e ícone da categoria.
     - Barra de progresso visual com cores dinâmicas:
       - **Verde (< 80%):** Consumo seguro.
       - **Âmbar (80% - 99%):** Alerta de atenção.
       - **Vermelho (>= 100%):** Teto ultrapassado com indicador de excesso em MZN.
     - Valor gasto vs Valor planeado.
     - Botão de edição de teto ou remoção do orçamento.
3. **Modal de Novo Orçamento / Edição:**
   - Seleção de categoria (filtra categorias de despesa que ainda não possuem orçamento ativo).
   - Input monetário com validação (`amount > 0`).

---

### 3. Integração com Regras de Negócio
- Conecta-se diretamente à **Regra P3** documentada em [`docs/product/rules-engine.md`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/docs/product/rules-engine.md), disparando notificações persistentes no sistema quando os limites são atingidos.
