import { Type } from '@angular/core';
import { NavbarNavItem } from '@checkworkrights/ui-angular';
import type { SidebarNavGroup } from './components/sidebar/sidebar';
import { UI_ANGULAR_VERSION } from './library-version.generated';

/**
 * Single source of truth for the showcase pages. The routes, the sidebar and the global search
 * are all built from this list — to add a page, add one entry here.
 */
export interface ShowcasePage {
  id: string;
  /** Label in the sidebar and search. */
  label: string;
  route: string;
  /** Browser tab title; defaults to `label`. */
  title?: string;
  /**
   * Library release (`major.minor.patch`) that introduced the component. The page shows a NEW
   * badge while the installed library is on that release.
   */
  addedIn?: string;
  loadComponent: () => Promise<Type<unknown>>;
}

export interface ShowcasePageGroup {
  id: string;
  label: string;
  pages: ShowcasePage[];
}

export const SHOWCASE_PAGE_GROUPS: ShowcasePageGroup[] = [
  {
    id: 'getting-started',
    label: 'Getting Started',
    pages: [
      {
        id: 'setup-instructions',
        label: 'Setup Instructions',
        route: 'getting-started',
        title: 'Getting Started',
        loadComponent: () =>
          import('./pages/showcase/getting-started.showcase').then((m) => m.GettingStartedShowcase),
      },
      {
        id: 'design-tokens',
        label: 'Design Tokens',
        route: 'design-tokens',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/design-tokens/design-tokens.showcase').then(
            (m) => m.DesignTokensShowcase,
          ),
      },
    ],
  },
  {
    id: 'buttons-actions',
    label: 'Buttons & Actions',
    pages: [
      {
        id: 'showcase-button',
        label: 'Button',
        route: 'showcase/button',
        loadComponent: () =>
          import('./pages/showcase/button.showcase').then((m) => m.ButtonShowcase),
      },
      {
        id: 'showcase-icons-button',
        label: 'Icon Button',
        route: 'showcase/withicon',
        loadComponent: () =>
          import('./pages/showcase/icon-button.showcase').then((m) => m.IconButtonShowcase),
      },
      {
        id: 'showcase-inline-button',
        label: 'Inline Button',
        route: 'showcase/inline-button',
        loadComponent: () =>
          import('./pages/showcase/inline-button.showcase').then((m) => m.InlineButtonShowcase),
      },
      {
        id: 'showcase-menu-button',
        label: 'Menu Button',
        route: 'showcase/menu-button',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/menu-button.showcase').then((m) => m.MenuButtonShowcase),
      },
      {
        id: 'showcase-toggle',
        label: 'Toggle',
        route: 'showcase/toggle',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/toggle.showcase').then((m) => m.ToggleShowcase),
      },
      {
        id: 'showcase-toggle-card',
        label: 'Toggle Card',
        route: 'showcase/toggle-card',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/toggle-card.showcase').then((m) => m.ToggleCardShowcase),
      },
      {
        id: 'showcase-styled-link',
        label: 'Styled Link',
        route: 'showcase/styled-link',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/styled-link.showcase').then((m) => m.StyledLinkShowcase),
      },
    ],
  },
  {
    id: 'forms-inputs',
    label: 'Forms & Inputs',
    pages: [
      {
        id: 'showcase-form',
        label: 'Form',
        route: 'showcase/form',
        addedIn: '1.0.30',
        loadComponent: () => import('./pages/showcase/form.showcase').then((m) => m.FormShowcase),
      },
      {
        id: 'showcase-form-field',
        label: 'Form Field',
        route: 'showcase/field-form',
        loadComponent: () =>
          import('./pages/showcase/form-field.showcase').then((m) => m.FormFieldShowcase),
      },
      {
        id: 'showcase-fieldset',
        label: 'Fieldset',
        route: 'showcase/fieldset',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/fieldset.showcase').then((m) => m.FieldsetShowcase),
      },
      {
        id: 'showcase-input-control-field',
        label: 'Input Control Field',
        route: 'showcase/input-control-field',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/input-control-field.showcase').then(
            (m) => m.InputControlFieldShowcase,
          ),
      },
      {
        id: 'showcase-text-input',
        label: 'Text Input',
        route: 'showcase/text-input',
        loadComponent: () =>
          import('./pages/showcase/text-input.showcase').then((m) => m.TextInputShowcase),
      },
      {
        id: 'showcase-textarea-input',
        label: 'Textarea Input',
        route: 'showcase/textarea-input',
        addedIn: '1.0.31',
        loadComponent: () =>
          import('./pages/showcase/textarea-input.showcase').then((m) => m.TextareaInputShowcase),
      },
      {
        id: 'showcase-email-input',
        label: 'Email Input',
        route: 'showcase/email-input',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/email-input.showcase').then((m) => m.EmailInputShowcase),
      },
      {
        id: 'showcase-date-input',
        label: 'Date Input',
        route: 'showcase/date-input',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/date-input.showcase').then((m) => m.DateInputShowcase),
      },
      {
        id: 'showcase-numeric-input',
        label: 'Numeric Input',
        route: 'showcase/numeric-input',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/numeric-input.showcase').then((m) => m.NumericInputShowcase),
      },
      {
        id: 'showcase-currency-input',
        label: 'Currency Input',
        route: 'showcase/currency-input',
        addedIn: '1.0.31',
        loadComponent: () =>
          import('./pages/showcase/currency-input.showcase').then((m) => m.CurrencyInputShowcase),
      },
      {
        id: 'showcase-percent-input',
        label: 'Percent Input',
        route: 'showcase/percent-input',
        addedIn: '1.0.31',
        loadComponent: () =>
          import('./pages/showcase/percent-input.showcase').then((m) => m.PercentInputShowcase),
      },
      {
        id: 'showcase-search-input',
        label: 'Search Input',
        route: 'showcase/search-input',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/search-input.showcase').then((m) => m.SearchInputShowcase),
      },
      {
        id: 'showcase-select-input',
        label: 'Select Input',
        route: 'showcase/select-input',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/select-input.showcase').then((m) => m.SelectInputShowcase),
      },
      {
        id: 'showcase-picker-input',
        label: 'Picker Input',
        route: 'showcase/picker-input',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/picker-input.showcase').then((m) => m.PickerInputShowcase),
      },
      {
        id: 'showcase-listbox',
        label: 'Listbox',
        route: 'showcase/listbox',
        addedIn: '1.0.31',
        loadComponent: () =>
          import('./pages/showcase/listbox.showcase').then((m) => m.ListboxShowcase),
      },
      {
        id: 'showcase-segment-control',
        label: 'Segment Control',
        route: 'showcase/segment-control',
        addedIn: '1.0.31',
        loadComponent: () =>
          import('./pages/showcase/segment-control.showcase').then((m) => m.SegmentControlShowcase),
      },
      {
        id: 'showcase-checkbox',
        label: 'Checkbox',
        route: 'showcase/checkbox',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/checkbox.showcase').then((m) => m.CheckboxShowcase),
      },
      {
        id: 'showcase-checkbox-input',
        label: 'Checkbox Input',
        route: 'showcase/input-checkbox',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/checkbox-input.showcase').then((m) => m.CheckboxInputShowcase),
      },
      {
        id: 'showcase-checkbox-card',
        label: 'Checkbox Card',
        route: 'showcase/card-checkbox',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/checkbox-card.showcase').then((m) => m.CheckboxCardShowcase),
      },
      {
        id: 'showcase-radio-button',
        label: 'Radio Button',
        route: 'showcase/radio-button',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/radio-button.showcase').then((m) => m.RadioButtonShowcase),
      },
      {
        id: 'showcase-radio-button-card',
        label: 'Radio Button Card',
        route: 'showcase/card-radio-button',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/radio-button-card.showcase').then(
            (m) => m.RadioButtonCardShowcase,
          ),
      },
    ],
  },
  {
    id: 'feedback-status',
    label: 'Feedback & Status',
    pages: [
      {
        id: 'showcase-badge',
        label: 'Badge',
        route: 'showcase/badge',
        addedIn: '1.0.30',
        loadComponent: () => import('./pages/showcase/badge.showcase').then((m) => m.BadgeShowcase),
      },
      {
        id: 'showcase-status-pill',
        label: 'Status Pill',
        route: 'showcase/status-pill',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/status-pill.showcase').then((m) => m.StatusPillShowcase),
      },
      {
        id: 'showcase-callout',
        label: 'Callout',
        route: 'showcase/callout',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/callout.showcase').then((m) => m.CalloutShowcase),
      },
      {
        id: 'showcase-hint',
        label: 'Hint',
        route: 'showcase/hint',
        loadComponent: () => import('./pages/showcase/hint.showcase').then((m) => m.HintShowcase),
      },
      {
        id: 'showcase-spinner',
        label: 'Spinner',
        route: 'showcase/spinner',
        loadComponent: () =>
          import('./pages/showcase/spinner.showcase').then((m) => m.SpinnerShowcase),
      },
      {
        id: 'showcase-skeleton-loader',
        label: 'Skeleton Loader',
        route: 'showcase/skeleton-loader',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/skeleton-loader.showcase').then((m) => m.SkeletonLoaderShowcase),
      },
      {
        id: 'showcase-snackbar',
        label: 'Snackbar',
        route: 'showcase/snackbar',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/snackbar.showcase').then((m) => m.SnackbarShowcase),
      },
      {
        id: 'showcase-tooltip',
        label: 'Tooltip',
        route: 'showcase/tooltip',
        loadComponent: () =>
          import('./pages/showcase/tooltip.showcase').then((m) => m.TooltipShowcase),
      },
      {
        id: 'showcase-tooltip-icon',
        label: 'Tooltip Icon',
        route: 'showcase/tooltip-icon',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/tooltip-icon.showcase').then((m) => m.TooltipIconShowcase),
      },
      {
        id: 'showcase-empty-state',
        label: 'Empty State Content Block',
        route: 'showcase/empty-state',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/empty-state-content-block.showcase').then(
            (m) => m.EmptyStateContentBlockShowcase,
          ),
      },
    ],
  },
  {
    id: 'overlays',
    label: 'Overlays',
    pages: [
      {
        id: 'showcase-dialog',
        label: 'Dialog',
        route: 'showcase/dialog',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/dialog.showcase').then((m) => m.DialogShowcase),
      },
      {
        id: 'showcase-drawer',
        label: 'Drawer',
        route: 'showcase/drawer',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/drawer.showcase').then((m) => m.DrawerShowcase),
      },
      {
        id: 'showcase-modal',
        label: 'Modal',
        route: 'showcase/modal',
        addedIn: '1.0.32',
        loadComponent: () => import('./pages/showcase/modal.showcase').then((m) => m.ModalShowcase),
      },
      {
        id: 'showcase-overlay-header-footer',
        label: 'Overlay Header & Footer',
        route: 'showcase/overlay-header-footer',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/overlay-header-footer.showcase').then(
            (m) => m.OverlayHeaderFooterShowcase,
          ),
      },
    ],
  },
  {
    id: 'layout-display',
    label: 'Layout & Display',
    pages: [
      {
        id: 'showcase-card',
        label: 'Card',
        route: 'showcase/card',
        addedIn: '1.0.32',
        loadComponent: () => import('./pages/showcase/card.showcase').then((m) => m.CardShowcase),
      },
      {
        id: 'showcase-title-block',
        label: 'Title Block',
        route: 'showcase/title-block',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/title-block.showcase').then((m) => m.TitleBlockShowcase),
      },
      {
        id: 'showcase-divider',
        label: 'Divider',
        route: 'showcase/divider',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/divider.showcase').then((m) => m.DividerShowcase),
      },
      {
        id: 'showcase-scrollbar',
        label: 'Scrollbar',
        route: 'showcase/scrollbar',
        addedIn: '1.0.30',
        loadComponent: () =>
          import('./pages/showcase/scrollbar.showcase').then((m) => m.ScrollbarShowcase),
      },
      {
        id: 'showcase-text-overflow',
        label: 'Text Overflow',
        route: 'showcase/text-overflow',
        loadComponent: () =>
          import('./pages/showcase/text-overflow.showcase').then((m) => m.TextOverflowShowcase),
      },
      {
        id: 'showcase-tab-bar',
        label: 'Tab Bar',
        route: 'showcase/tab-bar',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/tab-bar.showcase').then((m) => m.TabBarShowcase),
      },
      {
        id: 'showcase-navbar',
        label: 'Navbar',
        route: 'showcase/navbar',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/navbar.showcase').then((m) => m.NavbarShowcase),
      },
      {
        id: 'showcase-ag-grid',
        label: 'AG Grid',
        route: 'showcase/ag-grid',
        addedIn: '1.0.32',
        loadComponent: () =>
          import('./pages/showcase/ag-grid.showcase').then((m) => m.AgGridShowcase),
      },
    ],
  },
  {
    id: 'media-branding',
    label: 'Media & Branding',
    pages: [
      {
        id: 'showcase-logo',
        label: 'Logo',
        route: 'showcase/logo',
        loadComponent: () => import('./pages/showcase/logo.showcase').then((m) => m.LogoShowcase),
      },
      {
        id: 'showcase-icon',
        label: 'Icon',
        route: 'showcase/icon',
        loadComponent: () => import('./pages/showcase/icon.showcase').then((m) => m.IconShowcase),
      },
      {
        id: 'showcase-illustration',
        label: 'Illustration',
        route: 'showcase/illustration',
        loadComponent: () =>
          import('./pages/showcase/illustration.showcase').then((m) => m.IllustrationShowcase),
      },
    ],
  },
];

/** `1.0.32-dev.d968770` → `1.0.32` */
const CURRENT_RELEASE = UI_ANGULAR_VERSION.replace(/-.*$/, '');

export function isNewPage(page: ShowcasePage): boolean {
  return page.addedIn === CURRENT_RELEASE;
}

export function toNavGroups(groups: ShowcasePageGroup[]): SidebarNavGroup[] {
  return groups.map((group) => ({
    id: group.id,
    label: group.label,
    items: group.pages.map((page): NavbarNavItem => ({
      id: page.id,
      label: page.label,
      route: page.route,
      ...(isNewPage(page) ? { badge: { text: 'NEW' } } : {}),
    })),
  }));
}
