# AI EXECUTION GUIDE — PLATAFORMA DE MENTORIA UNIVERSITÁRIA

Este documento é a diretriz absoluta para qualquer agente de inteligência artificial ou desenvolvedor que for atuar no código deste repositório. Nenhuma modificação deve violar as regras aqui estabelecidas.

---

## 1. Regras Arquiteturais Invioláveis

1. **PROIBIDO ADICIONAR BANCO DE DADOS:**
   * Nunca proponha ou instale ORMs, Prisma, TypeORM, Firebase SDK, Supabase ou clientes de banco de dados (MongoDB, PostgreSQL, etc.).
   * Os dados da aplicação devem residir exclusivamente em arquivos `.json` versionados em `src/data/`.

2. **PROIBIDO CRIAR BACKEND DINÂMICO OU SERVIDORES:**
   * A aplicação é uma Static Site / SPA puramente Jamstack hospedada na Vercel.
   * Não adicione rotas de backend em Express, Fastify, NestJS ou Serverless Functions desnecessárias. A lógica de busca roda 100% no navegador do usuário (Client-Side).

3. **CUSTO ZERO OBRIGATÓRIO:**
   * Nenhuma dependência com plano pago, tokens pagos de APIs externas ou serviços em nuvem tarifados é permitida.

4. **INTEGRIDADE DO JSON É CRÍTICA:**
   * Todo novo campo adicionado a `src/data/mentores.json` deve ser previamente refletido na interface TypeScript em `src/types/` e coberto pelo teste unitário em `src/test/`.

5. **MOBILE FIRST EM TODAS AS TELAS:**
   * Todo componente criado deve ser projetado primeiro para telas de 360px a 420px de largura e expandir suavemente para telas maiores.

---

## 2. Processo de Implementação de Novas Funcionalidades

Para cada nova tarefa ou ajuste:
1. **Verificação de Regras:** Consultar `.ai/PROJECT_DNA.md` e este guia para garantir que a mudança não introduz dependências proibidas.
2. **Definição de Tipos:** Se houver alteração de dados, altere primeiro os tipos em `src/types/`.
3. **Componentização Pura:** Crie componentes isolados com responsabilidade única em `src/components/`.
4. **Tratamento de Exceções:** Todo campo opcional ou imagem deve ter fallback amigável (ex: se o avatar quebrar, exibir iniciais estilizadas).

---

## 3. Processo de Testes

1. **Validação do Schema dos Dados:**
   * Execute `npm test` para garantir que o arquivo `src/data/mentores.json` mantém:
     * Estrutura de array válida;
     * IDs únicos;
     * Links de WhatsApp válidos com números limpos;
     * E-mails com padrão sintático correto;
     * Pelo menos 1 matéria por mentor.
2. **Teste de Normalização da Busca:**
   * Garantir que a busca ignore acentos e caracteres maiúsculos (ex: "cálculo", "calculo", "Cálculo 1").

---

## 4. Processo de Revisão de Código

Antes de aprovar ou entregar qualquer alteração, verifique:
* [ ] Há alguma chamada de rede para endpoints externos não autorizados? (Não deve haver)
* [ ] Os links de WhatsApp utilizam `https://wa.me/<numero>?text=<mensagem_url_encoded>`?
* [ ] Os links externos possuem `target="_blank"` e `rel="noopener noreferrer"`?
* [ ] O build de produção (`npm run build`) executa com zero avisos de TypeScript ou erros de bundle?
* [ ] O CSS final foi construído utilizando apenas utilitários do Tailwind sem arquivos CSS gigantescos e desnecessários?

---

## 5. Processo de Documentação

* Se o formato do registro de um mentor mudar, atualize:
  1. `src/types/mentor.ts`
  2. `src/data/mentores.json`
  3. `src/test/mentores.test.ts`
  4. `.ai/PROJECT_DNA.md` (seção Estratégia de Dados)
  5. `.ai/ENGINEERING_JOURNAL.md` (registrando a motivação da mudança)

---

## 6. Checklist de Conclusão de Tarefa

Antes de concluir qualquer solicitação:
* [x] Código sem dependências de banco de dados ou backend servidor;
* [x] Testes passando via `npm test`;
* [x] Build gerado com sucesso sem erros;
* [x] Mobile-first testado e responsivo;
* [x] Artefatos na pasta `.ai/` sincronizados.
