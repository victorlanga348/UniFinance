# [[decisions/adr-002-descontinuacao-ia-chatbot]] - Descontinuação do Chatbot e Fortalecimento da Educação Financeira

## Status
Aceito (Planejado para Implementação na Trilha C)

## Contexto
O UniFinance possuía uma integração com o SDK Google GenAI (`@google/genai`) via endpoint `/api/ai` e página dedicada `AIAssistantPage.tsx`. No entanto, em testes práticos, o assistente gerava respostas genéricas ("AI slop"), onerava o backend com dependência de chaves de API pagas e trazia risco de alucinação de regras financeiras contextuais de Moçambique.

## Decisão
1. Descontinuar a página `AIAssistantPage.tsx` e o endpoint `/api/ai`.
2. Remover a dependência de `@google/genai` do `package.json`.
3. Redirecionar os esforços para a **Academia UniFinance** (`EducationPage.tsx`), fornecendo artigos objetivos e simuladores matemáticos determinísticos de poupança e orçamento sem custos de tokens.

## Consequências & Trade-offs
- **Positivas:**
  - Redução imediata do tamanho do bundle e do consumo de memória.
  - Eliminação de custos recorrentes com chamadas de IA generativa.
  - Informações financeiras 100% determinísticas, auditáveis e adaptadas à realidade moçambicana.
- **Negativas:**
  - Perda de um assistente de conversação em linguagem natural.

## Referências Cruzadas
- Grafo Central: [[00-index]]
- Especificação de Correções: [[specs/modules/review-audit-corrections]]
- Rota de Educação: [[docs/pages/education]]
