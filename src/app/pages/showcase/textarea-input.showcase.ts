import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextareaInputComponent, FormFieldComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { TextareaInputPlayground } from './textarea-input-playground';

@Component({
  selector: 'app-textarea-input-showcase',
  standalone: true,
  imports: [
    FormsModule,
    TextareaInputComponent,
    FormFieldComponent,
    ExampleBlock,
    ShowcaseHeader,
    TextareaInputPlayground,
  ],
  template: `
    <app-showcase-header
      title="Textarea Input"
      selector="cwr-textarea-input"
    ></app-showcase-header>

    <app-textarea-input-playground></app-textarea-input-playground>

    <app-example-block title="Two-way binding with ngModel" [code]="ngModelCode">
      <cwr-textarea-input
        [(ngModel)]="notes"
        placeholder="Enter a reason…"
      ></cwr-textarea-input>
      <span>Value: {{ notes }}</span>
    </app-example-block>

    <app-example-block title="Inside a form field" [code]="formFieldCode">
      <cwr-form-field label="Notes" labelFor="notes" hintText="Add any relevant context">
        <cwr-textarea-input id="notes" placeholder="Type here…"></cwr-textarea-input>
      </cwr-form-field>
    </app-example-block>

    <app-example-block title="Resizable" [code]="canResizeCode">
      <cwr-textarea-input [canResize]="true" placeholder="Drag the handle to resize"></cwr-textarea-input>
    </app-example-block>

    <app-example-block title="Max length" [code]="maxlengthCode">
      <cwr-textarea-input [maxlength]="140" placeholder="Max 140 characters"></cwr-textarea-input>
    </app-example-block>

    <app-example-block title="Error, disabled & read-only states" [code]="statesCode">
      <cwr-textarea-input state="error" placeholder="Invalid value"></cwr-textarea-input>
      <cwr-textarea-input [disabled]="true" placeholder="Disabled"></cwr-textarea-input>
      <cwr-textarea-input [readOnly]="true" value="Read only value"></cwr-textarea-input>
    </app-example-block>
  `,
})
export class TextareaInputShowcase {
  notes = '';

  ngModelCode = `<cwr-textarea-input [(ngModel)]="notes" placeholder="Enter a reason…"></cwr-textarea-input>`;

  formFieldCode = `<cwr-form-field label="Notes" labelFor="notes" hintText="Add any relevant context">
  <cwr-textarea-input id="notes" placeholder="Type here…"></cwr-textarea-input>
</cwr-form-field>`;

  canResizeCode = `<cwr-textarea-input [canResize]="true" placeholder="Drag the handle to resize"></cwr-textarea-input>`;

  maxlengthCode = `<cwr-textarea-input [maxlength]="140" placeholder="Max 140 characters"></cwr-textarea-input>`;

  statesCode = `<cwr-textarea-input state="error" placeholder="Invalid value"></cwr-textarea-input>
<cwr-textarea-input [disabled]="true" placeholder="Disabled"></cwr-textarea-input>
<cwr-textarea-input [readOnly]="true" value="Read only value"></cwr-textarea-input>`;
}
