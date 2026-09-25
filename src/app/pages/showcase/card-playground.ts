import { Component, computed, signal } from '@angular/core';
import {
  CardComponent,
  ButtonComponent,
  CardSurface,
  CardEdge,
  CardLayout,
  FormFieldComponent,
  PickerInputComponent,
  TextInputComponent,
  CheckboxComponent,
} from '@checkworkrights/ui-angular';
import { Playground } from './playground';
import { playgroundState } from './playground-state';
import { PickerOptionsPipe } from './picker-options.pipe';

const CARD_SURFACES: readonly CardSurface[] = ['surface', 'raised-surface', 'lowered-surface'];
const CARD_EDGES: readonly CardEdge[] = ['inset', 'bleed'];
const CARD_LAYOUTS: readonly CardLayout[] = ['auto', 'inline', 'stacked'];

@Component({
  selector: 'app-card-playground',
  standalone: true,
  imports: [CardComponent, ButtonComponent, Playground, FormFieldComponent, PickerInputComponent, TextInputComponent, CheckboxComponent, PickerOptionsPipe],
  template: `
    <app-playground [state]="playground" [code]="generatedCode()">
      <cwr-card
        playground-preview
        style="width: 100%;"
        [title]="title()"
        [description]="description()"
        [surface]="surface()"
        [edge]="edge()"
        [layout]="layout()"
        [fill]="fill()"
      >
        <span cardHeaderTrailing>
          <cwr-button variant="outline" intent="neutral" size="sm" label="Action"></cwr-button>
        </span>
        This is the card's projected body content.
      </cwr-card>

      <ng-container playground-controls>
        <cwr-form-field label="Title">
          <cwr-text-input
            [value]="title()"
            (valueChange)="title.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Description">
          <cwr-text-input
            [value]="description()"
            (valueChange)="description.set($event)"
          ></cwr-text-input>
        </cwr-form-field>

        <cwr-form-field label="Surface">
          <cwr-picker-input
            [options]="surfaces | pickerOptions"
            [value]="surface()"
            (valueChange)="surface.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Edge">
          <cwr-picker-input
            [options]="edges | pickerOptions"
            [value]="edge()"
            (valueChange)="edge.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-form-field label="Header layout">
          <cwr-picker-input
            [options]="layouts | pickerOptions"
            [value]="layout()"
            (valueChange)="layout.set($any($event))"
          ></cwr-picker-input>
        </cwr-form-field>

        <cwr-checkbox
          label="Fill height"
          [checked]="fill()"
          (checkedChange)="fill.set($event)"
        ></cwr-checkbox>
      </ng-container>
    </app-playground>
  `
})
export class CardPlayground {
  surfaces = CARD_SURFACES;
  edges = CARD_EDGES;
  layouts = CARD_LAYOUTS;

  title = signal('Verification summary');
  description = signal('Everything we checked for this applicant');
  surface = signal<CardSurface>('surface');
  edge = signal<CardEdge>('inset');
  layout = signal<CardLayout>('auto');
  fill = signal(false);

  generatedCode = computed(() => {
    const attrs = [
      `title="${this.title()}"`,
      `surface="${this.surface()}"`,
      `edge="${this.edge()}"`,
      `layout="${this.layout()}"`,
    ];
    if (this.description()) attrs.push(`description="${this.description()}"`);
    if (this.fill()) attrs.push(`[fill]="true"`);

    return `<cwr-card ${attrs.join(' ')}>
  <span cardHeaderTrailing>
    <cwr-button variant="outline" intent="neutral" size="sm" label="Action"></cwr-button>
  </span>
  This is the card's projected body content.
</cwr-card>`;
  });

  // Last field on purpose: it discovers the control signals declared above.
  protected readonly playground = playgroundState(this);
}
