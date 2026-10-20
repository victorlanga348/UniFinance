# Componentes de Layout & Navegação - UniFinance

Arquivos de Implementação: [`src/components/AppLayout.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/components/AppLayout.tsx), [`Header.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/components/Header.tsx), [`Sidebar.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/components/Sidebar.tsx)

---

### 1. `Sidebar.tsx` (Menu Lateral)
Navegação principal em telas desktop (`lg:` em diante).
- **Links Principais:**
  - `dashboard`: Visão Geral / Dashboard.
  - `transactions`: Movimentos & Relatórios (extrato unificado).
  - `budgets`: Orçamentos Mensais.
  - `goals`: Metas de Poupança.
  - `education`: Academia Financeira.
- **Área Inferior:**
  - Perfil do utilizador ativo com nome e avatar/iniciais.
  - Alternador de tema Claro/Escuro (`toggleTheme`).
  - Botão de Terminar Sessão (`logout`).
  - Link condicional para `AdminDashboard` caso `user.role === 'ADMIN'`.

---

### 2. `Header.tsx` (Cabeçalho Superior Dinâmico)
Barra superior de ações contextuais com lógica de despoluição visual:
1. **Regra de Exibição do Saldo:**
   - O badge com o valor do saldo disponível é **ocultado** quando o utilizador está na `dashboard`, pois o painel principal já dedica um card de destaque exclusivo ao saldo.
2. **Regra de Exibição dos Botões "+ Receita" / "+ Despesa":**
   - Os botões rápidos de transação no Header são **ocultados** quando o utilizador está na página de `transactions`, onde tais controles já estão presentes no extrato.
3. **Ícones Fixos:**
   - Alternador de Moeda (MZN por padrão).
   - Sino de Notificações com badge numérico de alertas não lidos.
   - Ícone de Calculadora flutuante para contas rápidas.
