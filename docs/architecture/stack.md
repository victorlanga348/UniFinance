# Stack Tecnológica & Infraestrutura - UniFinance

Este documento descreve as tecnologias ativas no repositório, o runtime do servidor e a estratégia de infraestrutura.

---

### 1. Camada de Frontend (Client-Side)

- **Framework Core:** [React 19](https://react.dev/) (`19.0.1`) com `react-dom` (`19.0.1`).
- **Linguagem & Tipagem:** [TypeScript](https://www.typescriptlang.org/) (`7.0.2`) com compilação estrita e verificação via `tsc --noEmit`.
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/) (`8.3.0`) com `@vitejs/plugin-react` (`6.1.1`).
- **Estilização & Design System:** [Tailwind CSS v4](https://tailwindcss.com/) (`4.3.3`) integrado através do `@tailwindcss/vite` (`4.3.3`) e `autoprefixer` (`10.4.21`).
- **Animações & Microinterações:** [Motion](https://motion.dev/) (`12.23.24`) para transições fluidas de abas, modais e cards.
- **Iconografia:** [Lucide React](https://lucide.dev/) (`0.546.0`) com importações nomeadas específicas para otimização de bundle.

---

### 2. Camada de Backend & Runtime

- **Servidor:** [Express](https://expressjs.com/) (`4.21.2`) executado via [`server.ts`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/server.ts).
- **Runtime de Desenvolvimento:** [tsx](https://github.com/privatenumber/tsx) (`4.21.0`) para execução de TypeScript em tempo real sem build prévio.
- **Integração Vite-Express:** O servidor Express instancia o Vite em modo middleware de desenvolvimento (`server.middlewareMode = true`), servindo assets e páginas SPA dinamicamente.
- **Ambiente & Portas:** Carregamento de variáveis via [dotenv](https://github.com/motdotla/dotenv) (`17.2.3`). Porta padrão configurada no `.env` para `PORT=3001` (evitando conflito com Grafana na 3000).

---

### 3. Camada de Dados & Persistência

- **Estado Atual (Transição):**
  - Implementada em [`src/services/db.ts`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/services/db.ts) através do singleton `UniFinanceDB`.
  - Persistência estruturada em `localStorage` com simulação de latência assíncrona (`networkDelay(250)`).
- **Roadmap de Migração (Produção):**
  - Banco de dados relacional PostgreSQL.
  - ORM Prisma ou Drizzle para migrações atômicas e integridade referencial.
  - Rotas de API REST seguras sob `/api/v1/*`.
