# Relatório Completo de Análise — Pesquisa PTS CER

> **Última atualização:** 31/03/2026

## 1. O que é a Aplicação

**Pesquisa PTS CER** é uma aplicação web desenvolvida para o **CER IV (Centro Especializado em Reabilitação)** da **APAE Colinas do Tocantins**. Seu objetivo é coletar dados clínicos e sociais de pacientes para gerar automaticamente o **Projeto Terapêutico Singular (PTS)** — um plano de intervenção individualizado utilizado em centros de reabilitação.

A aplicação suporta dois tipos de avaliação:
- **Adulto** (8 etapas)
- **Criança/Infantil** (7 etapas)

---

## 2. Stack Tecnológica

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| **Framework Frontend** | React | 19.0 |
| **Linguagem** | TypeScript | 5.8 |
| **Build Tool** | Vite | 6.2 |
| **Estilização** | Tailwind CSS | 4.1 |
| **Animações** | Motion (Framer Motion) | 12.23 |
| **Ícones** | Lucide React | 0.546 |
| **IA Generativa** | Google GenAI (Gemini 3.1 Pro) | 1.29 |
| **Banco de Dados** | Supabase (PostgreSQL) | — |
| **Autenticação** | Supabase Auth | — |
| **Geração de PDF** | jsPDF | 4.2 |
| **Notificações** | Toast customizado (Motion) | — |
| **PWA** | vite-plugin-pwa (Workbox) | 1.2 |
| **Testes** | Vitest + Testing Library | 4.1 |
| **Deploy** | Vercel (Serverless Functions) | — |

### Observações sobre a Stack:
- Dependências não utilizadas (`express`, `dotenv`) foram removidas
- A API key do Gemini é utilizada **apenas no server-side** via Vercel Serverless Functions
- Supabase para persistência de dados + autenticação com RLS (Row Level Security)
- PWA com Service Worker para funcionamento offline
- jsPDF carregado via code-splitting (lazy-load) para não inflar o bundle principal

---

## 3. Arquitetura Atual

```
pesquisa-pts-cer/
├── src/
│   ├── App.tsx                        ← Composição de componentes (~250 linhas)
│   ├── main.tsx                       ← Entry point React
│   ├── index.css                      ← Estilos globais
│   ├── vite-env.d.ts                  ← Tipos para variáveis de ambiente Vite
│   ├── types/
│   │   └── survey.ts                  ← Interface SurveyData, StepProps, ArrayField
│   ├── constants/
│   │   └── survey.ts                  ← Constantes, dados iniciais, campos obrigatórios
│   ├── hooks/
│   │   ├── useSurvey.ts               ← Estado, handlers, validação, localStorage, API
│   │   └── useAuth.ts                 ← Autenticação Supabase (signIn/signUp/signOut)
│   ├── lib/
│   │   ├── supabase.ts                ← Client Supabase (client-side)
│   │   ├── toast.tsx                  ← Sistema de toast notifications
│   │   ├── generatePDF.ts            ← Gerador de PDF profissional (jsPDF)
│   │   └── exportCSV.ts              ← Exportador de dados CSV
│   ├── components/
│   │   ├── Dashboard.tsx              ← Painel de gestão de pesquisas
│   │   ├── LoginScreen.tsx            ← Tela de login/registro
│   │   ├── ui/                        ← 7 componentes reutilizáveis
│   │   │   ├── FormField.tsx
│   │   │   ├── TextInput.tsx
│   │   │   ├── TextArea.tsx
│   │   │   ├── CheckboxGroup.tsx
│   │   │   ├── RadioGroup.tsx
│   │   │   ├── SynthesisField.tsx
│   │   │   └── SkeletonLoader.tsx
│   │   ├── layout/                    ← Header, Footer, LoadingOverlay
│   │   └── steps/                     ← 12 componentes de step
│   │       ├── StepSelector.tsx
│   │       ├── IdentificationStep.tsx
│   │       ├── PTSPreviewStep.tsx
│   │       ├── CompletionStep.tsx
│   │       ├── PrintView.tsx
│   │       ├── adult/                 ← 4 steps (UpdateReasons, Routine, Ecomap, Genogram)
│   │       └── child/                 ← 3 steps (Routine, Ecomap, Genogram)
│   └── test/
│       ├── setup.ts                   ← Setup Vitest + jest-dom
│       ├── constants.test.ts          ← Testes das constantes
│       └── exportCSV.test.ts          ← Testes do exportador CSV
├── api/
│   ├── generate.ts                    ← Serverless: geração de PTS via Gemini AI (rate limited)
│   ├── synthesize.ts                  ← Serverless: sínteses parciais via Gemini AI (rate limited)
│   ├── surveys.ts                     ← Serverless: CRUD de pesquisas no Supabase (com auth)
│   └── _rateLimit.ts                  ← Middleware de rate limiting por IP/sessão
├── supabase/
│   └── schema.sql                     ← Schema PostgreSQL + RLS policies
├── public/
│   ├── favicon.svg                    ← Ícone SVG
│   ├── icon-192.png                   ← Ícone PWA 192px
│   └── icon-512.png                   ← Ícone PWA 512px
├── index.html                         ← HTML entry point (pt-BR, meta tags, PWA)
├── vite.config.ts                     ← Configuração Vite + PWA
├── vitest.config.ts                   ← Configuração de testes
├── tsconfig.json                      ← Configuração TypeScript
├── vercel.json                        ← Configuração Vercel (rewrites + env)
├── package.json                       ← Dependências + scripts (dev, build, test, lint)
└── .env.example                       ← Template de variáveis de ambiente
```

