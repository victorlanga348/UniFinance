# Auditoria de Acessibilidade (WCAG) & Segurança Zero-Trust

Este documento estabelece os padrões mandatórios de conformidade e segurança da plataforma **UniFinance**.

---

### 1. Auditoria de Segurança & Mitigação de Riscos

O diagnóstico de arquitetura identificou fragilidades operacionais que devem ser tratadas de acordo com as seguintes prioridades:

1. **Eliminação do `btoa` e Criptografia Real:**
   - O uso de `btoa(password)` no cliente é inseguro e reversível. A autenticação deve migrar para hashing irreversível com salt (`Argon2id` ou `bcrypt`) em servidor isolado.
2. **Eliminação de Credenciais em `localStorage`:**
   - Senhas e identificadores de outros utilizadores jamais devem transitar ou residir no `localStorage`.
3. **Isolamento de Dados no Banco (Multi-tenancy):**
   - As queries devem ser parametrizadas com o ID do utilizador autenticado pelo token JWT, impedindo qualquer acesso cruzado de registros.
4. **Sanitização de Inputs:**
   - Todo campo de texto (descrição, notas) deve ser validado contra XSS antes da persistência ou renderização na UI.

---

### 2. Acessibilidade (WCAG 2.1 Nível AA)

- **Contraste de Cores:**
  - Razão de contraste mínima de **4.5:1** para textos normais e **3:1** para textos grandes e componentes gráficos de interface (gráficos e bordas de inputs).
- **Navegação por Teclado:**
  - Todos os elementos interativos (links, botões, modais) devem possuir anel de foco visível (`focus-visible:ring-2 focus-visible:ring-blue-600`) e suporte completo a navegação sequencial via tecla `Tab`.
  - Fechamento de modais via tecla `Escape`.
- **Leitores de Tela:**
  - Labels acessíveis em botões que contêm apenas ícones via atributo `aria-label`.
  - Alertas dinâmicos com `aria-live="polite"` para notificações e toasts.
