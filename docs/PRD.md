# PRD - Product Requirements Document (UniFinance)

---

### 1. Visão Geral do Produto
O **UniFinance** é uma plataforma progressiva (Web e PWA) de gestão financeira pessoal e académica concebida especificamente para o contexto socioeconómico de Moçambique.

- **Público-Alvo Principal:** Estudantes universitários, docentes e jovens profissionais.
- **Moeda Base:** Metical Moçambicano (`MZN`).
- **Meios de Transação Suportados:** Carteiras móveis nacionais (M-Pesa, e-Mola, mKesh), Cartão de Débito, Transferência Bancária e Dinheiro Líquido.

---

### 2. Problema e Proposta de Valor
1. **Falta de Ferramentas Contextualizadas:** Softwares internacionais não reconhecem carteiras móveis moçambicanas nem a realidade académica (propinas semestrais, bolsas de estudo, mesadas, pagamentos Credelec).
2. **Descontrole Financeiro Académico:** Estudantes têm dificuldade em separar o saldo líquido para despesas diárias (chapa, alimentação, fotocópias) do montante reservado para propinas ou poupanças para aquisição de equipamentos (computador portátil).
3. **Proposta UniFinance:** Uma interface intuitiva, rápida e responsiva que calcula o saldo realmente disponível com dedução imediata de metas reservadas, emite alertas progressivos de orçamento e ensina boas práticas de finanças pessoais.

---

### 3. Módulos Funcionais Principais

#### 3.1 Gestão de Caixa & Transações
- Registo de receitas e despesas com descrição, montante, categoria, método de pagamento, data e notas.
- Categorização com ícones temáticos e distinção clara entre despesas fixas e variáveis.
- Cálculo de saldo disponível em tempo real:
  $$\text{Saldo Disponível} = \text{Saldo Inicial} + \sum \text{Receitas} - \sum \text{Despesas} - \sum \text{Montante Guardado em Metas}$$

#### 3.2 Metas de Poupança (Goals)
- Criação de metas com valor objetivo, valor atual e data limite.
- Dedução imediata do saldo disponível no ato de criação ou aporte na meta (`depositToGoal`).
- Notificações de incentivo aos 90% e 100% do objetivo alcançado.

#### 3.3 Orçamentos Mensais (Budgets)
- Definição de teto de gastos por categoria mensal.
- Monitorização contínua com gatilhos automáticos:
  - **Atenção (80% a 99%):** Alerta amarelo de proximidade do teto.
  - **Crítico (100%+):** Alerta vermelho informando o montante excedido.

#### 3.4 Academia UniFinance (Educação Financeira)
- Artigos práticos, guias sobre como otimizar uso de carteiras móveis em Moçambique e simuladores determinísticos de poupança/juros sem dependência de serviços externos.

#### 3.5 PWA & Utilização Offline
- Manifesto configurado com suporte para instalação em smartphones e funcionamento em rede instável via Service Worker.

---

### 4. Requisitos Não Funcionais & Segurança
- **Performance:** Tempo de carregamento inferior a 1.5s em redes 3G/4G locais.
- **Privacidade e Proteção de Dados:** Roadmap prioritário para migração do `localStorage` para banco de dados relacional com criptografia de ponta a ponta e RBAC.
