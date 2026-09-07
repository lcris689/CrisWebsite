# Portfolio Website Agent Guide

## Purpose
Maintain Cristobal Lizarraga's personal project portfolio. The site should feel personal and project-led—not like a generic SaaS, agency, or shopping template.

## Source of truth
- GitHub repository: `https://github.com/lcris689/CrisWebsite`
- This Git repository is canonical regardless of the machine-specific clone path.
- Use branches and commits for synchronization between desktop and laptop; do not synchronize the working tree through OneDrive.

## Content rules
- Display résumé and internship ranges as month/year only (for example, `May 2026 — July 2026`).
- Treat résumé PDFs and personal contact data as sensitive; verify intended public exposure before adding them.
- Keep claims accurate and distinguish completed work from planned work.

## Engineering workflow
1. Check `git status` and the current branch before editing.
2. Preserve unrelated user changes.
3. Prefer focused branches and commits.
4. Run `npm test` and `npm run build` before declaring code changes complete.
5. Check desktop and mobile layouts for visual changes.
