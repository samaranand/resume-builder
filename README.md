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

Editor layout preferences are also local-only:

```text
resume-builder:view-mode:v1
resume-builder:editor-sections:v1
```

## Editing Experience

The toolbar supports three modes:

- `Editor`
- `Editor + PDF`
- `PDF only`

Editor sections remember whether they were open or closed. The file name field controls the JSON export name and browser document title used by the print dialog.

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

The resume CSS mirrors the supplied LaTeX geometry, section order, dense spacing, heading rules, circular bullets, and right-aligned date/location rows. Latin Modern Roman OpenType fonts are bundled locally under `src/assets/fonts/latin-modern` from the CTAN `lm` package, licensed under the GUST Font License. No remote font loading is required at runtime.
