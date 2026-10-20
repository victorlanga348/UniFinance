# Contratos de API & Endpoints - UniFinance

Este documento documenta os endpoints de comunicação entre o cliente e o servidor.

---

### 1. Endpoints Atuais (Legado / Runtime)

#### `POST /api/ai`
Proxy seguro para o SDK `@google/genai` (utiliza modelo `gemini-3.8-flash`).
- **Headers:** `Content-Type: application/json`
- **Request Body:**
  ```json
  {
    "prompt": "Como posso economizar na propina?",
    "context": {
      "saldoAtual": 12500,
      "totalReceitas": 25000,
      "totalDespesas": 12500,
      "transactionsCount": 14,
      "goalsCount": 2,
      "budgetsCount": 4
    }
  }
  ```
- **Response 200 OK:**
  ```json
  {
    "reply": "Texto de resposta contextualizado em português de Moçambique..."
  }
  ```
- **Response 503 Service Unavailable:**
  ```json
  {
    "error": "Gemini API not configured"
  }
  ```
- *Nota de Arquitetura:* Este endpoint está planeado para descontinuação formal conforme registrado em `mega-brain/decisions/adr-002-descontinuacao-ia-chatbot.md`.

---

### 2. Endpoints Alvo para Transição para Banco de Dados Relacional (`/api/v1`)

| Método | Rota | Descrição | Autenticação Requerida |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/v1/auth/register` | Criação de conta com hash seguro | Não |
| `POST` | `/api/v1/auth/login` | Login e emissão de tokens de sessão | Não |
| `POST` | `/api/v1/auth/logout` | Revogação do refresh token | Sim |
| `GET` | `/api/v1/users/me` | Obter perfil e saldo inicial | Sim (`USER`) |
| `GET` | `/api/v1/transactions` | Listar transações com filtros e paginação | Sim (`USER`) |
| `POST` | `/api/v1/transactions` | Criar nova receita ou despesa | Sim (`USER`) |
| `PUT` | `/api/v1/transactions/:id`| Atualizar transação existente | Sim (`USER`) |
| `DELETE`| `/api/v1/transactions/:id`| Eliminar transação | Sim (`USER`) |
| `GET` | `/api/v1/budgets` | Obter orçamentos e percentual consumido | Sim (`USER`) |
| `PUT` | `/api/v1/budgets/:catId` | Definir ou atualizar teto de categoria | Sim (`USER`) |
| `GET` | `/api/v1/goals` | Obter metas de poupança | Sim (`USER`) |
| `POST` | `/api/v1/goals/:id/deposit`| Depositar valor em meta com dedução de saldo | Sim (`USER`) |
| `GET` | `/api/v1/admin/stats` | Métricas consolidadas da plataforma | Sim (`ADMIN`) |
