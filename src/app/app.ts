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
      route: 'getting-started'
    },
    {
      id: 'design-tokens',
      label: 'Design Tokens',
      route: 'design-tokens',
    },
    {
      id: 'showcase-button',
      label: 'Button',
      route: 'showcase/button',
    },
    {
      id: 'showcase-form-field',
      label: 'Form Field',
      route: 'showcase/form-field',
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
      id: 'showcase-tooltip',
      label: 'Tooltip',
      route: 'showcase/tooltip'
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
