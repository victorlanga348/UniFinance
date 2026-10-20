# Responsividade & Adaptação Mobile / PWA - UniFinance

Este documento estabelece as diretrizes de adaptação de layout para dispositivos móveis, tablets e desktops.

---

### 1. Breakpoints Padrão (Tailwind CSS)

| Breakpoint | Prefixo | Resolução Mínima | Dispositivos Alvo |
| :--- | :--- | :--- | :--- |
| **Mobile** | Padrão | `< 640px` | Smartphones (uso prioritário em Moçambique) |
| **Small** | `sm:` | `640px` | Dispositivos móveis horizontais e phablets |
| **Medium** | `md:` | `768px` | Tablets e telas verticais |
| **Large** | `lg:` | `1024px` | Laptops e desktops |
| **Extra Large**| `xl:` | `1280px` | Monitores de alta resolução |

---

### 2. Estratégia de Navegação Mobile-First

1. **Sidebar vs Bottom Navigation:**
   - Em telas desktop (`lg:` em diante), a navegação é fixa na lateral esquerda ([`Sidebar.tsx`](file:///c:/Users/victo/OneDrive/Documentos/Github/UniFinance/src/components/Sidebar.tsx)).
   - Em telas mobile (`< 1024px`), o menu colapsa para uma barra inferior fixa (`BottomNav`) ou Drawer acessível via botão hambúrguer.
2. **Touch Targets (Áreas de Toque):**
   - Todos os botões, checkboxes e seletores de categoria devem ter dimensões mínimas de **44px × 44px** para prevenir toques acidentais em telas de toque.
3. **PWA (Progressive Web App):**
   - Ícone e manifesto configurados para exibição em tela cheia (`display: standalone`).
   - Bloqueio de zoom acidental em inputs via tipografia base de no mínimo 16px no mobile.
