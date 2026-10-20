# Catálogo de Microcópia & Mensagens (pt-MZ)

Este documento padroniza a voz, o tom e as mensagens do sistema em português de Moçambique (`pt-MZ`).

---

### 1. Voz e Tom
- **Tom Geral:** Profissional, encorajador, transparente e direto.
- **Evitar:** Jargões financeiros complexos ou termos estrangeiros desnecessários.
- **Convenções Locais:** Moeda sempre expressa como `MZN` ou `Meticais`. Utilização de terminologia bancária e de carteiras móveis corrente em Moçambique ("Propina", "Chapa", "Credelec", "M-Pesa", "Levantamento").

---

### 2. Tabela de Mensagens Padronizadas

| Identificador | Contexto | Mensagem Padrão |
| :--- | :--- | :--- |
| `ERR_SALDO_INSUFICIENTE` | Bloqueio de Despesa | *"Saldo insuficiente para efetuar este gasto. O seu saldo disponível é de {valor} MZN."* |
| `ERR_META_SALDO_EXCEDIDO` | Depósito em Meta | *"Não é possível depositar um valor superior ao seu saldo disponível atual ({valor} MZN)."* |
| `NOTIF_ORCAMENTO_80` | Alerta de Orçamento | *"Atenção! Consumiu mais de 80% do orçamento de \"{categoria}\". Gastos atuais: {gasto} de {teto} MZN."* |
| `NOTIF_ORCAMENTO_100` | Limite Atingido | *"Alerta! Atingiu exatamente 100% do seu orçamento mensal para \"{categoria}\" ({teto} MZN)."* |
| `NOTIF_ORCAMENTO_EXCEDIDO` | Limite Ultrapassado | *"Aviso de Orçamento! Ultrapassou o limite de gastos para a categoria \"{categoria}\". Excedente de {excesso} MZN."* |
| `NOTIF_META_90` | Progresso de Meta | *"Quase lá! Falta muito pouco para realizar a sua meta \"{nome}\". Já guardou {percent}% do valor objetivo! 💪"* |
| `NOTIF_META_100` | Meta Concluída | *"Parabéns! Alcançou o objetivo da sua meta \"{nome}\". Todo o valor de {alvo} MZN foi poupado com sucesso! 🎉"* |
| `AUTH_LOGIN_SUCCESS` | Login com Sucesso | *"Bem-vindo de volta, {nome}! 👋"* |
| `AUTH_LOGOUT_SUCCESS` | Término de Sessão | *"Sessão terminada com segurança. Até breve!"* |
