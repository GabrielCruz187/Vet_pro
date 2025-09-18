# VetPro - Sistema de Gestão Veterinária

Sistema completo de gestão para clínicas veterinárias, inspirado no Simples.vet, desenvolvido com Next.js 15, TypeScript, Tailwind CSS e Supabase.

## 🚀 Funcionalidades

- ✅ **Autenticação completa** (login/registro com Supabase Auth)
- ✅ **Gestão de Clientes** (CRUD completo com busca)
- ✅ **Gestão de Pets** (cadastro vinculado aos clientes)
- ✅ **Prontuários Médicos** (histórico completo de consultas)
- ✅ **Sistema de Agendamentos** (calendário visual + gestão)
- ✅ **Controle de Estoque** (produtos, movimentações, alertas)
- ✅ **Sistema Financeiro** (receitas, despesas, relatórios)
- ✅ **Dashboard Administrativo** (métricas e visão geral)
- ✅ **Design Responsivo** (mobile-first)
- ✅ **Segurança RLS** (Row Level Security no Supabase)

## 📋 Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Conta no Supabase (gratuita)

## 🛠️ Instalação

### 1. Baixar o Projeto

**Opção A: Via v0 (Recomendado)**
- Clique nos 3 pontos no canto superior direito do bloco de código
- Selecione "Download ZIP"
- Extraia o arquivo

**Opção B: Via GitHub**
- Clique no botão GitHub no canto superior direito
- Clone o repositório criado

### 2. Instalar Dependências

\`\`\`bash
cd vetpro-system
npm install
# ou
yarn install
\`\`\`

### 3. Configurar Supabase

#### 3.1. Criar Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Crie uma conta (se não tiver)
3. Clique em "New Project"
4. Escolha um nome e senha para o banco
5. Aguarde a criação (2-3 minutos)

#### 3.2. Obter Credenciais
No painel do Supabase:
1. Vá em **Settings** → **API**
2. Copie a **URL** e **anon public key**

#### 3.3. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto:

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=sua_url_aqui
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_publica_aqui
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
\`\`\`

### 4. Configurar Banco de Dados

Execute os scripts SQL no Supabase na seguinte ordem:

#### 4.1. No SQL Editor do Supabase:
1. Vá em **SQL Editor** no painel do Supabase
2. Execute os scripts na ordem:

**Script 1: Schema Principal**
\`\`\`sql
-- Copie e cole o conteúdo de scripts/001_create_database_schema.sql
\`\`\`

**Script 2: Políticas de Segurança**
\`\`\`sql
-- Copie e cole o conteúdo de scripts/002_create_rls_policies.sql
\`\`\`

**Script 3: Triggers e Funções**
\`\`\`sql
-- Copie e cole o conteúdo de scripts/003_create_triggers_and_functions.sql
\`\`\`

**Script 4: Dados Iniciais**
\`\`\`sql
-- Copie e cole o conteúdo de scripts/004_seed_initial_data.sql
\`\`\`

### 5. Configurar Autenticação

No painel do Supabase:
1. Vá em **Authentication** → **Settings**
2. Em **Site URL**, adicione: `http://localhost:3000`
3. Em **Redirect URLs**, adicione: `http://localhost:3000/**`

## 🚀 Executar o Projeto

\`\`\`bash
npm run dev
# ou
yarn dev
\`\`\`

Acesse: [http://localhost:3000](http://localhost:3000)

## 👤 Primeiro Acesso

1. Acesse a página inicial
2. Clique em "Entrar" no header
3. Clique em "Criar conta"
4. Cadastre-se com email e senha
5. Confirme o email (verifique spam/lixo eletrônico)
6. Faça login e acesse o dashboard

## 📱 Navegação do Sistema

### Dashboard Principal (`/dashboard`)
- Visão geral com estatísticas
- Ações rápidas
- Próximos agendamentos
- Resumo financeiro

### Clientes (`/dashboard/clients`)
- Listar todos os clientes
- Cadastrar novo cliente
- Editar/visualizar detalhes
- Buscar por nome, email ou telefone

### Pets (`/dashboard/pets`)
- Listar todos os pets
- Cadastrar novo pet (vinculado a cliente)
- Editar informações do pet

### Prontuários (`/dashboard/medical-records`)
- Histórico médico completo
- Criar nova consulta
- Buscar por pet ou data
- Visualizar detalhes da consulta

### Agendamentos (`/dashboard/appointments`)
- Calendário visual mensal
- Criar novo agendamento
- Gerenciar status (confirmado, concluído, etc.)
- Filtrar por data e status

### Estoque (`/dashboard/inventory`)
- Controle de produtos
- Movimentações (entrada/saída)
- Alertas de estoque baixo
- Produtos próximos ao vencimento

### Financeiro (`/dashboard/financial`)
- Dashboard com gráficos
- Receitas e despesas
- Relatórios personalizados
- Análise de margem de lucro

## 🔧 Estrutura do Projeto

\`\`\`
vetpro-system/
├── app/                    # App Router (Next.js 15)
│   ├── auth/              # Páginas de autenticação
│   ├── dashboard/         # Sistema principal
│   └── page.tsx           # Landing page
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e configurações
│   └── supabase/         # Cliente Supabase
├── scripts/              # Scripts SQL do banco
└── public/               # Arquivos estáticos
\`\`\`

## 🛡️ Segurança

- **RLS (Row Level Security)** habilitado
- Usuários só acessam seus próprios dados
- Autenticação obrigatória para todas as rotas `/dashboard`
- Validação de dados no frontend e backend

## 🐛 Solução de Problemas

### Erro de Conexão com Supabase
- Verifique se as variáveis de ambiente estão corretas
- Confirme se o projeto Supabase está ativo

### Erro de Autenticação
- Verifique se configurou as URLs de redirect
- Confirme se o email foi verificado

### Tabelas não encontradas
- Execute todos os scripts SQL na ordem correta
- Verifique se não há erros no SQL Editor

### Erro de Permissão
- Confirme se as políticas RLS foram criadas
- Verifique se o usuário está autenticado

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs do console do navegador
2. Confirme se seguiu todos os passos
3. Verifique se o Supabase está configurado corretamente

## 🚀 Deploy (Opcional)

Para colocar em produção:
1. Faça push para GitHub
2. Conecte com Vercel
3. Configure as variáveis de ambiente na Vercel
4. Atualize as URLs no Supabase para o domínio de produção

---

**Sistema desenvolvido com Next.js 15, TypeScript, Tailwind CSS e Supabase**
