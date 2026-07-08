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
  protected title = 'test-app';
  isDarkMode = true;

  constructor(private router: Router) {}
  isActiveRoute = (base: string): boolean => {
    const [url] = this.router.url.split('?');
    if (!this.router.url.includes('employees/filter')) {
      return this.router.url.includes(`/${base}`);
    }
    return url === `/${base}`;
  };
  navItems: NavbarNavItem[] = [
    {
      id: 'getting-started',
      label: 'Getting Started',
      route: 'getting-started',
      icon: 'icon.nav.dashboard',
    },
    {
      id: 'showcase-button',
      label: 'Button',
      route: 'showcase/button',
      icon: 'icon.ui.check',
    },
    {
      id: 'showcase-form-field',
      label: 'Form Field',
      route: 'showcase/form-field',
      icon: 'icon.ui.edit-alt',
    },
    {
      id: 'showcase-hint',
      label: 'Hint',
      route: 'showcase/hint',
      icon: 'icon.ui.hint',
    },
    {
      id: 'showcase-icon',
      label: 'Icon',
      route: 'showcase/icon',
      icon: 'icon.ui.placeholder',
    },
    {
      id: 'showcase-icons-button',
      label: 'Icon Button',
      route: 'showcase/withicon',
      icon: 'icon.ui.configure',
    },
    {
      id: 'showcase-illustration',
      label: 'Illustration',
      route: 'showcase/illustration',
      icon: 'icon.ui.card-view',
    },
    {
      id: 'showcase-inline-button',
      label: 'Inline Button',
      route: 'showcase/inline-button',
      icon: 'icon.ui.link',
    },
    {
      id: 'showcase-logo',
      label: 'Logo',
      route: 'showcase/logo',
      icon: 'icon.ui.business-unit',
    },
    {
      id: 'showcase-spinner',
      label: 'Spinner',
      route: 'showcase/spinner',
      icon: 'icon.ui.spinner',
    },
    {
      id: 'showcase-text-input',
      label: 'Text Input',
      route: 'showcase/text-input',
      icon: 'icon.ui.edit',
    },
    {
      id: 'showcase-text-overflow',
      label: 'Text Overflow',
      route: 'showcase/text-overflow',
      icon: 'icon.ui.sort',
    },
    {
      id: 'showcase-tooltip',
      label: 'Tooltip',
      route: 'showcase/tooltip',
      icon: 'icon.ui.info',
    },
  ];

  whatsNewItems: WhatsNewItem[] = [
    {
      title: 'Text Input',
      link: 'https://ui-angular-showcase.vercel.app/showcase/text-input',
    },
    {
      title: 'Text Overflow',
      link: 'https://ui-angular-showcase.vercel.app/showcase/text-overflow',
    },
    {
      title: 'Tooltip',
      link: 'https://ui-angular-showcase.vercel.app/showcase/tooltip',
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
