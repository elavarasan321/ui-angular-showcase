import { Component } from '@angular/core';
import { ButtonComponent, IconButtonComponent, TitleBlockComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { TitleBlockPlayground } from './title-block-playground';

@Component({
  selector: 'app-title-block-showcase',
  standalone: true,
  imports: [TitleBlockComponent,
    ButtonComponent,
    IconButtonComponent,
    ExampleBlock,
    ShowcaseHeader,
    TitleBlockPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Title Block" selector="cwr-title-block"></app-showcase-header>

    <app-title-block-playground></app-title-block-playground>
    <p>
      <code>cwr-title-block</code> renders a page or section heading with optional leading,
      trailing and end slots. The <code>variant</code> input controls both the heading level and
      its size: <code>title</code> renders an <code>h1</code> for a page header, and
      <code>section</code> renders an <code>h2</code> for a heading within a page.
    </p>

    <app-example-block title="Title variant" [code]="titleCode">
      <cwr-title-block title="Applicants"></cwr-title-block>
    </app-example-block>

    <app-example-block title="Section variant" [code]="sectionCode">
      <cwr-title-block variant="section" title="Verification history"></cwr-title-block>
    </app-example-block>

    <app-example-block title="With leading, trailing and end slots" [code]="slotsCode">
      <cwr-title-block title="Jordan Smith">
        <cwr-icon-button
          titleBlockLeadingSlot
          icon="icon.ui.direction-left"
          label="Back"
          variant="ghost"
        ></cwr-icon-button>
        <cwr-button
          titleBlockTrailingSlot
          variant="outline"
          intent="neutral"
          size="sm"
          label="Edit"
        ></cwr-button>
        <p titleBlockEndSlot style="font: var(--text-style-body); color: var(--color-text-surface-secondary); margin: 0;">
          Contractor · Onboarded 12 Mar 2025
        </p>
      </cwr-title-block>
    </app-example-block>

    <app-component-reference selector="cwr-title-block"></app-component-reference>
  `,
})
export class TitleBlockShowcase {
  titleCode = `<cwr-title-block title="Applicants"></cwr-title-block>`;

  sectionCode = `<cwr-title-block variant="section" title="Verification history"></cwr-title-block>`;

  slotsCode = `<cwr-title-block title="Jordan Smith">
  <cwr-icon-button
    titleBlockLeadingSlot
    icon="icon.ui.direction-left"
    label="Back"
    variant="ghost"
  ></cwr-icon-button>
  <cwr-button
    titleBlockTrailingSlot
    variant="outline"
    intent="neutral"
    size="sm"
    label="Edit"
  ></cwr-button>
  <p titleBlockEndSlot>Contractor · Onboarded 12 Mar 2025</p>
</cwr-title-block>`;
}
