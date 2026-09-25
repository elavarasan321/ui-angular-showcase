# CWR UI Showcase

An interactive showcase for `@checkworkrights/ui-angular`, the CheckWorkRights Angular component library, and `@checkworkrights/design-tokens`.

Each component page includes:

- a live playground for changing inputs
- usage examples with copyable code
- an API reference generated from the installed library

The app also has a design-tokens browser, light and dark themes, and a global search.

## Tech stack

- Angular 21 (standalone components, lazy-loaded routes)
- `@checkworkrights/ui-angular` and `@checkworkrights/design-tokens`
- AG Grid 36
- ngx-highlightjs for code snippets
- Karma and Jasmine for unit tests

## Getting started

### Prerequisites

- Node.js (a version supported by Angular 21)
- Access to the `@checkworkrights` packages on GitHub Packages (`npm.pkg.github.com`), configured in `.npmrc`

### Install and run

```bash
npm install
npm start
```

Then open http://localhost:4200/. The app reloads automatically when you change a source file.

## Scripts

| Command                   | Description                                                     |
| ------------------------- | --------------------------------------------------------------- |
| `npm start`               | Regenerates the generated files, then runs `ng serve`           |
| `npm run build`           | Regenerates the generated files, then builds into `dist/`       |
| `npm run watch`           | Rebuilds in development mode whenever a file changes            |
| `npm test`                | Runs the unit tests with Karma                                  |
| `npm run generate`        | Runs both generators below                                      |
| `npm run generate:tokens` | Regenerates the design-token data and the scoped dark theme CSS |
| `npm run generate:api`    | Regenerates the component API tables and the library version    |

## Generated files

`npm start` and `npm run build` run the generators first (through the `prestart` and `prebuild` scripts). The generators read the installed packages in `node_modules`, so the showcase always matches the library version it runs.

Don't edit these files by hand:

| File                                                     | Generator                     | Reads from                                       |
| -------------------------------------------------------- | ----------------------------- | ------------------------------------------------ |
| `src/app/pages/showcase/api-reference.generated.ts`      | `generate-api-reference.mjs`  | `@checkworkrights/ui-angular` typings and bundle |
| `src/app/library-version.generated.ts`                   | `generate-api-reference.mjs`  | `@checkworkrights/ui-angular/package.json`       |
| `src/app/pages/design-tokens/design-tokens.generated.ts` | `generate-design-tokens.mjs`  | `@checkworkrights/design-tokens/dist/dark.css`   |
| `src/styles/dark-scoped.generated.css`                   | `generate-design-tokens.mjs`  | `@checkworkrights/design-tokens/dist/dark.css`   |

After you upgrade either library, run `npm run generate` (or restart `npm start`) and commit the regenerated files.

## Project structure

```
scripts/                      Code generators for tokens and API reference
src/
  app/
    app.ts                    App shell: sidebar navigation groups and theme toggle
    app.routes.ts             Lazy-loaded route for each page
    components/
      sidebar/                Side navigation
      global-search/          Search dialog for pages
    pages/
      design-tokens/          Design-tokens browser
      showcase/               One page per component, plus shared building blocks
  styles/                     Global and generated styles
```

## Adding a component page

1. Create `src/app/pages/showcase/<name>.showcase.ts`. Build it from the shared blocks:
   - `ShowcaseHeader` for the page title and selector
   - a `<name>-playground.ts` for the interactive playground
   - `ExampleBlock` for each usage example and its code
   - `ComponentReference` for the generated API table

   See `title-block.showcase.ts` for an example.
2. Add a route in `src/app/app.routes.ts`.
3. Add a navigation item to the matching group in `src/app/app.ts`. The sidebar and the global search both read these groups.
4. Run `npm run generate:api` if the component is new in the library.

## Testing against a local library build

To try unreleased changes to `@checkworkrights/ui-angular` or `@checkworkrights/design-tokens`, link a local build with [yalc](https://github.com/wclr/yalc):

```bash
# in the library package, after building it
yalc publish

# in this repo
yalc add @checkworkrights/ui-angular
npm install
```

Run `yalc remove --all && npm install` to go back to the published packages. yalc files are git-ignored.
