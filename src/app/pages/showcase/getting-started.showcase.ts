import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent, IconComponent } from '@checkworkrights/ui-angular';
import { HighlightSnippet } from './highlight-snippet';
import { ShowcaseHeader } from './showcase-header';

interface Requirement {
  name: string;
  version: string;
  note: string;
}

interface Issue {
  symptom: string;
  fix: string;
}

interface NextLink {
  title: string;
  description: string;
  route: string;
}

@Component({
  selector: 'app-getting-started-showcase',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    IconComponent,
    ButtonComponent,
    HighlightSnippet,
    ShowcaseHeader,
    RouterLink,
  ],
  template: `
    <app-showcase-header
      title="Getting Started"
      selector="@checkworkrights/ui-angular"
    ></app-showcase-header>

    <p class="lead">
      Set up <code>&#64;checkworkrights/ui-angular</code> in an Angular app in
      five steps, then check that it works. Every page in this showcase renders
      the real package components, with usage code you can copy.
    </p>

    <section class="requirements" aria-label="Requirements">
      @for (req of requirements; track req.name) {
        <div class="requirement">
          <span class="requirement__name">{{ req.name }}</span>
          <span class="requirement__version">{{ req.version }}</span>
          <span class="requirement__note">{{ req.note }}</span>
        </div>
      }
    </section>

    <ol class="steps">
      <li class="step">
        <div class="step__header">
          <h2>Install the packages</h2>
        </div>
        <p>
          <code>&#64;checkworkrights/design-tokens</code> is a peer dependency.
          Install it next to the component library so your app controls its
          version.
        </p>
        <app-highlight-snippet
          title="Terminal"
          language="bash"
          [code]="installCode"
        ></app-highlight-snippet>
      </li>

      <li class="step">
        <div class="step__header">
          <h2>Register the static assets</h2>
        </div>
        <p>
          <code>cwr-icon</code> and <code>cwr-illustration</code> fetch their
          SVGs at runtime. Add the package's <code>public</code> folder to the
          <code>assets</code> array in <code>angular.json</code>, and keep the
          entries you already have.
        </p>
        <app-highlight-snippet
          title="angular.json — architect.build.options"
          language="json"
          [code]="assetsCode"
        ></app-highlight-snippet>
      </li>

      <li class="step">
        <div class="step__header">
          <h2>Load the styles</h2>
        </div>
        <p>Add three stylesheets to the <code>styles</code> array:</p>
        <ul class="checklist">
          <li>
            <code>dark.css</code> defines every token on <code>:root</code>.
            This is the default theme.
          </li>
          <li>
            <code>light.css</code> overrides those tokens under
            <code>[data-theme='light']</code>.
          </li>
          <li>
            <code>utility-classes.css</code> provides the shared borders and
            focus rings used by Button, IconButton and the input wrappers.
          </li>
        </ul>
        <app-highlight-snippet
          title="angular.json — architect.build.options"
          language="json"
          [code]="stylesCode"
        ></app-highlight-snippet>
        <div class="note note--warning">
          <cwr-icon icon="icon.status.warning" size="sm"></cwr-icon>
          <p>
            Load both theme files, even if you only ship one theme, and keep
            <code>light.css</code> after <code>dark.css</code> so its overrides
            win.
          </p>
        </div>
        <p class="aside">
          If you prefer SCSS, you can import the utility classes from your
          global stylesheet instead of adding them to <code>angular.json</code>.
          This showcase does that.
        </p>
        <app-highlight-snippet
          title="src/styles.scss"
          language="scss"
          [code]="utilityImportCode"
        ></app-highlight-snippet>
      </li>

      <li class="step">
        <div class="step__header">
          <h2>Switch themes</h2>
        </div>
        <p>
          Dark is active by default. To switch to light, set
          <code>data-theme="light"</code> on <code>&lt;html&gt;</code> (or any
          ancestor of the components). Remove it to go back to dark. The theme
          toggle in this app's sidebar works this way.
        </p>
        <app-highlight-snippet
          title="theme.ts"
          [code]="themeCode"
        ></app-highlight-snippet>
      </li>

      <li class="step">
        <div class="step__header">
          <h2>Import a component</h2>
        </div>
        <p>
          Every component is standalone. Import each class into your component's
          <code>imports</code> array; there is no NgModule to register.
        </p>
        <app-highlight-snippet
          title="app.ts"
          [code]="usageCode"
        ></app-highlight-snippet>
      </li>

      <li class="step step--done">
        <div class="step__header">
          <h2>Check your setup</h2>
        </div>
        <p>
          Put this in any template and run the app. You should see a check icon
          and a styled brand button.
        </p>
        <app-highlight-snippet
          title="Any component template"
          language="html"
          [code]="verifyCode"
        >
          <cwr-icon icon="icon.ui.check" size="lg"></cwr-icon>
          <cwr-button
            label="It works"
            variant="solid"
            intent="brand"
          ></cwr-button>
        </app-highlight-snippet>
      </li>
    </ol>

    <h2 class="section-title">Troubleshooting</h2>
    <div class="issues">
      @for (issue of issues; track issue.symptom) {
        <div class="issue">
          <p class="issue__symptom">{{ issue.symptom }}</p>
          <p class="issue__fix" [innerHTML]="issue.fix"></p>
        </div>
      }
    </div>

    <h2 class="section-title">Next steps</h2>
    <div class="next">
      @for (link of nextLinks; track link.route) {
        <a class="next__card" [routerLink]="link.route">
          <span class="next__title">
            {{ link.title }}
            <cwr-icon icon="icon.ui.arrow-right" size="sm"></cwr-icon>
          </span>
          <span class="next__desc">{{ link.description }}</span>
        </a>
      }
    </div>

    <p class="footer-note">
      The full API reference, composition notes and testing guidance are in the
      package README at
      <code>packages/ui/angular/README.md</code>.
    </p>
  `,
  styleUrl: './getting-started.showcase.scss',
})
export class GettingStartedShowcase {
  requirements: Requirement[] = [
    {
      name: 'Angular',
      version: '21.2+ or 22.1.6+',
      note: 'Same range for @angular/cdk, forms and router.',
    },
    {
      name: '@checkworkrights/design-tokens',
      version: '^0.2.10',
      note: 'Required peer dependency. Provides every CSS variable.',
    },
    {
      name: 'RxJS',
      version: '~7.8.0',
      note: 'AG Grid 36 is also a peer, used by cwr-ag-grid.',
    },
  ];

