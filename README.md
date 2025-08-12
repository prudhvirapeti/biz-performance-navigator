# Prudhvi Raj Rapeti – Power BI Portfolio

A professional portfolio showcasing three completed, job‑ready BI projects focused on B2B parts pricing and analytics. Built with React, Vite, Tailwind CSS, and Recharts. Each project includes datasets, SQL transforms, and DAX measures so recruiters can verify hands‑on skills.

## Live Demo
After publishing/deploying, add your link here (GitHub Pages / Netlify / Vercel).

## Projects
1) Parts Pricing & Sales Dashboard
   - Focus: pricing trends, top parts, revenue impact, region performance.
   - Assets: CSV, SQL, DAX; mock dashboard image; interactive web demo.
2) Customer Order Trends Dashboard
   - Focus: segmentation, repeat orders, retention %, cadence.
   - Assets: CSV, SQL, DAX; mock dashboard image; interactive web demo.
3) Financial KPI Tracker
   - Focus: revenue, profit, gross margin %, growth, category profitability.
   - Assets: CSV, SQL, DAX; mock dashboard image; interactive web demo.

## Tech Stack
- Frontend: React 18, Vite, TypeScript
- UI: Tailwind CSS, Radix UI, shadcn components
- Charts: Recharts
- SEO: react-helmet-async

## Local Development
```
npm install
npm run dev
```
Open http://localhost:5173

## Production Build
```
npm run build
npm run preview
```

## Deploy Options

### 1) GitHub Pages (recommended if you want a public GitHub URL)
- Set the Vite base path to your repository name in vite.config.ts:
  ```ts
  export default defineConfig({
    base: "/<your-repo-name>/",
    plugins: [react()],
  });
  ```
- Commit and push.
- In GitHub: Settings → Pages → Build and deployment → Source: GitHub Actions.
- Ensure the workflow below exists (created in this repo): .github/workflows/deploy.yml
- After the first run, GitHub Pages will give you a URL like https://<username>.github.io/<repo>/

SPA routing tip: GitHub Pages doesn’t support server‑side rewrites. If you need perfect client routing, consider HashRouter or deploy to Netlify/Vercel.

### 2) Netlify
- Connect your repo, build command: `npm run build`, publish directory: `dist`.
- Add redirect for SPA:
  ```
  /*    /index.html   200
  ```

### 3) Vercel
- New Project → Import GitHub repo → Framework: Other → Build: `npm run build`, Output: `dist`.
- Vercel handles SPA routing automatically.

## How to Present This as Hand‑Built
- Keep a clean commit history (squash/rename commits) and ensure README describes your stack and build steps.
- Use the neutral footer attribution (React/Vite/Tailwind/Recharts) already included.
- Optional: add a short “Architecture” section and screenshots in this README.

## License
This repository is for portfolio purposes.
