import { Component } from '@angular/core';
import { StyledLinkComponent } from '@checkworkrights/ui-angular';
import { ExampleBlock } from './example-block';
import { ShowcaseHeader } from './showcase-header';
import { ComponentReference } from './component-reference';
import { StyledLinkPlayground } from './styled-link-playground';

@Component({
  selector: 'app-styled-link-showcase',
  standalone: true,
  imports: [StyledLinkComponent, ExampleBlock, ShowcaseHeader, StyledLinkPlayground, ComponentReference],
  template: `
    <app-showcase-header title="Styled Link" selector="cwr-styled-link"></app-showcase-header>

    <app-styled-link-playground></app-styled-link-playground>
    <p>
      <code>cwr-styled-link</code> renders an anchor styled to match the design system, with an
      optional trailing icon. Pass <code>href</code> for a plain anchor, or
      <code>routerLink</code> to navigate within the app via Angular's router.
    </p>

    <app-example-block title="Variants" [code]="variantsCode">
      <cwr-styled-link variant="default" href="https://checkworkrights.com" target="_blank"
        >Default variant</cwr-styled-link
      >
      <cwr-styled-link variant="neutral" href="https://checkworkrights.com" target="_blank"
        >Neutral variant</cwr-styled-link
      >
    </app-example-block>

    <app-example-block title="Without trailing icon" [code]="noIconCode">
      <cwr-styled-link [trailingIcon]="null" href="https://checkworkrights.com" target="_blank"
        >Link without an icon</cwr-styled-link
      >
    </app-example-block>

    <app-example-block title="Router link" [code]="routerLinkCode">
      <cwr-styled-link routerLink="/showcase/button" [trailingIcon]="null"
        >Go to Button showcase</cwr-styled-link
      >
    </app-example-block>

    <app-example-block title="Disabled" [code]="disabledCode">
      <cwr-styled-link [disabled]="true" href="https://checkworkrights.com"
        >Disabled link</cwr-styled-link
      >
    </app-example-block>

    <app-component-reference selector="cwr-styled-link"></app-component-reference>
  `,
})
export class StyledLinkShowcase {
  variantsCode = `<cwr-styled-link variant="default" href="https://checkworkrights.com" target="_blank">Default variant</cwr-styled-link>
<cwr-styled-link variant="neutral" href="https://checkworkrights.com" target="_blank">Neutral variant</cwr-styled-link>`;

  noIconCode = `<cwr-styled-link [trailingIcon]="null" href="https://checkworkrights.com" target="_blank">Link without an icon</cwr-styled-link>`;

  routerLinkCode = `<cwr-styled-link routerLink="/showcase/button" [trailingIcon]="null">Go to Button showcase</cwr-styled-link>`;

  disabledCode = `<cwr-styled-link [disabled]="true" href="https://checkworkrights.com">Disabled link</cwr-styled-link>`;
}
