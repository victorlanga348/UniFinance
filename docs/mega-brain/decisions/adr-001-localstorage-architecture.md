# [[decisions/adr-001-localstorage-architecture]] - Adoção Temporária de LocalStorage vs Backend Dedicado

## Status
Aceito (Fase de Transição)

## Contexto
Durante a fase inicial de prototipagem e validação da experiência de utilizador (UX) do UniFinance, era imperativo testar fluxos completos de registo, transações, orçamentos e metas sem depender imediatamente da configuração de infraestrutura pesada de banco de dados relacional.

## Decisão
Implementar um serviço singleton em [`src/services/db.ts`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/services/db.ts) (`UniFinanceDB`) que:
1. Utiliza `localStorage` como camada de armazenamento.
2. Simula latência de rede assíncrona (`networkDelay(250)`).
3. Provê contratos idênticos a uma API REST futura.

## Consequências & Trade-offs
- **Positivas:**
  - Zero dependência externa de infraestrutura no setup inicial do desenvolvedor.
  - Testes rápidos e responsivos em ambiente de desenvolvimento local.
  - Funcionamento offline intrínseco.
- **Negativas & Riscos:**
  - Dados ficam restritos ao navegador do utilizador (sem sincronização entre dispositivos).
  - Vulnerabilidade de segurança e exposição de dados caso outro script acesse o storage.
  - Necessidade de migração formal para PostgreSQL/Prisma documentada em [[debt/debt-001-insecure-auth-storage]].

## Referências Cruzadas
- Grafo Central: [[00-index]]
- Especificação de Arquitetura: [[docs/architecture/stack]]
- Nota de Dívida Técnica: [[debt/debt-001-insecure-auth-storage]]
