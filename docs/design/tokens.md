# Design System & Tokens Visuais - UniFinance

Este documento cataloga os tokens de estilo, cores, tipografia e diretrizes visuais do **UniFinance**, implementados via Tailwind CSS v4 em [`src/index.css`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/index.css).

---

### 1. Tipografia

Configurada através da diretiva `@theme` com foco em clareza numérica para dados financeiros:

| Token | Família Tipográfica | Uso Principal |
| :--- | :--- | :--- |
| `--font-sans` | `"Plus Jakarta Sans", sans-serif` | Textos gerais, botões, labels e cabeçalhos |
| `--font-serif` | `"Playfair Display", serif` | Títulos editoriais na landing page |
| `--font-mono` | `"JetBrains Mono", monospace` | Códigos de transação e hashes |

> **Regra Obrigatória:** Todos os valores numéricos monetários em Meticais devem utilizar a classe CSS `.tabular-nums` para alinhamento uniforme de dígitos.

---

### 2. Paleta de Cores

#### 2.1 Cores Ativas do Tema (`@theme`)
- **Primária Académica:** `#0B2545` (`--color-brand-primary`) / `#133B68` (Light)
- **Secundária Ardósia:** `#1E293B` (`--color-brand-secondary`)
- **Acento Dourado:** `#C59B27` (`--color-brand-accent`) / `#DFB239` (Light)

#### 2.2 Transição para Paleta Fintech Moderna (Conforme `review-audit-corrections.md`)
- **Superfície Base (Dark):** `#090D16` / `#0F172A`
- **Superfície Base (Light):** `#F8FAFC` / `#FFFFFF`
- **Safira Fintech (Ações Principais):** `#1E40AF` / `#2563EB`
- **Esmeralda Financeira (Receitas & Poupança):** `#059669` / `#10B981`
- **Carmesim de Alerta (Despesas & Erros):** `#E11D48`
- **Âmbar Orçamental (Avisos de 80%+):** `#D97706`

---

### 3. Modo Escuro (Dark Mode)
O modo escuro é ativado pela classe `.dark` injetada dinamicamente no elemento `<html>` pelo [`FinanceContext`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/contexts/FinanceContext.tsx#L98), persistido na chave `unifinance_theme` do `localStorage`.
