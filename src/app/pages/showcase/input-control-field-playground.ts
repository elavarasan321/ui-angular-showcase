import { Component, computed, signal } from '@angular/core';
import {
  InputControlFieldComponent,
  RadioButtonComponent,
  CheckboxComponent,
  InputControlFieldLayout,
  InputControlFieldRole,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';

const INPUT_CONTROL_FIELD_LAYOUTS: readonly InputControlFieldLayout[] = ['vstack', 'grid'];
const INPUT_CONTROL_FIELD_ROLES: readonly InputControlFieldRole[] = ['radiogroup', 'group'];

@Component({
  selector: 'app-input-control-field-playground',
  standalone: true,
  imports: [InputControlFieldComponent, RadioButtonComponent, CheckboxComponent, Playground],
  template: `
    <app-playground [code]="generatedCode()">
      <cwr-input-control-field
        playground-preview
        style="width: 100%;"
        [label]="label()"
        [mandatory]="mandatory()"
        [layout]="layout()"
        [role]="role()"
        [hintText]="hintText() || undefined"
        [hasError]="hasError()"
        [errorText]="hasError() ? errorText() : undefined"
      >
        @if (role() === 'radiogroup') {
          <cwr-radio-button
            label="Weekly"
            [checked]="frequency() === 'weekly'"
            (checkedChange)="frequency.set('weekly')"
          ></cwr-radio-button>
          <cwr-radio-button
            label="Fortnightly"
            [checked]="frequency() === 'fortnightly'"
            (checkedChange)="frequency.set('fortnightly')"
          ></cwr-radio-button>
          <cwr-radio-button
            label="Monthly"
            [checked]="frequency() === 'monthly'"
            (checkedChange)="frequency.set('monthly')"
          ></cwr-radio-button>
        } @else {
          <cwr-checkbox
            label="Email"
            [checked]="channels().email"
            (checkedChange)="setChannel('email', $event)"
          ></cwr-checkbox>
          <cwr-checkbox
            label="SMS"
            [checked]="channels().sms"
            (checkedChange)="setChannel('sms', $event)"
          ></cwr-checkbox>
          <cwr-checkbox
            label="Push notification"
            [checked]="channels().push"
            (checkedChange)="setChannel('push', $event)"
          ></cwr-checkbox>
        }
      </cwr-input-control-field>

      <ng-container playground-controls>
        <label class="playground__field">
          <span>Label</span>
          <input type="text" [value]="label()" (input)="label.set($any($event.target).value)" />
        </label>

        <label class="playground__field">
          <span>Hint text</span>
          <input
            type="text"
            [value]="hintText()"
            (input)="hintText.set($any($event.target).value)"
          />
        </label>

        @if (hasError()) {
          <label class="playground__field">
            <span>Error text</span>
            <input
              type="text"
              [value]="errorText()"
              (input)="errorText.set($any($event.target).value)"
            />
          </label>
        }

        <label class="playground__field">
          <span>Role</span>
          <select (change)="role.set($any($event.target).value)">
            @for (r of roles; track r) {
              <option [value]="r" [selected]="r === role()">{{ r }}</option>
            }
          </select>
        </label>

        <label class="playground__field">
          <span>Layout</span>
          <select (change)="layout.set($any($event.target).value)">
            @for (l of layouts; track l) {
              <option [value]="l" [selected]="l === layout()">{{ l }}</option>
            }
          </select>
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="mandatory()"
            (change)="mandatory.set($any($event.target).checked)"
          />
          Mandatory
        </label>

        <label class="playground__checkbox">
          <input
            type="checkbox"
            [checked]="hasError()"
            (change)="hasError.set($any($event.target).checked)"
          />
          Has error
        </label>
      </ng-container>
    </app-playground>
  `,
  styles: [
    `
      .playground__field {
        display: flex;
        flex-direction: column;
        gap: var(--space-3xs, 0.25rem);
        font: var(--text-style-caption);
        color: var(--color-text-surface-secondary);
      }

      .playground__field select,
      .playground__field input[type='text'] {
        font: var(--text-style-body);
        color: var(--color-text-surface);
        background: var(--color-bg-surface);
        border: 1px solid var(--color-border-surface, #333);
        border-radius: var(--border-radius-sm, 0.25rem);
        padding: var(--space-2xs, 0.5rem);
      }

      .playground__checkbox {
        display: flex;
        align-items: center;
        gap: var(--space-2xs, 0.5rem);
        font: var(--text-style-body);
        color: var(--color-text-surface);
      }
    `,
  ],
})
export class InputControlFieldPlayground {
  roles = INPUT_CONTROL_FIELD_ROLES;
  layouts = INPUT_CONTROL_FIELD_LAYOUTS;

  label = signal('Billing frequency');
  mandatory = signal(true);
  layout = signal<InputControlFieldLayout>('vstack');
  role = signal<InputControlFieldRole>('radiogroup');
  hintText = signal('Choose how often you want to be billed');
  hasError = signal(false);
  errorText = signal('Select an option to continue');

  frequency = signal<'weekly' | 'fortnightly' | 'monthly'>('weekly');
  channels = signal({ email: true, sms: false, push: false });

  setChannel(channel: 'email' | 'sms' | 'push', checked: boolean): void {
    this.channels.set({ ...this.channels(), [channel]: checked });
  }

  generatedCode = computed(() => {
    const attrs = [`label="${this.label()}"`, `role="${this.role()}"`, `layout="${this.layout()}"`];
    if (this.mandatory()) attrs.push(`[mandatory]="true"`);
    if (this.hintText()) attrs.push(`hintText="${this.hintText()}"`);
    if (this.hasError()) attrs.push(`[hasError]="true"`);
    if (this.hasError() && this.errorText()) attrs.push(`errorText="${this.errorText()}"`);

    const options =
      this.role() === 'radiogroup'
        ? `  <cwr-radio-button label="Weekly" [checked]="frequency() === 'weekly'" (checkedChange)="frequency.set('weekly')"></cwr-radio-button>
  <cwr-radio-button label="Fortnightly" [checked]="frequency() === 'fortnightly'" (checkedChange)="frequency.set('fortnightly')"></cwr-radio-button>
  <cwr-radio-button label="Monthly" [checked]="frequency() === 'monthly'" (checkedChange)="frequency.set('monthly')"></cwr-radio-button>`
        : `  <cwr-checkbox label="Email" [checked]="channels().email" (checkedChange)="setChannel('email', $event)"></cwr-checkbox>
  <cwr-checkbox label="SMS" [checked]="channels().sms" (checkedChange)="setChannel('sms', $event)"></cwr-checkbox>
  <cwr-checkbox label="Push notification" [checked]="channels().push" (checkedChange)="setChannel('push', $event)"></cwr-checkbox>`;

    return `<cwr-input-control-field ${attrs.join(' ')}>
${options}
</cwr-input-control-field>`;
  });
}
