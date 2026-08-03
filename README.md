# Mini CRM — Frontend

A responsive **React Single Page Application** for the Mini CRM project. Built with **Vite + TypeScript**, **Tailwind CSS v4**, **TanStack Query**, **Zustand**, and a shadcn/ui design system.

---

## 🧱 Stack

- **React 18** + **TypeScript**
- **Vite** (fast dev server & production builds)
- **React Router v6** — routing + route guards
- **TanStack Query** — server-state caching, mutations, invalidation
- **Zustand** — client-state (auth)
- **React Hook Form + Zod** — form handling & validation
- **Tailwind CSS v4** — utility-first styling
- **Radix UI / shadcn/ui** — accessible, reusable components
- **Recharts** — dashboard charts
- **next-themes** — dark mode

---

## 📁 Project Structure

```
src/
├── app/                      # App wiring
│   ├── layouts/              # AuthLayout, DashboardLayout, nav-items
│   └── router/               # AppRouter + guards (Protected, Guest, Admin)
├── pages/                    # Route-level pages
│   ├── login-page.tsx
│   ├── dashboard-page.tsx
│   ├── customers-page.tsx
│   ├── projects-page.tsx
│   ├── tasks-page.tsx
│   ├── profile-page.tsx
│   ├── users-page.tsx        # admin only
│   └── not-found-page.tsx
├── features/                 # Feature modules (api, model, ui)
│   ├── auth/ customers/ projects/ tasks/ users/ dashboard/
└── shared/                   # Reusable code
    ├── api/                  # axios instance, http client, endpoints, types
    ├── config/               # routes, env
    ├── hooks/                # useTableQuery, useDebounce
    ├── lib/                  # query-client, token-storage, format, utils
    └── ui/                   # shadcn/ui components (button, table, dialog…)
```

---

## 📄 Pages

| Route | Page | Access |
|---|---|---|
| `/login` | Login | Guest |
| `/` | Dashboard | **Admin** |
| `/customers` | Customers CRUD | **Admin** |
| `/projects` | Projects CRUD | **Admin** |
| `/tasks` | Tasks (own for users) | All authenticated |
| `/users` | Users CRUD | **Admin** |
| `/profile` | Current user profile | All authenticated |
| `*` | 404 | — |

> **Route guards** enforce access both in the sidebar (via `adminOnly` items) and at the router level. Regular users only see **Tasks** and **Profile**, and are redirected to `/tasks` after login.

---

## 🚀 Getting Started

```bash
# 1. Install
npm install

# 2. Configure the API base URL
cp .env.example .env   # VITE_API_URL=http://localhost:3000

# 3. Run the dev server
npm run dev
```

Open **http://localhost:5173**.

The frontend calls the backend at `${VITE_API_URL}/api`. Make sure the backend is running first (see [`../backend/README.md`](../backend/README.md)).

---

## 🎨 Design system

All UI primitives are shadcn/ui components styled with CSS variables (light/dark). A **design-system showcase page** lets you preview colors, buttons, inputs, tables and more. Use the theme toggle in the header to switch between **light** and **dark** mode.

---

## 🔍 Data & Pagination

- All list queries use **TanStack Query**. Mutations invalidate the list cache so the UI stays in sync.
- Lists use **cursor-based pagination**:
  - `useTableQuery` keeps a stack of cursors so you can go **forward** and **back**.
  - Clearing search or changing a filter resets to the first page.

---

## 🛠️ Scripts

```bash
npm run dev       # vite dev server
npm run build     # type-check + production build (tsc -b && vite build)
npm run preview   # preview the production build
npm run lint      # eslint .
```

---

## 🔗 Related

- Backend API → [`../backend/README.md`](../backend/README.md)
- Project root → [`../README.md`](../README.md)