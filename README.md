# Ledger — A Task Journal

## Group Information
- **Student 1:** farook fathima fasmina - itbin-2211-0116 - Role: Solo Developer (DevOps + Full-Stack)

> **Note on team size:** This assignment was completed individually. I contacted Isuru Samarappulige regarding solo
> submission on 07th August 2026. All DevOps Engineer and Full-Stack Developer responsibilities (repository setup, CI/CD,
> branching, feature development, and documentation) were carried out by a single contributor.

## Project Description
Ledger is a minimal, distraction-free todo list application styled as a hand-ruled notebook. Users can add tasks,
mark them complete, filter by status (all/active/completed), remove individual tasks, and clear all completed
tasks in one action. Tasks persist locally in the browser via `localStorage`, so the list survives a page refresh.

## Live Deployment
**Live URL:** https://farookfasmina.github.io/System_Admin/

## Technologies Used
- HTML5 / CSS3 / Vanilla JavaScript (ES Modules)
- Node.js built-in test runner (`node --test`) for unit tests
- ESLint 9 (flat config) for linting
- GitHub Actions (CI/CD)
- GitHub Pages (deployment)

## Features
- **Add tasks**: Enter a task and submit to add it to the list.
- **Complete tasks**: Click the checkbox to mark a task done (strikethrough styling).
- **Delete tasks**: Remove any individual task.
- **Filter tasks**: Toggle between All / Active / Completed views.
- **Task counter**: Live count of remaining active items.
- **Clear completed**: One click removes all completed tasks.
- **Persistence**: Tasks are saved to `localStorage` and reload with the page.
- **Responsive design**: Usable on mobile and desktop.

## Branch Strategy
This project followed a standard Git Flow branching model:
- `main` - Production branch (protected, auto-deploys via GitHub Actions on push)
- `develop` - Integration branch used to combine and test features before release
- `feature/*` - Individual work branches, one per feature, merged into `develop` via reviewed pull requests

## Individual Contributions
### Fasmina
- Initialized repository structure, `.gitignore`, and branch strategy (`main` / `develop` / `feature/*`).
- Built the CI pipeline (`ci.yml`): install, lint, build check, and unit tests on every push/PR.
- Built the deployment pipeline (`deploy.yml`): automatic GitHub Pages deploy on merge to `main`.
- Developed the todo application: HTML structure, notebook-ledger styling, and JS logic
  (add/toggle/remove/filter/persist).
- Wrote unit tests for the core task logic (`test/logic.test.js`).
- Created and resolved a documented merge conflict (see below).
- Wrote and maintained this README.

## Setup & Installation Instructions

### Prerequisites
- Node.js (version 18 or higher)
- Git installed locally

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/farookfasmina/System_Admin.git
   ```
2. Navigate into the directory:
   ```bash
   cd System_Admin
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Open `src/index.html` directly in a browser, or serve it locally, e.g.:
   ```bash
   npx serve src
   ```

### CI/CD Deployment Process
On every push to `main`, `develop`, or any `feature/**` branch (and on every pull request into `main`/`develop`),
`ci.yml` installs dependencies, lints `src/scripts`, runs a build check, and runs the unit test suite in
`test/logic.test.js`. When changes are pushed to `main`, `deploy.yml` uploads the contents of `src/` as a Pages
artifact and deploys it to GitHub Pages, producing a fresh live URL automatically — no manual deployment step is
required.

### Challenges & Resolutions
- **Merge conflict:** A deliberate conflict was created by editing the same line of `src/index.html` on two
  branches (see below), then resolved manually by combining both changes and documenting the resolution in the
  commit message.
- **ESLint v9 flat config:** The legacy `.eslintrc` format is deprecated in ESLint 9, so `eslint.config.js` (flat
  config) was used instead to keep linting working in CI.

## Merge Conflict — Demonstration & Resolution
To satisfy the merge-conflict requirement as a solo developer, the conflict was created and resolved honestly
using two branches rather than two people:

1. Branch `feature/masthead-a` changed the subtitle text in `src/index.html`.
2. Without merging that first, branch `feature/masthead-b` changed the *same line* to different text.
3. Merging the second branch into `develop` produced a real `CONFLICT (content): Merge conflict in src/index.html`.
4. The conflict markers were resolved manually, combining the intent of both edits, and committed with:
   `fix: resolve masthead subtitle merge conflict`.

Full commands are in the implementation guide used to build this project.

## Build Status
![CI Pipeline](https://github.com/farookfasmina/System_Admin/actions/workflows/ci.yml/badge.svg)
![Deploy to GitHub Pages](https://github.com/farookfasmina/System_Admin/actions/workflows/deploy.yml/badge.svg)
