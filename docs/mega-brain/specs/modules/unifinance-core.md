# [[specs/modules/unifinance-core]] - Especificação do Núcleo UniFinance

## 1. Contexto e Objetivos
Aplicação web e PWA de gestão financeira pessoal direcionada a estudantes e profissionais em Moçambique.
- Moeda padrão: `MZN` (Metical).
- Suporte a carteiras móveis nacionais: M-Pesa, e-Mola, mKesh, Cartão de Débito, Dinheiro, Transferência.

## 2. Arquitetura do Sistema
- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion + Lucide React.
- **Backend**: Express com integração de middleware de desenvolvimento Vite via `tsx server.ts`.
- **IA**: Google GenAI SDK (`@google/genai`) utilizando `gemini-3.8-flash` via endpoint `/api/ai`, com fallback para simulação offline contextual caso `GEMINI_API_KEY` não esteja presente.
- **Camada de Dados**: `src/services/db.ts` (`UniFinanceDB`) com persistência em `localStorage` e simulação de latência de rede (`networkDelay`).
- **PWA**: Manifesto configurado com suporte a instalação offline e service workers.

## 3. Contratos de Dados Principais
- `Transaction`: ID, tipo (`income` | `expense`), descrição, montante, categoria, método de pagamento, data, notas.
- `Category`: Categorias pré-definidas (`DEFAULT_CATEGORIES`) e suporte a categorias personalizadas por utilizador.
- `Budget`: Orçamentos mensais com alertas progressivos (80% e 100%+ de gastos).
- `Goal`: Metas de poupança com acompanhamento de progresso percentual e marcos (90% e 100%).
- `UserProfile`: Gestão de perfil, onboarding e preferências.

## 4. Endpoints
- `POST /api/ai`: Recebe `{ prompt: string, context: FinancialContext }` e retorna `{ reply: string }`.
  - Retorna `503 Service Unavailable` com mensagem `{ error: 'Gemini API not configured' }` quando `GEMINI_API_KEY` não está configurada no servidor.

## 5. Referências Cruzadas
- Grafo Central: [[00-index]]
- Soluções de Ambiente: [[troubleshooting/bug-001-port-3000-collision]]
