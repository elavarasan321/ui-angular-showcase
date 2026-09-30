// GENERATED FILE — do not edit by hand. Run `npm run generate:changelog` to regenerate.

export interface ChangelogSection {
  /** "Added", "Changed", …; empty for notes that come before the first section heading. */
  title: string;
  /** Pre-rendered, HTML-escaped list markup. */
  html: string;
}

export interface ChangelogRelease {
  /** A semver version, or "Unreleased". */
  version: string;
  date?: string;
  sections: ChangelogSection[];
}

export const CHANGELOG: ChangelogRelease[] = [
  {
    "version": "1.0.32",
    "date": "2026-09-30",
    "sections": [
      {
        "title": "Added",
        "html": "<ul><li><strong>Scrollbar Component</strong> (<code>ScrollbarComponent</code>)<ul><li>Dual-axis support: place a <code>vertical</code> and a <code>horizontal</code> <code>&lt;cwr-scrollbar&gt;</code> side by side after the same scroll container — each skips preceding <code>&lt;cwr-scrollbar&gt;</code> siblings to find it</li><li>Click-to-jump: pressing on the track scrolls so the thumb centres on the click point (clamped to the track ends)</li></ul></li></ul>"
      },
      {
        "title": "Changed",
        "html": "<ul><li><code>ScrollbarComponent</code> now observes the scroll container's direct children with its <code>ResizeObserver</code>, so the thumb updates when content grows or shrinks without the container itself resizing</li><li><code>ScrollbarComponent</code> sets only the axis-specific <code>overscroll-behavior-x</code> / <code>overscroll-behavior-y</code> instead of <code>overscroll-behavior</code>, so a horizontal and vertical scrollbar on the same container no longer overwrite each other</li></ul>"
      }
    ]
  },
  {
    "version": "1.0.32",
    "date": "2026-09-25",
    "sections": [
      {
        "title": "",
        "html": "<p>This entry catches up on components and changes that shipped in earlier <code>1.0.x</code> releases without changelog entries.</p>"
      },
      {
        "title": "Added",
        "html": "<ul><li><strong>Illustration Component</strong> (<code>&lt;cwr-illustration&gt;</code>)</li><li><strong>Buttons and links</strong><ul><li><strong>Button</strong> (<code>&lt;cwr-button&gt;</code>): <code>solid</code> / <code>outline</code> / <code>ghost</code> variants, intents, sizes, leading/trailing icons, loading state</li><li><strong>Icon Button</strong> (<code>&lt;cwr-icon-button&gt;</code>): icon-only button with a built-in hint tooltip</li><li><strong>Inline Button</strong> (<code>&lt;cwr-inline-button&gt;</code>)</li><li><strong>Styled Link</strong> (<code>&lt;cwr-styled-link&gt;</code>): <code>href</code> or <code>routerLink</code>, optional trailing icon</li><li><strong>Menu</strong> (<code>&lt;cwr-menu&gt;</code>, <code>&lt;cwr-menu-item&gt;</code>) and <strong>Menu Button</strong> (<code>&lt;cwr-menu-button&gt;</code>)</li></ul></li><li><strong>Feedback</strong><ul><li><strong>Spinner</strong> (<code>&lt;cwr-spinner&gt;</code>)</li><li><strong>Skeleton Loader</strong> (<code>&lt;cwr-skeleton-loader&gt;</code>, with <code>cwrSkeletonContent</code> / <code>cwrSkeletonPlaceholder</code> templates): generated or custom placeholders, a show delay so fast loads never flash, and a minimum visible duration</li><li><strong>Hint</strong> (<code>&lt;cwr-hint&gt;</code>), <strong>Tooltip</strong> (<code>&lt;cwr-tooltip&gt;</code>) and <strong>Tooltip Icon</strong> (<code>&lt;cwr-tooltip-icon&gt;</code>)</li><li><strong>Badge</strong> (<code>&lt;cwr-badge&gt;</code>) and <strong>Status Pill</strong> (<code>&lt;cwr-status-pill&gt;</code>): sizes <code>md</code>, <code>sm</code>, <code>xs</code></li><li><strong>Callout</strong> (<code>&lt;cwr-callout&gt;</code>)</li><li><strong>Snackbar</strong> (<code>&lt;cwr-snackbar&gt;</code>), <strong>Snackbar Stack</strong> (<code>&lt;cwr-snackbar-stack&gt;</code>) and <code>SnackbarStackService</code></li></ul></li><li><strong>Form controls</strong>, all implementing <code>ControlValueAccessor</code> and reading error state from a parent Form Field<ul><li><strong>Form Field</strong> (<code>&lt;cwr-form-field&gt;</code>), <strong>Form</strong> (<code>&lt;cwr-form&gt;</code>), <strong>Fieldset</strong> (<code>&lt;cwr-fieldset&gt;</code>) and <strong>Input Control Field</strong> (<code>&lt;cwr-input-control-field&gt;</code>)</li><li><strong>Text Input</strong>, <strong>Textarea Input</strong>, <strong>Email Input</strong>, <strong>Date Input</strong>, <strong>Numeric Input</strong>, <strong>Percent Input</strong> and <strong>Currency Input</strong></li><li><strong>Search Input</strong> (<code>&lt;cwr-search-input&gt;</code>): clear button, <code>debounceMs</code> and <code>minQueryLength</code></li><li><strong>Select Input</strong> (<code>&lt;cwr-select-input&gt;</code>) and <strong>Picker Input</strong> (<code>&lt;cwr-picker-input&gt;</code>), backed by <strong>Listbox</strong> (<code>&lt;cwr-listbox&gt;</code>)</li><li><strong>Checkbox Input</strong>, <strong>Checkbox</strong>, <strong>Checkbox Card</strong>, <strong>Radio Button</strong>, <strong>Radio Button Card</strong>, <strong>Toggle</strong> and <strong>Toggle Card</strong></li><li><strong>Segment Control</strong> (<code>&lt;cwr-segment-control&gt;</code>) and <strong>Tab Bar</strong> (<code>&lt;cwr-tab-bar&gt;</code>)</li></ul></li><li><strong>Layout and content</strong><ul><li><strong>Card</strong> (<code>&lt;cwr-card&gt;</code>): <code>surface</code>, <code>edge</code>, <code>heading</code>, <code>layout</code> and <code>fill</code>, plus <code>[cardHeaderInline]</code> / <code>[cardHeaderTrailing]</code> header slots</li><li><strong>Title Block</strong> (<code>&lt;cwr-title-block&gt;</code>): <code>title</code> / <code>section</code> variants with leading, trailing and end slots</li><li><strong>Divider</strong> (<code>&lt;cwr-divider&gt;</code>) and <strong>Text Overflow</strong> (<code>&lt;cwr-text-overflow&gt;</code>)</li><li><strong>Empty State Content Block</strong> (<code>&lt;cwr-empty-state-content-block&gt;</code>)</li><li><strong>Scrollbar</strong> (<code>&lt;cwr-scrollbar&gt;</code>): custom draggable thumb that replaces a container's native scrollbar, for one <code>vertical</code> or <code>horizontal</code> axis</li></ul></li><li><strong>Overlays</strong><ul><li><strong>Modal</strong> (<code>&lt;cwr-modal&gt;</code>), <strong>Dialog</strong> (<code>&lt;cwr-dialog&gt;</code>) and <strong>Drawer</strong> (<code>&lt;cwr-drawer&gt;</code>), built on <strong>Overlay Header</strong> (<code>&lt;cwr-overlay-header&gt;</code>) and <strong>Overlay Footer</strong> (<code>&lt;cwr-overlay-footer&gt;</code>)</li></ul></li><li><strong>AG Grid</strong> (<code>&lt;cwr-ag-grid&gt;</code>) with the generated <code>cwrAgGridTheme</code>, master/detail and pagination support</li></ul>"
      },
      {
        "title": "Changed",
        "html": "<ul><li><strong>Breaking:</strong> internal CSS class names in Badge, Card, Checkbox, Checkbox Card, Checkbox Input and Modal now carry a <code>cwr-</code> prefix (e.g. <code>.card__header</code> → <code>.cwr-card__header</code>). Update any consumer style overrides that target them.</li><li><strong>Breaking:</strong> Card's <code>variant</code> input is now <code>surface</code> (<code>CardVariant</code> → <code>CardSurface</code>), and the <code>nested-surface</code> option was removed.</li><li><code>peerDependencies</code> for <code>@angular/cdk</code>, <code>@angular/common</code>, <code>@angular/core</code>, <code>@angular/forms</code>, <code>@angular/platform-browser</code>, and <code>@angular/router</code> widened to <code>^21.2.0 || ^22.1.6</code> to support both Angular 21 and Angular 22 consumers.</li></ul>"
      }
    ]
  },
  {
    "version": "1.1.0",
    "date": "2026-04-17",
    "sections": [
      {
        "title": "Added",
        "html": "<ul><li><strong>Navbar Component</strong> - Standalone Angular component for navigation<ul><li>Collapsible navbar with configurable width</li><li>Nested menu items with expand/collapse</li><li>Badge support on menu items (<code>NavbarNavItemBadge</code>)</li><li>What's New panel with changelog integration (<code>NavbarWhatsNewPanelComponent</code>, <code>NavbarWhatsNewPanelItemComponent</code>)</li><li>Sub-components: <code>NavbarNavItemComponent</code>, <code>NavbarWhatsNewPanelComponent</code>, <code>NavbarLogoHeaderComponent</code>, <code>NavbarLogoutNavItemComponent</code>, <code>NavbarNavItemBadge</code></li><li>Mobile-responsive with overlay support</li><li>Smooth animations and transitions</li></ul></li><li><strong>NavbarService</strong> - Service for programmatic navbar control<ul><li>Observable streams: <code>collapsed$</code>, <code>menuItems$</code>, <code>config$</code></li><li>Methods: <code>toggleCollapsed()</code>, <code>setCollapsed()</code>, <code>getCollapsed()</code>, <code>setMenuItems()</code>, <code>getMenuItems()</code>, <code>addMenuItem()</code>, <code>removeMenuItem()</code>, <code>setConfig()</code>, <code>getConfig()</code></li></ul></li><li><strong>Icon Component</strong> (<code>IconComponent</code>) - Renders SVG icons from the design token icon set<ul><li>Signal inputs: <code>icon</code>, <code>size</code>, <code>color</code></li><li>Size variants: <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code>, <code>xl</code></li><li>Color variants via <code>IconColorKey</code></li></ul></li><li><strong>Logo Components</strong><ul><li><code>LogoComponent</code> — Full logo (logomark + wordmark)</li><li><code>LogomarkComponent</code> — Logomark only</li><li><code>WordmarkComponent</code> — Wordmark only</li><li>Size variants: <code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code></li></ul></li><li><strong>UIComponentsModule</strong> - NgModule for compatibility with NgModule-based Angular projects</li><li><strong>TypeScript interfaces</strong>: <code>NavbarNavItem</code>, <code>NavbarConfig</code>, <code>NavbarNavItemBadge</code>, <code>WhatsNewItem</code>, <code>IconProps</code>, <code>IconSize</code>, <code>IconKey</code>, <code>IconColorKey</code>, <code>LogoSize</code></li></ul>"
      },
      {
        "title": "Changed",
        "html": "<ul><li>Updated package keywords to reflect current component set (navbar, icon, logo)</li><li>Updated design tokens: <code>surface-sidebar</code> → <code>surface-navbar</code>, <code>size.sidebar</code> → <code>size.navbar</code></li><li>Module renamed from <code>CwrComponentsModule</code> to <code>UIComponentsModule</code></li><li>Models are now co-located alongside their component files (no separate top-level <code>models/</code> directory)</li></ul>"
      }
    ]
  },
  {
    "version": "1.0.0",
    "date": "2026-04-16",
    "sections": [
      {
        "title": "Added",
        "html": "<ul><li><strong>Navbar</strong> standalone Angular component (<code>&lt;navbar&gt;</code>) with:<ul><li>Collapsible navbar with configurable width</li><li>Navigation items with nested support</li><li>Badge support on menu items</li><li>What's New panel with changelog</li><li>Mobile overlay mode</li><li>Toggle button</li><li><code>navItemClick</code> and <code>collapsedChange</code> output events</li></ul></li><li><strong>NavbarService</strong> for programmatic control</li><li><strong>NavbarNavItem</strong> and <strong>NavbarConfig</strong> TypeScript interfaces</li><li>Full SCSS theming with CSS custom properties</li></ul>"
      }
    ]
  }
];
