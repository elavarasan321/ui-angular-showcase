import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarNavItem, UIComponentsModule, WhatsNewItem } from '@checkworkrights/ui-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, UIComponentsModule],
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
  navItems: NavbarNavItem[] = [
    {
      id: 'getting-started',
      label: 'Getting Started',
      route: 'getting-started'
    },
    {
      id: 'design-tokens',
      label: 'Design Tokens',
      route: 'design-tokens',
    },
    {
      id: 'showcase-badge',
      label: 'Badge',
      route: 'showcase/badge',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-button',
      label: 'Button',
      route: 'showcase/button',
    },
    {
      id: 'showcase-callout',
      label: 'Callout',
      route: 'showcase/callout',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-checkbox',
      label: 'Checkbox',
      route: 'showcase/checkbox',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-checkbox-card',
      label: 'Checkbox Card',
      route: 'showcase/card-checkbox',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-checkbox-input',
      label: 'Checkbox Input',
      route: 'showcase/input-checkbox',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-date-input',
      label: 'Date Input',
      route: 'showcase/date-input',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-divider',
      label: 'Divider',
      route: 'showcase/divider',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-email-input',
      label: 'Email Input',
      route: 'showcase/email-input',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-fieldset',
      label: 'Fieldset',
      route: 'showcase/fieldset',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-form',
      label: 'Form',
      route: 'showcase/form',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-form-field',
      label: 'Form Field',
      route: 'showcase/field-form',
    },
    {
      id: 'showcase-hint',
      label: 'Hint',
      route: 'showcase/hint'
    },
    {
      id: 'showcase-icon',
      label: 'Icon',
      route: 'showcase/icon'
    },
    {
      id: 'showcase-icons-button',
      label: 'Icon Button',
      route: 'showcase/withicon'
    },
    {
      id: 'showcase-illustration',
      label: 'Illustration',
      route: 'showcase/illustration'
    },
    {
      id: 'showcase-inline-button',
      label: 'Inline Button',
      route: 'showcase/inline-button'
    },
    {
      id: 'showcase-logo',
      label: 'Logo',
      route: 'showcase/logo'
    },
    {
      id: 'showcase-numeric-input',
      label: 'Numeric Input',
      route: 'showcase/numeric-input',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-radio-button',
      label: 'Radio Button',
      route: 'showcase/radio-button',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-radio-button-card',
      label: 'Radio Button Card',
      route: 'showcase/card-radio-button',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-scrollbar',
      label: 'Scrollbar',
      route: 'showcase/scrollbar',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-spinner',
      label: 'Spinner',
      route: 'showcase/spinner'
    },
    {
      id: 'showcase-text-input',
      label: 'Text Input',
      route: 'showcase/text-input'
    },
    {
      id: 'showcase-text-overflow',
      label: 'Text Overflow',
      route: 'showcase/text-overflow'
    },
    {
      id: 'showcase-toggle',
      label: 'Toggle',
      route: 'showcase/toggle',
      badge: { text: 'NEW' },
    },
    {
      id: 'showcase-tooltip',
      label: 'Tooltip',
      route: 'showcase/tooltip'
    },
  ];

  whatsNewItems: WhatsNewItem[] = [
    {
      title: 'Callout',
      link: 'https://ui-angular-showcase.vercel.app/showcase/callout',
    },
    {
      title: 'Toggle',
      link: 'https://ui-angular-showcase.vercel.app/showcase/toggle',
    },
    {
      title: 'Date Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/date-input',
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
