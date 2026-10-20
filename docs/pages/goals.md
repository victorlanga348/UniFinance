# Especificação da Rota: Metas de Poupança (Goals)

Arquivo de Implementação: [`src/pages/GoalsPage.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/pages/GoalsPage.tsx)

---

### 1. Objetivo da Tela
Gerir objetivos de poupança financeira (ex: "Fundo de Reserva / Emergência", "Comprar Computador Portátil", "Propina Semestral"), assegurando que o capital poupado fique retido e protegido de despesas impulsivas.

---

### 2. Componentes & Funcionalidades

1. **Card Consolidado de Poupança:**
   - Total Acumulado em Metas de Poupança (`totalDestinadoMetas`).
   - Quantidade de metas em andamento e metas concluídas.
2. **Lista/Grid de Metas:**
   - Cada meta exibe:
     - Nome da meta e categoria.
     - Valor atual acumulado (`currentAmount`) vs Valor Alvo (`targetAmount`).
     - Barra de progresso percentual e data limite (deadline).
     - Botão "+ Depositar": Abre modal para alocar mais recursos à meta.
     - Ações secundárias: Editar valores ou eliminar meta.
3. **Modal de Depósito em Meta:**
   - Input de montante a guardar.
   - **Restrição Estrita:** O valor máximo do input é travado em `saldoDisponivel`. O botão de submissão fica desabilitado se o utilizador tentar transferir mais do que possui livre em conta.
4. **Modal de Criação / Edição de Meta:**
   - Nome, valor pretendido, aporte inicial opcional (sujeito à validação de saldo livre) e prazo.

---

### 3. Integração com Regras de Negócio
- Conecta-se às **Regras P0, P2 e P4** documentadas em [`docs/product/rules-engine.md`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/docs/product/rules-engine.md).
