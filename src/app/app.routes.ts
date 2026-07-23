import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
  {
    path: 'getting-started',
    loadComponent: () =>
      import('./pages/showcase/getting-started.showcase').then((m) => m.GettingStartedShowcase),
    data: { title: 'Getting Started' },
  },
  {
    path: 'design-tokens',
    loadComponent: () =>
      import('./pages/design-tokens/design-tokens.showcase').then((m) => m.DesignTokensShowcase),
    data: { title: 'Design Tokens' },
  },
  {
    path: 'showcase/badge',
    loadComponent: () => import('./pages/showcase/badge.showcase').then((m) => m.BadgeShowcase),
    data: { title: 'Badge' },
  },
  {
    path: 'showcase/button',
    loadComponent: () => import('./pages/showcase/button.showcase').then((m) => m.ButtonShowcase),
    data: { title: 'Button' },
  },
  {
    path: 'showcase/callout',
    loadComponent: () =>
      import('./pages/showcase/callout.showcase').then((m) => m.CalloutShowcase),
    data: { title: 'Callout' },
  },
  {
    path: 'showcase/checkbox',
    loadComponent: () =>
      import('./pages/showcase/checkbox.showcase').then((m) => m.CheckboxShowcase),
    data: { title: 'Checkbox' },
  },
  {
    path: 'showcase/card-checkbox',
    loadComponent: () =>
      import('./pages/showcase/checkbox-card.showcase').then((m) => m.CheckboxCardShowcase),
    data: { title: 'Checkbox Card' },
  },
  {
    path: 'showcase/input-checkbox',
    loadComponent: () =>
      import('./pages/showcase/checkbox-input.showcase').then((m) => m.CheckboxInputShowcase),
    data: { title: 'Checkbox Input' },
  },
  {
    path: 'showcase/date-input',
    loadComponent: () =>
      import('./pages/showcase/date-input.showcase').then((m) => m.DateInputShowcase),
    data: { title: 'Date Input' },
  },
  {
    path: 'showcase/divider',
    loadComponent: () =>
      import('./pages/showcase/divider.showcase').then((m) => m.DividerShowcase),
    data: { title: 'Divider' },
  },
  {
    path: 'showcase/email-input',
    loadComponent: () =>
      import('./pages/showcase/email-input.showcase').then((m) => m.EmailInputShowcase),
    data: { title: 'Email Input' },
  },
  {
    path: 'showcase/fieldset',
    loadComponent: () =>
      import('./pages/showcase/fieldset.showcase').then((m) => m.FieldsetShowcase),
    data: { title: 'Fieldset' },
  },
  {
    path: 'showcase/form',
    loadComponent: () => import('./pages/showcase/form.showcase').then((m) => m.FormShowcase),
    data: { title: 'Form' },
  },
  {
    path: 'showcase/field-form',
    loadComponent: () =>
      import('./pages/showcase/form-field.showcase').then((m) => m.FormFieldShowcase),
    data: { title: 'Form Field' },
  },
  {
    path: 'showcase/hint',
    loadComponent: () => import('./pages/showcase/hint.showcase').then((m) => m.HintShowcase),
    data: { title: 'Hint' },
  },
  {
    path: 'showcase/icon',
    loadComponent: () => import('./pages/showcase/icon.showcase').then((m) => m.IconShowcase),
    data: { title: 'Icon' },
  },
  {
    path: 'showcase/withicon',
    loadComponent: () =>
      import('./pages/showcase/icon-button.showcase').then((m) => m.IconButtonShowcase),
    data: { title: 'Icon Button' },
  },
  {
    path: 'showcase/illustration',
    loadComponent: () =>
      import('./pages/showcase/illustration.showcase').then((m) => m.IllustrationShowcase),
    data: { title: 'Illustration' },
  },
  {
    path: 'showcase/inline-button',
    loadComponent: () =>
      import('./pages/showcase/inline-button.showcase').then((m) => m.InlineButtonShowcase),
    data: { title: 'Inline Button' },
  },
  {
    path: 'showcase/logo',
    loadComponent: () => import('./pages/showcase/logo.showcase').then((m) => m.LogoShowcase),
    data: { title: 'Logo' },
  },
  {
    path: 'showcase/numeric-input',
    loadComponent: () =>
      import('./pages/showcase/numeric-input.showcase').then((m) => m.NumericInputShowcase),
    data: { title: 'Numeric Input' },
  },
  {
    path: 'showcase/radio-button',
    loadComponent: () =>
      import('./pages/showcase/radio-button.showcase').then((m) => m.RadioButtonShowcase),
    data: { title: 'Radio Button' },
  },
  {
    path: 'showcase/card-radio-button',
    loadComponent: () =>
      import('./pages/showcase/radio-button-card.showcase').then(
        (m) => m.RadioButtonCardShowcase,
      ),
    data: { title: 'Radio Button Card' },
  },
  {
    path: 'showcase/scrollbar',
    loadComponent: () =>
      import('./pages/showcase/scrollbar.showcase').then((m) => m.ScrollbarShowcase),
    data: { title: 'Scrollbar' },
  },
  {
    path: 'showcase/spinner',
    loadComponent: () =>
      import('./pages/showcase/spinner.showcase').then((m) => m.SpinnerShowcase),
    data: { title: 'Spinner' },
  },
  {
    path: 'showcase/text-input',
    loadComponent: () =>
      import('./pages/showcase/text-input.showcase').then((m) => m.TextInputShowcase),
    data: { title: 'Text Input' },
  },
  {
    path: 'showcase/text-overflow',
    loadComponent: () =>
      import('./pages/showcase/text-overflow.showcase').then((m) => m.TextOverflowShowcase),
    data: { title: 'Text Overflow' },
  },
  {
    path: 'showcase/toggle',
    loadComponent: () => import('./pages/showcase/toggle.showcase').then((m) => m.ToggleShowcase),
    data: { title: 'Toggle' },
  },
  {
    path: 'showcase/tooltip',
    loadComponent: () =>
      import('./pages/showcase/tooltip.showcase').then((m) => m.TooltipShowcase),
    data: { title: 'Tooltip' },
  },
];