**Arquitetura: SPA componentizada com API Routes serverless, PWA e autenticação** — frontend React modular + 3 serverless functions + Service Worker para offline.

---

## 4. Funcionalidades Core

### 4.1 Dashboard de Gestão
- Listagem de pesquisas salvas com busca por nome (debounce 300ms)
- Filtros por tipo: Todas / Adulto / Infantil
- Cards com nome do paciente, diagnóstico, profissional, data e status
- Skeleton loading e empty state
- Exportação de dados em CSV
- Clique no card abre a pesquisa para visualização

### 4.2 Formulário Multi-Step com Animações
- **Step 0**: Seleção do tipo de pesquisa (Adulto/Criança)
- **Steps 1-5/6**: Coleta progressiva de dados com transições animadas (Motion)
- **Step PTS**: Revisão do PTS gerado pela IA com opção de recriar
- **Step Final**: Conclusão com botões para PDF, nova pesquisa e voltar ao dashboard
- **Validação por step**: campos obrigatórios validados antes de avançar, com feedback visual

### 4.3 Campos de Dados Coletados (~111 campos de formulário)

**Dados Demográficos:**
- Nome, data de nascimento, idade (calculada automaticamente), sexo, cidade, telefone
- Responsável/cuidador, parentesco, diagnóstico

**Avaliação Funcional (Adulto):**
- Autocuidado, funcionalidade, capacidade laborativa
- Dificuldades principais, barreiras e facilitadores

**Avaliação Infantil:**
- Rotina diária (manhã, tarde, noite)
- Genograma e ecomapa familiar
- Independência funcional
- Dinâmica familiar e rede de apoio

**Rede de Saúde e Suporte:**
- Serviços de saúde utilizados
- Rede ocupacional
- Suporte logístico
- Composição familiar

**Metas Terapêuticas:**
- 3 metas com prazo, indicador e prioridade
- Condutas profissionais e observações
- Assinatura profissional

### 4.4 Integração com IA (Google Gemini 3.1 Pro)
- Geração automática de **sínteses clínicas** por seção
- Utiliza **Extended Thinking** (nível HIGH) para análise aprofundada
- Gera relatórios profissionais em texto puro (sem markdown)
- Seções sintetizadas: rotina, ecomapa, condições clínicas, plano profissional
- **API key protegida**: chamadas intermediadas por serverless functions
- **Rate limiting**: max 5 gerações PTS/min e 15 sínteses/min por IP

### 4.5 Geração de PDF (jsPDF)
- Documento A4 profissional com 6 seções formatadas
- Cabeçalho com título, campos em 2 colunas, text wrapping automático
- Page breaks inteligentes, metas terapêuticas e área de assinaturas
- Code-splitting: jsPDF carregado sob demanda (não infla o bundle)
- Nome do arquivo: `PTS_{nome}_{data}.pdf`

### 4.6 Persistência de Dados (Supabase)
- **Auto-save local**: rascunho salvo automaticamente em `localStorage` a cada mudança de step
- **Restauração de progresso**: ao recarregar a página, o formulário é restaurado do ponto onde parou
- **Salvamento no banco**: ao finalizar, a pesquisa completa + PTS gerado são salvos no Supabase
- **API de consulta**: endpoint `GET /api/surveys` com busca por nome, filtro por tipo e paginação
- **RLS**: cada profissional só vê suas próprias pesquisas (Row Level Security)

