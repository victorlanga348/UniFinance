# Template de Planejamento de Tarefa (Spec / Task)

> **Regra Obrigatória:** Toda alteração de código deve ser precedida por este documento devidamente preenchido e aprovado explicitamente pelo utilizador.

---

### Metadados da Tarefa
- **ID da Tarefa:** `TASK-<SPRINT>-<NUMERO>` (ex: `TASK-1-001`)
- **Data:** AAAA-MM-DD
- **Sprint:** Sprint X
- **Trilha:** Trilha A (Backend & DB) | Trilha B (Regras & Core) | Trilha C (Frontend & UI)
- **Responsável:** Desenvolvedor / Assistente de IA
- **Specs Afetadas em `/docs/`:**
  - `docs/...`
- **Notas Afetadas em `mega-brain/`:**
  - `mega-brain/...`

---

### 1. Contexto e Problema
*Descreva com clareza a deficiência, bug, vulnerabilidade ou nova funcionalidade que motiva esta tarefa.*
- **Comportamento Atual:** Como o UniFinance se comporta hoje.
- **Comportamento Esperado:** O que deve acontecer após a conclusão.

---

### 2. Solução Proposta & Mudanças Técnicas
*Descreva a intervenção de forma cirúrgica (arquivos a alterar, funções impactadas e novos contratos).*
- **Arquivos Afetados:**
  - `src/...`
- **Detalhamento das Mudanças:**

---

### 3. Análise de Trade-offs & Riscos
- **Vantagens da Solução:**
- **Desvantagens / Limitações Conhecidas:**
- **Riscos de Segurança & Integridade Financeira:**
- **Mitigação Adotada:**

---

### 4. Critérios de Aceitação (Definition of Done)
- [ ] O código cumpre estritamente o contrato especificado sem introduzir efeitos colaterais.
- [ ] Nenhuma despesa ou dedução de meta viola a regra de `saldoDisponivel`.
- [ ] Validação no terminal executada com sucesso (`rtk npm run lint` e testes se aplicável).
- [ ] Matriz de impacto em `docs/documentation-governance.md` atualizada.
- [ ] Memória técnica registrada em `mega-brain/` (se houver ADR, bug ou dívida técnica).

---

### 5. Checklist de Implementação Passo a Passo
1. [ ] Criação / Atualização dos tipos em `src/types/finance.ts` (se aplicável).
2. [ ] Implementação da lógica no serviço ou contexto.
3. [ ] Atualização dos componentes de interface e tratamento de erros.
4. [ ] Verificação e validação no terminal via `rtk`.
5. [ ] Sincronização da documentação e encerramento com a pergunta mandatória.
