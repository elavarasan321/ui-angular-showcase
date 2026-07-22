import { Component } from '@angular/core';
import { HintComponent, ButtonComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { HintPlayground } from './hint-playground';

@Component({
  selector: 'app-hint-showcase',
  standalone: true,
  imports: [HintComponent, ButtonComponent, ExampleBlock, ShowcaseHeader, HintPlayground],
  template: `
    <app-showcase-header title="Hint" selector="cwr-hint"></app-showcase-header>
    <app-hint-playground></app-hint-playground>
    <p>
      <code>cwr-hint</code> has no visible markup of its own — it attaches hover/focus listeners to its
      parent element and renders a floating hint bubble on hover. Wrap the trigger element and the
      <code>cwr-hint</code> tag together in a positioned container.
    </p>

    <app-example-block title="Arrow positions" [code]="positionsCode">
      <span style="position: relative; display: inline-block;">
        <cwr-button variant="outline" intent="neutral" label="Hover me (bottom)"></cwr-button>
        <cwr-hint hintText="This explains the field" arrowPosition="bottom"></cwr-hint>
      </span>

      <span style="position: relative; display: inline-block;">
        <cwr-button variant="outline" intent="neutral" label="Hover me (top)"></cwr-button>
        <cwr-hint hintText="This explains the field" arrowPosition="top"></cwr-hint>
      </span>
    </app-example-block>
  `,
})
export class HintShowcase {
  positionsCode = `<span style="position: relative; display: inline-block;">
  <cwr-button variant="outline" intent="neutral" label="Hover me"></cwr-button>
  <cwr-hint hintText="This explains the field" arrowPosition="bottom"></cwr-hint>
</span>`;
}
