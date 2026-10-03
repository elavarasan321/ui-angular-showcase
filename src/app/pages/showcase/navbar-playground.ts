import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import {
  CheckboxComponent,
  Navbar,
  NavbarNavItem,
  WhatsNewItem,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';

const NAV_ITEMS: NavbarNavItem[] = [
  { id: 'getting-started', label: 'Getting Started', route: 'getting-started' },
  { id: 'showcase-button', label: 'Button', route: 'showcase/button' },
  { id: 'showcase-checkbox', label: 'Checkbox', route: 'showcase/checkbox' },
  { id: 'showcase-toggle', label: 'Toggle', route: 'showcase/toggle' },
  { id: 'showcase-tooltip', label: 'Tooltip', route: 'showcase/tooltip' },
];

const WHATS_NEW_ITEMS: WhatsNewItem[] = [
  { title: 'Status Pill', link: 'https://ui-angular-showcase.vercel.app/showcase/status-pill' },
  { title: 'Toggle Card', link: 'https://ui-angular-showcase.vercel.app/showcase/toggle-card' },
];

@Component({
  selector: 'app-navbar-playground',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Navbar, Playground, CheckboxComponent],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <div playground-preview class="navbar-playground__frame">
        <cwr-navbar
          [navItems]="navItems()"
          [collapsed]="collapsed()"
          [showToggle]="showToggle()"
          [whatsNewItems]="whatsNew() ? whatsNewItems : []"
          [hasNew]="hasNew()"
          (collapsedChange)="collapsed.set($event)"
          (navItemClick)="lastEvent.set('navItemClick: ' + $event.label)"
          (logOutAction)="lastEvent.set('logOutAction')"
        ></cwr-navbar>
      </div>

      <ng-container playground-controls>
        <cwr-checkbox
          label="Collapsed"
          [checked]="collapsed()"
          (checkedChange)="collapsed.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Show toggle"
          [checked]="showToggle()"
          (checkedChange)="showToggle.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="What's New items"
          [checked]="whatsNew()"
          (checkedChange)="whatsNew.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Has new"
          [checked]="hasNew()"
          (checkedChange)="hasNew.set($event)"
        ></cwr-checkbox>
        <cwr-checkbox
          label="Item badge"
          [checked]="itemBadge()"
          (checkedChange)="itemBadge.set($event)"
        ></cwr-checkbox>
        @if (lastEvent()) {
          <p class="navbar-playground__event">
            Last event: <code>{{ lastEvent() }}</code>
          </p>
        }
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .navbar-playground__frame {
        position: relative;
        align-self: stretch;
        width: 100%;
        height: 560px;
        overflow: hidden;
        /* Scopes cwr-navbar's internal position: fixed to this frame instead of the viewport. */
        transform: translateZ(0);
      }

      .navbar-playground__event {
        margin: 0;
        font: var(--text-style-caption);
      }
    `,
  ],
})
export class NavbarPlayground {
  whatsNewItems = WHATS_NEW_ITEMS;

  collapsed = signal(false);
  showToggle = signal(true);
  whatsNew = signal(true);
  hasNew = signal(true);
  itemBadge = signal(true);
  lastEvent = signal('');

  navItems = computed<NavbarNavItem[]>(() =>
    NAV_ITEMS.map((item) =>
      this.itemBadge() && item.id === 'showcase-toggle' ? { ...item, badge: { text: 'NEW' } } : item,
    ),
  );

  generatedCode = computed(() => {
    const attrs = ['[navItems]="navItems"'];
    if (this.collapsed()) attrs.push('[collapsed]="true"');
    if (!this.showToggle()) attrs.push('[showToggle]="false"');
    if (this.whatsNew()) attrs.push('[whatsNewItems]="whatsNewItems"');
    if (this.hasNew()) attrs.push('[hasNew]="true"');
    attrs.push('(collapsedChange)="onCollapsedChange($event)"');
    attrs.push('(navItemClick)="onNavItemClick($event)"');
    attrs.push('(logOutAction)="logOut()"');
    const badge = this.itemBadge()
      ? `<!-- Item badge: { id: 'toggle', label: 'Toggle', route: 'toggle', badge: { text: 'NEW' } } -->\n`
      : '';
    return `${badge}<cwr-navbar\n  ${attrs.join('\n  ')}\n></cwr-navbar>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
