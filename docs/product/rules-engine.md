# Motor de Regras de Negócio & Validações Financeiras (P0-P5)

Este documento define as regras lógicas e restrições matemáticas que governam a integridade do **UniFinance**.

---

### Regra P0: Fórmula de Saldo Disponível & Dedução de Metas
> **Prioridade Máxima (Integridade de Caixa)**

O capital guardado em metas de poupança não pode estar livre para gastos correntes.
$$\text{Saldo Disponível} = \text{Saldo Inicial} + \text{Total Receitas} - \text{Total Despesas} - \text{Total Destinado a Metas}$$

- **Onde:**
  - $\text{Total Destinado a Metas} = \sum_{g \in \text{Goals}} g.\text{currentAmount}$
  - As receitas do tipo "Saldo Inicial Registado" não são somadas em duplicidade se `saldoInicial` já estiver configurado no perfil.

---

### Regra P1: Bloqueio Estrito de Despesas sem Saldo (Sem Cheque Especial)
No ecossistema financeiro moçambicano, contas de carteira móvel (M-Pesa, e-Mola, mKesh) e cartões de débito de estudantes operam estritamente com base em liquidez disponível pré-paga:
- **Validação:**
  $$\text{Se } \text{montanteDespesa} > \text{Saldo Disponível} \implies \text{LANÇAR ERRO}$$
- **Mensagem:** *"Saldo insuficiente para efetuar este gasto. O saldo livre atual é de X MZN."*

---

### Regra P2: Bloqueio de Aportes em Metas Superiores ao Saldo
Nenhum utilizador pode alocar capital a uma meta se o montante exceder a liquidez livre:
- **Validação no Depósito:**
  $$\text{Se } \text{valorADepositar} > \text{Saldo Disponível} \implies \text{LANÇAR ERRO}$$
- **Interface:** O campo de input de depósito deve ter a propriedade `max={saldoDisponivel}` e desabilitar o botão de confirmação quando excedido.

---

### Regra P3: Gatilhos Progressivos de Orçamento Mensal
A cada transação de saída (`expense`), o sistema recalcula o montante consumido pela categoria no mês civil corrente:
- **Nível 1 (Atenção - 80% a 99%):** Dispara notificação do tipo `warning`:
  > *"Atenção! Consumiu mais de 80% do orçamento de {Categoria}. Gastos atuais: {Gasto} de {Teto} MZN."*
- **Nível 2 (Excedido - 100%+):** Dispara notificação do tipo `danger`:
  > *"Aviso de Orçamento! Ultrapassou o limite de gastos para {Categoria}. Excedente de {Excesso} MZN."*

---

### Regra P4: Marcos Progressivos de Metas de Poupança
A cada aporte em meta de poupança:
- **Marco de 90%:** Notificação do tipo `info`:
  > *"Quase lá! Falta muito pouco para realizar a sua meta {Nome}. Já guardou 90% do valor objetivo!"*
- **Marco de 100% (Conclusão):** Notificação do tipo `success`:
  > *"Parabéns! Alcançou o objetivo da sua meta {Nome}. Todo o valor de {Alvo} MZN foi poupado com sucesso! 🎉"*

---

### Regra P5: Idempotência e Prevenção de Duplicações
- **Notificações:** O sistema impede a geração de notificações repetidas idênticas e não lidas para o mesmo evento.
- **Categorias:** É proibido criar categorias com o mesmo nome e tipo para o mesmo utilizador.
