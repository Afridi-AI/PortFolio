# Ikram Ullah Afridi — AI/ML Portfolio

Premium dark-mode portfolio for **Ikram Ullah Afridi**, a Computer Systems Engineering graduate focused on AI, machine learning, Python development, and practical application building.

The site is intentionally **CV-grounded**: project descriptions, technical skills, experience, education, training, contact details, and the downloadable CV are sourced from the corrected CV provided for this project. It does not invent repository URLs, live demos, performance metrics, publications, or credential links.

## Highlights

- Dark technical visual system with cyan signal-map motif and responsive motion
- Named project portfolio covering:
  - GlucoSense AI
  - AI Skin Specialist
  - Document OCR Pipeline
  - Tech Stack and Career Recommender
  - Iris Classification Pipeline
- CV-based skills across Python, machine learning, computer vision, speech, Flutter, Flask, Gradio, Firebase, and development tooling
- Experience timeline for DecodeLabs, SCO Mirpur, and AWS Cloud Club, MUST
- Downloadable corrected CV served from managed project storage
- Contact form with shared validation and owner notification through tRPC
- Mobile navigation, reduced-motion support, semantic sections, and SEO metadata

## Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Framer Motion
- Lucide React
- Express + tRPC 11
- Zod validation
- Vitest
- Manus WebDev runtime and managed storage

## Project structure

```text
client/
  src/pages/Home.tsx       Main portfolio experience and interactions
  src/index.css            Global theme and visual system
  client/index.html        SEO metadata and structured profile data
server/
  routers.ts               Portfolio query and contact mutation
shared/
  portfolio.ts             Single source of CV-grounded portfolio content
  contact.ts               Shared contact feedback copy
cv_content_inventory.md    Auditable mapping from CV facts to site content
```

## Local development

```bash
pnpm install
pnpm dev
```

The development server runs on port `3000` by default.

## Validation

```bash
pnpm check
pnpm test
pnpm build
```

## Content updates

Update `shared/portfolio.ts` when the CV changes. Keep claims factual and traceable to the current CV. Update `cv_content_inventory.md` at the same time so the source mapping remains auditable. The contact endpoint is in `server/routers.ts`; preserve its Zod validation and owner-notification behavior when changing the form.

## Deployment

This project is configured for the Manus WebDev runtime. Create a checkpoint after meaningful changes, then publish from the Manus project management UI. The repository export is maintained at [`Afridi-AI/PortFolio`](https://github.com/Afridi-AI/PortFolio).

## License

The portfolio content and CV are personal materials belonging to Ikram Ullah Afridi. The application code may be reused for demonstration with attribution.
