# AGENTS.md - Regras Operacionais de IA e Governança Técnica

Este repositório adota estritamente **Spec-Driven Development (SDD)**, governança matricial em `/docs` e memória técnica viva em `docs/mega-brain/`. Todos os assistentes de IA (Gemini, Antigravity, Claude, Cursor, Copilot) e desenvolvedores humanos devem obedecer às diretrizes deste documento sem exceção.

---

### 1. Princípios Invioláveis de Desenvolvimento

1. **Fonte da Verdade em `/docs` e `docs/mega-brain/`**:
   - Nenhuma linha de código deve ser escrita, modificada ou removida sem uma especificação prévia validada em `docs/` ou decisão documentada em `docs/mega-brain/decisions/`.
   - Se houver divergência entre o código e a documentação, a documentação prevalece até que uma alteração formal de especificação seja aprovada pelo utilizador.

2. **Proibição de Adivinhação e Alucinação**:
   - É estritamente proibido inventar regras de negócio, endpoints fictícios, propriedades não mapeadas ou suposições de domínio financeiro moçambicano.
   - Em caso de ambiguidade nos requisitos de cálculo (ex: saldo disponível, taxas de carteiras móveis ou dedução de metas), pare e solicite confirmação explícita.

3. **Código Cirúrgico e Economia de Tokens**:
   - Respostas de código devem ser prioritariamente no formato **Git Diff** ou snippets pontuais limitados à função ou bloco alterado.
   - Proibido reescrever arquivos inteiros sem justificativa técnica plausível.

4. **Escopo Restrito e Isolado**:
   - Não execute varreduras globais nem refatore arquivos adjacentes sem autorização prévia expressa.
   - Modifique apenas os componentes e módulos diretamente mapeados na sprint/tarefa.

---

### 2. Fluxo Obrigatório de Sprint (Ciclo de 6 Passos)

Toda tarefa deve seguir rigidamente as seguintes fases:

1. **Consulta Prévia**:
   - Consultar as especificações relevantes em `docs/specs/` ou `docs/modules/`.
   - Verificar histórico de incidentes em `docs/mega-brain/troubleshooting/` e decisões prévias em `docs/mega-brain/decisions/`.
2. **Plano de Tarefa (Spec/Task)**:
   - Elaborar a proposta baseada no template `docs/tasks/template.md`.
   - **PARAR e obter aprovação explícita do utilizador antes de tocar no código.**
3. **Implementação Incremental**:
   - Escrever o código mínimo estritamente necessário para cumprir o contrato aprovado.
4. **Validação Rigorosa em Terminal**:
   - Executar validações reais de compilação e tipagem com prefixo `rtk` (ex: `rtk npm run lint`).
   - Confirmar que não há quebras ou regressões.
5. **Sincronização de Documentação & Memória**:
   - Atualizar a matriz em `docs/documentation-governance.md`.
   - Registrar no `docs/mega-brain/troubleshooting/` qualquer falha atípica ou no `docs/mega-brain/decisions/` qualquer decisão de arquitetura.
6. **Pergunta Obrigatória de Fechamento**:
   - Ao finalizar a sprint, formular obrigatoriamente a questão:
     > *"Existe alguma alteração no projeto que não esteja refletida em /docs, no mega-brain ou no README?"*

---

### 3. Mapeamento de Ferramentas e CLI

- Todo comando de terminal deve ser executado preferencialmente com o proxy de otimização de tokens `rtk` (ex: `rtk npm run lint`, `rtk git status`).
- O servidor local deve ser validado via `backend/server.ts` na porta definida em `.env` (padrão `3001` para evitar colisão com Grafana documentada no bug 001).

---

### 4. Referências Centrais
- Matriz de Governança e Impacto: [documentation-governance.md](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/docs/documentation-governance.md)
- Template Obrigatório de Tarefas: [template.md](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/docs/tasks/template.md)
- Índice da Memória Técnica (Obsidian): [00-index.md](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/docs/mega-brain/00-index.md)
