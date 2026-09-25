import { Component, inject } from '@angular/core';
import { ButtonComponent, SnackbarStackService } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { SnackbarPlayground } from './snackbar-playground';

@Component({
  selector: 'app-snackbar-showcase',
  standalone: true,
  imports: [ButtonComponent, ExampleBlock, ShowcaseHeader, SnackbarPlayground, ComponentReference],
  template: `
    <app-showcase-header
      title="Snackbar"
      selector="cwr-snackbar · cwr-snackbar-stack"
    ></app-showcase-header>

    <app-snackbar-playground></app-snackbar-playground>
    <p>
      Snackbars are triggered imperatively through <code>SnackbarStackService</code> — inject it
      and call <code>.open(config)</code> from anywhere, with no template wiring needed. The
      service lazily creates one <code>cwr-snackbar-stack</code> host per screen position and
      renders <code>cwr-snackbar</code> into it, queuing anything past
      <code>maxVisible</code> (3 by default) until an earlier one is dismissed.
    </p>

    <app-example-block title="Variants" [code]="variantsCode">
      <cwr-button
        variant="outline"
        intent="neutral"
        size="sm"
        label="Neutral"
        (buttonClick)="show('neutral', 'Export started', 'This can take a minute.')"
      ></cwr-button>
      <cwr-button
        variant="outline"
        intent="positive"
        size="sm"
        label="Positive"
        (buttonClick)="show('positive', 'Changes saved', 'Your updates have been applied.')"
      ></cwr-button>
      <cwr-button
        variant="outline"
        intent="warning"
        size="sm"
        label="Warning"
        (buttonClick)="show('warning', 'Session expiring', 'Save your work in the next 5 minutes.')"
      ></cwr-button>
      <cwr-button
        variant="outline"
        intent="negative"
        size="sm"
        label="Negative"
        (buttonClick)="show('negative', 'Upload failed', 'Check your connection and try again.')"
      ></cwr-button>
    </app-example-block>

    <app-example-block title="With an action" [code]="actionCode">
      <cwr-button
        variant="solid"
        intent="brand"
        size="sm"
        label="Show snackbar with undo"
        (buttonClick)="showWithAction()"
      ></cwr-button>
    </app-example-block>

    <app-example-block title="Position" [code]="positionCode">
      <cwr-button
        variant="outline"
        intent="neutral"
        size="sm"
        label="Bottom end"
        (buttonClick)="showAtPosition('bottom-end')"
      ></cwr-button>
      <cwr-button
        variant="outline"
        intent="neutral"
        size="sm"
        label="Bottom center"
        (buttonClick)="showAtPosition('bottom-center')"
      ></cwr-button>
    </app-example-block>

    <app-component-reference selector="cwr-snackbar · cwr-snackbar-stack"></app-component-reference>
  `,
})
export class SnackbarShowcase {
  private snackbarStack = inject(SnackbarStackService);

  show(variant: 'neutral' | 'positive' | 'warning' | 'negative', title: string, hintText: string): void {
    this.snackbarStack.open({ variant, title, hintText });
  }

  showWithAction(): void {
    this.snackbarStack.open({
      variant: 'neutral',
      title: 'Applicant archived',
      hintText: 'You can restore it from the archive within 30 days.',
      actions: [{ label: 'Undo', kind: 'inline-button' }],
    });
  }

  showAtPosition(position: 'bottom-end' | 'bottom-center'): void {
    this.snackbarStack.open({
      variant: 'neutral',
      title: 'Notification',
      hintText: `Shown at ${position}`,
      position,
    });
  }

  variantsCode = `private snackbarStack = inject(SnackbarStackService);

showExportStarted(): void {
  this.snackbarStack.open({
    variant: 'neutral',
    title: 'Export started',
    hintText: 'This can take a minute.',
  });
}`;

  actionCode = `this.snackbarStack.open({
  variant: 'neutral',
  title: 'Applicant archived',
  hintText: 'You can restore it from the archive within 30 days.',
  actions: [{ label: 'Undo', kind: 'inline-button' }],
});`;

  positionCode = `this.snackbarStack.open({
  variant: 'neutral',
  title: 'Notification',
  position: 'bottom-end',
});`;
}
