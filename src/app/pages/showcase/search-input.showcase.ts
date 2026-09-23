import { Component, signal } from '@angular/core';
import { SearchInputComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { SearchInputPlayground } from './search-input-playground';

@Component({
  selector: 'app-search-input-showcase',
  standalone: true,
  imports: [SearchInputComponent, ExampleBlock, ShowcaseHeader, SearchInputPlayground],
  template: `
    <app-showcase-header title="Search Input" selector="cwr-search-input"></app-showcase-header>

    <app-search-input-playground></app-search-input-playground>
    <p>
      <code>cwr-search-input</code> is a text input styled with a leading search icon and a clear
      button that appears once there's a value. Bind <code>value</code>/<code>valueChange</code>,
      or use it as a <code>ControlValueAccessor</code> with <code>[(ngModel)]</code>.
    </p>

    <app-example-block title="Basic" [code]="basicCode">
      <cwr-search-input
        [value]="term()"
        (valueChange)="term.set($event)"
        style="width: 100%; max-width: 20rem;"
      ></cwr-search-input>
    </app-example-block>

    <app-example-block title="Debounced" [code]="debouncedCode">
      <cwr-search-input
        [value]="debouncedTerm()"
        (valueChange)="debouncedTerm.set($event)"
        [debounceMs]="300"
        placeholder="Search applicants…"
        style="width: 100%; max-width: 20rem;"
      ></cwr-search-input>
    </app-example-block>

    <app-example-block title="Error state" [code]="errorCode">
      <cwr-search-input
        value="a"
        state="error"
        style="width: 100%; max-width: 20rem;"
      ></cwr-search-input>
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-search-input
        [disabled]="true"
        placeholder="Search…"
        style="width: 100%; max-width: 20rem;"
      ></cwr-search-input>
    </app-example-block>
  `,
})
export class SearchInputShowcase {
  term = signal('');
  debouncedTerm = signal('');

  basicCode = `<cwr-search-input [value]="term()" (valueChange)="term.set($event)"></cwr-search-input>`;

  debouncedCode = `<cwr-search-input
  [value]="term()"
  (valueChange)="term.set($event)"
  [debounceMs]="300"
  placeholder="Search applicants…"
></cwr-search-input>`;

  errorCode = `<cwr-search-input value="a" state="error"></cwr-search-input>`;

  disabledCode = `<cwr-search-input [disabled]="true" placeholder="Search…"></cwr-search-input>`;
}
