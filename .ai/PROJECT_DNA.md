# PROJECT DNA — PLATAFORMA DE MENTORIA UNIVERSITÁRIA

## 1. Visão do Projeto
Criar uma vitrine web mobile-first alegre, acolhedora e calorosa no estilo universitário, que conecte estudantes a mentores acadêmicos por matéria. O sistema funciona como um diretório público e instalável (PWA) de alta velocidade, permitindo que estudantes encontrem apoio rapidamente e acionem mentores diretamente via WhatsApp ou E-mail, com custo zero de infraestrutura e zero banco de dados gerenciado.

## 2. Objetivos
* **Objetivo de Negócio:** Reduzir a barreira de entrada e o isolamento de estudantes universitários que precisam de suporte em matérias desafiadoras, facilitando a ponte com colegas e mentores capacitados.
* **Critério de Sucesso:** Busca instantânea por matéria, carregamento em menos de 1 segundo em redes móveis (3G/4G), e acionamento direto em 1 clique via WhatsApp ou E-mail.
* **Custo Operacional:** R$ 0,00 (100% gratuito utilizando GitHub e Vercel).

## 3. Drivers Arquiteturais (Priorização)
1. **Custo Mínimo/Zero (Prioridade 1):** Não utilizar bancos de dados gerenciados pagos, servidores dedicados ou serviços externos tarifados.
2. **Performance e Fluidez Extrema (Prioridade 2):** Resposta instantânea no celular, layout mobile-first sem engasgos, transições suaves, PWA com cache de assets.
3. **Rapidez de Entrega e Simplicidade (Prioridade 3):** Arquitetura estática moderna baseada em Jamstack (SPA/SSG com JSON), sem complexidade desnecessária de backend.

## 4. Restrições Invioláveis
* **Sem Banco de Dados:** É estritamente proibido o uso de SGDBs tradicionais (PostgreSQL, MySQL) ou NoSQL externos (MongoDB, Firebase). Os dados residem exclusivamente em arquivos `.json` versionados no repositório.
* **Deploy e Hospedagem:** Repositório no GitHub com integração contínua e deploy automatizado na plataforma Vercel (Hobby Tier - Gratuito).
* **Curadoria Exclusiva via Git:** Não haverá tela ou API pública para cadastro de usuários desconhecidos. A curadoria dos dados é feita diretamente pelos administradores no GitHub.
* **Mobile First & PWA:** Interface pensada primordialmente para smartphones, compatível com especificações de PWA (Web App Manifest, Service Worker, ícones e instalabilidade na Home Screen).

## 5. Decisões por Dimensão

| Dimensão | Decisão Arquitetural |
|---|---|
| **1. Escopo e Propósito** | Vitrine pública de consulta e redirecionamento. Não realiza transações financeiras nem mensagens internas. |
| **2. Domínio de Negócio** | Entidades enxutas: `Mentor` e `Matéria`. Relação N:N onde um mentor ensina 1 ou mais matérias. |
| **3. Restrições** | JSON estático, Vercel, GitHub, conformidade com consentimento explícito dos mentores para divulgação de dados de contato. |
| **4. Atores e Segurança** | Estudante (usuário anônimo sem login); Administrador (responsável com permissão de escrita no repositório Git). Sanitização de links `wa.me` e `mailto:` contra injeções. |
| **5. Experiência de Uso** | Tema visual "estilo universitário acolhedor/quente" (tons vibrantes, amarelo solar/âmbar, terracota, tipografia amigável, microinterações alegres, cartões bem definidos). |
| **6. Dados** | Volumetria de dezenas de mentores. Arquivo central `mentores.json` importado em tempo de build/execução no cliente. Carga em memória com busca instantânea. |
| **7. Processamento** | Filtragem no cliente (Client-Side Search com normalização de texto: remoção de acentos e case-insensitive). Complexidade O(N) com N < 200 itens (latência imperceptível < 5ms). |
| **8. Conectividade** | PWA com cache estático via Service Worker. O app abre instantaneamente e permanece consultável mesmo com oscilações de sinal. |
| **9. Ecossistema Externo** | Deep links para WhatsApp (`https://wa.me/55.../?text=...`) e links RFC 2368 para e-mail (`mailto:...`). Zero APIs proprietárias de terceiros. |
| **10. Cultura Técnica** | Simplicidade extrema com TypeScript/React (Vite) ou HTML/JS moderno, facilitando a manutenção e a contribuição rápida. |
| **11. Observabilidade** | Vercel Analytics / Speed Insights (plano gratuito), sem servidores para monitorar logs de backend. |
| **12. Atributos de Qualidade** | Disponibilidade 99.99% garantida pela CDN global da Vercel; Segurança estática sem superfícies de ataque comuns (SQLi, CSRF de sessão). |

