# Ikram Ullah Afridi — AI/ML Portfolio

A dark, responsive personal portfolio website for **Ikram Ullah Afridi**, a Computer Systems Engineering undergraduate focused on artificial intelligence, cloud communities, and networked systems. The site translates CV-verified experience into an accessible, technical presentation while keeping all public claims grounded in the provided resume.

> This project presents documented experience in AI-related work, AWS Cloud Club leadership, and telecom/network infrastructure. It deliberately avoids fabricated metrics, projects, testimonials, social accounts, and technology claims.

## Highlights

| Area | Implementation |
| --- | --- |
| Personal brand | Dark-mode-first AI/ML visual system with a cyan signal-map motif, technical grid, and responsive layout. |
| Portfolio content | Centralized CV-grounded data for profile, skills, experience, education, certifications, and contact details. |
| Interaction | Sticky section navigation, active-section state, smooth scrolling, mobile menu, hover states, and reduced-motion support. |
| Contact workflow | Validated tRPC contact mutation that sends an owner notification on successful submission. |
| Quality foundations | Semantic HTML, visible focus states, SEO metadata, JSON-LD profile data, `robots.txt`, `sitemap.xml`, TypeScript checks, and Vitest coverage. |

## Portfolio Sections

The site includes a signal-map hero, profile overview, categorized technical skills, selected CV-verified work, detailed experience timeline, education, credentials, and a contact form. Because the supplied CV does not contain public repository links, project titles, live demos, LinkedIn, or GitHub profile URLs, the interface does not invent them.

## Technology Stack

| Layer | Tools |
| --- | --- |
| Client | React 19, TypeScript, Vite, Tailwind CSS 4 |
| Motion and icons | Framer Motion, Lucide React |
| Server | Node.js, Express, tRPC 11, Zod |
| Validation | Vitest, TypeScript |
| Deployment runtime | Manus WebDev project runtime |

## Local Development

### Prerequisites

Use a current Node.js release and `pnpm`. The repository includes a lockfile, so use `pnpm install` rather than mixing package managers.

### Setup

```bash
git clone https://github.com/Afridi-AI/PortFolio.git
cd PortFolio
pnpm install
pnpm dev
```

The development server is configured by the project runtime. Open the local preview URL printed in the terminal after the server starts.

## Available Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start the development server with file watching. |
| `pnpm check` | Run TypeScript type checking without emitting files. |
| `pnpm test` | Run the Vitest test suite. |
| `pnpm build` | Build the client and server bundles for production. |
| `pnpm start` | Start the production server from the build output. |
| `pnpm format` | Format supported source files with Prettier. |

## Content Architecture

Portfolio content is centralized in [`shared/portfolio.ts`](shared/portfolio.ts), allowing profile information, skills, experience, education, credentials, and featured work to be updated without searching across page components. The home page consumes that model through a public tRPC query.

The contact form uses `contact.submit` in [`server/routers.ts`](server/routers.ts). Inputs are validated with Zod before the project’s owner-notification helper is called. The implementation handles both successful delivery and temporary notification-service failure with visible feedback.

## Testing

Run the validation suite before opening a pull request or publishing a new version:

```bash
pnpm check
pnpm test
```

The test suite covers portfolio-data delivery, valid contact submission, validation errors, unavailable owner notifications, and the contact-form feedback copy.

## Deployment Notes

The project is configured for the Manus WebDev runtime. When deploying elsewhere, review environment handling for the tRPC server and replace platform-specific notification and storage integrations as needed. The downloadable CV is served from the project’s managed storage path; if you move the application to another host, upload the CV to the new host or object storage and update `cvUrl` in `shared/portfolio.ts`.

## Contributing

Content changes should preserve the CV as the source of truth. Before adding a new project, credential, social link, or skill, confirm that the information is publicly approved and accurate. Keep the portfolio’s factual, evidence-based tone intact.

## License

This repository is intended for Ikram Ullah Afridi’s personal portfolio. Please obtain permission before reusing the content, personal details, or visual identity.
