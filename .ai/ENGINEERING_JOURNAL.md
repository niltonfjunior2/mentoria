# ENGINEERING JOURNAL — PLATAFORMA DE MENTORIA UNIVERSITÁRIA

Este diário consolida o conhecimento técnico, decisões de campo, lições aprendidas e débitos técnicos acumulados durante as sprints de engenharia.

---

## SPRINT 1: Fundação, Tipagem e Base de Dados Estática

### 1. Problemas Encontrados
* **Problema:** Necessidade de garantir que edições manuais no arquivo JSON feitas por mantenedores não quebrem o deploy em produção.
* **Causa:** Ausência de um compilador de banco de dados ou backend para validar tipos em tempo de execução.
* **Solução:** Implementação de teste unitário com Vitest (`src/test/mentores.test.ts`) encadeado obrigatoriamente no comando de build (`npm run test && vite build`). Se o JSON estiver malformado, o deploy falha na Vercel antes de ir ao ar.

### 2. Lições Aprendidas
* **Contexto:** Definição da stack inicial com Vite + TypeScript + React 19 + Tailwind CSS.
* **Aprendizado:** A combinação do Tailwind 3.4 com Vite 6 produz um bundle minificado inferior a 15 KB de CSS e 80 KB de JS, mantendo excelente compatibilidade com PWA via `vite-plugin-pwa`.

---

## SPRINT 2: Interface Mobile-First, Busca e Contato

### 1. Problemas Encontrados
* **Problema 1: Imagens de avatar externas quebradas ou lentas.**
  * *Causa:* Links para fotos na internet podem expirar, cair ou ter bloqueio de hotlink por CORS.
  * *Solução:* Componente `MentorCard` implementou captura via `onError` do elemento `<img>`, chaveando dinamicamente para um avatar estilizado com as iniciais do mentor sobre gradiente universitário âmbar/terracota.
* **Problema 2: Busca por matérias falhando por diferenças de acentuação.**
  * *Causa:* Usuários no celular frequentemente digitam sem acento (ex: "calculo"), enquanto os dados cadastrados contêm acento ("Cálculo I").
  * *Solução:* Criação do módulo `src/utils/search.ts` com normalização via decomposição canônica Unicode (`normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()`), cobrindo 100% dos casos de acentuação.

### 2. Restrições Descobertas
* **Restrição de PWA no iOS (Safari):** O evento `beforeinstallprompt` é suportado no Chromium (Android/Chrome/Edge), mas no Safari iOS a adição à tela de início é feita manualmente via menu "Compartilhar > Adicionar à Tela de Início".
* **Impacto:** O banner automático de instalação é renderizado de forma condicional somente quando a API do navegador dispara o evento, sem poluir a interface do usuário caso não haja suporte nativo.

### 3. Lições Aprendidas
* **Deep Links do WhatsApp:** A URL canônica universal `https://wa.me/{numero}?text={mensagem_url_encoded}` funciona perfeitamente em todas as plataformas (Android, iOS e Desktop com WhatsApp Web), sem necessidade de detecção de User-Agent.

---

## SPRINT 3: PWA, Polimento Mobile e Prontidão de Deploy

### 1. Problemas Encontrados
* **Problema:** Usuários em navegadores sem suporte ao evento nativo `beforeinstallprompt` (ex: Safari no iOS) não conseguiam descobrir como instalar o PWA na tela de início.
* **Causa:** A especificação PWA no iOS não permite disparo programático do prompt de instalação via JavaScript.
* **Solução:** Implementação de uma barra superior fixa universal em destaque com o componente `InstallModal.tsx`. Ao clicar no botão, se o navegador tiver o prompt nativo (Chromium), ele o dispara; se estiver no iOS Safari ou Desktop, abre um modal visual com instruções passo a passo ilustradas.
* **Problema 2: Risco de cache persistente desatualizado de Service Worker.**
  * *Causa:* Sem cabeçalhos HTTP adequados na CDN, navegadores móveis podem manter o `sw.js` em cache por dias, atrasando atualizações de mentores.
  * *Solução:* Criação do arquivo `vercel.json` forçando `Cache-Control: public, max-age=0, must-revalidate` nos arquivos `/sw.js` e `/manifest.webmanifest`.

### 2. Lições Aprendidas
* A geração de ícones binários PNG puros (`pwa-192x192.png`, `pwa-512x512.png` e `apple-touch-icon.png`) com suporte a `purpose: any maskable` permite que o aplicativo seja instalado com ícones perfeitos tanto em celulares com ícones circulares (Android) quanto quadrados com bordas arredondadas (iOS).
* A verificação `display-mode: standalone` via `window.matchMedia` permite ocultar dinamicamente a barra de instalação quando o app já está rodando como PWA instalado.

### 3. Débitos Técnicos
* **Débitos Técnicos Pendentes:** **Zero.** Todos os débitos técnicos anteriores foram resolvidos nesta sprint.
