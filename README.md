# DTS Web App (Next.js + Prisma + PostgreSQL)

Aplicação full-stack em PT-PT para a empresa **DTS**, com área pública e área de funcionários protegida.

## Requisitos

- Node.js 20+
- npm 10+
- Docker + Docker Compose

## Stack

- **Frontend**: Next.js (App Router) + TypeScript + TailwindCSS
- **Backend**: Route Handlers do Next.js + Prisma ORM
- **Base de dados**: PostgreSQL (Docker Compose)
- **Auth**: NextAuth (Credentials) + bcrypt
- **Validação**: Zod

## Configuração local

1. Instalar dependências:

```bash
npm install
```

2. Criar `.env` a partir do exemplo:

```bash
cp .env.example .env
```

3. Iniciar PostgreSQL:

```bash
docker compose up -d
```

4. Gerar Prisma Client e aplicar migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Popular utilizador admin (seed):

```bash
npm run prisma:seed
```

6. Arrancar app:

```bash
npm run dev
```

Abrir: `http://localhost:3000`

## Variáveis de ambiente

Ver `.env.example` para todas as variáveis necessárias:

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `CONTACT_RECEIVER_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM`

## Fluxo funcional esperado

1. Navegar área pública:
   - `/`
   - `/sobre`
   - `/servicos`
   - `/contacto`
2. Enviar formulário de contacto (validação frontend/backend, gravação em BD e envio de email SMTP).
3. Login do funcionário em `/login`.
4. Criar cliente em `/dashboard/clientes/novo`.
5. Pesquisar cliente por nome/NIF/email em `/dashboard/clientes`.
6. Criar serviço em `/dashboard/servicos/novo` associando cliente.
7. Ver detalhe do cliente e lista de serviços em `/dashboard/clientes/[id]`.
8. Fazer logout via menu lateral.

## Estrutura principal

```text
.
├── app
│   ├── api
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── clientes/route.ts
│   │   ├── clientes/[id]/route.ts
│   │   ├── servicos/route.ts
│   │   ├── servicos/[id]/route.ts
│   │   ├── contacto/route.ts
│   │   └── perfil/password/route.ts
│   ├── dashboard
│   ├── contacto/page.tsx
│   ├── login/page.tsx
│   ├── sobre/page.tsx
│   ├── servicos/page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components
├── lib
├── prisma
│   ├── migrations
│   ├── schema.prisma
│   └── seed.ts
├── docker-compose.yml
├── middleware.ts
└── .env.example
```

## Notas de segurança

- Passwords guardadas com hash `bcrypt`.
- Rotas `/dashboard/*` protegidas por middleware NextAuth.
- Validação com Zod em todas as operações sensíveis no backend.
- NIF único por cliente na base de dados.
