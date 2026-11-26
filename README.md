# Mentoria Universitária 🎓

Vitrine web mobile-first e PWA com identidade acolhedora universitária para conectar estudantes e mentores por matéria, com custo zero de infraestrutura e zero banco de dados gerenciado.

---

## 🚀 Funcionalidades Entregues

* 📲 **Instalação PWA em Destaque:** Barra fixa no topo com botão destacado para instalar o app na tela inicial do celular, além de modal interativo com instruções passo a passo para Android, iPhone (iOS Safari) e Desktop.
* 🔍 **Busca Instantânea Inteligente:** Filtragem em tempo real por nome de matéria, insensível a maiúsculas, minúsculas e acentuações (ex: "calculo" encontra "Cálculo I").
* 👤 **Perfis de Mentores:** Cartão com foto de perfil, curso, semestre, biografia motivacional e tags destacadas das matérias ensinadas.
* 💬 **Contato Direto em 1 Clique:**
  * **WhatsApp:** Botão direto que abre conversa com mensagem personalizada mencionando a matéria de interesse.
  * **E-mail:** Botão direto que aciona o cliente de e-mail com assunto pronto.
* 🛡️ **Resiliência Visual:** Fallback automático para iniciais do mentor sobre gradiente temático se a imagem externa não carregar.
* 📱 **Mobile-First & PWA:** Interface pensada primordialmente para smartphones, com Service Worker pré-armazenando 13 arquivos essenciais para navegação ultrarrápida mesmo em conexões lentas.
* 💰 **Custo Zero Real:** Sem banco de dados pago, sem servidor backend. Roda 100% como Jamstack estático na Vercel.

---

## 🛠️ Tecnologias Utilizadas

* **Frontend:** React 19 + TypeScript + Vite 6
* **Estilização:** Tailwind CSS (paleta personalizada estilo universitário)
* **Ícones:** Lucide React
* **Dados:** Arquivo canônico `src/data/mentores.json`
* **Testes Automatizados:** Vitest (validação de dados e testes de busca)
* **PWA:** `vite-plugin-pwa` com Workbox e precache automático
* **Infraestrutura:** `vercel.json` com regras de cache HTTP e regravações SPA

---

## 📁 Estrutura de Diretórios

```
mentoria/
├── .ai/                    # Governança de IA e Engenharia
│   ├── PROJECT_DNA.md
│   ├── PRODUCT_BACKLOG.md
│   ├── IMPLEMENTATION_PLAN.md
│   ├── AI_EXECUTION_GUIDE.md
│   └── ENGINEERING_JOURNAL.md
├── public/                 # Assets públicos, ícones e PWA manifest
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   ├── apple-touch-icon.png
│   └── favicon.svg
├── src/
│   ├── components/         # Header, SearchBar, MentorCard, EmptyState, InstallModal
│   ├── data/               # mentores.json (base canônica)
│   ├── test/               # mentores.test.ts, search.test.ts
│   ├── types/              # mentor.ts (interface TypeScript)
│   ├── utils/              # search.ts (normalização e filtro)
│   ├── App.tsx             # Aplicação principal
│   ├── index.css           # Configurações do Tailwind CSS
│   └── main.tsx            # Ponto de entrada
├── index.html              # HTML com viewport mobile-first
├── package.json            # Dependências e scripts
├── tailwind.config.js      # Tema universitário customizado
├── tsconfig.json           # Configuração TypeScript
├── vercel.json             # Regras de cache e SPA da Vercel
└── vite.config.ts          # Configuração Vite e PWA
```

---

## 🧪 Como Rodar e Testar

```bash
# 1. Instalar dependências
npm install

# 2. Executar testes automatizados (6/6 testes)
npm test

# 3. Rodar em ambiente local de desenvolvimento
npm run dev

# 4. Gerar build de produção
npm run build
```

---

## 🌐 Como Publicar na Vercel (Gratuito)

1. Suba este repositório para o seu **GitHub**:
   ```bash
   git add .
   git commit -m "feat: plataforma de mentoria universitaria concluida"
   git push origin main
   ```
2. Acesse **[vercel.com](https://vercel.com)**, faça login com seu GitHub e selecione o repositório;
3. O Vite e as configurações do `vercel.json` serão detectados automaticamente. Clique em **Deploy**;
4. Pronto! O site estará no ar com HTTPS gratuito e suporte completo a PWA.

---

## 🔒 Regras de Arquitetura
Consulte sempre [`.ai/AI_EXECUTION_GUIDE.md`](.ai/AI_EXECUTION_GUIDE.md). É expressamente proibida a adição de bancos de dados gerenciados ou dependências com custo de servidor.
