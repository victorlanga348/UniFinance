# [[specs/modules/review-audit-corrections]] - Correções Críticas de Lógica, UX e Identidade Visual

## 1. Contexto e Motivação
Revisão pós-auditoria crítica da plataforma UniFinance.
**Escopo da Sprint Atual**: Opção 1 (Front-end, UX, unificação de telas e remoção de AI slop / Chatbot, mantendo a paleta de cores atual inalterada conforme solicitação do usuário).

---

## 2. Especificação de Regras de Negócio & Lógica Financeira

### 2.1 Dedução e Registro de Metas no Histórico de Transações
- **Comportamento Concluído (TASK-2-001)**:
  - `saldoDisponivel = saldoInicial + totalReceitas - totalDespesas`
  - Toda operação de poupança/depósito em meta (`depositToGoal` ou `addGoal` com saldo inicial) cria um lançamento formal no histórico de transações (`categoryId: 'exp-metas'`), abatendo o montante da liquidez imediatamente.
  - Eliminação de meta com fundos acumulados estorna automaticamente o capital para o saldo livre através de uma receita de resgate (`income`).
  - Inputs monetários iniciam em `0` MZN, permitindo aportes e reajustes flexíveis.

### 2.2 Bloqueio de Depósitos Superiores ao Saldo
- **Comportamento Atual**: É possível depositar qualquer quantia na meta, mesmo com saldo zerado ou insuficiente.
- **Novo Contrato**:
  - Validação estrita: `if (montanteADepositar > saldoDisponivel) throw new Error('Saldo insuficiente para destinar a esta meta.')`
  - Feedback visual no input (`max={saldoDisponivel}`) com alerta e desativação do botão de submissão caso o montante ultrapasse o saldo livre.

### 2.3 Prevenção de Saldo Negativo
- **Comportamento Atual**: É possível registar despesas de qualquer montante, deixando o saldo com valores negativos arbitrários sem restrição.
- **Novo Contrato**:
  - Como o UniFinance é desenhado prioritariamente para carteiras móveis (M-Pesa, e-Mola, mKesh) e dinheiro líquido em Moçambique (onde não há facilidade de descoberto bancário automático), qualquer despesa que exceda o `saldoDisponivel` deve ser bloqueada ou exigir confirmação explícita de exceção com aviso sonoro/visual. Regra padrão: bloqueio com mensagem "Saldo insuficiente para efetuar este gasto".

---

## 3. Otimização de Interface (Front-end) & Eliminação de Redundâncias

### 3.1 Unificação de "Movimentos" e "Relatórios"
- **Comportamento Atual**: A barra lateral possui 9 links, incluindo "Movimentações", "Registar Receita", "Registar Despesa" e "Relatórios", gerando duplicação massiva de tabelas e formulários.
- **Novo Contrato**:
  - Eliminar os ficheiros redundantes `src/pages/IncomePage.tsx` e `src/pages/ExpensePage.tsx`.
  - Criar página consolidada: `Movimentos & Relatórios` contendo abas internas:
    1. **Extrato & Lançamentos**: Listagem com busca, filtros por categoria/método e abertura de modal para Nova Receita / Nova Despesa.
    2. **Relatórios & Análise**: Distribuição gráfica de gastos por categoria, taxa de poupança e evolução temporal.
  - Reduzir o menu de navegação, tornando o sidebar compacto e limpo.

### 3.2 Otimização do Cabeçalho (Header)
- **Comportamento Atual**:
  - O saldo aparece repetido no Header mesmo quando o utilizador está na Dashboard (que já tem um card de destaque para o saldo).
  - Os botões "+ Receita" e "+ Despesa" são exibidos no Header mesmo quando o utilizador já está dentro da tela de movimentos.
- **Novo Contrato**:
  - Ocultar o mostrador de saldo no Header quando `activePage === 'dashboard'`.
  - Ocultar botões de transação rápida no Header quando o utilizador estiver na página de transações/movimentações.

### 3.3 Limpeza de Ficheiros Órfãos
- Exclusão do arquivo não utilizado: `src/assets/images/unifinance_icon_1790337620102.jpg`.
- Remoção de imports gerais `import * as Icons from 'lucide-react'` para reduzir o bundle size de 1MB para menos de 400KB.

---

## 4. Descontinuação do Chatbot & Foco em Educação Financeira

### 4.1 Remoção do Chatbot
- Remover `src/pages/AIAssistantPage.tsx`.
- Desativar o endpoint `/api/ai` e remover dependência `@google/genai`.
- Retirar referências e atalhos em `Header.tsx`, `Sidebar.tsx`, `AppLayout.tsx`, `Landing.tsx` e `metadata.json`.

### 4.2 Fortalecimento da Academia UniFinance (`EducationPage.tsx`)
- Manter e enriquecer a secção educativa com artigos práticos, simuladores de poupança/orçamento (sem dependência de APIs externas) e regras financeiras adaptadas a Moçambique.

---

## 5. Nova Identidade Visual & Eliminação de Elementos Genéricos de IA

### 5.1 Paleta de Cores
- **Decisão do Utilizador**: Mantida a paleta de cores original da aplicação sem alterações. Nenhuma modificação foi efetuada em `--color-brand-primary` ou `--color-brand-accent`.

### 5.2 Remoção de Imagens e Estilos Genéricos de IA
- Remover o background externo da Getty Images / Unifor na Landing page e aplicar uma malha sutil em CSS/SVG com gradientes semitransparentes.
- Eliminar classes inválidas de Tailwind (`text-slate-855`, `text-rose-650`, `text-slate-350`).
- Revisar toda a microcópia para soar autêntica, humana e contextualizada.

---

## 6. Grafo e Referências
- Índice Principal: [[00-index]]
- Especificação Geral: [[specs/modules/unifinance-core]]
