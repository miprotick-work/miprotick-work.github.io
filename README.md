# miprotick-work.github.io

The portfolio and public-resource hub for every project by **miprotick-work**. It is built with [Astro](https://astro.build) and deployed to GitHub Pages.

| URL | What |
| --- | --- |
| `/` | Workspace brand + project showcase |
| `/<project>/` | Project overview, links, repo stats, list of documents |
| `/<project>/<resource>/` | A public document, e.g. `/my-app/privacy-policy/` |

## Develop

```sh
npm install
npm run dev        # http://localhost:4321, drafts are visible here
npm run build      # production build → dist/ (drafts excluded)
npm run check      # type-check content + components
```

## Add a project

```sh
npm run new-project -- habit-tracker "Habit Tracker"
```

This creates `src/content/projects/habit-tracker/` from [`templates/project/`](templates/project/):

```
project.md          metadata (frontmatter) + overview (body)
privacy-policy.md   → /habit-tracker/privacy-policy/
terms.md            → /habit-tracker/terms/
support.md          → /habit-tracker/support/
delete-account.md   → /habit-tracker/delete-account/
```

New projects start as `draft: true`. Work through the `<!-- TODO -->` comments in each file, delete the sections that don't apply, then set `draft: false` to publish.

- **Extra resources:** drop any other `.md` file into the project folder (e.g. `eula.md`, `cookie-policy.md`) and it becomes `/<project>/eula/`. Its navigation label is its `title`; to fix its position in the navigation, add it to `resourceTypes` in [`src/config/site.ts`](src/config/site.ts).
- **Remove a resource:** delete its file.
- **Contact emails:** documents use the `{{contact}}` token, which is filled in when the page renders. By default it lists the site-wide `contactEmails` from `site.ts`. To override them for one project, set `contactEmails:` in its `project.md` to a single email or a list.
- **Live repo stats:** set `repo: owner/name` in `project.md`. Only public repos return stats, and the build never fails on an API error.
- **Updating a policy:** keep `effectiveDate`, and add or bump `lastUpdated`. The page links to its git revision history automatically.

> ⚠️ **Stable URLs:** app stores link to these pages, so never rename a project folder or a resource file once it has been published.

## Branding

Everything site-wide (brand, name, tagline, contact emails, socials) is in [`src/config/site.ts`](src/config/site.ts). Colors and fonts are in [`src/styles/global.css`](src/styles/global.css).

## Deploy (GitHub Pages)

| | |
| --- | --- |
| Repo | [`miprotick-work/miprotick-work.github.io`](https://github.com/miprotick-work/miprotick-work.github.io) |
| Live site | <https://miprotick-work.github.io/> |
| Pages source | **Settings → Pages → Source: GitHub Actions** |

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds and deploys on every push to `main`, and again every Monday to refresh the repo stats. You can also run it manually from the **Actions** tab.

Because the repo is named `<account>.github.io`, GitHub serves it from the domain root, so project pages live at `https://miprotick-work.github.io/<project>/<resource>/`, for example <https://miprotick-work.github.io/hidayah/privacy-policy/>.

> ⚠️ Don't rename the repo. Any other name moves the whole site under `/<repo-name>/` and breaks the URLs that app stores link to.

In components, build internal links with `url('/path/')` from [`src/lib/url.ts`](src/lib/url.ts).

---

*The legal templates are a starting point, not legal advice. Review them against what each app actually does, and against its store privacy labels.*
