import { Component } from '@angular/core';
import { IconComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { CodeSnippet } from './code-snippet';

@Component({
  selector: 'app-getting-started-showcase',
  standalone: true,
  imports: [IconComponent, ButtonComponent, ExampleBlock, CodeSnippet],
  template: `
    <h1>Getting Started</h1>
    <p>
      This app is a live showcase of <code>&#64;checkworkrights/ui-angular</code> — every page in the nav
      renders the real package components with copy-pasteable usage code. Use it as a reference when
      wiring the library into your own Angular app.
    </p>

    <h2>Step 1 — Install</h2>
    <p>
      <code>&#64;checkworkrights/design-tokens</code> is a required peer dependency, not a transitive
      one — install it explicitly alongside the component library.
    </p>
    <app-code-snippet
      title="Terminal"
      code="npm install @checkworkrights/ui-angular @checkworkrights/design-tokens"
    ></app-code-snippet>

    <h2>Step 2 — Configure angular.json</h2>
    <p>
      Icons, illustrations, and theming are loaded as static assets and CSS at runtime, not bundled into
      your JS. Add these entries to your app's existing <code>assets</code> and <code>styles</code> arrays
      — don't replace what's already there.
    </p>
    <app-code-snippet title="angular.json" [code]="angularJsonCode"></app-code-snippet>
    <p>
      <code>node_modules/@checkworkrights/ui-angular/public</code> (assets) lets
      <code>cwr-icon</code> / <code>cwr-illustration</code> fetch their SVGs at runtime.
      <code>dark.css</code> and <code>light.css</code> register every design token
      (<code>--color-*</code>, <code>--space-*</code>, <code>--text-style-*</code>) the components read
      from — import both regardless of your default theme, then switch at runtime by toggling
      <code>data-theme="light"</code> on an ancestor element (see the theme toggle in the bottom-right of
      this app).
    </p>

    <h2>Step 2b — Load utility-classes.css</h2>
    <p>
      <code>utility-classes.css</code> provides shared CSS (e.g. the inset <code>::after</code>
      container-border) that <code>Button</code>, <code>IconButton</code>, and <code>InputWrapper</code>
      depend on for their borders and focus rings. There are two equivalent ways to load it — pick one:
    </p>
    <app-code-snippet title="Option A — angular.json styles array" [code]="utilityAngularJsonCode">
    </app-code-snippet>
    <app-code-snippet
      title="Option B — @import in your global stylesheet (used by this app)"
      [code]="utilityImportCode"
    ></app-code-snippet>

    <h2>Step 3 — Import and use a component</h2>
    <p>
      Every component is standalone — import the class directly into your component's <code>imports</code>
      array. There is no shared NgModule barrel to reach for.
    </p>
    <app-code-snippet title="app.ts" [code]="usageCode"></app-code-snippet>

    <h2>Verify your setup</h2>
    <p>Drop this into any component template and run the app — it should render styled and interactive:</p>
    <app-example-block [code]="verifyCode">
      <cwr-icon icon="icon.ui.check" size="lg"></cwr-icon>
      <cwr-button label="It works" variant="solid" intent="brand"></cwr-button>
    </app-example-block>

    <h2>Troubleshooting</h2>
    <ul>
      <li>
        <strong>Icon doesn't render / 404 in the network tab</strong> — the
        <code>node_modules/@checkworkrights/ui-angular/public</code> assets entry is missing.
      </li>
      <li>
        <strong>Colors look unstyled or use browser defaults</strong> — <code>dark.css</code>/<code
          >light.css</code
        >
        from <code>&#64;checkworkrights/design-tokens</code> aren't loaded.
      </li>
    </ul>

    <p>
      Full API reference, composition notes, and testing guidance live in the package
      <code>README.md</code> at <code>packages/ui/angular/README.md</code>. Use the nav on the left to
      browse a live example and copy-pasteable code for every exported component.
    </p>
  `,
})
export class GettingStartedShowcase {
  angularJsonCode = `{
  "projects": {
    "your-app": {
      "architect": {
        "build": {
          "options": {
            "assets": [
              { "glob": "**/*", "input": "public" },
              { "glob": "**/*", "input": "node_modules/@checkworkrights/ui-angular/public" }
            ],
            "styles": [
              "src/styles.scss",
              "@checkworkrights/design-tokens/dark.css",
              "@checkworkrights/design-tokens/light.css"
            ]
          }
        }
      }
    }
  }
}`;

  utilityAngularJsonCode = `"styles": [
  "src/styles.scss",
  "node_modules/@checkworkrights/ui-angular/styles/utility-classes.css",
  "@checkworkrights/design-tokens/dark.css",
  "@checkworkrights/design-tokens/light.css"
]`;

  utilityImportCode = `// src/styles.scss
@import '@checkworkrights/ui-angular/styles/utility-classes.css';`;

  usageCode = `import { Component } from '@angular/core';
import { IconComponent, ButtonComponent } from '@checkworkrights/ui-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IconComponent, ButtonComponent],
  template: \`
    <cwr-icon icon="icon.ui.home" size="md"></cwr-icon>
    <cwr-button label="Save" (buttonClick)="onSave()"></cwr-button>
  \`,
})
export class App {
  onSave(): void {}
}`;

  verifyCode = `<cwr-icon icon="icon.ui.check" size="lg"></cwr-icon>
<cwr-button label="It works" variant="solid" intent="brand"></cwr-button>`;
}
