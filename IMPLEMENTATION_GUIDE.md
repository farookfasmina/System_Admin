# Solo Implementation Guide — Ledger Todo App (Advanced Git & DevOps Assignment)

You have a working project scaffold already (index.html, style.css, app.js, logic.js, tests, ESLint config,
both workflow files, README). This guide is the exact sequence to turn it into a graded, live submission.
Total time budget: ~90 minutes active work, well inside your 6-hour window.

---

## 0. Send the instructor note now (2 min, do this first)
Email/LMS-message your instructor: *"I'm completing this assignment solo — no group was available. I'll fulfill
both the DevOps and Full-Stack roles myself and will document this in the README."* Don't wait for a reply before
continuing — you're covering yourself, not blocking on permission.

## 1. Create the GitHub repository (5 min)
1. Go to github.com → **New repository**
2. Name: `ledger-devops-assignment` (or similar)
3. Visibility: **Public** (required — private = 0 marks)
4. Do **not** initialize with a README (you already have one)
5. Create it, then copy the HTTPS clone URL

## 2. Push the scaffold and set up branches (10 min)
Run these from the folder containing the files I generated:

```bash
git init
git branch -M main
git add .
git commit -m "chore: initial repository setup"
git remote add origin https://github.com/[your-username]/[your-repo].git
git push -u origin main

# create develop as the integration branch
git checkout -b develop
git push -u origin develop
```

## 3. Do real feature-branch work (20–30 min)
Even solo, use real feature branches — this is what the rubric checks for, and it's genuinely how the workflow
works with one person too.

```bash
git checkout develop
git checkout -b feature/task-filters
# make a small real change, e.g. tweak the filter button styling in style.css
git add .
git commit -m "feat: refine active filter button styling"
git push -u origin feature/task-filters
```
Open a Pull Request on GitHub: base `develop` ← compare `feature/task-filters`. Fill in the PR description
(what changed, testing done). Merge it yourself with **"Create a merge commit"** (not squash — you want visible
history). Repeat this once or twice more with other small, real changes (e.g. `feature/empty-state-copy`,
`feature/localstorage-persistence-fix`) so you end up with 3+ feature branches and multiple PRs, and 10+ commits
total. Small, honest, incremental commits are what the rubric wants — don't pad with empty ones.

## 4. Create and resolve a real merge conflict (10 min)
This does **not** require a second person — a genuine conflict just needs two branches editing the same line
before either is merged:

```bash
git checkout develop
git pull origin develop
git checkout -b feature/masthead-a
# edit the <p class="masthead__sub"> line in src/index.html to some text A
git add . && git commit -m "feat: update tagline (version A)"
git checkout develop
git merge feature/masthead-a --no-ff
git push origin develop

git checkout -b feature/masthead-b develop~1   # branch from BEFORE the merge above
# edit the SAME line in src/index.html to different text B
git add . && git commit -m "feat: update tagline (version B)"
git checkout develop
git merge feature/masthead-b --no-ff
```
Git will report `CONFLICT (content): Merge conflict in src/index.html`. Open the file, you'll see:
```
<<<<<<< HEAD
[text A]
=======
[text B]
>>>>>>> feature/masthead-b
```
Manually edit to keep/combine the text you prefer, remove the markers, then:
```bash
git add src/index.html
git commit -m "fix: resolve masthead subtitle merge conflict between A and B"
git push origin develop
```
This is already documented in the README's "Merge Conflict" section — just fill in what you actually chose.

## 5. Merge develop into main (2 min)
```bash
git checkout main
git pull origin main
git merge develop --no-ff
git push origin main
```
This push to `main` triggers `deploy.yml` automatically.

## 6. Turn on GitHub Pages (2 min, one-time)
Repo → **Settings → Pages** → Source: **GitHub Actions** (not "Deploy from branch"). The `deploy.yml` workflow
handles the rest automatically on every push to `main`.

## 7. Watch the workflows go green (a few min)
Repo → **Actions** tab. You should see `CI Pipeline` and `Deploy to GitHub Pages` run and pass. If `npm run lint`
fails in CI because there are no `package-lock.json`-driven cached deps yet, that's fine — `npm install` in the
workflow handles it; just check the Actions log if anything fails and fix forward with another commit.

## 8. Get your live URL and finish the README (5 min)
Once `Deploy to GitHub Pages` succeeds, the live URL appears in the workflow run summary (and under
**Settings → Pages**). Typically: `https://[username].github.io/[repo-name]/`. Paste it into:
- `README.md` → **Live Deployment**
- `README.md` → **Build Status** badges (replace `[username]` and `[repo-name]`)

Fill in your real name and student ID at the top of the README, then commit and push directly to `main` (or via
one more quick feature branch/PR if you want the extra PR count):
```bash
git add README.md
git commit -m "docs: add live deployment link and finalize README"
git push origin main
```

## 9. Branch protection (optional but scores points) (3 min)
Repo → **Settings → Branches → Add rule** → branch name pattern `main` → enable **Require a pull request before
merging**. Document this in the README under CI/CD process (one sentence is enough).

## 10. Final checks before submission (5 min)
- Open the live URL in an incognito window — confirm it loads and works.
- Check the Actions tab — both workflows show a green check on the latest run.
- Check `git shortlog -sn --all` locally to confirm your commit count.
- Confirm the repo is **Public** (Settings → General → Danger Zone shows current visibility).
- Copy the repo URL and paste it as **plain text** into the LMS. Do not upload any file.

---

### Time budget recap
| Step | Time |
|---|---|
| Instructor note | 2 min |
| Repo + branches | 15 min |
| Feature branches + PRs | 30 min |
| Merge conflict demo | 10 min |
| Merge to main + Pages setup | 5 min |
| Watch CI/CD pass | 5–10 min |
| README + live URL | 5 min |
| Branch protection | 3 min |
| Final checks + submit | 5 min |
| **Total** | **~80–90 min**, leaving you a large buffer inside 6 hours |
