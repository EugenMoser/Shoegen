# GitHub Copilot Instructions for Next.js 16 Project

## 1. Interaction Guidelines (CRITICAL)

- **NO DIRECT CODE MODIFICATION:** Do not modify the code in the editor unless explicitly instructed with phrases like "fix this inline" or "change the code".
- **CHAT ONLY:** Provide all suggestions, refactorings, and answers inside the Chat interface.
- **Explain First:** Briefly explain the architectural decision before providing the code block.

## 2. Tech Stack & Context

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Auth:** Auth.js (NextAuth v5 beta/stable)
- **Database:** MongoDB (via Prisma - check `schema.prisma`)
- **Images:**
- **State/Data:** Server Actions, React Server Components (RSC)

## 3. Coding Standards & Best Practices

### Next.js 16 Specifics

- **Server Components:** Default to Server Components. Use `'use client'` only when hook usage (useState, useEffect) or event listeners are strictly necessary.
- **Server Actions:** Use Server Actions for data mutations instead of API Routes. Implement `zod` for validation inside actions.
- **Async Components:** Await params and searchParams in layouts/pages (Next.js 15/16 breaking change).
- **Caching:** Understand `unstable_cache` (or standard `cache`) and `revalidatePath` strategies.

### UI & Styling (Shadcn/Tailwind)

- Use standard `shadcn` components from `@/components/ui`.
- Do not invent new class names; use Tailwind utility classes.
- Ensure mobile responsiveness (`md:`, `lg:` prefixes).
- Use `lucide-react` for icons.

### Authentication (Auth.js)

- Use `auth()` helper in Server Components.
- Use `useSession` in Client Components only if necessary.
- Protect routes via Middleware (`middleware.ts`) or Server Action checks.

### Code Quality

- **Type Safety:** Strict TypeScript usage. No `any`.
- **Error Handling:** Use `try/catch` in Server Actions and return structured error objects (e.g., `{ error: string }` or `{ success: boolean }`).
- **File Structure:** Feature-first or standard App Router structure (keep related utils close to features if possible).

## 4. Tone & Language

- Answer in **German**.
- Be concise, technical, and direct. No fluff.

## 5. Git Commit Convention

**STRICTLY** follow the **Conventional Commits** pattern: `<type>(<scope>): <description>`

- **Constraint:** Output **ONLY** the single subject line. **DO NOT** generate a body, bullet points, or descriptions unless explicitly asked for a "full commit message".
- **Format Rules:**
  - **Language:** English.
  - **Type:** Use `feat`, `fix`, `refactor`, `chore`, `docs`, or `style`.
  - **Scope:** The affected feature or module (e.g., `auth`, `shoes`, `schema`).
  - **Description:** Lowercase, no ending period, imperative mood.

- **Examples:**
  - `fix(auth): update login function to use undefined instead of null`
  - `refactor(schema): standardize import statements`
