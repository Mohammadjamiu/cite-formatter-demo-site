# cite-formatter-site

Landing page for the [cite-formatter](https://www.npmjs.com/package/cite-formatter) npm package.

The interactive demo consumes the **real published** `cite-formatter` package from npm (`^0.3.0`) — no mocks. If the page renders, the published package resolves and runs in the browser.

For local library development without publishing, you can temporarily point at a sibling checkout with `"cite-formatter": "file:../cite-formatter"` in `package.json`.

## Stack

- [Vite](https://vite.dev) + [React 18](https://react.dev) + TypeScript
- [Tailwind CSS 3.4](https://tailwindcss.com) with HSL CSS variables
- [shadcn/ui](https://ui.shadcn.com) components (copy-pasted, not installed as a package)
  - [Radix UI](https://www.radix-ui.com) primitives (Select, Checkbox)
  - [class-variance-authority](https://cva.style) for variant-driven component APIs
  - [lucide-react](https://lucide.dev) for icons
- Design language: Apple-clean — generous whitespace, hairline borders, restrained teal accent, smooth `cubic-bezier(0.4, 0, 0.2, 1)` motion
- `cite-formatter@^0.3.0` from npm

## Develop

```sh
npm install
npm run dev
```

Open http://localhost:5173.

## Type-check and build

```sh
npm run typecheck
npm run build
```

Build output lands in `dist/`. Current production bundle: ~92 kB JS gzipped, ~6 kB CSS gzipped.

## Deploy

This site is intended for [Vercel](https://vercel.com):

1. Push this directory to a new GitHub repo, e.g. `Mohammadjamiu/cite-formatter-site`.
2. In Vercel, click **Add New → Project** and import the repo.
3. Vercel auto-detects Vite. The default build command (`vite build`) and output directory (`dist`) are correct.
4. Deploy.

Subsequent pushes to the default branch auto-deploy.

## Local preview of a production build

```sh
npm run build
npm run preview
```

## Project layout

```
.
├── index.html                       Entry HTML; React mounts into #root
├── vite.config.ts                   Vite + React plugin + @/ alias
├── tailwind.config.ts               Tailwind theme + shadcn tokens + Apple motion
├── postcss.config.js                Tailwind + autoprefixer
├── components.json                  shadcn CLI config (style: default, base: neutral)
├── tsconfig.json                    Solution-style references
├── tsconfig.app.json                App + JSX + path aliases
├── tsconfig.node.json               vite.config.ts only
├── public/
│   └── favicon.svg                  Site favicon
└── src/
    ├── main.tsx                     React entry; renders <App />
    ├── App.tsx                      Top-level layout
    ├── index.css                    Tailwind directives + shadcn HSL theme tokens
    ├── lib/
    │   ├── utils.ts                 cn() helper (clsx + tailwind-merge)
    │   └── examples.ts              Demo manuscript + citations + format options
    └── components/
        ├── SiteHeader.tsx           Sticky frosted-glass header
        ├── Hero.tsx                 Headline + install command + CTAs
        ├── Features.tsx             6-card feature grid (lucide icons)
        ├── Demo.tsx                 Live demo: textareas, select, checkbox, result
        ├── InstallSection.tsx       Dark code blocks: install, usage, modifiers, CLI
        ├── SiteFooter.tsx           Footer
        └── ui/                      shadcn primitives
            ├── button.tsx
            ├── card.tsx
            ├── badge.tsx
            ├── select.tsx
            └── checkbox.tsx
```

## License

MIT
