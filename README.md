# Shoegen

> A modern e-commerce platform for shoes built with Next.js 16, TypeScript, and MongoDB.

---

## Docker

The application is containerized using a **multi-stage Dockerfile** to minimize the final image size and follow production best practices.

### Stages

| Stage     | Base Image       | Purpose                                   |
| --------- | ---------------- | ----------------------------------------- |
| `deps`    | `node:20-alpine` | Installs only production dependencies     |
| `builder` | `node:20-alpine` | Builds the Next.js application            |
| `runner`  | `node:20-alpine` | Lean production image (standalone output) |

### Build & Run locally

```bash
# Build the image
docker build -t shoegen .

# Run the container
docker run -p 3000:3000 \
  -e DATABASE_URL=your_mongodb_url \
  -e AUTH_SECRET=your_auth_secret \
  shoegen
```

### Key decisions

- **Alpine** base image keeps the image size minimal
- **Standalone output** from Next.js (`output: 'standalone'` in `next.config.ts`) copies only the required files into the runner stage — no `node_modules` needed at runtime
- Images are published to **GitHub Container Registry (GHCR)** and pulled directly onto the VPS during deployment

---

## CI/CD (GitHub Actions)

Two deployment pipelines are defined in [`.github/workflows/`](.github/workflows/), one per environment.

### Pipeline Overview

```
Push to dev branch          Push to main branch
       │                           │
       ▼                           ▼
┌─────────────────┐     ┌─────────────────┐
│  Build & Push   │     │  Build & Push   │
│  :dev → GHCR    │     │  :main → GHCR   │
└────────┬────────┘     └────────┬────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐     ┌─────────────────┐
│  SSH → VPS      │     │  SSH → VPS      │
│  /opt/apps/     │     │  /opt/apps/     │
│  nextjs-dev     │     │  nextjs-prod    │
└─────────────────┘     └─────────────────┘
```

### Workflows

| File              | Trigger        | Tag     | Target                  |
| ----------------- | -------------- | ------- | ----------------------- |
| `deploy-dev.yml`  | Push to `dev`  | `:dev`  | `/opt/apps/nextjs-dev`  |
| `deploy-prod.yml` | Push to `main` | `:main` | `/opt/apps/nextjs-prod` |

### Deployment steps (per workflow)

1. **Checkout** — checks out the repository
2. **Login to GHCR** — authenticates via `GHCR_TOKEN` secret
3. **Build & Push** — builds the Docker image and pushes it to `ghcr.io/<owner>/shoegen:<tag>`
4. **Deploy to VPS** — SSHs into the VPS and runs:
   ```bash
   docker pull ghcr.io/<owner>/shoegen:<tag>
   docker compose down
   docker compose up -d
   docker image prune -f   # removes dangling images
   ```

### Required Secrets

| Secret        | Description                                              |
| ------------- | -------------------------------------------------------- |
| `GHCR_TOKEN`  | GitHub Personal Access Token with `write:packages` scope |
| `VPS_HOST`    | IP address or hostname of the VPS                        |
| `VPS_USER`    | SSH username on the VPS                                  |
| `VPS_SSH_KEY` | Private SSH key for VPS access                           |

---
