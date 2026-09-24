import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarNavItem, WhatsNewItem } from '@checkworkrights/ui-angular';
import { GlobalSearch } from './components/global-search/global-search';
import { Sidebar, SidebarNavGroup } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, GlobalSearch],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'UI Angular Showcase';
  isDarkMode = true;

  constructor(private router: Router) {}
  isActiveRoute = (base: string): boolean => {
    const [url] = this.router.url.split('?');
    const path = `/${base}`;
    return url === path || url.startsWith(`${path}/`);
  };

  topItems: NavbarNavItem[] = [
    {
      id: 'getting-started',
      label: 'Getting Started',
      route: 'getting-started',
    },
    {
      id: 'design-tokens',
      label: 'Design Tokens',
      route: 'design-tokens',
    },
  ];

  groups: SidebarNavGroup[] = [
    {
      id: 'buttons-actions',
      label: 'Buttons & Actions',
      items: [
        { id: 'showcase-button', label: 'Button', route: 'showcase/button' },
        { id: 'showcase-icons-button', label: 'Icon Button', route: 'showcase/withicon' },
        { id: 'showcase-inline-button', label: 'Inline Button', route: 'showcase/inline-button' },
        {
          id: 'showcase-menu-button',
          label: 'Menu Button',
          route: 'showcase/menu-button',
          badge: { text: 'NEW' },
        },
        { id: 'showcase-toggle', label: 'Toggle', route: 'showcase/toggle' },
        {
          id: 'showcase-toggle-card',
          label: 'Toggle Card',
          route: 'showcase/toggle-card',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-styled-link',
          label: 'Styled Link',
          route: 'showcase/styled-link',
          badge: { text: 'NEW' },
        },
      ],
    },
    {
      id: 'forms-inputs',
      label: 'Forms & Inputs',
      items: [
        { id: 'showcase-form', label: 'Form', route: 'showcase/form' },
        { id: 'showcase-form-field', label: 'Form Field', route: 'showcase/field-form' },
        { id: 'showcase-fieldset', label: 'Fieldset', route: 'showcase/fieldset' },
        {
          id: 'showcase-input-control-field',
          label: 'Input Control Field',
          route: 'showcase/input-control-field',
          badge: { text: 'NEW' },
        },
        { id: 'showcase-text-input', label: 'Text Input', route: 'showcase/text-input' },
        {
          id: 'showcase-textarea-input',
          label: 'Textarea Input',
          route: 'showcase/textarea-input',
        },
        { id: 'showcase-email-input', label: 'Email Input', route: 'showcase/email-input' },
        { id: 'showcase-date-input', label: 'Date Input', route: 'showcase/date-input' },
        {
          id: 'showcase-numeric-input',
          label: 'Numeric Input',
          route: 'showcase/numeric-input',
        },
        {
          id: 'showcase-currency-input',
          label: 'Currency Input',
          route: 'showcase/currency-input',
        },
        {
          id: 'showcase-percent-input',
          label: 'Percent Input',
          route: 'showcase/percent-input',
        },
        {
          id: 'showcase-search-input',
          label: 'Search Input',
          route: 'showcase/search-input',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-select-input',
          label: 'Select Input',
          route: 'showcase/select-input',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-picker-input',
          label: 'Picker Input',
          route: 'showcase/picker-input',
          badge: { text: 'NEW' },
        },
        { id: 'showcase-listbox', label: 'Listbox', route: 'showcase/listbox' },
        {
          id: 'showcase-segment-control',
          label: 'Segment Control',
          route: 'showcase/segment-control',
        },
        { id: 'showcase-checkbox', label: 'Checkbox', route: 'showcase/checkbox' },
        {
          id: 'showcase-checkbox-input',
          label: 'Checkbox Input',
          route: 'showcase/input-checkbox',
        },
        {
          id: 'showcase-checkbox-card',
          label: 'Checkbox Card',
          route: 'showcase/card-checkbox',
        },
        { id: 'showcase-radio-button', label: 'Radio Button', route: 'showcase/radio-button' },
        {
          id: 'showcase-radio-button-card',
          label: 'Radio Button Card',
          route: 'showcase/card-radio-button',
        },
      ],
    },
    {
      id: 'feedback-status',
      label: 'Feedback & Status',
      items: [
        { id: 'showcase-badge', label: 'Badge', route: 'showcase/badge' },
        {
          id: 'showcase-status-pill',
          label: 'Status Pill',
          route: 'showcase/status-pill',
          badge: { text: 'NEW' },
        },
        { id: 'showcase-callout', label: 'Callout', route: 'showcase/callout' },
        { id: 'showcase-hint', label: 'Hint', route: 'showcase/hint' },
        { id: 'showcase-spinner', label: 'Spinner', route: 'showcase/spinner' },
        {
          id: 'showcase-snackbar',
          label: 'Snackbar',
          route: 'showcase/snackbar',
          badge: { text: 'NEW' },
        },
        { id: 'showcase-tooltip', label: 'Tooltip', route: 'showcase/tooltip' },
        {
          id: 'showcase-tooltip-icon',
          label: 'Tooltip Icon',
          route: 'showcase/tooltip-icon',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-empty-state',
          label: 'Empty State Content Block',
          route: 'showcase/empty-state',
          badge: { text: 'NEW' },
        },
      ],
    },
    {
      id: 'overlays',
      label: 'Overlays',
      items: [
        {
          id: 'showcase-dialog',
          label: 'Dialog',
          route: 'showcase/dialog',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-drawer',
          label: 'Drawer',
          route: 'showcase/drawer',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-modal',
          label: 'Modal',
          route: 'showcase/modal',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-overlay-header-footer',
          label: 'Overlay Header & Footer',
          route: 'showcase/overlay-header-footer',
          badge: { text: 'NEW' },
        },
      ],
    },
    {
      id: 'layout-display',
      label: 'Layout & Display',
      items: [
        {
          id: 'showcase-card',
          label: 'Card',
          route: 'showcase/card',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-title-block',
          label: 'Title Block',
          route: 'showcase/title-block',
          badge: { text: 'NEW' },
        },
        { id: 'showcase-divider', label: 'Divider', route: 'showcase/divider' },
        { id: 'showcase-scrollbar', label: 'Scrollbar', route: 'showcase/scrollbar' },
        { id: 'showcase-text-overflow', label: 'Text Overflow', route: 'showcase/text-overflow' },
        {
          id: 'showcase-tab-bar',
          label: 'Tab Bar',
          route: 'showcase/tab-bar',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-navbar',
          label: 'Navbar',
          route: 'showcase/navbar',
          badge: { text: 'NEW' },
        },
        {
          id: 'showcase-ag-grid',
          label: 'AG Grid',
          route: 'showcase/ag-grid',
          badge: { text: 'NEW' },
        },
      ],
    },
    {
      id: 'media-branding',
      label: 'Media & Branding',
      items: [
        { id: 'showcase-logo', label: 'Logo', route: 'showcase/logo' },
        { id: 'showcase-icon', label: 'Icon', route: 'showcase/icon' },
        { id: 'showcase-illustration', label: 'Illustration', route: 'showcase/illustration' },
      ],
    },
  ];

  whatsNewItems: WhatsNewItem[] = [
    {
      title: 'AG Grid',
      link: 'https://ui-angular-showcase.vercel.app/showcase/ag-grid',
    },
    {
      title: 'Modal',
      link: 'https://ui-angular-showcase.vercel.app/showcase/modal',
    },
    {
      title: 'Dialog',
      link: 'https://ui-angular-showcase.vercel.app/showcase/dialog',
    },
    {
      title: 'Drawer',
      link: 'https://ui-angular-showcase.vercel.app/showcase/drawer',
    },
    {
      title: 'Snackbar',
      link: 'https://ui-angular-showcase.vercel.app/showcase/snackbar',
    },
    {
      title: 'Menu Button',
      link: 'https://ui-angular-showcase.vercel.app/showcase/menu-button',
    },
    {
      title: 'Card',
      link: 'https://ui-angular-showcase.vercel.app/showcase/card',
    },
    {
      title: 'Tab Bar',
      link: 'https://ui-angular-showcase.vercel.app/showcase/tab-bar',
    },
    {
      title: 'Select Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/select-input',
    },
    {
      title: 'Picker Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/picker-input',
    },
    {
      title: 'Search Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/search-input',
    },
    {
      title: 'Status Pill',
      link: 'https://ui-angular-showcase.vercel.app/showcase/status-pill',
    },
    {
      title: 'Toggle Card',
      link: 'https://ui-angular-showcase.vercel.app/showcase/toggle-card',
    },
    {
      title: 'Styled Link',
      link: 'https://ui-angular-showcase.vercel.app/showcase/styled-link',
    },
    {
      title: 'Tooltip Icon',
      link: 'https://ui-angular-showcase.vercel.app/showcase/tooltip-icon',
    },
    {
      title: 'Empty State Content Block',
      link: 'https://ui-angular-showcase.vercel.app/showcase/empty-state',
    },
    {
      title: 'Overlay Header & Footer',
      link: 'https://ui-angular-showcase.vercel.app/showcase/overlay-header-footer',
    },
    {
      title: 'Input Control Field',
      link: 'https://ui-angular-showcase.vercel.app/showcase/input-control-field',
    },
    {
      title: 'Listbox',
      link: 'https://ui-angular-showcase.vercel.app/showcase/listbox',
    },
    {
      title: 'Segment Control',
      link: 'https://ui-angular-showcase.vercel.app/showcase/segment-control',
    },
    {
      title: 'Currency Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/currency-input',
    },
    {
      title: 'Percent Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/percent-input',
    },
    {
      title: 'Textarea Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/textarea-input',
    },
  ];

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.body.removeAttribute('data-theme');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }
}
