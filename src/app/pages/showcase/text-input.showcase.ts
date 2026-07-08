import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';

@Component({
  selector: 'app-text-input-showcase',
  standalone: true,
  imports: [FormsModule, TextInputComponent, ExampleBlock, ShowcaseHeader],
  template: `
    <app-showcase-header title="Text Input" selector="cwr-text-input"></app-showcase-header>

    <app-example-block title="Two-way binding with ngModel" [code]="ngModelCode">
      <cwr-text-input [(ngModel)]="name" placeholder="Enter your name"></cwr-text-input>
      <span>Value: {{ name }}</span>
    </app-example-block>

    <app-example-block title="Types" [code]="typesCode">
      <cwr-text-input type="text" placeholder="Text"></cwr-text-input>
      <cwr-text-input type="password" placeholder="Password"></cwr-text-input>
      <cwr-text-input type="search" placeholder="Search"></cwr-text-input>
    </app-example-block>

    <app-example-block title="Error, disabled & read-only states" [code]="statesCode">
      <cwr-text-input state="error" placeholder="Invalid value"></cwr-text-input>
      <cwr-text-input [disabled]="true" placeholder="Disabled"></cwr-text-input>
      <cwr-text-input [readOnly]="true" value="Read only value"></cwr-text-input>
    </app-example-block>
  `,
})
export class TextInputShowcase {
  name = '';

  ngModelCode = `<cwr-text-input [(ngModel)]="name" placeholder="Enter your name"></cwr-text-input>`;

  typesCode = `<cwr-text-input type="text" placeholder="Text"></cwr-text-input>
<cwr-text-input type="password" placeholder="Password"></cwr-text-input>
<cwr-text-input type="search" placeholder="Search"></cwr-text-input>`;

  statesCode = `<cwr-text-input state="error" placeholder="Invalid value"></cwr-text-input>
<cwr-text-input [disabled]="true" placeholder="Disabled"></cwr-text-input>
<cwr-text-input [readOnly]="true" value="Read only value"></cwr-text-input>`;
}