### 4.7 Autenticação (Supabase Auth)
- Tela de login/registro para profissionais
- Login com e-mail e senha
- Registro com nome completo + e-mail + senha
- JWT token enviado em todas as requests API
- Botão de logout no header e dashboard
- Se Supabase não configurado, funciona sem auth (modo desenvolvimento)

### 4.8 Toast Notifications
- Sistema de notificações customizado com animações (Motion)
- Tipos: sucesso, erro e aviso
- Auto-dismiss após 4 segundos
- Substituiu completamente os `alert()` nativos

### 4.9 Exportação de Dados (CSV)
- Exporta listagem do dashboard em CSV compatível com Excel (BOM UTF-8)
- Headers em português, mapeamento de tipos e status
- Download automático com nome datado

### 4.10 PWA (Progressive Web App)
- Service Worker com Workbox para cache de assets
- 15 assets pré-cacheados para funcionamento offline
- Runtime caching para API Supabase (NetworkFirst, 5min)
- Manifest com nome, cores, ícones para instalação
- Favicon SVG + meta tags (theme-color, apple-touch-icon)

### 4.11 Acessibilidade (ARIA)
- `aria-label`, `aria-required`, `aria-invalid` em todos os campos de formulário
- `role="progressbar"` com `aria-valuenow/min/max` na barra de progresso
- `role="search"`, `role="tablist"`, `role="tab"`, `aria-selected` no Dashboard
- `role="list"`, `role="listitem"` com `tabIndex` e `onKeyDown` nos cards
- `aria-live="polite"` para mensagens de status
- `htmlFor`/`id` para associação label-input
- `focus-visible:outline` para navegação por teclado
- `lang="pt-BR"` no HTML

---

## 5. Estado Atual da Aplicação — Todos os Pontos Resolvidos

### 5.1 Segurança

| Problema Original | Status |
|-------------------|--------|
| ~~API Key exposta no client-side~~ | **RESOLVIDO** — server-side via serverless functions |
| ~~Sem autenticação~~ | **RESOLVIDO** — Supabase Auth com login/registro |
| ~~Sem rate limiting~~ | **RESOLVIDO** — 5 gerações/min e 15 sínteses/min por IP |

### 5.2 Arquitetura

| Problema Original | Status |
|-------------------|--------|
| ~~Monolito em App.tsx (2170 linhas)~~ | **RESOLVIDO** — 25+ componentes, App.tsx com ~250 linhas |
| ~~Sem persistência de dados~~ | **RESOLVIDO** — localStorage + Supabase com RLS |
| ~~Sem validação de formulário~~ | **RESOLVIDO** — validação por step com feedback visual |
| ~~Dependências não utilizadas~~ | **RESOLVIDO** — removidas |
| ~~Scripts utilitários no src/~~ | **RESOLVIDO** — diretório `app/applet/` removido |

### 5.3 UX

| Problema Original | Status |
|-------------------|--------|
| ~~Sem salvar progresso~~ | **RESOLVIDO** — auto-save em localStorage |
| ~~Sem indicador de progresso~~ | **RESOLVIDO** — barra de progresso com ARIA |
| ~~PDF básico via window.print()~~ | **RESOLVIDO** — jsPDF profissional com formatação completa |
| ~~Tratamento de erros com alert()~~ | **RESOLVIDO** — toast notifications animados |

---

## 6. Preparação para Deploy na Vercel

### 6.1 O que funciona hoje
- Build com `vite build` gera pasta `dist/` + Service Worker
- Serverless functions em `api/` prontas para deploy
- `vercel.json` configurado com rewrites e environment variables
- PWA instalável com funcionamento offline

### 6.2 Configurações necessárias para Vercel