  issues: Issue[] = [
    {
      symptom: 'Icons are blank or return 404',
      fix: 'The <code>node_modules/@checkworkrights/ui-angular/public</code> entry is missing from <code>assets</code> (step 2).',
    },
    {
      symptom: 'Colors and spacing look unstyled',
      fix: '<code>dark.css</code> and <code>light.css</code> from <code>@checkworkrights/design-tokens</code> are not loaded (step 3).',
    },
    {
      symptom: 'Buttons or inputs have no border or focus ring',
      fix: '<code>utility-classes.css</code> is not loaded, either in <code>angular.json</code> or through an <code>@import</code> (step 3).',
    },
    {
      symptom: 'Light theme never applies',
      fix: 'Check that <code>light.css</code> comes after <code>dark.css</code> and that <code>data-theme="light"</code> is on an ancestor of the component (step 4).',
    },
    {
      symptom: "'cwr-…' is not a known element",
      fix: 'Add the component class, for example <code>ButtonComponent</code>, to the <code>imports</code> array of the component that uses it (step 5).',
    },
  ];

  nextLinks: NextLink[] = [
    {
      title: 'Design tokens',
      description: 'Browse and copy every color, spacing and type token.',
      route: '/design-tokens',
    },
    {
      title: 'Button',
      description: 'Variants, intents, sizes and icons.',
      route: '/showcase/button',
    },
    {
      title: 'Icon',
      description: 'The full icon set and sizes.',
      route: '/showcase/icon',
    },
    {
      title: 'Form',
      description: 'Build forms with fields and validation.',
      route: '/showcase/form',
    },
  ];

  installCode = `npm install @checkworkrights/ui-angular @checkworkrights/design-tokens`;

  assetsCode = `"assets": [
  { "glob": "**/*", "input": "public" },
  { "glob": "**/*", "input": "node_modules/@checkworkrights/ui-angular/public" }
]`;

  stylesCode = `"styles": [
  "src/styles.scss",
  "@checkworkrights/design-tokens/dark.css",
  "@checkworkrights/design-tokens/light.css",
  "@checkworkrights/ui-angular/styles/utility-classes.css"
]`;

  utilityImportCode = `@import '@checkworkrights/ui-angular/styles/utility-classes.css';`;

  themeCode = `export function setTheme(theme: 'dark' | 'light'): void {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}`;

  usageCode = `import { Component } from '@angular/core';
import { ButtonComponent, IconComponent } from '@checkworkrights/ui-angular';

@Component({
  selector: 'app-root',
  imports: [IconComponent, ButtonComponent],
  template: \`
    <cwr-icon icon="icon.ui.check" size="md"></cwr-icon>
    <cwr-button label="Save" (buttonClick)="onSave()"></cwr-button>
  \`,
})
export class App {
  onSave(): void {}
}`;

  verifyCode = `<cwr-icon icon="icon.ui.check" size="lg"></cwr-icon>
<cwr-button label="It works" variant="solid" intent="brand"></cwr-button>`;
}
