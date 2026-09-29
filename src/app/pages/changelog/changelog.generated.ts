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
    "version": "Unreleased",
    "sections": [
      {
        "title": "Changed",
        "html": "<ul><li><code>peerDependencies</code> for <code>@angular/cdk</code>, <code>@angular/common</code>, <code>@angular/core</code>, <code>@angular/forms</code>, <code>@angular/platform-browser</code>, and <code>@angular/router</code> widened to <code>^21.2.0 || ^22.1.6</code> to support both Angular 21 and Angular 22 consumers.</li></ul>"
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
