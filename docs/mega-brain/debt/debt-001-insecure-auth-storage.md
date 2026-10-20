# [[debt/debt-001-insecure-auth-storage]] - Riscos de Autenticação com btoa e Armazenamento em LocalStorage

## Severidade
Alta (Crítica para Produção)

## Sintoma & Diagnóstico
1. **Hashing Inseguro:** O frontend em [`Login.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/pages/Login.tsx#L29) utiliza `btoa(password)` para simular o hash da senha do utilizador. Como `btoa` é apenas codificação Base64, qualquer terceiro consegue decodificar a senha original com `atob()`.
2. **Exposição em LocalStorage:** As credenciais de todos os utilizadores registados na máquina são armazenadas em texto simples sob a chave `unifinance_credentials` no `localStorage`.
3. **Isolamento de Dados no Cliente:** As consultas filtram os registros pelo ID do utilizador ativo apenas em memória via JavaScript (`.filter(tx => tx.userId === userId)`), expondo todos os registros no storage local.

## Plano de Remediação (Trilha A)
1. Implementar backend Node.js/Express com rota `POST /api/v1/auth/register` e `POST /api/v1/auth/login`.
2. Aplicar algoritmo de hashing `argon2id` ou `bcrypt` com salt aleatório no servidor.
3. Utilizar cookies seguros `HttpOnly` com flags `SameSite=Strict` e `Secure` para armazenamento de tokens de sessão.
4. Migrar dados para banco relacional PostgreSQL com isolamento direto no SQL.

## Referências Cruzadas
- Grafo Central: [[00-index]]
- Decisão Arquitetural: [[decisions/adr-001-localstorage-architecture]]
- Auditoria de Segurança: [[docs/audits/accessibility-and-security]]