## 6. Arquitetura Lógica
* **Padrão:** Single Page Application (SPA) Jamstack / Static Site.
* **Camada de Apresentação:**
  * Componente de Cabeçalho / Identidade Visual Universitária (Boas-vindas motivadoras).
  * Barra de Busca Instantânea com normalização fonética/acentos para nomes de matérias.
  * Grade de Cartões de Mentores (Avatar, Nome, Chips de Matérias, Botão de Ação WhatsApp, Botão E-mail).
  * Componente de Estado Vazio (quando nenhuma matéria for encontrada, com sugestão amigável).
* **Camada de Dados & Negócio:**
  * Provedor / Hook de Dados que consome `mentores.json`.
  * Filtro reativo puramente funcional: `filterMentoresByMateria(query, lista)`.
* **Camada de PWA:**
  * Manifest (`manifest.json`) configurado para `display: standalone`.
  * Service Worker registrando cache de shell da aplicação e imagens de avatar.

## 7. Arquitetura Física
* **Cliente:** Dispositivo Móvel / Navegador Web moderno rodando a aplicação cliente em memória.
* **Edge / CDN:** Vercel Edge Network distribuindo assets HTML, CSS, JavaScript, imagens estáticas e o arquivo `mentores.json` com compressão Brotli/Gzip e cabeçalhos de cache otimizados.
* **Repositório de Código & Dados:** GitHub Repository contendo o código-fonte e o arquivo `src/data/mentores.json`. A cada push na branch `main`, a Vercel dispara o build e distribuição automática.

## 8. Stack Tecnológica
* **Linguagem & Framework:** TypeScript + React (com Vite como Bundler) OU Vanilla JS moderno com Vite. *Decisão:* **React + Vite + TypeScript**, garantindo tipagem rígida para o schema JSON, componentes reutilizáveis, bundler ultrarrápido e ecossistema PWA robusto (`vite-plugin-pwa`).
* **Estilização:** Tailwind CSS — ideal para construir rapidamente a identidade universitária calorosa, mobile-first, com paleta de cores customizada e CSS final minificado (< 15KB).
* **PWA:** `vite-plugin-pwa` (Workbox) gerando service workers otimizados com estratégia Stale-While-Revalidate.
* **Ícones:** Lucide React (ícones leves para busca, WhatsApp, e-mail, matérias).
* **Testes:** Vitest + React Testing Library (testes de unidade e renderização dos filtros de matéria).
* **Deploy:** Vercel CLI / Vercel GitHub App.

## 9. Estratégia de Segurança
* **Proteção de Dados Pessoais (LGPD):** Apenas mentores que concordarem previamente em ter seus contatos acadêmicos exibidos serão cadastrados no JSON.
* **Sanitização de Protocolos Externos:** Validação dos números de telefone (apenas números válidos com DDI + DDD) e e-mails para evitar links maliciosos (`javascript:...`).
* **Superfície de Ataque Nula:** Não há banco de dados SQL/NoSQL exposto, nem endpoints de API com escrita pública, eliminando riscos de invasão de banco ou roubo de sessões.

## 10. Estratégia de Dados
* Arquivo canônico: `src/data/mentores.json`.
* Validação de Schema (JSON Schema / Zod): Toda entrada deve conter `id`, `nome`, `avatarUrl`, `materias` (array de strings), `whatsapp` (string com DDI e DDD), e `email` (string de e-mail válida).
* Atualização: Pull Request ou Commit direto no GitHub na branch principal, disparando deploy imediato.

## 11. Estratégia Operacional
* Atualização de dados simples: Adicionar um novo mentor é uma edição de 10 linhas no arquivo `mentores.json` no GitHub.
* Rollback instantâneo: Disponível com 1 clique no painel da Vercel ou via `git revert`.

## 12. Observabilidade
* Métricas Web Vitals automáticas na Vercel (LCP, FID, CLS).
* Zero custo com observabilidade de servidores.

## 13. Riscos e Mitigações
* **Risco 1: Quebra de formato no JSON pelos administradores ao editar pelo GitHub.**
  * *Mitigação:* Script de validação/teste (CI no GitHub Actions ou no build da Vercel) que falha o build caso o JSON esteja inválido ou fora do schema tipado.
* **Risco 2: Links de WhatsApp quebrarem no desktop vs mobile.**
  * *Mitigação:* Utilizar a URL canônica universal da Meta `https://wa.me/<numero>?text=...` que redireciona automaticamente para o app ou para o WhatsApp Web.
* **Risco 3: Imagens de avatar quebrarem ou deixarem o site pesado.**
  * *Mitigação:* Avatares armazenados localmente na pasta `public/avatars/` ou uso de fallback com as iniciais do nome com fundo estilizado quando a imagem falhar.

## 14. Trade-offs Aceitos
* **Flexibilidade vs Custo:** Abre-se mão de um painel administrativo com login e formulários dinâmicos em troca de custo zero absoluto e simplicidade operacional via Git.
* **Escala de Dados vs Carga Inicial:** O carregamento do JSON integral em memória é ideal para dezenas/centenas de registros. Se a base crescer para dezenas de milhares, haverá necessidade de paginação ou motor de busca, mas para o escopo delimitado ("dezenas"), a solução é imbatível em velocidade e simplicidade.
