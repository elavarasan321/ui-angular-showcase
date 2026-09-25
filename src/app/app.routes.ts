import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'getting-started', pathMatch: 'full' },
  {
    path: 'getting-started',
    loadComponent: () =>
      import('./pages/showcase/getting-started.showcase').then((m) => m.GettingStartedShowcase),
    title: 'Getting Started',
  },
  {
    path: 'design-tokens',
    loadComponent: () =>
      import('./pages/design-tokens/design-tokens.showcase').then((m) => m.DesignTokensShowcase),
    title: 'Design Tokens',
  },
  {
    path: 'showcase/badge',
    loadComponent: () => import('./pages/showcase/badge.showcase').then((m) => m.BadgeShowcase),
    title: 'Badge',
  },
  {
    path: 'showcase/button',
    loadComponent: () => import('./pages/showcase/button.showcase').then((m) => m.ButtonShowcase),
    title: 'Button',
  },
  {
    path: 'showcase/callout',
    loadComponent: () =>
      import('./pages/showcase/callout.showcase').then((m) => m.CalloutShowcase),
    title: 'Callout',
  },
  {
    path: 'showcase/checkbox',
    loadComponent: () =>
      import('./pages/showcase/checkbox.showcase').then((m) => m.CheckboxShowcase),
    title: 'Checkbox',
  },
  {
    path: 'showcase/card-checkbox',
    loadComponent: () =>
      import('./pages/showcase/checkbox-card.showcase').then((m) => m.CheckboxCardShowcase),
    title: 'Checkbox Card',
  },
  {
    path: 'showcase/input-checkbox',
    loadComponent: () =>
      import('./pages/showcase/checkbox-input.showcase').then((m) => m.CheckboxInputShowcase),
    title: 'Checkbox Input',
  },
  {
    path: 'showcase/date-input',
    loadComponent: () =>
      import('./pages/showcase/date-input.showcase').then((m) => m.DateInputShowcase),
    title: 'Date Input',
  },
  {
    path: 'showcase/divider',
    loadComponent: () =>
      import('./pages/showcase/divider.showcase').then((m) => m.DividerShowcase),
    title: 'Divider',
  },
  {
    path: 'showcase/email-input',
    loadComponent: () =>
      import('./pages/showcase/email-input.showcase').then((m) => m.EmailInputShowcase),
    title: 'Email Input',
  },
  {
    path: 'showcase/fieldset',
    loadComponent: () =>
      import('./pages/showcase/fieldset.showcase').then((m) => m.FieldsetShowcase),
    title: 'Fieldset',
  },
  {
    path: 'showcase/form',
    loadComponent: () => import('./pages/showcase/form.showcase').then((m) => m.FormShowcase),
    title: 'Form',
  },
  {
    path: 'showcase/field-form',
    loadComponent: () =>
      import('./pages/showcase/form-field.showcase').then((m) => m.FormFieldShowcase),
    title: 'Form Field',
  },
  {
    path: 'showcase/input-control-field',
    loadComponent: () =>
      import('./pages/showcase/input-control-field.showcase').then(
        (m) => m.InputControlFieldShowcase,
      ),
    title: 'Input Control Field',
  },
  {
    path: 'showcase/hint',
    loadComponent: () => import('./pages/showcase/hint.showcase').then((m) => m.HintShowcase),
    title: 'Hint',
  },
  {
    path: 'showcase/icon',
    loadComponent: () => import('./pages/showcase/icon.showcase').then((m) => m.IconShowcase),
    title: 'Icon',
  },
  {
    path: 'showcase/withicon',
    loadComponent: () =>
      import('./pages/showcase/icon-button.showcase').then((m) => m.IconButtonShowcase),
    title: 'Icon Button',
  },
  {
    path: 'showcase/illustration',
    loadComponent: () =>
      import('./pages/showcase/illustration.showcase').then((m) => m.IllustrationShowcase),
    title: 'Illustration',
  },
  {
    path: 'showcase/inline-button',
    loadComponent: () =>
      import('./pages/showcase/inline-button.showcase').then((m) => m.InlineButtonShowcase),
    title: 'Inline Button',
  },
  {
    path: 'showcase/currency-input',
    loadComponent: () =>
      import('./pages/showcase/currency-input.showcase').then((m) => m.CurrencyInputShowcase),
    title: 'Currency Input',
  },
  {
    path: 'showcase/listbox',
    loadComponent: () =>
      import('./pages/showcase/listbox.showcase').then((m) => m.ListboxShowcase),
    title: 'Listbox',
  },
  {
    path: 'showcase/logo',
    loadComponent: () => import('./pages/showcase/logo.showcase').then((m) => m.LogoShowcase),
    title: 'Logo',
  },
  {
    path: 'showcase/numeric-input',
    loadComponent: () =>
      import('./pages/showcase/numeric-input.showcase').then((m) => m.NumericInputShowcase),
    title: 'Numeric Input',
  },
  {
    path: 'showcase/percent-input',
    loadComponent: () =>
      import('./pages/showcase/percent-input.showcase').then((m) => m.PercentInputShowcase),
    title: 'Percent Input',
  },
  {
    path: 'showcase/radio-button',
    loadComponent: () =>
      import('./pages/showcase/radio-button.showcase').then((m) => m.RadioButtonShowcase),
    title: 'Radio Button',
  },
  {
    path: 'showcase/card-radio-button',
    loadComponent: () =>
      import('./pages/showcase/radio-button-card.showcase').then(
        (m) => m.RadioButtonCardShowcase,
      ),
    title: 'Radio Button Card',
  },
  {
    path: 'showcase/scrollbar',
    loadComponent: () =>
      import('./pages/showcase/scrollbar.showcase').then((m) => m.ScrollbarShowcase),
    title: 'Scrollbar',
  },
  {
    path: 'showcase/segment-control',
    loadComponent: () =>
      import('./pages/showcase/segment-control.showcase').then((m) => m.SegmentControlShowcase),
    title: 'Segment Control',
  },
  {
    path: 'showcase/spinner',
    loadComponent: () =>
      import('./pages/showcase/spinner.showcase').then((m) => m.SpinnerShowcase),
    title: 'Spinner',
  },
  {
    path: 'showcase/text-input',
    loadComponent: () =>
      import('./pages/showcase/text-input.showcase').then((m) => m.TextInputShowcase),
    title: 'Text Input',
  },
  {
    path: 'showcase/text-overflow',
    loadComponent: () =>
      import('./pages/showcase/text-overflow.showcase').then((m) => m.TextOverflowShowcase),
    title: 'Text Overflow',
  },
  {
    path: 'showcase/textarea-input',
    loadComponent: () =>
      import('./pages/showcase/textarea-input.showcase').then((m) => m.TextareaInputShowcase),
    title: 'Textarea Input',
  },
  {
    path: 'showcase/toggle',
    loadComponent: () => import('./pages/showcase/toggle.showcase').then((m) => m.ToggleShowcase),
    title: 'Toggle',
  },
  {
    path: 'showcase/tooltip',
    loadComponent: () =>
      import('./pages/showcase/tooltip.showcase').then((m) => m.TooltipShowcase),
    title: 'Tooltip',
  },
  {
    path: 'showcase/ag-grid',
    loadComponent: () => import('./pages/showcase/ag-grid.showcase').then((m) => m.AgGridShowcase),
    title: 'AG Grid',
  },
  {
    path: 'showcase/card',
    loadComponent: () => import('./pages/showcase/card.showcase').then((m) => m.CardShowcase),
    title: 'Card',
  },
  {
    path: 'showcase/dialog',
    loadComponent: () => import('./pages/showcase/dialog.showcase').then((m) => m.DialogShowcase),
    title: 'Dialog',
  },
  {
    path: 'showcase/drawer',
    loadComponent: () => import('./pages/showcase/drawer.showcase').then((m) => m.DrawerShowcase),
    title: 'Drawer',
  },
  {
    path: 'showcase/empty-state',
    loadComponent: () =>
      import('./pages/showcase/empty-state-content-block.showcase').then(
        (m) => m.EmptyStateContentBlockShowcase,
      ),
    title: 'Empty State Content Block',
  },
  {
    path: 'showcase/menu-button',
    loadComponent: () =>
      import('./pages/showcase/menu-button.showcase').then((m) => m.MenuButtonShowcase),
    title: 'Menu Button',
  },
  {
    path: 'showcase/modal',
    loadComponent: () => import('./pages/showcase/modal.showcase').then((m) => m.ModalShowcase),
    title: 'Modal',
  },
  {
    path: 'showcase/overlay-header-footer',
    loadComponent: () =>
      import('./pages/showcase/overlay-header-footer.showcase').then(
        (m) => m.OverlayHeaderFooterShowcase,
      ),
    title: 'Overlay Header & Footer',
  },
  {
    path: 'showcase/picker-input',
    loadComponent: () =>
      import('./pages/showcase/picker-input.showcase').then((m) => m.PickerInputShowcase),
    title: 'Picker Input',
  },
  {
    path: 'showcase/search-input',
    loadComponent: () =>
      import('./pages/showcase/search-input.showcase').then((m) => m.SearchInputShowcase),
    title: 'Search Input',
  },
  {
    path: 'showcase/select-input',
    loadComponent: () =>
      import('./pages/showcase/select-input.showcase').then((m) => m.SelectInputShowcase),
    title: 'Select Input',
  },
  {
    path: 'showcase/snackbar',
    loadComponent: () =>
      import('./pages/showcase/snackbar.showcase').then((m) => m.SnackbarShowcase),
    title: 'Snackbar',
  },
  {
    path: 'showcase/status-pill',
    loadComponent: () =>
      import('./pages/showcase/status-pill.showcase').then((m) => m.StatusPillShowcase),
    title: 'Status Pill',
  },
  {
    path: 'showcase/styled-link',
    loadComponent: () =>
      import('./pages/showcase/styled-link.showcase').then((m) => m.StyledLinkShowcase),
    title: 'Styled Link',
  },
  {
    path: 'showcase/tab-bar',
    loadComponent: () => import('./pages/showcase/tab-bar.showcase').then((m) => m.TabBarShowcase),
    title: 'Tab Bar',
  },
  {
    path: 'showcase/navbar',
    loadComponent: () => import('./pages/showcase/navbar.showcase').then((m) => m.NavbarShowcase),
    title: 'Navbar',
  },
  {
    path: 'showcase/toggle-card',
    loadComponent: () =>
      import('./pages/showcase/toggle-card.showcase').then((m) => m.ToggleCardShowcase),
    title: 'Toggle Card',
  },
  {
    path: 'showcase/tooltip-icon',
    loadComponent: () =>
      import('./pages/showcase/tooltip-icon.showcase').then((m) => m.TooltipIconShowcase),
    title: 'Tooltip Icon',
  },
  {
    path: 'showcase/title-block',
    loadComponent: () =>
      import('./pages/showcase/title-block.showcase').then((m) => m.TitleBlockShowcase),
    title: 'Title Block',
  },
];