**vercel.json** (já configurado):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "env": {
    "GEMINI_API_KEY": "@gemini-api-key",
    "SUPABASE_URL": "@supabase-url",
    "SUPABASE_SERVICE_ROLE_KEY": "@supabase-service-role-key"
  }
}
```

**Variáveis de ambiente na Vercel:**
- `GEMINI_API_KEY` — chave da API do Google Gemini (server-side)
- `SUPABASE_URL` — URL do projeto Supabase (server-side)
- `SUPABASE_SERVICE_ROLE_KEY` — chave service role do Supabase (server-side)
- `VITE_SUPABASE_URL` — URL do projeto Supabase (client-side)
- `VITE_SUPABASE_ANON_KEY` — chave anon do Supabase (client-side)

### 6.3 Configuração do Supabase
1. Criar projeto em [supabase.com](https://supabase.com)
2. Executar o SQL de `supabase/schema.sql` no SQL Editor
3. Habilitar Email Auth em Authentication > Providers
4. Copiar as chaves para as variáveis de ambiente na Vercel

---

## 7. Roadmap de Implementação — Status Final

### Prioridade 1 — Critico (antes do deploy)

| Melhoria | Status |
|----------|--------|
| **API Route serverless para Gemini** | **CONCLUIDO** |
| **Variáveis de ambiente seguras** | **CONCLUIDO** |
| **Remover dependências não usadas** | **CONCLUIDO** |
| **Limpar scripts utilitários** | **CONCLUIDO** |

### Prioridade 2 — Importante (pós-deploy inicial)

| Melhoria | Status |
|----------|--------|
| **Componentização** | **CONCLUIDO** — 25+ componentes, App.tsx reduzido 90% |
| **Validação de formulário** | **CONCLUIDO** — por step com feedback visual |
| **Persistência local** | **CONCLUIDO** — auto-save em localStorage |
| **Toast notifications** | **CONCLUIDO** — sistema customizado com Motion |
| **Loading states** | **CONCLUIDO** — SkeletonLoader + LoadingOverlay |

### Prioridade 3 — Desejável (evolução)

| Melhoria | Status |
|----------|--------|
| **Banco de dados** | **CONCLUIDO** — Supabase com RLS |
| **Autenticação** | **CONCLUIDO** — Supabase Auth (login/registro) |
| **Dashboard** | **CONCLUIDO** — listagem, busca, filtros, visualização |
| **Geração de PDF robusta** | **CONCLUIDO** — jsPDF profissional com code-splitting |
| **Modo offline (PWA)** | **CONCLUIDO** — Service Worker + Workbox |
| **Exportar dados (CSV)** | **CONCLUIDO** — CSV compatível Excel |
| **Testes** | **CONCLUIDO** — Vitest com 7 testes passando |
| **Rate limiting** | **CONCLUIDO** — por IP/sessão nas API routes |
| **Acessibilidade** | **CONCLUIDO** — ARIA labels, roles, navegação por teclado |
| **Multi-idioma** | PENDENTE — suporte a i18n caso necessário |

### Prioridade 4 — Migração de Framework (opcional)

| Melhoria | Status |
|----------|--------|
| **Migrar para Next.js** | PENDENTE — opcional, arquitetura atual é adequada |
| **React Router** | PENDENTE — navegação interna por estado é suficiente |

---

## 8. Resumo Executivo

A **Pesquisa PTS CER** é uma aplicação completa e pronta para produção que utiliza IA generativa para automatizar a criação de Projetos Terapêuticos Singulares em centros de reabilitação.

**Pontos fortes:**
- Conceito inovador com IA (Gemini 3.1 Pro) para síntese clínica
- UI limpa e moderna com animações fluidas
- Formulário abrangente com ~111 campos e validação por step
- Arquitetura componentizada (25+ componentes, código modular)
- Geração de PDF profissional com jsPDF
- Dashboard de gestão com busca, filtros e exportação CSV
- Persistência de dados com Supabase (PostgreSQL) + RLS
- Autenticação para profissionais (Supabase Auth)
- Auto-save de rascunhos em localStorage
- PWA com funcionamento offline (Service Worker)
- Rate limiting nas chamadas de IA
- Acessibilidade com ARIA labels e navegação por teclado
- Testes automatizados com Vitest
- API key protegida via serverless functions
- Toast notifications para feedback ao usuário

**Único item pendente:**
- Multi-idioma (i18n) — apenas se houver demanda real

**A aplicação está pronta para deploy na Vercel.**

---

## 9. Histórico de Evolução

| Data | Mudança |
|------|---------|
| — | Versão inicial: SPA monolítica com API key exposta no client-side |
| 31/03/2026 | **Fase 0**: API Routes serverless, Supabase, localStorage, toast notifications, limpeza de código |
| 31/03/2026 | **Fase 1**: Componentização (App.tsx de 2170→250 linhas), validação de formulário, SkeletonLoader |
| 31/03/2026 | **Fase 2**: Autenticação Supabase Auth, rate limiting nas API routes de IA |
| 31/03/2026 | **Fase 3**: Dashboard de gestão, PDF profissional (jsPDF), exportação CSV, navegação integrada |
| 31/03/2026 | **Fase 4**: Acessibilidade (ARIA), PWA com Service Worker, testes com Vitest |

---

## 10. Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção (dist/ + Service Worker) |
| `npm run preview` | Preview do build local |
| `npm run lint` | Verificação de tipos TypeScript |
| `npm test` | Executar testes (Vitest) |
| `npm run test:watch` | Testes em modo watch |
| `npm run clean` | Limpar pasta dist/ |
