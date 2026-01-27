# CrisWebsite Copilot Instructions

## Project Overview
Personal resume/portfolio website built with **React 18 + Vite 5**. Single-page application showcasing projects and professional information with a clean, responsive dark-themed design.

## Quick Start for Developers

### Local Development
```bash
npm install
npm run dev          # Start dev server on http://localhost:5173
npm run build        # Production build
npm run preview      # Preview production build
```

### Vite Configuration
- **[vite.config.js](../vite.config.js)** - Minimal config with React plugin enabled
- **GitHub Pages:** Uncomment `base: '/CrisWebsite/'` in config if deploying to GitHub Pages
- **Entry point:** [index.html](../index.html) → mounts React app to `#root` div
- **Resume:** Located in `public/Resume.pdf` — accessible as `/Resume.pdf` in app

## Architecture

### Component Structure
All components are functional React components using arrow functions and props destructuring.

- **[src/App.jsx](../src/App.jsx)** - Main app component
  - Maps hardcoded `projects` array to `ProjectCard` components
  - Contains all page sections: Summary, Projects, Experience, Education, Skills
  - **Future improvement:** Extract projects data to JSON or CMS

- **[src/components/Header.jsx](../src/components/Header.jsx)** - Header with profile
  - Displays avatar image from `public/assets/profile.jpg`
  - Shows name, title, email, and resume download link
  - Responsive profile layout (flexbox)

- **[src/components/Footer.jsx](../src/components/Footer.jsx)** - Site footer
  - Simple footer with build info and GitHub link

- **[src/components/ProjectCard.jsx](../src/components/ProjectCard.jsx)** - Project card
  - Reusable component accepting `{ id, title, description, url, repo }` prop
  - Conditionally renders "Live" and "Code" buttons based on prop presence

### Styling
- **[styles.css](../styles.css)** - Global styles with CSS custom properties
  - Dark theme: `--bg: #000000`, `--card: #ffffff`, `--accent: #2563eb`
  - Mobile breakpoint: 640px
  - BEM-inspired naming: `.site-header`, `.card-body`, `.card-actions`
  - Spacing scale: 6px, 12px, 18px, 24px

- **[src/index.css](../src/index.css)** - React root styles (minimal, optional)

## Component Patterns & React Conventions

### Functional Components
```jsx
// Standard arrow function component with destructuring
export default function ProjectCard({ project }) {
  return (
    <article className="card">
      <h3>{project.title}</h3>
      {/* ... */}
    </article>
  )
}
```

### Props & Data Flow
- **Project object schema:**
  ```javascript
  { id: number, title: string, description: string, url: string, repo: string }
  ```
- Props flow one-way: parent (App) → children (Header, ProjectCard, Footer)
- Use `key={p.id}` when rendering lists for React reconciliation

### External Links
Always use `target="_blank"` + `rel="noreferrer"` for security:
```jsx
<a href={project.url} target="_blank" rel="noreferrer">Live</a>
```

## Common Tasks & How-Tos

### Adding a New Project
1. Open [src/App.jsx](../src/App.jsx) and find the `projects` array
2. Add a new object with unique `id`, `title`, `description`, `url`, `repo`
3. Save — `ProjectCard` renders automatically with Hot Module Reload (HMR)

Example:
```javascript
{
  id: 4,
  title: 'My Cool App',
  description: 'Built with React and Vite for fast performance.',
  url: 'https://myapp.demo',
  repo: 'https://github.com/lcris689/myapp'
}
```

### Updating Page Content
Edit sections directly in [src/App.jsx](../src/App.jsx) main render:
- **Summary** - Update `<section id="summary">` paragraph
- **Experience** - Add/edit job articles in experience section
- **Skills** - Update skills text
- **Education** - Modify degree info

### Changing Colors & Theme
Edit CSS custom properties in [styles.css](../styles.css):
```css
:root {
  --bg: #000000;       /* Background */
  --card: #ffffff;     /* Card background */
  --muted: #ffffff;    /* Text on dark bg */
  --accent: #2563eb;   /* Button/link color */
}
```

Test responsive design at 640px viewport width.

### Extracting Projects to External Data
If projects list grows, migrate to JSON:
1. Create `src/data/projects.json`
2. Import in App.jsx: `import projects from '../data/projects.json'`
3. No component changes needed (same data structure)

## Key Points for Maintainers

### No TypeScript
- Keep all components in `.jsx` files
- Use JSDoc comments if type hints needed:
  ```jsx
  /** @param {{ project: { id, title, description, url, repo } }} props */
  export default function ProjectCard({ project }) { ... }
  ```

### Dependencies Used
- `react@^18.2.0, react-dom@^18.2.0` - UI framework
- `@vitejs/plugin-react@^4.0.0` - Enables JSX in Vite
- `vite@^5.0.0` - Fast bundler with HMR
- ⚠️ **Unused:** `react-router-dom@^6.20.0` — remove unless multi-page routing added

### No Testing Setup
- Vitest is compatible with Vite but not configured
- Add if coverage is required: `npm install -D vitest`

### Assets & Static Files
- **Resume:** `public/Resume.pdf` → accessed as `/Resume.pdf`
- **Profile image:** `public/assets/profile.jpg` → `<img src="/assets/profile.jpg" />`
- Vite serves `public/` folder as root (`/`)

### GitHub Pages Deployment
For GitHub Pages (repo: `CrisWebsite`):
1. Enable "GitHub Pages" in repo settings → GitHub Actions
2. Uncomment `base: '/CrisWebsite/'` in `vite.config.js`
3. Push to main; Actions builds and deploys to `gh-pages` branch

---

## Learning Resources
- [React Docs](https://react.dev) - Functional components, hooks
- [Vite Guide](https://vitejs.dev) - Build config, HMR, deployment
- [MDN - CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) - Theme implementation

