# Resume Builder

A completely static browser-based resume builder for one LaTeX-style software engineering resume template. The editor writes structured JSON, stores it in `localStorage`, renders an A4 preview, and uses the browser print dialog for PDF output.

## Commands

```bash
npm install
npm run dev
npm run build
npm test
npm run lint
```

## Privacy

There is no backend, API, authentication, database, analytics, telemetry, or cloud persistence. Resume data is stored only in this browser under the versioned key:

```text
resume-builder:v1
```

## GitHub Pages

The production build emits static files in `dist/`. The Vite base path defaults to relative assets so the app works under:

```text
https://<username>.github.io/<repository-name>/
```

To enable automatic deployment:

1. Push this repository to GitHub.
2. Open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to the `main` branch.

The workflow in `.github/workflows/deploy.yml` runs `npm ci`, `npm run build`, and deploys `dist/` to GitHub Pages.

## PDF

Use `Download PDF` to open the browser print dialog, then choose `Save as PDF`. The print stylesheet removes all application UI and prints the A4 resume page directly with selectable text.

## Rendering Notes

The resume CSS mirrors the supplied LaTeX geometry, section order, dense spacing, heading rules, circular bullets, and right-aligned date/location rows. Browser print engines do not ship TeX's exact Latin Modern metrics by default, so the stylesheet prefers local Latin Modern or Computer Modern fonts when installed and falls back to serif system fonts without remote font loading.
