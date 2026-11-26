# PRODUCT BACKLOG — PLATAFORMA DE MENTORIA UNIVERSITÁRIA

Status geral atualizado após a conclusão da **Sprint 3**. Todas as User Stories do backlog foram 100% concluídas e validadas.

---

## ÉPICO 1: FUNDAÇÃO E ESTRUTURAÇÃO DO PROJETO (ENABLER)

### Feature 1.1: Setup da Aplicação e Configurações Base
* **[CONCLUÍDO] US 1.1.1 — Inicialização do Projeto React + Vite + Tailwind**
  * Projeto configurado com Vite 6, React 19, TypeScript estrito e Tailwind CSS com tema universitário.
* **[CONCLUÍDO] US 1.1.2 — Configuração e Manifesto PWA**
  * `vite-plugin-pwa` configurado com Workbox, Service Worker com precache de 13 arquivos essenciais, ícones binários (`pwa-192x192.png`, `pwa-512x512.png`, `apple-touch-icon.png`), barra fixa no topo e modal com instruções multiplataforma (iOS/Android/Desktop).

---

## ÉPICO 2: GESTÃO DE DADOS E VALIDAÇÃO ESTÁTICA

### Feature 2.1: Modelagem e Validação dos Dados dos Mentores
* **[CONCLUÍDO] US 2.1.1 — Definição do Schema e Arquivo Canônico de Mentores**
  * Arquivo canônico em `src/data/mentores.json` com interface TypeScript `Mentor` em `src/types/mentor.ts`.
* **[CONCLUÍDO] US 2.1.2 — Script de Teste e Validação de Integridade do JSON**
  * Teste unitário em `src/test/mentores.test.ts` cobrindo IDs únicos, campos obrigatórios, regras de WhatsApp e e-mail.

---

## ÉPICO 3: EXPERIÊNCIA DO ESTUDANTE (BUSCA E CONTATO)

### Feature 3.1: Interface Universitária e Busca Instantânea
* **[CONCLUÍDO] US 3.1.1 — Cabeçalho e Identidade Visual Universitária Acolhedora**
  * Componente `Header.tsx` estilizado com tipografia alegre, ícones acadêmicos e mensagem acolhedora.
* **[CONCLUÍDO] US 3.1.2 — Campo de Busca Instantâneo por Matéria**
  * Componente `SearchBar.tsx` com busca reativa, limpeza rápida com `X`, normalização insensível a acentos (`normalizeText`) e componente `EmptyState.tsx` para buscas sem retorno.

### Feature 3.2: Cartão de Mentor e Canais de Contato
* **[CONCLUÍDO] US 3.2.1 — Cartão de Exibição do Mentor**
  * Componente `MentorCard.tsx` com foto/iniciais, nome, curso, semestre, chips de matérias com realce visual dinâmico do termo pesquisado.
* **[CONCLUÍDO] US 3.2.2 — Acionamento Direto via WhatsApp e E-mail**
  * Botão direto para WhatsApp com mensagem personalizada introdutória e botão de e-mail com assunto pronto.

---

## ÉPICO 4: PUBLICAÇÃO E DEPLOYMENT CONTÍNUO

### Feature 4.1: Deploy Automatizado na Vercel
* **[CONCLUÍDO] US 4.1.1 — Configuração de CI/CD e Publicação Gratuita**
  * Arquivo `vercel.json` com regras de regravação SPA e cabeçalhos de controle de cache HTTP. Script de build com trava de segurança de testes (`npm run test && vite build`).
