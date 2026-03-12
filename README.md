# Shoegen

![Status](https://img.shields.io/badge/status-work_in_progress-orange)

> A modern shoe catalog and admin platform built with Next.js 16, TypeScript, and MongoDB.

**Live:** [shoegen.eugen-moser.com](https://shoegen.eugen-moser.com) &nbsp;|&nbsp; **Dev:** [dev.shoegen.eugen-moser.com](https://dev.shoegen.eugen-moser.com)

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb)
![License](https://img.shields.io/badge/license-MIT-green)

> [!WARNING]
> This project is under active development. Features may be incomplete or subject to change.

---

## Overview

Shoegen is a full-stack shoe catalog application with a public storefront and a role-gated admin dashboard. It supports full CRUD for shoe products with rich metadata, multi-currency pricing, and size/stock management.

**Key features:**

- Public shop with product listing and detail pages
- Admin dashboard with inventory management (create, edit, delete)
- Role-based access control — `ADMIN`, `EDITOR`, `VIEWER`
- Rich product metadata: category, usage, terrain, season, waterproof flag
- Size tracking with per-size stock levels
- Multi-currency support (USD, EUR, GBP, JPY)
- JWT-based authentication with bcrypt password hashing
- Dockerized with a multi-stage Alpine build
- Automated CI/CD via GitHub Actions to a VPS

---

## Tech Stack

| Layer           | Technology                                    |
| --------------- | --------------------------------------------- |
| Framework       | Next.js 16 (App Router)                       |
| Language        | TypeScript 5 (strict)                         |
| Styling         | Tailwind CSS v4 + shadcn/ui                   |
| Database        | MongoDB (Atlas) via Prisma 6                  |
| Authentication  | Auth.js v5 (NextAuth) — credentials + JWT     |
| Validation      | Zod                                           |
| Testing         | Jest 30 + Testing Library                     |
| Package Manager | pnpm                                          |
| Deployment      | Docker (Alpine) + GitHub Actions + GHCR + VPS |

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [pnpm](https://pnpm.io/) (`npm install -g pnpm`)
- A MongoDB connection string (e.g., [MongoDB Atlas](https://www.mongodb.com/atlas))

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/eugenmoser/shoegen.git
cd shoegen

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env with your values (see Environment Variables below)

# 4. Generate the Prisma client
pnpm prisma generate

# 5. Seed the database with initial data
pnpm seed

# 6. Start the development server
pnpm dev
```

The app is now running at [http://localhost:3000](http://localhost:3000).

The seed creates three demo accounts:

| Role     | Email                 | Password      |
| -------- | --------------------- | ------------- |
| `ADMIN`  | admin@shoegen.dev     | `Admin1234!`  |
| `EDITOR` | editor@shoegen.dev    | `Editor1234!` |
| `VIEWER` | viewer@shoegen.dev    | `Viewer1234!` |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable        | Description                                        |
| --------------- | -------------------------------------------------- |
| `DATABASE_URL`  | MongoDB connection string (Atlas or self-hosted)   |
| `NODE_ENV`      | `development` or `production`                      |
| `AUTH_SECRET`   | JWT signing secret — generate with `npx auth secret` |
| `ADMIN_EMAIL`   | Default admin email (seed only)                    |
| `ADMIN_PASSWORD`| Default admin password (seed only)                 |

---

## Available Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `pnpm dev`        | Start the development server        |
| `pnpm build`      | Create a production build           |
| `pnpm start`      | Run the production build            |
| `pnpm lint`       | Run ESLint                          |
| `pnpm test`       | Run all Jest tests                  |
| `pnpm test:watch` | Run Jest in watch mode              |
| `pnpm seed`       | Seed the database with initial data |

---

## Project Structure

```
shoegen/
├── app/
│   ├── (public)/          # Public storefront — Navbar + Footer layout
│   │   ├── page.tsx       # Home page
│   │   └── shop/          # Product listing + detail pages
│   ├── (protected)/
│   │   └── dashboard/     # Role-gated admin dashboard + sidebar
│   ├── api/auth/          # NextAuth route handler
│   └── login/             # Login page
│
├── modules/               # Feature-first modules
│   ├── auth/              # Authentication, RBAC, session guards
│   ├── shoes/             # Product CRUD actions, forms, validation
│   └── navigation/        # Nav config, role-filtered sidebar links
│
├── components/            # Shared UI components + shadcn/ui primitives
├── lib/                   # Prisma singleton, utility functions
├── prisma/                # Schema, seed script, generated client
├── types/                 # Global TypeScript types (ActionResult, etc.)
└── .github/workflows/     # CI/CD pipelines
```

---

## Role-Based Access Control

Access is managed through three roles defined in `modules/auth/permissions.ts`:

| Role     | Dashboard | View Products | Create / Edit | Delete |
| -------- | :-------: | :-----------: | :-----------: | :----: |
| `ADMIN`  |    ✅     |      ✅       |      ✅       |   ✅   |
| `EDITOR` |    ✅     |      ✅       |      ✅       |   ❌   |
| `VIEWER` |    ✅     |      ✅       |      ❌       |   ❌   |

Use `PermissionGate` in the UI to conditionally render features, and `serverAuthGuard()` in Server Actions and layouts to enforce permissions server-side.

---

## Docker

The application ships with a **three-stage Dockerfile** that produces a minimal production image.

| Stage     | Base Image       | Purpose                              |
| --------- | ---------------- | ------------------------------------ |
| `deps`    | `node:20-alpine` | Install production dependencies      |
| `builder` | `node:20-alpine` | Build the Next.js app                |
| `runner`  | `node:20-alpine` | Lean runtime image (standalone mode) |

### Run with Docker Compose

```bash
# Create the shared network (once)
docker network create app_network

# Start the container (reads .env automatically)
docker compose up -d
```

The app is available at [http://localhost:3000](http://localhost:3000).

### Build & run manually

```bash
# Build the image
docker build -t shoegen .

# Run the container
docker run -p 3000:3000 --env-file .env shoegen
```

---

## CI/CD

Two GitHub Actions workflows handle deployments automatically:

| Workflow          | Trigger        | Image Tag | URL                                |
| ----------------- | -------------- | --------- | ---------------------------------- |
| `deploy-dev.yml`  | Push to `dev`  | `:dev`    | dev.shoegen.eugen-moser.com        |
| `deploy-prod.yml` | Push to `main` | `:main`   | shoegen.eugen-moser.com            |

### Deployment flow

```
Push to branch
      │
      ▼
Build Docker image
      │
      ▼
Push to ghcr.io/eugenmoser/shoegen:<tag>
      │
      ▼
SSH into VPS → docker pull → docker compose up -d → prune old images
```

The VPS runs **Caddy v2** as a reverse proxy with automatic HTTPS, forwarding traffic to the containers on `localhost:3000` (prod) and `localhost:3001` (dev).

### Required GitHub Secrets

| Secret        | Description                                              |
| ------------- | -------------------------------------------------------- |
| `GHCR_TOKEN`  | GitHub Personal Access Token with `write:packages` scope |
| `VPS_HOST`    | IP address or hostname of the VPS                        |
| `VPS_USER`    | SSH username on the VPS                                  |
| `VPS_SSH_KEY` | Private SSH key for VPS access                           |

---

## Contributing

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(shoes): add waterproof filter to shop page
fix(auth): handle expired session tokens correctly
chore(deps): update prisma to 6.20
```

Allowed types: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`

---

## License

[MIT](LICENSE)
