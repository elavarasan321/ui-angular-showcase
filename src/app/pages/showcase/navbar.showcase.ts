import { Component } from '@angular/core';
import { IconComponent, Navbar, NavbarNavItem, WhatsNewItem } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-navbar-showcase',
  standalone: true,
  imports: [Navbar, IconComponent, ExampleBlock, ShowcaseHeader],
  template: `
    <app-showcase-header title="Navbar" selector="cwr-navbar"></app-showcase-header>

    <app-example-block title="Default" [code]="usageCode">
      <div class="navbar-preview-frame">
        <cwr-navbar
          [navItems]="navItems"
          [whatsNewItems]="whatsNewItems"
          [hasNew]="true"
        ></cwr-navbar>
      </div>
    </app-example-block>

    <app-example-block title="Without What's New" [code]="noWhatsNewCode">
      <div class="navbar-preview-frame">
        <cwr-navbar [navItems]="navItems"></cwr-navbar>
      </div>
    </app-example-block>
  `,
  styles: [
    `
      .navbar-preview-frame {
        position: relative;
        width: 100%;
        height: 640px;
        overflow: hidden;
        border: 1px solid var(--color-border-neutral-subtle, #e2e2e2);
        border-radius: var(--border-radius-md, 8px);
        /* Establishes a containing block so cwr-navbar's internal
           position: fixed is scoped to this frame instead of the viewport. */
        transform: translateZ(0);
      }
    `,
  ],
})
export class NavbarShowcase {
  navItems: NavbarNavItem[] = [
    { id: 'getting-started', label: 'Getting Started', route: 'getting-started' },
    { id: 'design-tokens', label: 'Design Tokens', route: 'design-tokens' },
    { id: 'showcase-button', label: 'Button', route: 'showcase/button' },
    { id: 'showcase-checkbox', label: 'Checkbox', route: 'showcase/checkbox' },
    {
      id: 'showcase-menu-button',
      label: 'Menu Button',
      route: 'showcase/menu-button',
      badge: { text: 'NEW' },
    },
    { id: 'showcase-toggle', label: 'Toggle', route: 'showcase/toggle' },
    { id: 'showcase-tooltip', label: 'Tooltip', route: 'showcase/tooltip' },
  ];

  whatsNewItems: WhatsNewItem[] = [
    { title: 'Status Pill', link: 'https://ui-angular-showcase.vercel.app/showcase/status-pill' },
    { title: 'Toggle Card', link: 'https://ui-angular-showcase.vercel.app/showcase/toggle-card' },
  ];

  usageCode = `<cwr-navbar
  [navItems]="navItems"
  [whatsNewItems]="whatsNewItems"
  [hasNew]="true"
></cwr-navbar>`;

  noWhatsNewCode = `<cwr-navbar [navItems]="navItems"></cwr-navbar>`;
}
